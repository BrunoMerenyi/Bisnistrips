package ch.clip.trips;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import ch.clip.trips.model.BusinessTrip;
import ch.clip.trips.model.Meeting;
import ch.clip.trips.repo.BusinessTripRepository;
import ch.clip.trips.repo.MeetingRepository;

@SpringBootApplication
public class BusinessTripsBackendApplication {
	private static final Logger log = LoggerFactory.getLogger(BusinessTripsBackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BusinessTripsBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner demoData(BusinessTripRepository businessTripRepository, MeetingRepository meetingRepository) {
		// https://spring.io/guides/gs/accessing-data-jpa/
		return (args) -> {

			
			// save a couple of BusinessTrips
			// BusinessTrip instances
			BusinessTrip bt01 = new BusinessTrip(
					1L,
					"San Francisco",
					"Cloud-Computing Conference",
					"""
            Drei Tage praxisnahe Vorträge zu Cloud-Native-Architekturen im Moscone Center.
            Schwerpunkte: Kubernetes-Scaling, Observability und Multi-Cloud-Strategien.
            Rahmenprogramm: Boot-Camp bei Google Cloud und Alcatraz-Networking-Dinner.
            Inklusive Besichtigung eines AWS-Rechenzentrums in Santa Clara.
            """,
					LocalDateTime.of(2025, 2, 13, 9, 0),
					LocalDateTime.of(2025, 2, 15, 17, 0),
					101f
			);

			BusinessTrip bt02 = new BusinessTrip(
					2L,
					"New York",
					"International FinTech Summit",
					"""
            Führende Banken, Start-ups und Aufsichtsbehörden diskutieren Payment-Trends.
            Panels zu Blockchain-Regulierung, PSD3 und KI-gestützter Risikoanalyse.
            Abendempfang in der Federal Hall; Networking-Brunch im One Vanderbilt Summit.
            Optional: Tour durch das NYSE-Handelsparkett.
            """,
					LocalDateTime.of(2025, 3, 10, 9, 0),
					LocalDateTime.of(2025, 3, 12, 17, 0),
					101f
			);

			BusinessTrip bt03 = new BusinessTrip(
					3L,
					"Tokyo",
					"AI & Robotics Expo",
					"""
            Japans größte Messe für humanoide Roboter und industrielle Automatisierung.
            Live-Demos: autonome Lieferdrohnen, Pflege-Roboter und generative KI-Modelle.
            Keynotes von SoftBank Robotics und Toyota Research Institute.
            Abschlussabend im Mori-Tower mit Blick über die Shibuya-Skyline.
            """,
					LocalDateTime.of(2025, 4, 18, 9, 0),
					LocalDateTime.of(2025, 4, 20, 16, 0),
					101f
			);

			BusinessTrip bt04 = new BusinessTrip(
					4L,
					"Berlin",
					"IFA Consumer-Electronics Fair",
					"""
            Schwerpunkt: Smart-Home-Ökosysteme, 8K-Displays und Wearables.
            Geführte Tour durch die Messehallen unter Leitung des Fraunhofer-HHI.
            Politischer Abend im Bundeswirtschafts­ministerium zum Thema EU-Ökodesign.
            Historischer Stadtrundgang entlang der East-Side-Gallery.
            """,
					LocalDateTime.of(2025, 5, 5, 9, 0),
					LocalDateTime.of(2025, 5, 7, 17, 0),
					101f
			);

			BusinessTrip bt05 = new BusinessTrip(
					5L,
					"London",
					"Cyber-Security Forum",
					"""
            Konferenz im Canary Wharf Conference Centre zu Zero-Trust-Architekturen.
            Hands-on-Workshops: Incident-Response-Simulation und Cloud-Hardening.
            Gastvortrag des National Cyber Security Centre (NCSC).
            Dinner-Cruise auf der Themse mit Ausblick auf die Tower Bridge.
            """,
					LocalDateTime.of(2025, 6, 12, 10, 0),
					LocalDateTime.of(2025, 6, 14, 17, 0),
					101f
			);

			BusinessTrip bt06 = new BusinessTrip(
					6L,
					"Paris",
					"Smart-City Symposium",
					"""
            Treffen europäischer Städteplaner zu IoT-basierten Verkehrs­konzepten.
            Use-Cases: 5G-Ampelsteuerung, Energie-Sharing und AR-Touristenführung.
            Exkursion ins Quartier „La Défense“ – Pilotgebiet für 100 % erneuerbare Wärme.
            Kulinarischer Abschluss in einem Bistro an der Seine.
            """,
					LocalDateTime.of(2025, 7, 8, 9, 0),
					LocalDateTime.of(2025, 7, 10, 17, 0),
					101f
			);

			BusinessTrip bt07 = new BusinessTrip(
					7L,
					"Singapore",
					"Global IoT Week",
					"""
            Messe im Marina Bay Sands Expo Center mit über 800 Ausstellern.
            Schwerpunkte: Industrie-4.0-Sensorik, NB-IoT-Netzwerke und Edge-AI.
            Abend-Light-Show „Spectra“ exklusiv für Konferenz­teilnehmer.
            Networking auf einer Rooftop-Bar mit 360-Grad-Blick auf den Hafen.
            """,
					LocalDateTime.of(2025, 8, 20, 9, 0),
					LocalDateTime.of(2025, 8, 22, 17, 0),
					101f
			);

			BusinessTrip bt08 = new BusinessTrip(
					8L,
					"Dubai",
					"Blockchain Expo",
					"""
            Größte MENA-Region-Veranstaltung zu DeFi, NFTs und CBDC-Projekten.
            RegTech-Panel mit Vertretern der Dubai Financial Services Authority.
            Desert-Experience-Side-Event: 4×4-Tour & Arabian-Nights-Gala-Dinner.
            Führung durch das Blockchain-gestützte Zoll-Terminal von DP-World.
            """,
					LocalDateTime.of(2025, 9, 15, 9, 0),
					LocalDateTime.of(2025, 9, 17, 17, 0),
					101f
			);

			BusinessTrip bt09 = new BusinessTrip(
					9L,
					"Toronto",
					"Startup Showcase",
					"""
            Pitch-Sessions im MaRS Discovery District für Seed- bis Series-B-Start-ups.
            One-on-One-Mentoring mit VCs aus dem Silicon Valley & Kanada.
            Stadtführung durch das historische Distillery District.
            Abschluss: Blue-Jays-Ballgame im Rogers Centre.
            """,
					LocalDateTime.of(2025, 10, 6, 9, 0),
					LocalDateTime.of(2025, 10, 8, 17, 0),
					101f
			);

			BusinessTrip bt10 = new BusinessTrip(
					10L,
					"Sydney",
					"Data-Science Congress",
					"""
            Keynotes von Atlassian, CSIRO und Microsoft Research.
            Workshops: Responsible-AI-Frameworks & ML-Ops auf Kubernetes.
            Sydney-Harbour-Dinner-Cruise vorbei am Opernhaus und der Harbour-Bridge.
            Geführter Morning-Run im Royal Botanic Garden.
            """,
					LocalDateTime.of(2025, 11, 3, 9, 0),
					LocalDateTime.of(2025, 11, 5, 17, 0),
					101f
			);

			BusinessTrip bt11 = new BusinessTrip(
					11L,
					"Zurich",
					"Quantum-Computing Roundtable",
					"""
            geschlossenes Expertentreffen an der ETH Zürich.
            Agenda: Fehler­korrektur, Quanten­suprematie und Post-Quantum-Crypto.
            Laborbesichtigung im IBM Research Zürich in Rüschlikon.
            Abendlicher Fondue-Plauschkurs in der Altstadt.
            """,
					LocalDateTime.of(2025, 11, 24, 9, 0),
					LocalDateTime.of(2025, 11, 26, 16, 0),
					101f
			);

			BusinessTrip bt12 = new BusinessTrip(
					12L,
					"Copenhagen",
					"Sustainable-Tech Conference",
					"""
            Plenar­vorträge zu Kreislauf­wirtschaft, Wind-Energy-Innovation und Green-AI.
            Besuch der Wind-Turbinen-Testanlage Lindø Offshore Renewables Center.
            Fahrrad-City-Tour entlang der Hafenpromenade & Dinner in der Street-Food-Halle.
            Preisverleihung des Nordic Cleantech Open.
            """,
					LocalDateTime.of(2025, 12, 10, 9, 0),
					LocalDateTime.of(2025, 12, 12, 16, 0),
					101f
			);


// Save them
			businessTripRepository.save(bt01);
			businessTripRepository.save(bt02);
			businessTripRepository.save(bt03);
			businessTripRepository.save(bt04);
			businessTripRepository.save(bt05);
			businessTripRepository.save(bt06);
			businessTripRepository.save(bt07);
			businessTripRepository.save(bt08);
			businessTripRepository.save(bt09);
			businessTripRepository.save(bt10);
			businessTripRepository.save(bt11);
			businessTripRepository.save(bt12);

			// save a couple of meetings

			Meeting one = new Meeting(1L, "One Conference", "Key Note on One Conference", bt01);
			Meeting zero = new Meeting(2L, "Zero Conference", "Workshop Zero on One Conference", bt01);
			Meeting handsOn = new Meeting(3L, "One Conference", "HandsOn on One Conference", bt02);
			Meeting workOn = new Meeting(4L, "One Conference", "Key Note on One Conference", bt02);
			Meeting stayTuned = new Meeting(5L, "One Conference", "Key Note on One Conference", bt03);

			meetingRepository.save(one);
			meetingRepository.save(zero);
			meetingRepository.save(handsOn);
			meetingRepository.save(workOn);
			meetingRepository.save(stayTuned);
			
			
			// List<Trips> 
			
			List<BusinessTrip> wishTrips = new ArrayList<BusinessTrip>(); 

			wishTrips.add(bt01);
			wishTrips.add(bt02);
		};
	}
}