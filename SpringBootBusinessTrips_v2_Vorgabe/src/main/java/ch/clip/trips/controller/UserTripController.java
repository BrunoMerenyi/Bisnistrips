package ch.clip.trips.controller;

import ch.clip.trips.model.AppUser;
import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.repo.AppUserRepository;
import ch.clip.trips.repo.BusinessTripRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/user/trips")
public class UserTripController {

    private final AppUserRepository userRepo;
    private final BusinessTripRepository tripRepo;

    public UserTripController(AppUserRepository userRepo,
                              BusinessTripRepository tripRepo) {
        this.userRepo = userRepo;
        this.tripRepo = tripRepo;
    }

    // Für current user aus dem Session-Principal laden
    private AppUser getCurrentUser(Authentication auth) {
        return userRepo.findByUsername(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // 1) Liste aller Trips des Users holen
    @GetMapping
    public List<BusinessTrip> list(Authentication auth) {
        return getCurrentUser(auth).getTrips().stream().sorted(java.util.Comparator.comparing(BusinessTrip::getId)).collect(java.util.stream.Collectors.toList());
    }

    // 2) Einen Trip hinzufügen
    @PostMapping("/{tripId}")
    public ResponseEntity<Set<BusinessTrip>> addTrip(
            Authentication auth,
            @PathVariable Long tripId
    ) {
        AppUser user = getCurrentUser(auth);
        BusinessTrip trip = tripRepo.findById(tripId)
                .orElseThrow();
        user.getTrips().add(trip);
        userRepo.save(user);
        return ResponseEntity.ok(user.getTrips());
    }

    // 3) Einen Trip entfernen
    @DeleteMapping("/{tripId}")
    public ResponseEntity<Set<BusinessTrip>> removeTrip(
            Authentication auth,
            @PathVariable Long tripId
    ) {
        AppUser user = getCurrentUser(auth);
        user.getTrips().removeIf(t -> t.getId().equals(tripId));
        userRepo.save(user);
        return ResponseEntity.ok(user.getTrips());
    }
}
