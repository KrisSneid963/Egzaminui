package techin.lt.egzamino.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import techin.lt.egzamino.model.Role;

public interface RoleRepository extends JpaRepository<Role, Byte> {
    Role findByName(String name);

}