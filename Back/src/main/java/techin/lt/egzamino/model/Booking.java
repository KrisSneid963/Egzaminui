package techin.lt.egzamino.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "ad_id", nullable = false)
    private Ad ad;

    private LocalDate bookingDate;

    public Booking(User user, Ad ad) {
        this.user = user;
        this.ad = ad;
        this.bookingDate = LocalDate.now();
    }

    public Booking() {
    }
}
