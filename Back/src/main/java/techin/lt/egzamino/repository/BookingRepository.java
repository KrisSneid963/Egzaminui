package techin.lt.egzamino.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import techin.lt.egzamino.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
}
