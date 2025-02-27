package techin.lt.egzamino.dto;

import techin.lt.egzamino.model.User;

public class UserMapper {

    public static User toEntity(UserRequestDTO dto) {
        User user = new User();
        user.setName(dto.name());
        user.setPassword(dto.password());
        user.setEmail(dto.email());
        return user;
    }

    public static UserResponseDTO toDTO(User user) {
        return new UserResponseDTO(user.getId(),
                user.getName());
    }

}
