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



// ///////////
document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('news-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const yearSelector = document.getElementById('year');
    const newsPopup = document.getElementById('news-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupImage = document.getElementById('popup-image');
    const popupDescription = document.getElementById('popup-description');
    let currentPage = 1;
    const pageSize = 12;
    let allNews = [];

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
    
            // Truncate description to show only a few lines
            const truncatedDescription = item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description;
    
            // Conditionally add the link if it exists
            const linkHTML = item.link ? `<a href="${item.link}" target="_blank">Follow Link</a>` : '';
    
            newsItem.innerHTML = `
                <img src="${item.image}" alt="News Image">
                <div class="news-description">
                    <h2>${item.dateAndPlace}</h2>
                    <p>${truncatedDescription}</p>
                    ${linkHTML}
                </div>
            `;
    
            newsItem.addEventListener('click', () => {
                popupTitle.textContent = item.dateAndPlace;
                popupImage.src = item.image;
                popupDescription.innerHTML = item.description + (item.link ? `<br><br><a href="${item.link}" target="_blank">Follow Link</a>` : '');
                newsPopup.style.display = 'block';
            });
            newsContainer.appendChild(newsItem);
        });
    };
    
    

    const loadNews = async () => {
        allNews = await fetchNews();
        const years = Array.from(new Set(allNews.map(item => item.year))).sort().reverse();

        // Populate the year selector with unique years
        yearSelector.innerHTML = years.map(year => `<option value="${year}">${year}</option>`).join('');
        if (years.length > 0) {
            displayNewsForYear(years[0]); // Display news for the latest year by default
        }
    };

    const displayNewsForYear = (year) => {
        currentPage = 1; // Reset to first page
        const filteredNews = allNews.filter(item => item.year == year);
        renderNews(filteredNews, currentPage);
    };

    prevPageButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayNewsForYear(yearSelector.value);
        }
    });

    nextPageButton.addEventListener('click', (event) => {
        event.preventDefault();
        currentPage++;
        displayNewsForYear(yearSelector.value);
    });

    // Event listener for year selector
    yearSelector.addEventListener('change', () => {
        displayNewsForYear(yearSelector.value);
    });

    // Close the popup when the user clicks on <span> (x)
    document.querySelector('.news-popup .close').addEventListener('click', () => {
        newsPopup.style.display = 'none';
    });

    // Close the popup when the user clicks anywhere outside of the modal
    window.addEventListener('click', (event) => {
        if (event.target === newsPopup) {
            newsPopup.style.display = 'none';
        }
    });

    // Initial load
    loadNews();
});



// For the News Center
// document.addEventListener('DOMContentLoaded', () => {
//     const newsContainer = document.getElementById('news-container');
//     const prevPageButton = document.getElementById('prev-page');
//     const nextPageButton = document.getElementById('next-page');
//     let currentPage = 1;
//     const pageSize = 12;

//     const fetchNews = async () => {
//         try {
//             const response = await fetch('news.json');
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             return data;
//         } catch (error) {
//             console.error('Error fetching news:', error);
//             return [];
//         }
//     };

//     const renderNews = (news, page) => {
//         newsContainer.innerHTML = '';
//         const startIndex = (page - 1) * pageSize;
//         const endIndex = startIndex + pageSize;
//         const paginatedNews = news.slice(startIndex, endIndex);

//         paginatedNews.forEach(item => {
//             const newsItem = document.createElement('div');
//             newsItem.className = 'news-item';
//             newsItem.innerHTML = `
//                 <img src="${item.image}" alt="News Image">
//                 <div class="news-description">
//                     <h2>${item.title}</h2>
//                     <h6>${item.dateAndPlace}</h6>
//                     <p>${item.description}</p>
//                 </div>
//             `;
//             newsContainer.appendChild(newsItem);
//         });
//     };

//     const loadNews = async () => {
//         const news = await fetchNews();
//         renderNews(news, currentPage);
//     };

//     prevPageButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         if (currentPage > 1) {
//             currentPage--;
//             loadNews();
//         }
//     });

//     nextPageButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         currentPage++;
//         loadNews();
//     });

//     // Initial load
//     loadNews();
// });
