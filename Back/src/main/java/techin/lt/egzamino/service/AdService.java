package techin.lt.egzamino.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import techin.lt.egzamino.model.Ad;
import techin.lt.egzamino.repository.AdRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AdService {

    private final AdRepository adRepository;

    public AdService(AdRepository adRepository) {
        this.adRepository = adRepository;
    }

    public Ad findById(Long id) {
        return adRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found with id: " + id));
    }

    public Ad save(Ad ad) {
        return adRepository.save(ad);
    }

    public void delete(Long id) {
        if (!adRepository.existsById(id)) {
            throw new RuntimeException("Ad not found with id: " + id);
        }
        adRepository.deleteById(id);
    }

    @Transactional
    public void approveAd(Long id) {
        Ad ad = adRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found with id: " + id));
        adRepository.save(ad);
    }

    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }
}
