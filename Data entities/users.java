import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class Users {
    @Id
    private UUID id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    private String role;
}
