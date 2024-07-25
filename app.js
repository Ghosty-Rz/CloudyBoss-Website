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


// THIS IS USED TO DISPLAY THE DETAILS//
//ON THE RIGHT SIDE 0F THE DROPDOWN MENU//

document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.dropdown-link');
    const details = document.querySelectorAll('.nav-details');
    const navbarLinks = document.querySelectorAll('.navbar_link');

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

    // Toggle dropdowns on mobile
    navbarLinks.forEach(navbarLink => {
        navbarLink.addEventListener('click', function(event) {
            event.preventDefault();
            // Hide all dropdowns except the one being clicked
            navbarLinks.forEach(link => {
                if (link !== this) {
                    link.classList.remove('active');
                    const dropdownContent = link.nextElementSibling;
                    if (dropdownContent) {
                        dropdownContent.classList.remove('active');
                    }
                }
            });
            
            // Toggle the clicked dropdown
            this.classList.toggle('active');
            const dropdownContent = this.nextElementSibling;
            if (dropdownContent) {
                dropdownContent.classList.toggle('active');
            }
        });
    });
});


// For the News Center
document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    let currentPage = 1;
    const pageSize = 12;

    const fetchNews = async () => {
        try {
            const response = await fetch('news.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    };

    const renderNews = (news, page) => {
        newsContainer.innerHTML = '';
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedNews = news.slice(startIndex, endIndex);

        paginatedNews.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <img src="${item.image}" alt="News Image">
                <div class="news-description">
                    <h2>${item.title}</h2>
                    <h6>${item.dateAndPlace}</h6>
                    <p>${item.description}</p>
                </div>
            `;
            newsContainer.appendChild(newsItem);
        });
    };

    const loadNews = async () => {
        const news = await fetchNews();
        renderNews(news, currentPage);
    };

    prevPageButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            loadNews();
        }
    });

    nextPageButton.addEventListener('click', (event) => {
        event.preventDefault();
        currentPage++;
        loadNews();
    });

    // Initial load
    loadNews();
});
