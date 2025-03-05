package techin.lt.egzamino.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import techin.lt.egzamino.dto.BookingRequest;
import techin.lt.egzamino.model.Ad;
import techin.lt.egzamino.model.User;
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

    @PostMapping("/book")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<String> bookAd(@RequestBody BookingRequest request, @AuthenticationPrincipal User user) {
        adService.bookAd(request.getAdId(), user.getId());
        return ResponseEntity.ok("Ad booked successfully");
    }

}
