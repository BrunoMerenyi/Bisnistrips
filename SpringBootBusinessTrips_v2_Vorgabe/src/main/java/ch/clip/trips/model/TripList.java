package ch.clip.trips.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "trip_list")
public class TripList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;


    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    @ManyToMany
    @JoinTable(
            name = "trip_list_trips",
            joinColumns = @JoinColumn(name = "trip_list_id"),
            inverseJoinColumns = @JoinColumn(name = "business_trip_id")
    )
    private List<BusinessTrip> trips;

    // --- Konstruktor, Getter/Setter ---

    public TripList() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public AppUser getUser() { return user; }
    public void setUser(AppUser user) { this.user = user; }

    public List<BusinessTrip> getTrips() { return trips; }
    public void setTrips(List<BusinessTrip> trips) { this.trips = trips; }

}
