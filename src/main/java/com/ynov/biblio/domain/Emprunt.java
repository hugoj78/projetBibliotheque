package com.ynov.biblio.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

/**
 * A Emprunt.
 */
@Entity
@Table(name = "emprunt")
public class Emprunt implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "id_emprunt", nullable = false)
    private UUID idEmprunt;

    @Column(name = "date_emprunt")
    private LocalDate dateEmprunt;

    @Column(name = "id_utilisateur")
    private Integer idUtilisateur;

    @Column(name = "id_exemplaire")
    private Integer idExemplaire;

    @OneToOne
    @JoinColumn(unique = true)
    private Exemplaire exemplaire;

    @OneToOne
    @JoinColumn(unique = true)
    private Utilisateur utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getIdEmprunt() {
        return idEmprunt;
    }

    public Emprunt idEmprunt(UUID idEmprunt) {
        this.idEmprunt = idEmprunt;
        return this;
    }

    public void setIdEmprunt(UUID idEmprunt) {
        this.idEmprunt = idEmprunt;
    }

    public LocalDate getDateEmprunt() {
        return dateEmprunt;
    }

    public Emprunt dateEmprunt(LocalDate dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
        return this;
    }

    public void setDateEmprunt(LocalDate dateEmprunt) {
        this.dateEmprunt = dateEmprunt;
    }

    public Integer getIdUtilisateur() {
        return idUtilisateur;
    }

    public Emprunt idUtilisateur(Integer idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
        return this;
    }

    public void setIdUtilisateur(Integer idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public Integer getIdExemplaire() {
        return idExemplaire;
    }

    public Emprunt idExemplaire(Integer idExemplaire) {
        this.idExemplaire = idExemplaire;
        return this;
    }

    public void setIdExemplaire(Integer idExemplaire) {
        this.idExemplaire = idExemplaire;
    }

    public Exemplaire getExemplaire() {
        return exemplaire;
    }

    public Emprunt exemplaire(Exemplaire exemplaire) {
        this.exemplaire = exemplaire;
        return this;
    }

    public void setExemplaire(Exemplaire exemplaire) {
        this.exemplaire = exemplaire;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public Emprunt utilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
        return this;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Emprunt)) {
            return false;
        }
        return id != null && id.equals(((Emprunt) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Emprunt{" +
            "id=" + getId() +
            ", idEmprunt='" + getIdEmprunt() + "'" +
            ", dateEmprunt='" + getDateEmprunt() + "'" +
            ", idUtilisateur=" + getIdUtilisateur() +
            ", idExemplaire=" + getIdExemplaire() +
            "}";
    }
}
