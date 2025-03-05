package techin.lt.egzamino.controller;

import org.springframework.web.bind.annotation.*;
import techin.lt.egzamino.model.Ad;
import techin.lt.egzamino.service.AdService;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
@CrossOrigin(origins = "http://localhost:5173")
public class AdController {

    private final AdService adService;

    public AdController(AdService adService) {
        this.adService = adService;
    }

    @GetMapping
    public List<Ad> getAllAds() {
        return adService.getAllAds();
    }
}
