package com.ynov.biblio.web.rest;

import com.ynov.biblio.domain.Autheur;
import com.ynov.biblio.repository.AutheurRepository;
import com.ynov.biblio.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.ynov.biblio.domain.Autheur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AutheurResource {

    private final Logger log = LoggerFactory.getLogger(AutheurResource.class);

    private static final String ENTITY_NAME = "autheur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutheurRepository autheurRepository;

    public AutheurResource(AutheurRepository autheurRepository) {
        this.autheurRepository = autheurRepository;
    }

    /**
     * {@code POST  /autheurs} : Create a new autheur.
     *
     * @param autheur the autheur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new autheur, or with status {@code 400 (Bad Request)} if the autheur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/autheurs")
    public ResponseEntity<Autheur> createAutheur(@Valid @RequestBody Autheur autheur) throws URISyntaxException {
        log.debug("REST request to save Autheur : {}", autheur);
        if (autheur.getId() != null) {
            throw new BadRequestAlertException("A new autheur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Autheur result = autheurRepository.save(autheur);
        return ResponseEntity.created(new URI("/api/autheurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /autheurs} : Updates an existing autheur.
     *
     * @param autheur the autheur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated autheur,
     * or with status {@code 400 (Bad Request)} if the autheur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the autheur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/autheurs")
    public ResponseEntity<Autheur> updateAutheur(@Valid @RequestBody Autheur autheur) throws URISyntaxException {
        log.debug("REST request to update Autheur : {}", autheur);
        if (autheur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Autheur result = autheurRepository.save(autheur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, autheur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /autheurs} : get all the autheurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of autheurs in body.
     */
    @GetMapping("/autheurs")
    public List<Autheur> getAllAutheurs() {
        log.debug("REST request to get all Autheurs");
        return autheurRepository.findAll();
    }

    /**
     * {@code GET  /autheurs/:id} : get the "id" autheur.
     *
     * @param id the id of the autheur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the autheur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/autheurs/{id}")
    public ResponseEntity<Autheur> getAutheur(@PathVariable Long id) {
        log.debug("REST request to get Autheur : {}", id);
        Optional<Autheur> autheur = autheurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(autheur);
    }

    /**
     * {@code DELETE  /autheurs/:id} : delete the "id" autheur.
     *
     * @param id the id of the autheur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/autheurs/{id}")
    public ResponseEntity<Void> deleteAutheur(@PathVariable Long id) {
        log.debug("REST request to delete Autheur : {}", id);
        autheurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
