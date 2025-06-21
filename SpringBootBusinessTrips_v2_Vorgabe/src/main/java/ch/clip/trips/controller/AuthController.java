// src/main/java/ch/clip/trips/controller/AuthController.java
package ch.clip.trips.controller;

import ch.clip.trips.model.AppUser;
import ch.clip.trips.repo.AppUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AppUserRepository repo;
    private final PasswordEncoder encoder;

    public AuthController(AppUserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpDto dto) {
        if (repo.findByUsername(dto.getUsername()).isPresent()) {
            // 409 if username already exists
            return ResponseEntity.status(409).body("Username already taken");
        }
        AppUser u = new AppUser();
        u.setUsername(dto.getUsername());
        u.setPassword(encoder.encode(dto.getPassword()));
        u.setRoles("ROLE_USER");
        repo.save(u);
        return ResponseEntity.ok("User created");
    }
}
