package com.ynov.biblio.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ynov.biblio.web.rest.TestUtil;

public class AutheurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Autheur.class);
        Autheur autheur1 = new Autheur();
        autheur1.setId(1L);
        Autheur autheur2 = new Autheur();
        autheur2.setId(autheur1.getId());
        assertThat(autheur1).isEqualTo(autheur2);
        autheur2.setId(2L);
        assertThat(autheur1).isNotEqualTo(autheur2);
        autheur1.setId(null);
        assertThat(autheur1).isNotEqualTo(autheur2);
    }
}
