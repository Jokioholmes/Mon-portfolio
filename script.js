// 1. CARROUSEL TÉMOIGNAGES
// Permet de faire défiler les témoignages avec les boutons précédent/suivant
let diapositiveActuelle = 0;
const diapositives = document.querySelectorAll('.Premier-témoignage, .second-Témoignages');
const boutonPrecedent = document.querySelector('.bouton-precedent');
const boutonSuivant = document.querySelector('.bouton-suivant');

function afficherDiapositive(index) {
    diapositives.forEach(diapo => diapo.classList.remove('actif'));
    diapositives[index].classList.add('actif');
}

// Afficher le premier témoignage au chargement de la page
if (diapositives.length > 0) {
    diapositives[0].classList.add('actif');
}

// Événements de clic sur les boutons du carrousel
if (boutonSuivant && boutonPrecedent && diapositives.length > 0) {
    boutonSuivant.addEventListener('click', () => {
        diapositiveActuelle = (diapositiveActuelle + 1) % diapositives.length;
        afficherDiapositive(diapositiveActuelle);
    });

    boutonPrecedent.addEventListener('click', () => {
        diapositiveActuelle = (diapositiveActuelle - 1 + diapositives.length) % diapositives.length;
        afficherDiapositive(diapositiveActuelle);
    });
}


// 2. VALIDATION DU FORMULAIRE DE CONTACT
// Vérifie que tous les champs sont correctement remplis avant l'envoi
function validerFormulaire(event) {
    event.preventDefault();

    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const telephone = document.getElementById('telephone');
    const message = document.getElementById('message');

    const erreurNom = document.getElementById('erreur-nom');
    const erreurEmail = document.getElementById('erreur-email');
    const erreurTelephone = document.getElementById('erreur-telephone');
    const erreurMessage = document.getElementById('erreur-message');

    // Réinitialiser les messages d'erreur
    erreurNom.textContent = '';
    erreurEmail.textContent = '';
    erreurTelephone.textContent = '';
    erreurMessage.textContent = '';

    // Réinitialiser les classes de validation
    nom.classList.remove('champ-invalide', 'champ-valide');
    email.classList.remove('champ-invalide', 'champ-valide');
    telephone.classList.remove('champ-invalide', 'champ-valide');
    message.classList.remove('champ-invalide', 'champ-valide');

    let valide = true;

    // Validation du nom (minimum 2 caractères)
    if (nom.value.trim() === '') {
        erreurNom.textContent = 'Le nom est obligatoire';
        nom.classList.add('champ-invalide');
        valide = false;
    } else if (nom.value.trim().length < 2) {
        erreurNom.textContent = 'Le nom doit contenir au moins 2 caractères';
        nom.classList.add('champ-invalide');
        valide = false;
    } else {
        nom.classList.add('champ-valide');
    }

    // Validation de l'email (format valide)
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === '') {
        erreurEmail.textContent = "L'email est obligatoire";
        email.classList.add('champ-invalide');
        valide = false;
    } else if (!regexEmail.test(email.value)) {
        erreurEmail.textContent = 'Veuillez entrer un email valide';
        email.classList.add('champ-invalide');
        valide = false;
    } else {
        email.classList.add('champ-valide');
    }

    // Validation du téléphone 
    if (telephone.value.trim() !== '') {
        const regexTelephone = /^[0-9\s+()-]{8,}$/;
        if (!regexTelephone.test(telephone.value)) {
            erreurTelephone.textContent = 'Numéro de téléphone invalide';
            telephone.classList.add('champ-invalide');
            valide = false;
        } else {
            telephone.classList.add('champ-valide');
        }
    }

    // Validation du message (minimum 10 caractères)
    if (message.value.trim() === '') {
        erreurMessage.textContent = 'Le message est obligatoire';
        message.classList.add('champ-invalide');
        valide = false;
    } else if (message.value.trim().length < 10) {
        erreurMessage.textContent = 'Le message doit contenir au moins 10 caractères';
        message.classList.add('champ-invalide');
        valide = false;
    } else {
        message.classList.add('champ-valide');
    }

    // Envoyer le formulaire si tout est valide
    if (valide) {
        alert('Formulaire valide ! Votre message va être envoyé.');
        event.target.submit();
    } else {
        alert('Veuillez corriger les erreurs avant d\'envoyer.');
    }

    return false;
}

// 3. ANIMATION D'APPARITION AU SCROLL
// Les sections apparaissent progressivement quand on scroll vers elles
function animerAuScroll() {
    const elements = document.querySelectorAll('.animer-scroll');

    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            element.classList.add('apparait');
        }
    });
}

// Déclencher l'animation au scroll et au chargement de la page
window.addEventListener('scroll', animerAuScroll);
window.addEventListener('load', animerAuScroll);

// 4. COMPTEUR ANIMÉ POUR LES STATISTIQUES
// Les chiffres montent progressivement de 0 à leur valeur finale
function animerCompteur(element, fin, duree) {
    let debut = 0;
    const increment = fin / (duree / 16);

    function compter() {
        debut += increment;
        if (debut < fin) {
            element.textContent = Math.floor(debut) + '+';
            requestAnimationFrame(compter);
        } else {
            element.textContent = fin + '+';
        }
    }

    compter();
}

// Observer qui déclenche l'animation quand la section stats est visible
const observerCompteur = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h5Elements = entry.target.querySelectorAll('.stat-item h5');
            if (h5Elements.length >= 3) {
                // Réinitialiser à 0
                h5Elements[0].textContent = '0+';
                h5Elements[1].textContent = '0+';
                h5Elements[2].textContent = '0+';

                // Animer jusqu'aux valeurs finales
                animerCompteur(h5Elements[0], 10, 2000);  // 10 projets
                animerCompteur(h5Elements[1], 5, 2000);   // 5 ans
                animerCompteur(h5Elements[2], 3, 2000);   // 3 clients

                // Ne plus observer après animation
                observerCompteur.unobserve(entry.target);
            }
        }
    });
});
// Démarrer l'observation de la section stats
const statSection = document.querySelector('.stat');
if (statSection) {
    observerCompteur.observe(statSection);
}


// 5. ANIMATION DES BARRES DE COMPÉTENCES
// Les barres se remplissent progressivement de gauche à droite
const observerCompetences = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const barres = entry.target.querySelectorAll('.progrès');
            barres.forEach(barre => {
                const largeur = barre.style.width;
                barre.style.width = '0';
                setTimeout(() => {
                    barre.style.width = largeur;
                }, 100);
            });
            observerCompetences.unobserve(entry.target);
        }
    });
});

// Démarrer l'observation de la section compétences
const competencesSection = document.querySelector('.compétences');
if (competencesSection) {
    observerCompetences.observe(competencesSection);
}

// 6. BOUTON RETOUR EN HAUT
// Affiche un bouton pour remonter en haut de la page après 300px de scroll
const boutonHaut = document.getElementById('bouton-haut');
if (boutonHaut) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            boutonHaut.classList.add('visible');
        } else {
            boutonHaut.classList.remove('visible');
        }
    });

    boutonHaut.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


// 7. EFFET 3D SUR LES CARTES DE PROJETS//
document.querySelectorAll('.realisations .card').forEach(carte => {
    carte.addEventListener('mousemove', (e) => {
        const rect = carte.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculer la rotation en fonction de la position de la souris
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        carte.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    // Réinitialiser quand la souris quitte la carte
    carte.addEventListener('mouseleave', () => {
        carte.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
