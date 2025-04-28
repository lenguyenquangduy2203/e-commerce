package edu.webdev.catalog.shared.mappers;

import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import edu.webdev.catalog.infrastructure.persistence.models.User;
import edu.webdev.catalog.infrastructure.security.profile.Email;
import edu.webdev.catalog.infrastructure.security.profile.Password;
import edu.webdev.catalog.infrastructure.security.profile.UserId;
import edu.webdev.catalog.infrastructure.security.profile.UserProfile;
import edu.webdev.catalog.infrastructure.security.profile.UserRole;

@Mapper(componentModel = "spring")
public interface UserProfileMapper  {

    @Mapping(source = "id", target = "id", qualifiedByName = "fromUUIDToUserId")
    @Mapping(source = "email", target = "email", qualifiedByName = "fromStringToEmail")
    @Mapping(source = "password", target = "password", qualifiedByName = "fromStringToPassword")
    @Mapping(source = "role", target = "role", qualifiedByName = "fromStringToUserRole")
    UserProfile toDomain(User user);

    @Mapping(source = "id", target = "id", qualifiedByName = "fromUserIdToUUID")
    @Mapping(source = "email", target = "email", qualifiedByName = "fromEmailToString")
    @Mapping(source = "password", target = "password", qualifiedByName = "fromPasswordToString")
    @Mapping(source = "role", target = "role", qualifiedByName = "fromUserRoleToString")
    @Mapping(target = "cart", ignore = true)
    User toPersistence(UserProfile profile);

    @Named("fromUserIdToUUID")
    default UUID fromUserIdToUUID(UserId userId) {
        return (userId != null)? userId.getValue() : null;
    }

    @Named("fromUUIDToUserId")
    default UserId fromUUIDToUserId(UUID id) {
        return UserId.create(id);
    }

    @Named("fromEmailToString")
    default String fromEmailToString(Email email) {
        return (email != null) ? email.getValue() : null;
    }

    @Named("fromStringToEmail")
    default Email fromStringToEmail(String email) {
        return Email.create(email);
    }

    @Named("fromPasswordToString")
    default String fromPasswordToString(Password password) {
        return (password != null) ? password.getValue() : null;
    }

    @Named("fromStringToPassword")
    default Password fromStringToPassword(String password) {
        return Password.create(password);
    }

    @Named("fromUserRoleToString")
    default String fromUserRoleToString(UserRole role) {
        return (role != null) ? role.name() : null;
    }

    @Named("fromStringToUserRole")
    default UserRole fromStringToUserRole(String role) {
        return (role != null) ? UserRole.valueOf(role) : null;
    }
}
