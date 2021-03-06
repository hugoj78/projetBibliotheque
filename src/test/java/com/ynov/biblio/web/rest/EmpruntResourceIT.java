package com.ynov.biblio.web.rest;

import com.ynov.biblio.ProjetBibliothequeApp;
import com.ynov.biblio.domain.Emprunt;
import com.ynov.biblio.repository.EmpruntRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EmpruntResource} REST controller.
 */
@SpringBootTest(classes = ProjetBibliothequeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmpruntResourceIT {

    private static final UUID DEFAULT_ID_EMPRUNT = UUID.randomUUID();
    private static final UUID UPDATED_ID_EMPRUNT = UUID.randomUUID();

    private static final LocalDate DEFAULT_DATE_EMPRUNT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_EMPRUNT = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_ID_UTILISATEUR = 1;
    private static final Integer UPDATED_ID_UTILISATEUR = 2;

    private static final Integer DEFAULT_ID_EXEMPLAIRE = 1;
    private static final Integer UPDATED_ID_EXEMPLAIRE = 2;

    @Autowired
    private EmpruntRepository empruntRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmpruntMockMvc;

    private Emprunt emprunt;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Emprunt createEntity(EntityManager em) {
        Emprunt emprunt = new Emprunt()
            .idEmprunt(DEFAULT_ID_EMPRUNT)
            .dateEmprunt(DEFAULT_DATE_EMPRUNT)
            .idUtilisateur(DEFAULT_ID_UTILISATEUR)
            .idExemplaire(DEFAULT_ID_EXEMPLAIRE);
        return emprunt;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Emprunt createUpdatedEntity(EntityManager em) {
        Emprunt emprunt = new Emprunt()
            .idEmprunt(UPDATED_ID_EMPRUNT)
            .dateEmprunt(UPDATED_DATE_EMPRUNT)
            .idUtilisateur(UPDATED_ID_UTILISATEUR)
            .idExemplaire(UPDATED_ID_EXEMPLAIRE);
        return emprunt;
    }

    @BeforeEach
    public void initTest() {
        emprunt = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmprunt() throws Exception {
        int databaseSizeBeforeCreate = empruntRepository.findAll().size();
        // Create the Emprunt
        restEmpruntMockMvc.perform(post("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprunt)))
            .andExpect(status().isCreated());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeCreate + 1);
        Emprunt testEmprunt = empruntList.get(empruntList.size() - 1);
        assertThat(testEmprunt.getIdEmprunt()).isEqualTo(DEFAULT_ID_EMPRUNT);
        assertThat(testEmprunt.getDateEmprunt()).isEqualTo(DEFAULT_DATE_EMPRUNT);
        assertThat(testEmprunt.getIdUtilisateur()).isEqualTo(DEFAULT_ID_UTILISATEUR);
        assertThat(testEmprunt.getIdExemplaire()).isEqualTo(DEFAULT_ID_EXEMPLAIRE);
    }

    @Test
    @Transactional
    public void createEmpruntWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = empruntRepository.findAll().size();

        // Create the Emprunt with an existing ID
        emprunt.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmpruntMockMvc.perform(post("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprunt)))
            .andExpect(status().isBadRequest());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkIdEmpruntIsRequired() throws Exception {
        int databaseSizeBeforeTest = empruntRepository.findAll().size();
        // set the field null
        emprunt.setIdEmprunt(null);

        // Create the Emprunt, which fails.


        restEmpruntMockMvc.perform(post("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprunt)))
            .andExpect(status().isBadRequest());

        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmprunts() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);

        // Get all the empruntList
        restEmpruntMockMvc.perform(get("/api/emprunts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emprunt.getId().intValue())))
            .andExpect(jsonPath("$.[*].idEmprunt").value(hasItem(DEFAULT_ID_EMPRUNT.toString())))
            .andExpect(jsonPath("$.[*].dateEmprunt").value(hasItem(DEFAULT_DATE_EMPRUNT.toString())))
            .andExpect(jsonPath("$.[*].idUtilisateur").value(hasItem(DEFAULT_ID_UTILISATEUR)))
            .andExpect(jsonPath("$.[*].idExemplaire").value(hasItem(DEFAULT_ID_EXEMPLAIRE)));
    }
    
    @Test
    @Transactional
    public void getEmprunt() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);

        // Get the emprunt
        restEmpruntMockMvc.perform(get("/api/emprunts/{id}", emprunt.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(emprunt.getId().intValue()))
            .andExpect(jsonPath("$.idEmprunt").value(DEFAULT_ID_EMPRUNT.toString()))
            .andExpect(jsonPath("$.dateEmprunt").value(DEFAULT_DATE_EMPRUNT.toString()))
            .andExpect(jsonPath("$.idUtilisateur").value(DEFAULT_ID_UTILISATEUR))
            .andExpect(jsonPath("$.idExemplaire").value(DEFAULT_ID_EXEMPLAIRE));
    }
    @Test
    @Transactional
    public void getNonExistingEmprunt() throws Exception {
        // Get the emprunt
        restEmpruntMockMvc.perform(get("/api/emprunts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmprunt() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);

        int databaseSizeBeforeUpdate = empruntRepository.findAll().size();

        // Update the emprunt
        Emprunt updatedEmprunt = empruntRepository.findById(emprunt.getId()).get();
        // Disconnect from session so that the updates on updatedEmprunt are not directly saved in db
        em.detach(updatedEmprunt);
        updatedEmprunt
            .idEmprunt(UPDATED_ID_EMPRUNT)
            .dateEmprunt(UPDATED_DATE_EMPRUNT)
            .idUtilisateur(UPDATED_ID_UTILISATEUR)
            .idExemplaire(UPDATED_ID_EXEMPLAIRE);

        restEmpruntMockMvc.perform(put("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmprunt)))
            .andExpect(status().isOk());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeUpdate);
        Emprunt testEmprunt = empruntList.get(empruntList.size() - 1);
        assertThat(testEmprunt.getIdEmprunt()).isEqualTo(UPDATED_ID_EMPRUNT);
        assertThat(testEmprunt.getDateEmprunt()).isEqualTo(UPDATED_DATE_EMPRUNT);
        assertThat(testEmprunt.getIdUtilisateur()).isEqualTo(UPDATED_ID_UTILISATEUR);
        assertThat(testEmprunt.getIdExemplaire()).isEqualTo(UPDATED_ID_EXEMPLAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingEmprunt() throws Exception {
        int databaseSizeBeforeUpdate = empruntRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmpruntMockMvc.perform(put("/api/emprunts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(emprunt)))
            .andExpect(status().isBadRequest());

        // Validate the Emprunt in the database
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmprunt() throws Exception {
        // Initialize the database
        empruntRepository.saveAndFlush(emprunt);

        int databaseSizeBeforeDelete = empruntRepository.findAll().size();

        // Delete the emprunt
        restEmpruntMockMvc.perform(delete("/api/emprunts/{id}", emprunt.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Emprunt> empruntList = empruntRepository.findAll();
        assertThat(empruntList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
