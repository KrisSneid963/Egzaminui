package techin.lt.egzamino.controller;


import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import techin.lt.egzamino.dto.UserMapper;
import techin.lt.egzamino.dto.UserRequestDTO;
import techin.lt.egzamino.dto.UserResponseDTO;
import techin.lt.egzamino.model.User;
import techin.lt.egzamino.service.UserService;
import techin.lt.egzamino.util.WebUtil;

import java.net.URI;

@RestController
@RequestMapping("/api/register")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> addUser(@Valid @RequestBody UserRequestDTO dto) {
        User newUser = userService.addUser(dto);
        UserResponseDTO responseDTO = UserMapper.toDTO(newUser);

        URI location = WebUtil.createLocation("/{id}", newUser.getId());

        return ResponseEntity.created(location).body(responseDTO);
    }
}
