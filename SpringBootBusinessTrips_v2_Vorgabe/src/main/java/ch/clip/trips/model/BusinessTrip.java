package ch.clip.trips.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Data
@Entity
public class BusinessTrip implements Serializable {

    //	private static final long serialVersionUID = 67027563808382509L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String longDescription;


    private LocalDateTime startTrip;
    private LocalDateTime endTrip;
    private Float price;

    @OneToMany(mappedBy = "businessTrip")
    @JsonManagedReference
    private List<Meeting> meetings;


    public BusinessTrip(long l, String sanFrancisco, String s, String string, LocalDateTime localDateTime, LocalDateTime dateTime) {
        super();

    }

    public BusinessTrip() {
    }

    public BusinessTrip(Long id, String title, String description, String longDescription, LocalDateTime startTrip, LocalDateTime endTrip, Float price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.longDescription = longDescription;
        this.startTrip = startTrip;
        this.endTrip = endTrip;
        this.price = price;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLongDescription() {
        return longDescription;
    }

    public void setLongDescription(String longDescription) {
        this.longDescription = longDescription;
    }

    public List<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(List<Meeting> meetings) {
        this.meetings = meetings;
    }


    public LocalDateTime getStartTrip() {
        return startTrip;
    }

    public void setStartTrip(LocalDateTime startTrip) {
        this.startTrip = startTrip;
    }

    public LocalDateTime getEndTrip() {
        return endTrip;
    }

    public void setEndTrip(LocalDateTime endTrip) {
        this.endTrip = endTrip;
    }

    @Override
    public String toString() {
        return "BusinessTrip [id=" + id + ", title=" + title + ", description=" + description + ", longDescription=" + longDescription + ", startTrip="
                + startTrip + ", endTrip=" + endTrip + ", meetings=" + meetings + "]" + price + " CHF";
    }


}
