package techin.lt.egzamino.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import techin.lt.egzamino.model.Ad;

import java.util.List;

@Repository
public interface AdRepository extends JpaRepository<Ad, Long> {
    
    List<Ad> findAll();

}
