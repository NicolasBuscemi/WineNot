document.addEventListener("DOMContentLoaded", async function () {
    const wineNotContainer = document.createElement('div');
    wineNotContainer.className = 'wine-not-container';
    wineNotContainer.innerHTML = '<h1>WINE NOT</h1>';
    document.body.appendChild(wineNotContainer);

    const loadingElement = document.getElementById('loading');

    async function fetchWines(type) {
        try {
            const response = await fetch(`https://api.sampleapis.com/wines/${type}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${type} wines`);
            }
            return response.json();
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    async function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function fetchAllWines() {
        try {
            const reds = await fetchWines('reds');
            await delay(1000);
            const whites = await fetchWines('whites');
            await delay(1000);
            const roses = await fetchWines('rose');
            await delay(1000);
            const bubbles = await fetchWines('sparkling');
            await delay(1000);
            const desserts = await fetchWines('dessert');

            return {
                reds,
                whites,
                roses,
                bubbles,
                desserts
            };
        } catch (error) {
            console.error('Error fetching wines:', error);
            return {};
        }
    }

    const {
        reds,
        whites,
        roses,
        bubbles,
        desserts
    } = await fetchAllWines();
    const wineContainer = document.querySelector('.wine-container');

    function createWineEntry(wine, type) {
        const wineEntry = document.createElement('div');
        wineEntry.classList.add('wine-entry');
        wineEntry.dataset.type = type;
        wineEntry.dataset.region = wine.location || 'Unknown';
        wineEntry.dataset.winery = wine.winery || 'Unknown Winery';
        wineEntry.dataset.year = wine.year || 'Unknown Year';
        wineEntry.innerHTML = `
            <div class="wine-info">
                <h3>${wine.wine}</h3>
            </div>
            <div class="wine-image">
                <img src="${wine.image || 'path/to/placeholder.png'}" alt="${wine.wine}">
            </div>
        `;
        wineEntry.addEventListener('click', () => openModal(wine, type));
        return wineEntry;
    }

    function renderWines(wines, type) {
        wineContainer.innerHTML = '';
        if (wines) {
            wines.forEach(wine => wineContainer.appendChild(createWineEntry(wine, type)));
        }
    }

    async function fetchReviews(wineId) {
        try {
            const response = await fetch(`http://localhost:3001/api/wine-reviews/${wineId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            return response.json();
        } catch (error) {
            console.error(error.message);
            return [];
        }
    }

    function displayReviews(reviews, container) {
        const reviewsContainer = document.createElement('div');
        reviewsContainer.className = 'reviews-container';
    
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <div class="username">${review.userId.username}</div>
                <div class="rating">${'★'.repeat(review.rating)}</div>
                <div class="review-text">${review.review}</div>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    
        container.appendChild(reviewsContainer);
    }

    async function openModal(wine, type) {
        const modal = document.getElementById("wineModal");
        const modalContent = modal.querySelector(".modal-content");

        modalContent.innerHTML = `
            <div class="modal-header">
                <div class="modal-text">
                    <h2 id="modalWineName">${wine.wine}</h2>
                    <div id="modalWineType">${type}</div>
                    <div id="modalWineRegion">${wine.location || 'Unknown'}</div>
                    <div id="modalWineWinery">${wine.winery || 'Unknown Winery'}</div>
                    <div id="modalWineRating">${wine.rating.average || 'N/A'}/5</div>
                    <button id="add-review-button" class="btn">Add Review</button>
                    <form id="review-form" style="display: none;">
                        <textarea id="review-text" placeholder="Write your review here" required></textarea>
                        <label for="rating"></label>
                        <input type="number" id="rating" min="1" max="5" required>
                        <button type="submit">SUBMIT</button>
                    </form>
                </div>
                <div class="modal-image">
                    <img id="modalWineImage" src="${wine.image || 'path/to/placeholder.png'}" alt="${wine.wine}">
                </div>
            </div>
            <span class="close-button">&times;</span>
        `;

        modal.style.display = "block";

        const reviewsContainer = document.querySelector(".reviews-container");
        reviewsContainer.innerHTML = ''; // Clear previous reviews

        const reviews = await fetchReviews(wine.id);
        displayReviews(reviews, reviewsContainer);

        const addReviewButton = modal.querySelector('#add-review-button');
        const reviewForm = modal.querySelector('#review-form');
        const userData = JSON.parse(localStorage.getItem('userData'));

        addReviewButton.addEventListener('click', () => {
            if (!userData || !userData.token) {
                alert('You need to be logged in to add a review.');
                return;
            }
            reviewForm.style.display = 'block';
            addReviewButton.style.display = 'none';
        });

        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const reviewText = document.getElementById('review-text').value;
            const rating = document.getElementById('rating').value;

            try {
                const response = await fetch('http://localhost:3001/api/wine-reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`
                    },
                    body: JSON.stringify({
                        wineId: wine.id,
                        rating: rating,
                        review: reviewText
                    }),
                });

                if (response.ok) {
                    alert('Review added successfully');
                    const newReview = await response.json();
                    displayReviews([newReview], reviewsContainer);
                    reviewForm.reset();
                    reviewForm.style.display = 'none';
                    addReviewButton.style.display = 'block';
                } else {
                    const errorResponse = await response.json();
                    console.error('Failed to add review:', errorResponse);
                }
            } catch (error) {
                console.error('Error adding review:', error);
            }
        });

        modal.querySelector(".close-button").addEventListener("click", () => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Enable scrolling again
            modal.style.backgroundColor = ''; // Reset background color
        });

        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'; // Set modal background color
    }

    const modal = document.getElementById("wineModal");

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto'; // Enable scrolling again
            modal.style.backgroundColor = ''; // Reset background color
        }
    });

    const filterButtons = document.querySelectorAll(".filter-btn");

    function filterWinesAndColor(button) {
        const filterType = button.dataset.value;

        switch (filterType) {
            case 'red':
                document.body.style.backgroundColor = 'var(--red-color)';
                renderWines(reds, 'red');
                break;
            case 'white':
                document.body.style.backgroundColor = 'var(--white-color)';
                renderWines(whites, 'white');
                break;
            case 'rose':
                document.body.style.backgroundColor = 'var(--rose-color)';
                renderWines(roses, 'rose');
                break;
            case 'bubbles':
                document.body.style.backgroundColor = 'var(--bubbles-color)';
                renderWines(bubbles, 'bubbles');
                break;
            case 'dessert':
                document.body.style.backgroundColor = 'var(--dessert-color)';
                renderWines(desserts, 'dessert');
                break;
            default:
                document.body.style.backgroundColor = 'white';
                renderWines(reds, 'red');
                break;
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterWinesAndColor(button);
        });
    });
      
    // Set initial filter to red
    filterWinesAndColor(filterButtons[0]);

    loadingElement.style.display = 'none';
});
