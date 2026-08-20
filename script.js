const listeArtistes = [
  { initiales: "AF", nom: "Les Ambianceurs du Fleuve", role: "Musique — Rumba & Folk", categorie: "musique", couleur: "#d1703f" },
  { initiales: "MV", nom: "Mabiala Voice", role: "Musique — Afrobeat Acoustique", categorie: "musique", couleur: "#4f7a5b" },
  { initiales: "BH", nom: "Bantu Horizon", role: "Musique — Fusion Traditionnelle", categorie: "musique", couleur: "#8a5a3f" },
  { initiales: "GS", nom: "La Griffe Sapologique", role: "Mode — Collectif de créateurs de Brazzaville", categorie: "mode", couleur: "#b25a2f" },
  { initiales: "EB", nom: "Élégance de Bacongo", role: "Mode — Maison de couture artisanale", categorie: "mode", couleur: "#c9542f" },
  { initiales: "TC", nom: "Tsimba Couture", role: "Mode — Styliste & Modéliste d'art", categorie: "mode", couleur: "#a8763f" },
  { initiales: "LK", nom: "Collectif Lumen Kongo", role: "Art Lumineux — Installations géantes", categorie: "art-lumineux", couleur: "#3f6a7a" },
  { initiales: "KF", nom: "Kongo Frequency", role: "Art Lumineux — Mapping & Vidéo d'art", categorie: "art-lumineux", couleur: "#6a4f8a" },
  { initiales: "NW", nom: "Ndeko Wax", role: "Artisanat — Sculpture & Tissage", categorie: "artisanat", couleur: "#7a5a3f" }
];

// Photos fictives générées (avatars illustrés, aucun artiste n'est une personne réelle)
function urlAvatarFictif(nom, couleur) {
  const graine = encodeURIComponent(nom);
  const teinte = encodeURIComponent(couleur.replace("#", ""));
  return `https://api.dicebear.com/8.x/personas/svg?seed=${graine}&backgroundColor=${teinte}`;
}

const dateFestival = new Date("2026-12-12T00:00:00");

function demarrerCompteARebours() {
  const noeudJours = document.getElementById("valeurJours");
  const noeudHeures = document.getElementById("valeurHeures");
  const noeudMinutes = document.getElementById("valeurMinutes");
  const noeudSecondes = document.getElementById("valeurSecondes");
  if (!noeudJours || !noeudHeures || !noeudMinutes || !noeudSecondes) return;

  function mettreAJour() {
    const maintenant = new Date();
    const ecartMs = dateFestival - maintenant;

    if (ecartMs <= 0) {
      noeudJours.textContent = "0";
      noeudHeures.textContent = "0";
      noeudMinutes.textContent = "0";
      noeudSecondes.textContent = "0";
      return;
    }

    const jours = Math.floor(ecartMs / (1000 * 60 * 60 * 24));
    const heures = Math.floor((ecartMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ecartMs % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((ecartMs % (1000 * 60)) / 1000);

    noeudJours.textContent = jours;
    noeudHeures.textContent = heures;
    noeudMinutes.textContent = minutes;
    noeudSecondes.textContent = secondes;
  }

  mettreAJour();
  setInterval(mettreAJour, 1000);
}

function initialiserMenuMobile() {
  const bouton = document.getElementById("basculeMenu");
  const navigation = document.getElementById("navigation");
  if (!bouton || !navigation) return;

  bouton.addEventListener("click", () => {
    const estOuvert = navigation.classList.toggle("navigation--ouverte");
    bouton.setAttribute("aria-expanded", String(estOuvert));
    bouton.classList.toggle("bascule-menu--actif", estOuvert);
  });

  navigation.querySelectorAll("a").forEach((lien) => {
    lien.addEventListener("click", () => {
      navigation.classList.remove("navigation--ouverte");
      bouton.setAttribute("aria-expanded", "false");
    });
  });
}

function initialiserEnteteAuScroll() {
  const entete = document.getElementById("entete");
  if (!entete) return;

  function verifierScroll() {
    entete.classList.toggle("entete--flottant", window.scrollY > 12);
  }

  verifierScroll();
  window.addEventListener("scroll", verifierScroll, { passive: true });
}

function initialiserAnimationsAuDefilement() {
  const elements = document.querySelectorAll("[data-anim]");
  if (!elements.length) return;

  const observateur = new IntersectionObserver(
    (entrees) => {
      entrees.forEach((entree) => {
        if (entree.isIntersecting) {
          entree.target.classList.add("anim-visible");
          observateur.unobserve(entree.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observateur.observe(element));
}

function initialiserOngletsJours() {
  const conteneurOnglets = document.getElementById("ongletsJours");
  if (!conteneurOnglets) return;

  const onglets = conteneurOnglets.querySelectorAll(".onglet-jour");

  onglets.forEach((onglet) => {
    onglet.addEventListener("click", () => {
      const cibleId = onglet.getAttribute("data-cible");

      onglets.forEach((autre) => {
        autre.classList.remove("onglet-jour--actif");
        autre.setAttribute("aria-selected", "false");
      });
      onglet.classList.add("onglet-jour--actif");
      onglet.setAttribute("aria-selected", "true");

      document.querySelectorAll(".journee").forEach((journee) => {
        const estActive = journee.id === cibleId;
        journee.hidden = !estActive;
        journee.classList.toggle("journee--active", estActive);
      });
    });
  });
}

function initialiserAccordeon() {
  const accordeon = document.getElementById("accordeon");
  if (!accordeon) return;

  accordeon.querySelectorAll(".accordeon__question").forEach((question) => {
    question.addEventListener("click", () => {
      const estOuvert = question.getAttribute("aria-expanded") === "true";

      accordeon.querySelectorAll(".accordeon__question").forEach((autre) => {
        autre.setAttribute("aria-expanded", "false");
      });

      question.setAttribute("aria-expanded", String(!estOuvert));
    });
  });
}

function construireListeArtistes() {
  const conteneur = document.getElementById("listeArtistes");
  if (!conteneur) return;

  const fragment = document.createDocumentFragment();

  listeArtistes.forEach((artiste) => {
    const element = document.createElement("li");
    element.className = "artiste";
    element.setAttribute("data-categorie", artiste.categorie);
    element.innerHTML = `
      <span class="artiste__photo" style="background:${artiste.couleur}22">
        <img src="${urlAvatarFictif(artiste.nom, artiste.couleur)}" alt="Portrait fictif de ${artiste.nom}" loading="lazy">
      </span>
      <span class="artiste__details">
        <span class="artiste__nom">${artiste.nom}</span>
        <span class="artiste__role">${artiste.role}</span>
      </span>
    `;
    fragment.appendChild(element);
  });

  conteneur.appendChild(fragment);
}

function initialiserFiltresArtistes() {
  const conteneurFiltres = document.getElementById("filtresArtistes");
  const conteneurArtistes = document.getElementById("listeArtistes");
  if (!conteneurFiltres || !conteneurArtistes) return;

  conteneurFiltres.querySelectorAll(".filtre-artiste").forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const categorie = bouton.getAttribute("data-categorie");

      conteneurFiltres.querySelectorAll(".filtre-artiste").forEach((autre) => {
        autre.classList.remove("filtre-artiste--actif");
        autre.setAttribute("aria-pressed", "false");
      });
      bouton.classList.add("filtre-artiste--actif");
      bouton.setAttribute("aria-pressed", "true");

      conteneurArtistes.querySelectorAll(".artiste").forEach((carte) => {
        const correspond = categorie === "toutes" || carte.getAttribute("data-categorie") === categorie;
        carte.classList.toggle("artiste--masque", !correspond);
      });
    });
  });
}

function initialiserReservationWhatsapp() {
  const numeroWhatsapp = "242000000000";

  document.querySelectorAll("[data-pass]").forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const nomPass = bouton.getAttribute("data-pass");
      const prixPass = bouton.getAttribute("data-prix");
      const message = encodeURIComponent(
        `Bonjour, je souhaite réserver le ${nomPass} (${prixPass}) pour le festival Sapé Lumière.`
      );
      window.open(`https://wa.me/${numeroWhatsapp}?text=${message}`, "_blank");
    });
  });
}

function validerNom(valeur) {
  return valeur.trim().length >= 2 ? "" : "Merci d'indiquer votre nom complet.";
}

function validerEmail(valeur) {
  const motif = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return motif.test(valeur.trim()) ? "" : "Merci d'indiquer une adresse email valide.";
}

function validerMessage(valeur) {
  return valeur.trim().length >= 10 ? "" : "Votre message doit contenir au moins 10 caractères.";
}

function afficherErreurChamp(champId, erreurId, messageErreur) {
  const champ = document.getElementById(champId);
  const noeudErreur = document.getElementById(erreurId);
  const conteneurChamp = champ.closest(".champ");

  noeudErreur.textContent = messageErreur;
  conteneurChamp.classList.toggle("champ--invalide", Boolean(messageErreur));
}

function initialiserFormulaireContact() {
  const formulaire = document.getElementById("formulaireContact");
  if (!formulaire) return;

  const boutonEnvoyer = document.getElementById("boutonEnvoyer");
  const statut = document.getElementById("statutFormulaire");

  formulaire.addEventListener("submit", (evenement) => {
    evenement.preventDefault();

    const champNom = document.getElementById("champNom");
    const champEmail = document.getElementById("champEmail");
    const champMessage = document.getElementById("champMessage");

    const erreurNom = validerNom(champNom.value);
    const erreurEmail = validerEmail(champEmail.value);
    const erreurMessage = validerMessage(champMessage.value);

    afficherErreurChamp("champNom", "erreurNom", erreurNom);
    afficherErreurChamp("champEmail", "erreurEmail", erreurEmail);
    afficherErreurChamp("champMessage", "erreurMessage", erreurMessage);

    if (erreurNom || erreurEmail || erreurMessage) {
      statut.textContent = "Merci de corriger les champs indiqués en rouge.";
      statut.className = "formulaire-contact__statut formulaire-contact__statut--erreur";
      return;
    }

    const texteInitial = boutonEnvoyer.querySelector(".bouton__texte").textContent;
    boutonEnvoyer.disabled = true;
    boutonEnvoyer.querySelector(".bouton__texte").textContent = "Envoi en cours...";
    statut.textContent = "";
    statut.className = "formulaire-contact__statut";

    setTimeout(() => {
      boutonEnvoyer.disabled = false;
      boutonEnvoyer.querySelector(".bouton__texte").textContent = texteInitial;
      statut.textContent = "Votre message a bien été envoyé. Nous revenons vers vous rapidement.";
      statut.className = "formulaire-contact__statut formulaire-contact__statut--succes";
      formulaire.reset();
    }, 1100);
  });
}

function genererPointsLumiere() {
  const groupe = document.getElementById("nuagePoints");
  if (!groupe) return;

  const nombreDePoints = 22;

  for (let indice = 0; indice < nombreDePoints; indice += 1) {
    const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const positionX = 20 + Math.random() * 440;
    const positionY = 20 + Math.random() * 220;
    const rayon = 1.2 + Math.random() * 2.2;
    const dureeAnimation = 3 + Math.random() * 4;
    const delaiAnimation = Math.random() * 4;

    point.setAttribute("cx", positionX.toFixed(1));
    point.setAttribute("cy", positionY.toFixed(1));
    point.setAttribute("r", rayon.toFixed(1));
    point.setAttribute("class", "point-lumiere");
    point.style.animation = `scintiller ${dureeAnimation.toFixed(2)}s ease-in-out ${delaiAnimation.toFixed(2)}s infinite`;

    groupe.appendChild(point);
  }

  const feuilleStyle = document.createElement("style");
  feuilleStyle.textContent = `
    @keyframes scintiller {
      0%, 100% { opacity: 0.15; transform: translateY(0); }
      50% { opacity: 0.9; transform: translateY(-6px); }
    }
  `;
  document.head.appendChild(feuilleStyle);
}

document.addEventListener("DOMContentLoaded", () => {
  demarrerCompteARebours();
  initialiserMenuMobile();
  initialiserEnteteAuScroll();
  initialiserAnimationsAuDefilement();
  initialiserOngletsJours();
  initialiserAccordeon();
  construireListeArtistes();
  initialiserFiltresArtistes();
  initialiserReservationWhatsapp();
  initialiserFormulaireContact();
  genererPointsLumiere();
});
