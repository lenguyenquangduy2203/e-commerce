package edu.webdev.catalog.shared.mappers;

import edu.webdev.catalog.infrastructure.persistence.models.User;
import edu.webdev.catalog.infrastructure.security.profile.UserProfile;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-18T14:16:59+0700",
    comments = "version: 1.6.3, compiler: Eclipse JDT (IDE) 3.42.0.z20250331-1358, environment: Java 21.0.6 (Eclipse Adoptium)"
)
@Component
public class UserProfileMapperImpl implements UserProfileMapper {

    @Override
    public UserProfile toDomain(User user) {
        if ( user == null ) {
            return null;
        }

        UserProfile.UserProfileBuilder userProfile = UserProfile.builder();

        userProfile.id( fromUUIDToUserId( user.getId() ) );
        userProfile.email( fromStringToEmail( user.getEmail() ) );
        userProfile.password( fromStringToPassword( user.getPassword() ) );
        userProfile.role( fromStringToUserRole( user.getRole() ) );

        return userProfile.build();
    }

    @Override
    public User toPersistence(UserProfile profile) {
        if ( profile == null ) {
            return null;
        }

        User.UserBuilder user = User.builder();

        user.id( fromUserIdToUUID( profile.getId() ) );
        user.email( fromEmailToString( profile.getEmail() ) );
        user.password( fromPasswordToString( profile.getPassword() ) );
        user.role( fromUserRoleToString( profile.getRole() ) );

        return user.build();
    }
}
