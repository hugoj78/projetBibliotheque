package com.ynov.biblio.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.UUID;

/**
 * A Exemplaire.
 */
@Entity
@Table(name = "exemplaire")
public class Exemplaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "id_exemplaire", nullable = false)
    private UUID idExemplaire;

    @Column(name = "disponibilite")
    private Boolean disponibilite;

    @Column(name = "id_livre")
    private Integer idLivre;

    @ManyToOne
    @JsonIgnoreProperties(value = "exemplaires", allowSetters = true)
    private Livre livre;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getIdExemplaire() {
        return idExemplaire;
    }

    public Exemplaire idExemplaire(UUID idExemplaire) {
        this.idExemplaire = idExemplaire;
        return this;
    }

    public void setIdExemplaire(UUID idExemplaire) {
        this.idExemplaire = idExemplaire;
    }

    public Boolean isDisponibilite() {
        return disponibilite;
    }

    public Exemplaire disponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
        return this;
    }

    public void setDisponibilite(Boolean disponibilite) {
        this.disponibilite = disponibilite;
    }

    public Integer getIdLivre() {
        return idLivre;
    }

    public Exemplaire idLivre(Integer idLivre) {
        this.idLivre = idLivre;
        return this;
    }

    public void setIdLivre(Integer idLivre) {
        this.idLivre = idLivre;
    }

    public Livre getLivre() {
        return livre;
    }

    public Exemplaire livre(Livre livre) {
        this.livre = livre;
        return this;
    }

    public void setLivre(Livre livre) {
        this.livre = livre;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Exemplaire)) {
            return false;
        }
        return id != null && id.equals(((Exemplaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Exemplaire{" +
            "id=" + getId() +
            ", idExemplaire='" + getIdExemplaire() + "'" +
            ", disponibilite='" + isDisponibilite() + "'" +
            ", idLivre=" + getIdLivre() +
            "}";
    }
}
