document.addEventListener("DOMContentLoaded", async function () {
    // Fetch wines from multiple APIs
    async function fetchWines() {
        try {
            const endpoints = [
                { url: 'https://api.sampleapis.com/wines/reds', color: '#FF6347' },
                { url: 'https://api.sampleapis.com/wines/whites', color: '#F0F0F0' },
                { url: 'https://api.sampleapis.com/wines/rose', color: '#FFC0CB' },
                { url: 'https://api.sampleapis.com/wines/sparkling', color: '#eaf4bd' },
                { url: 'https://api.sampleapis.com/wines/dessert', color: '#94741a' }
            ];

            const fetchPromises = endpoints.map(endpoint =>
                fetch(endpoint.url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to fetch wines from ${endpoint.url}`);
                        }
                        return response.json().then(data => {
                            if (!Array.isArray(data)) {
                                throw new Error(`Invalid data format from ${endpoint.url}`);
                            }
                            return { data, color: endpoint.color };
                        });
                    })
            );

            const results = await Promise.all(fetchPromises);
            let wines = [];

            results.forEach(result => {
                const winesWithColor = result.data.map(wine => ({
                    ...wine,
                    color: result.color
                }));
                wines = wines.concat(winesWithColor);
            });

            // Filter out the wine you don't want
            const filteredWines = wines.filter(wine => wine.wine !== "WineToExclude");

            // Sort by average rating and handle undefined ratings
            return filteredWines.sort((a, b) => {
                const aRating = a.rating && a.rating.average ? a.rating.average : 0;
                const bRating = b.rating && b.rating.average ? b.rating.average : 0;
                return bRating - aRating;
            }).slice(0, 10);
        } catch (error) {
            console.error('Error fetching wines:', error);
            return [];
        }
    }

    const top10Wines = await fetchWines();

    // Check if there are wines to display
    if (top10Wines.length === 0) {
        console.error('No wines available to display');
        return;
    }

    // Populate the top 10 wines section
    const slideshowContainer = document.querySelector('.slideshow');

    function createTop10Entry(wine, index) {
        const slide = document.createElement('div');
        slide.classList.add('top10-box');
        slide.style.display = index === 0 ? 'flex' : 'none';
        slide.innerHTML = `
            <div class="top10-content">
                <div class="top10-text">
                    <h3>${wine.wine}</h3>
                    <p>Winery: ${wine.winery}</p>
                    <p>Rating: ${wine.rating && wine.rating.average ? wine.rating.average : 'N/A'}/5</p>
                    <p>Location: ${wine.location || 'Location not available'}</p>
                </div>
                <div class="top10-image" style="background-color: ${wine.color};">
                    <img src="${wine.image}" alt="${wine.wine}">
                </div>
                <div class="slide-number">${index + 1}</div>
            </div>
        `;
        return slide;
    }

    top10Wines.forEach((wine, index) => {
        slideshowContainer.appendChild(createTop10Entry(wine, index));
    });

    // Slide show functionality
    const slides = document.querySelectorAll('.top10-box');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    if (slides.length > 0 && prevButton && nextButton) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = 'none';
                if (i === index) {
                    slide.style.display = 'flex';
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        showSlide(currentSlide);
    } else {
        if (prevButton === null) console.error("Previous button not found");
        if (nextButton === null) console.error("Next button not found");
        if (slides.length === 0) console.error("No slides found");
    }

    // Smooth scroll functionality for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== "#") {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.error(`Element with ID '${href}' not found`);
                }
            }
        });
    });
});
