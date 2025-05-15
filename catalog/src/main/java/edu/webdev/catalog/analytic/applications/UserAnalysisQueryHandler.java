package edu.webdev.catalog.analytic.applications;

import java.time.Instant;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import edu.webdev.catalog.analytic.applications.queries.UserAnalysisQuery;
import edu.webdev.catalog.analytic.domain.DateRange;
import edu.webdev.catalog.analytic.domain.UserAmount;
import edu.webdev.catalog.analytic.domain.UserAmountByType;
import edu.webdev.catalog.analytic.domain.UserType;
import edu.webdev.catalog.infrastructure.persistence.repositories.OrderRepository;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.UserIdByOrderCreateAt;
import edu.webdev.catalog.shared.base.QueryHandler;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAnalysisQueryHandler implements QueryHandler<UserAnalysisQuery, List<UserAmountByType>> {
    private final OrderRepository orderRepository;
    private final ZoneId zoneId = ZoneId.of("UTC");

    @Override
    public List<UserAmountByType> handle(UserAnalysisQuery query) {
        List<UserIdByOrderCreateAt> userIds = findUserIdsByOrderCreateAtInDateRange(query.getDateRange());
        List<UUID> recentUsers = filterUsersByRange(userIds, query.getRecentRange());
        List<UUID> compareUsers = filterUsersByRange(userIds, query.getCompareRange());
        Map<UUID, Long> compareUserCounts = compareUsers.stream()
            .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));
        Set<UUID> seenUsers = new HashSet<>();
        int returnedAmount = 0;
        int oftenAmount = 0;
        int onetimeAmount = 0;
        for (UUID id : recentUsers) {
            if (seenUsers.contains(id)) {
                continue;
            }

            long compareCount = compareUserCounts.getOrDefault(id, 0L);
            if (compareCount == 0) {
                onetimeAmount += 1;
            } else if (compareCount == 1) {
                returnedAmount += 1;
            } else {
                oftenAmount += 1;
            }

            seenUsers.add(id);
        }

        return List.of(
            new UserAmountByType(UserType.OFTEN_CUSTOMER, UserAmount.create(oftenAmount)),
            new UserAmountByType(UserType.ONETIME_CUSTOMER, UserAmount.create(onetimeAmount)),
            new UserAmountByType(UserType.RETURNED_CUSTOMER, UserAmount.create(returnedAmount))
        );
    }

    private List<UserIdByOrderCreateAt> findUserIdsByOrderCreateAtInDateRange(DateRange range) {
        Instant startDate = range.getStartDate().atStartOfDay(zoneId).toInstant();
        Instant endDate = range.getEndDate().atStartOfDay(zoneId).toInstant();

        return orderRepository.findUserIdByOrderCreateAtBetween(startDate, endDate);
    }

    private List<UUID> filterUsersByRange(List<UserIdByOrderCreateAt> userIds, DateRange range) {
        Instant startDate = range.getStartDate().atStartOfDay(zoneId).toInstant();
        Instant endDate = range.getEndDate().atStartOfDay(zoneId).toInstant();
        
        return userIds.stream()
            .filter(tuple -> tuple.getCreateAt().isAfter(startDate) && tuple.getCreateAt().isBefore(endDate))
            .map(UserIdByOrderCreateAt::getUserId)
            .toList();
    }
}
