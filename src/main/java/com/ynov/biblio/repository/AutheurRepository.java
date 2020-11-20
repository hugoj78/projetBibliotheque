package com.ynov.biblio.repository;

import com.ynov.biblio.domain.Autheur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Autheur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AutheurRepository extends JpaRepository<Autheur, Long> {
}
