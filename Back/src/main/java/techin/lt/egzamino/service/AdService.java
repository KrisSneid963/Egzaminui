package techin.lt.egzamino.service;

import org.springframework.stereotype.Service;
import techin.lt.egzamino.model.Ad;
import techin.lt.egzamino.model.User;
import techin.lt.egzamino.model.Booking;
import techin.lt.egzamino.repository.AdRepository;
import techin.lt.egzamino.repository.UserRepository;
import techin.lt.egzamino.repository.BookingRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AdService {

    private final AdRepository adRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    public AdService(AdRepository adRepository, UserRepository userRepository, BookingRepository bookingRepository) {
        this.adRepository = adRepository;
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }

    public void bookAd(Long adId, Long userId) {
        Optional<Ad> adOptional = adRepository.findById(adId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (adOptional.isEmpty()) {
            throw new RuntimeException("Ad not found");
        }
        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        Booking booking = new Booking(userOptional.get(), adOptional.get());
        bookingRepository.save(booking);
    }
    
}
