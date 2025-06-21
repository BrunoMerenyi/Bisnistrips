package ch.clip.trips.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")               // <-- this becomes your table name
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;             // we’ll store the BCrypt-hash here

    @Column(nullable = false)
    private String roles;                // e.g. "ROLE_USER,ROLE_ADMIN"

    // standard getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRoles() { return roles; }
    public void setRoles(String roles) { this.roles = roles; }
}
