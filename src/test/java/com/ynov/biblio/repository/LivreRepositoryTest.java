package com.ynov.biblio.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ynov.biblio.ProjetBibliothequeApp;
import com.ynov.biblio.domain.Livre;

@SpringBootTest(classes = ProjetBibliothequeApp.class)
public class LivreRepositoryTest {

	@Autowired
	LivreRepository livreRepository;

	@Test
	void findAllWhenSave() {
		// given
		Livre livre = new Livre();

		UUID idLivre = UUID.randomUUID();
		;
		livre.setIdLivre(idLivre);

		livreRepository.save(livre);

		// when
		List<Livre> findAllWithEagerRelationships = livreRepository.findAllWithEagerRelationships();

		// then
		assertEquals(livre.getIdLivre(), findAllWithEagerRelationships.get(0).getIdLivre());

	}

}
