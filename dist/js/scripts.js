/*!
 * Start Bootstrap - SB Admin
 */

// Tout le JS s'exécute quand la page est chargée
window.addEventListener('DOMContentLoaded', () => {

    // =======================
    // 1. Toggle du side menu
    // =======================
    const sidebarToggle = document.querySelector('#sidebarToggle');

    if (sidebarToggle) {
        // remettre l'état sauvegardé (optionnel)
        const stored = localStorage.getItem('sb|sidebar-toggle') === 'true';
        if (stored) {
            document.body.classList.add('sb-sidenav-toggled');
        }

        sidebarToggle.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem(
                'sb|sidebar-toggle',
                document.body.classList.contains('sb-sidenav-toggled')
            );
        });
    }

    // =======================
    // 2. Barre de recherche
    // =======================
    const searchInput  = document.querySelector(
        'form .form-control[placeholder="Search for..."]'
    );
    const searchButton = document.getElementById('btnNavbarSearch');

    // L’iframe qui affiche le contenu
    const iframe = document.querySelector('iframe[name="mainFrame"]');

    // Tous les liens qui chargent des pages dans l’iframe
    const navLinks = document.querySelectorAll(
        '#sidenavAccordion a.nav-link[target="mainFrame"]'
    );

    function performSearch() {
        if (!searchInput) return;

        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        let matchedLink = null;

        navLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (!matchedLink && text.includes(query)) {
                matchedLink = link;
            }
        });

        if (matchedLink) {
            const url = matchedLink.getAttribute('href');

            // On charge la page trouvée dans l’iframe
            if (iframe) {
                iframe.src = url;
            } else {
                // fallback si un jour tu enlèves l’iframe
                window.location.href = url;
            }
        } else {
            alert('Aucune page trouvée pour : "' + query + '"');
        }
    }

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });

        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
});


    // ============================
    // 3. Panneau sous-menu en mode mini
    // ============================
    const miniPanel = document.getElementById('miniSubmenuPanel');

    // liens qui ouvrent un sous-menu (ceux avec data-bs-toggle="collapse")
    const parentLinks = document.querySelectorAll(
        '#sidenavAccordion a.nav-link[data-bs-toggle="collapse"]'
    );

    parentLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // On ne fait ce comportement QUE si la sidebar est en mode mini
            if (!document.body.classList.contains('sb-sidenav-toggled')) {
                return; // mode normal → Bootstrap gère
            }

            e.preventDefault();

            const target = this.getAttribute('data-bs-target'); // ex: "#collapseLayouts"
            const collapseEl = document.querySelector(target);

            if (!collapseEl) return;

            // On prend le contenu du sous-menu (les liens internes)
            const nestedNav = collapseEl.querySelector('.sb-sidenav-menu-nested');
            if (!nestedNav) return;

            // On met ce contenu dans le panneau
            miniPanel.innerHTML = nestedNav.innerHTML;
            miniPanel.classList.add('show');
        });
    });

    // Fermer le panneau quand on clique en dehors
    document.addEventListener('click', function (e) {
        if (!miniPanel.classList.contains('show')) return;

        const clickedInsideSidebar =
            e.target.closest('#layoutSidenav_nav') ||
            e.target.closest('#miniSubmenuPanel');

        if (!clickedInsideSidebar) {
            miniPanel.classList.remove('show');
        }
    });
