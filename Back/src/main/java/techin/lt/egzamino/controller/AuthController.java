package techin.lt.egzamino.controller;

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;
import techin.lt.egzamino.dto.UserRequestDTO;
import techin.lt.egzamino.model.Role;
import techin.lt.egzamino.model.User;
import techin.lt.egzamino.repository.RoleRepository;
import techin.lt.egzamino.repository.UserRepository;

import java.util.Collections;
import java.util.Optional;


@RestController
@RequestMapping("/api/auth")
// @CrossOrigin(origins = "*") // Nes jau yra parasyta WebConfig
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    @Transactional
    public ResponseEntity<?> registerUser(@RequestBody UserRequestDTO request) {
        if (userRepository.existsByEmail(request.email())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));

        String roleName = (request.role() != null && request.role().equalsIgnoreCase("ROLE_ADMIN"))
                ? "ROLE_ADMIN"
                : "ROLE_USER";

        Optional<Role> roleOpt = Optional.ofNullable(roleRepository.findByName(roleName));

        if (roleOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Role " + roleName + " not found.");
        }

        user.setRoles(Collections.singletonList(roleOpt.get()));
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    @GetMapping("/login")
    public ResponseEntity<User> loginUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        return ResponseEntity.ok().body(user);
    }

}

