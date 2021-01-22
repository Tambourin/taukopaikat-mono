import React, { useEffect } from "react";
import { Segment } from "semantic-ui-react";

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Segment>
      <h2>TIETOSUOJAKÄYTÖNTÖ</h2>
      <h3>
        Verkkosivun käyttäjistä voidaan kerätä ja tallentaa seuraavia tietoja:
      </h3>
      <ol>
        <li>
          IP-osoite, maantieteellinen sijainti, selaimen tyyppi ja versio,
          käyttöjärjestelmä.
        </li>
        <li>
          Selaustietoja, kuten mistä saavuit sivustolle, vierailun kesto,
          selatut sivut.
        </li>
        <li>
          Tiedot, jotka mahdollisesti annat sivustolle kirjautuessasi, kuten
          sähköpostiosoitteesi, nimesi, käyttäjäkuvasi, maatiedon, kielitiedon,
          aikavyöhykkeen.
        </li>
        <li>Tiedot, jotka julkaiset verkkosivustolla.</li>
      </ol>
      <h3>Henkilökohtaisia tietoja voidaan käyttää:</h3>
      <ol>
        <li>Verkkosivun hallintaan</li>
        <li>Sisällön henkilökohtaistamiseen</li>
        <li>
          Mahdollistamaan tunnistautumista vaativien ominaisuuksien käyttö
        </li>
        <li>Tilastotietojen keräämiseen</li>
        <li>Estämään palvelun väärinkäyttö</li>
        <li>Parantamaan käyttökokemusta</li>
      </ol>
      <h3>Evästeet</h3>
      <p>
        Taukopaikat.fi ja palveluntoimittajamme käytämme evästeitä
        verkkosivuillamme. Eväisteitä käytetään käyttäjäkokemuksen
        parantamiseksi käyttäessäsi verkkosivujamme. Niitä tarvitaan, jotta
        palvelumme toimivat oikein ja parhaalla mahdollisella tavalla. Sivuilla
        käytetään seuraavien palveluntarjoajien evästeitä: Google, Auth0,
        Cloudinary
      </p>
      <p>
        Sivut sisältävät linkkejä kolmansien osapuolten sivuille. Taukopaikat.fi
        ei ole vastuussa näiden sivujen sisällöstä.
      </p>
      <p>
        <b>Käyttämällä sivustoa hyväksyt tietosuojakäytännön.</b>
      </p>
    </Segment>
  );
};

export default PrivacyPage;
