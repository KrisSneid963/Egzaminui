package techin.lt.egzamino.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import techin.lt.egzamino.model.Ad;
import techin.lt.egzamino.service.AdService; // Import AdService

import java.util.List;

@RestController
@RequestMapping("/api/ads")
public class AdController {

    private final AdService adService;


    public AdController(AdService adService) {
        this.adService = adService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ad> getAd(@PathVariable Long id) {
        Ad ad = adService.findById(id);
        return ResponseEntity.ok(ad);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Ad> createAd(@RequestBody Ad ad) {
        Ad savedAd = adService.save(ad);
        return ResponseEntity.ok(savedAd);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteAd(@PathVariable Long id) {
        adService.delete(id);
        return ResponseEntity.ok("Ad deleted successfully");
    }

    @PutMapping("/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> approveAd(@PathVariable Long id) {
        adService.approveAd(id);
        return ResponseEntity.ok("Ad approved successfully");
    }

    @GetMapping
    public List<Ad> getAllAds() {
        return adService.getAllAds();
    }
}
