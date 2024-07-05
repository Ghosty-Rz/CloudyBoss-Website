const menuIcon = document.querySelector('#menu-icon');
const closeIcon = document.querySelector('#close-icon');
const menuLinks = document.querySelector('.navbar_menu');
const body = document.querySelector('body');

const mobileMenu = () => {
    menuLinks.classList.toggle('active');
    body.classList.toggle('active');
}

menuIcon.addEventListener('click', mobileMenu);
closeIcon.addEventListener('click', mobileMenu);

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.dropdown-link');
    const detailSections = document.querySelectorAll('.detail-section');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const target = this.getAttribute('data-detail');
            detailSections.forEach(section => {
                if (section.id === target) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
});
