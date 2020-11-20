package com.ynov.biblio.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.UUID;

/**
 * A Autheur.
 */
@Entity
@Table(name = "autheur")
public class Autheur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "id_autheur", nullable = false)
    private UUID idAutheur;

    @Column(name = "autheur")
    private String autheur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UUID getIdAutheur() {
        return idAutheur;
    }

    public Autheur idAutheur(UUID idAutheur) {
        this.idAutheur = idAutheur;
        return this;
    }

    public void setIdAutheur(UUID idAutheur) {
        this.idAutheur = idAutheur;
    }

    public String getAutheur() {
        return autheur;
    }

    public Autheur autheur(String autheur) {
        this.autheur = autheur;
        return this;
    }

    public void setAutheur(String autheur) {
        this.autheur = autheur;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Autheur)) {
            return false;
        }
        return id != null && id.equals(((Autheur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Autheur{" +
            "id=" + getId() +
            ", idAutheur='" + getIdAutheur() + "'" +
            ", autheur='" + getAutheur() + "'" +
            "}";
    }
}
