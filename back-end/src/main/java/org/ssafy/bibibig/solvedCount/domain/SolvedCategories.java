package org.ssafy.bibibig.solvedCount.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.ssafy.bibibig.badge.domain.Badge;
import org.ssafy.bibibig.scrap.domain.Scrap;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="solved_categories")
public class SolvedCategories{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long politic;
    private Long economy;
    private Long society;
    private Long culture;
    private Long sports;
    private Long international;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static SolvedCategories of(Long id, Long politic, Long economy, Long society, Long culture, Long sports, Long international, LocalDateTime createdAt){
        return new SolvedCategories(id, politic, economy, society, culture, sports, international, createdAt);
    }
}
