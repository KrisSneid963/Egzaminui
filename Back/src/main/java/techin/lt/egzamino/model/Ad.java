package techin.lt.egzamino.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "ads")
public class Ad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private int price;
    private String image_url;
    private Long user_id;  // Foreign key to users table

    // Default constructor
    public Ad() {
    }
}
