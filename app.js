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
