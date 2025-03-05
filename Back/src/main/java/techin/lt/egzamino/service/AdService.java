package techin.lt.egzamino.service;

import org.springframework.stereotype.Service;
import techin.lt.egzamino.model.Ad;
import techin.lt.egzamino.repository.AdRepository;

import java.util.List;

@Service
public class AdService {

    private final AdRepository adRepository;

    public AdService(AdRepository adRepository) {
        this.adRepository = adRepository;
    }

    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }
}
