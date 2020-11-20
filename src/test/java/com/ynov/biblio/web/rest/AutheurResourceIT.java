package com.ynov.biblio.web.rest;

import com.ynov.biblio.ProjetBibliothequeApp;
import com.ynov.biblio.domain.Autheur;
import com.ynov.biblio.repository.AutheurRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AutheurResource} REST controller.
 */
@SpringBootTest(classes = ProjetBibliothequeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AutheurResourceIT {

    private static final UUID DEFAULT_ID_AUTHEUR = UUID.randomUUID();
    private static final UUID UPDATED_ID_AUTHEUR = UUID.randomUUID();

    private static final String DEFAULT_AUTHEUR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHEUR = "BBBBBBBBBB";

    @Autowired
    private AutheurRepository autheurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAutheurMockMvc;

    private Autheur autheur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Autheur createEntity(EntityManager em) {
        Autheur autheur = new Autheur()
            .idAutheur(DEFAULT_ID_AUTHEUR)
            .autheur(DEFAULT_AUTHEUR);
        return autheur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Autheur createUpdatedEntity(EntityManager em) {
        Autheur autheur = new Autheur()
            .idAutheur(UPDATED_ID_AUTHEUR)
            .autheur(UPDATED_AUTHEUR);
        return autheur;
    }

    @BeforeEach
    public void initTest() {
        autheur = createEntity(em);
    }

    @Test
    @Transactional
    public void createAutheur() throws Exception {
        int databaseSizeBeforeCreate = autheurRepository.findAll().size();
        // Create the Autheur
        restAutheurMockMvc.perform(post("/api/autheurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autheur)))
            .andExpect(status().isCreated());

        // Validate the Autheur in the database
        List<Autheur> autheurList = autheurRepository.findAll();
        assertThat(autheurList).hasSize(databaseSizeBeforeCreate + 1);
        Autheur testAutheur = autheurList.get(autheurList.size() - 1);
        assertThat(testAutheur.getIdAutheur()).isEqualTo(DEFAULT_ID_AUTHEUR);
        assertThat(testAutheur.getAutheur()).isEqualTo(DEFAULT_AUTHEUR);
    }

    @Test
    @Transactional
    public void createAutheurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = autheurRepository.findAll().size();

        // Create the Autheur with an existing ID
        autheur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAutheurMockMvc.perform(post("/api/autheurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autheur)))
            .andExpect(status().isBadRequest());

        // Validate the Autheur in the database
        List<Autheur> autheurList = autheurRepository.findAll();
        assertThat(autheurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIdAutheurIsRequired() throws Exception {
        int databaseSizeBeforeTest = autheurRepository.findAll().size();
        // set the field null
        autheur.setIdAutheur(null);

        // Create the Autheur, which fails.


        restAutheurMockMvc.perform(post("/api/autheurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autheur)))
            .andExpect(status().isBadRequest());

        List<Autheur> autheurList = autheurRepository.findAll();
        assertThat(autheurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAutheurs() throws Exception {
        // Initialize the database
        autheurRepository.saveAndFlush(autheur);

        // Get all the autheurList
        restAutheurMockMvc.perform(get("/api/autheurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(autheur.getId().intValue())))
            .andExpect(jsonPath("$.[*].idAutheur").value(hasItem(DEFAULT_ID_AUTHEUR.toString())))
            .andExpect(jsonPath("$.[*].autheur").value(hasItem(DEFAULT_AUTHEUR)));
    }
    
    @Test
    @Transactional
    public void getAutheur() throws Exception {
        // Initialize the database
        autheurRepository.saveAndFlush(autheur);

        // Get the autheur
        restAutheurMockMvc.perform(get("/api/autheurs/{id}", autheur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(autheur.getId().intValue()))
            .andExpect(jsonPath("$.idAutheur").value(DEFAULT_ID_AUTHEUR.toString()))
            .andExpect(jsonPath("$.autheur").value(DEFAULT_AUTHEUR));
    }
    @Test
    @Transactional
    public void getNonExistingAutheur() throws Exception {
        // Get the autheur
        restAutheurMockMvc.perform(get("/api/autheurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAutheur() throws Exception {
        // Initialize the database
        autheurRepository.saveAndFlush(autheur);

        int databaseSizeBeforeUpdate = autheurRepository.findAll().size();

        // Update the autheur
        Autheur updatedAutheur = autheurRepository.findById(autheur.getId()).get();
        // Disconnect from session so that the updates on updatedAutheur are not directly saved in db
        em.detach(updatedAutheur);
        updatedAutheur
            .idAutheur(UPDATED_ID_AUTHEUR)
            .autheur(UPDATED_AUTHEUR);

        restAutheurMockMvc.perform(put("/api/autheurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAutheur)))
            .andExpect(status().isOk());

        // Validate the Autheur in the database
        List<Autheur> autheurList = autheurRepository.findAll();
        assertThat(autheurList).hasSize(databaseSizeBeforeUpdate);
        Autheur testAutheur = autheurList.get(autheurList.size() - 1);
        assertThat(testAutheur.getIdAutheur()).isEqualTo(UPDATED_ID_AUTHEUR);
        assertThat(testAutheur.getAutheur()).isEqualTo(UPDATED_AUTHEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingAutheur() throws Exception {
        int databaseSizeBeforeUpdate = autheurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAutheurMockMvc.perform(put("/api/autheurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(autheur)))
            .andExpect(status().isBadRequest());

        // Validate the Autheur in the database
        List<Autheur> autheurList = autheurRepository.findAll();
        assertThat(autheurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAutheur() throws Exception {
        // Initialize the database
        autheurRepository.saveAndFlush(autheur);

        int databaseSizeBeforeDelete = autheurRepository.findAll().size();

        // Delete the autheur
        restAutheurMockMvc.perform(delete("/api/autheurs/{id}", autheur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Autheur> autheurList = autheurRepository.findAll();
        assertThat(autheurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
