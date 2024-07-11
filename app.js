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

// document.addEventListener('DOMContentLoaded', function () {
//     const links = document.querySelectorAll('.dropdown-link');
//     const columns = document.querySelectorAll('.menu-dropdown-column');

//     links.forEach(link => {
//         link.addEventListener('mouseover', function (event) {
//             event.preventDefault();
//             const target = this.getAttribute('data-detail');
//             // console.log('Target:', target); // Check if target is correctly retrieved
//             columns.forEach(column => {
//                 column.classList.remove('active');
//                 console.log('id:', column.id);
//                 if (column.id == `${target}-details`) {
//                     column.classList.add('active');
//                 }
//             });
//         });
//     });
// });


// THIS IS USED TO DISPLAY THE DETAILS//
//ON THE RIGHT SIDE 0F THE DROPDOWN MENU//

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.dropdown-link');
    const details = document.querySelectorAll('.nav-details');

    links.forEach(link => {
        link.addEventListener('mouseover', function (event) {
            event.preventDefault();
            const target = this.getAttribute('data-detail');
            console.log('Target:', target);

            // Hide all details initially
            details.forEach(detail => {
                detail.classList.remove('active');
            });
        

            // Show the detail corresponding to the target
            const targetDetail = document.getElementById(`${target}-details`);
            if (targetDetail) {
                targetDetail.classList.add('active');
            }
        });
    });
});




