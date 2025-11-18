/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    //
// Scripts
//

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

/*!
 * Start Bootstrap - SB Admin
 */

// Tout le JS s'exécute quand la page est chargée
window.addEventListener('DOMContentLoaded', event => {

    // =======================
    // 1. Toggle du side menu
    // =======================
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem(
                'sb|sidebar-toggle',
                document.body.classList.contains('sb-sidenav-toggled')
            );
        });
    }




    const searchInput  = document.querySelector(
        'form .form-control[placeholder="Search for..."]'
    );
    const searchButton = document.getElementById('btnNavbarSearch');


    const iframe = document.querySelector('iframe[name="mainFrame"]');


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


            if (iframe) {
                iframe.src = url;
            } else {

                window.location.href = url;
            }
        } else {
            alert('Aucune page trouvée pour : "' + query + '"');
        }
    }

    if (searchButton && searchInput) {

        searchButton.addEventListener('click', function (e) {
            e.preventDefault();
            performSearch();
        });


        searchInput.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

});
