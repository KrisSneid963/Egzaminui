package techin.lt.egzamino.service;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import techin.lt.egzamino.dto.UserMapper;
import techin.lt.egzamino.dto.UserRequestDTO;
import techin.lt.egzamino.model.Role;
import techin.lt.egzamino.model.User;
import techin.lt.egzamino.repository.RoleRepository;
import techin.lt.egzamino.repository.UserRepository;
import techin.lt.egzamino.validation.exception.EmailInUseException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User addUser(UserRequestDTO dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new EmailInUseException("Email '" + dto.email() + "' was not found");
        }
        Role roleUser = roleRepository.findByName("ROLE_USER");
        User newUser = UserMapper.toEntity(dto);

        newUser.setPassword(passwordEncoder.encode(dto.password()));
        newUser.getRoles().add(roleUser);

        return userRepository.save(newUser);
    }
}
