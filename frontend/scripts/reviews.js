document.addEventListener("DOMContentLoaded", () => {
    const reviewForm = document.getElementById('review-form');
    const updateReviewForm = document.getElementById('update-review-form');
    const reviewList = document.getElementById('review-list');
    const API_URL = 'http://localhost:3001/api/reviews';
    let currentReviewId = null;

    const token = localStorage.getItem('token');

    if (!token) {
        reviewForm.style.display = 'none';
        updateReviewForm.style.display = 'none';
        document.getElementById('login-prompt').style.display = 'block';
        return;
    }

    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const wineName = document.getElementById('wine-name').value;
        const year = parseInt(document.getElementById('year').value, 10);
        const type = document.getElementById('type').value;
        const region = document.getElementById('region').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const review = document.getElementById('review').value;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: wineName,
                    year,
                    type,
                    region,
                    rating,
                    review
                }),
            });

            if (response.ok) {
                fetchReviews();
                reviewForm.reset();
            } else {
                console.error('Failed to add review:', await response.json());
            }
        } catch (error) {
            console.error('Error adding review:', error);
        }
    });

    const fetchReviews = async () => {
        try {
            const response = await fetch(API_URL);
            const reviews = await response.json();
            reviewList.innerHTML = ''; // Clear existing reviews

            reviews.forEach(review => {
                const li = document.createElement('li');
                li.className = 'review-item';
                li.innerHTML = `
                    <div class="review-header">
                        <div class="top-left">
                            <h3 class="wine-name">${review.name} (${review.year})</h3>
                        </div>
                        <div class="top-right">
                            <div class="star-rating">${'★'.repeat(review.rating)}</div>
                        </div>
                    </div>
                    <p class="review-text">${review.review}</p>
                    <p class="wine-info">Type: ${review.type}, Region: ${review.region}</p>
                    <div class="review-actions">
                        <button class="update-button" onclick="showUpdateForm('${review._id}', '${review.name}', ${review.year}, '${review.type}', '${review.region}', ${review.rating}, '${review.review}')">
                            Update
                        </button>
                        <button class="delete-button" onclick="deleteReview('${review._id}')">
                            Delete
                        </button>
                    </div>
                `;
                reviewList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    window.showUpdateForm = (id, name, year, type, region, rating, review) => {
        currentReviewId = id;
        document.getElementById('update-wine-name').value = name;
        document.getElementById('update-year').value = year;
        document.getElementById('update-type').value = type;
        document.getElementById('update-region').value = region;
        document.querySelector(`input[name="update-rating"][value="${rating}"]`).checked = true;
        document.getElementById('update-review').value = review;

        updateReviewForm.style.display = 'block';
        reviewForm.style.display = 'none';
    };

    updateReviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('update-wine-name').value;
        const year = parseInt(document.getElementById('update-year').value, 10);
        const type = document.getElementById('update-type').value;
        const region = document.getElementById('update-region').value;
        const rating = document.querySelector('input[name="update-rating"]:checked').value;
        const review = document.getElementById('update-review').value;

        try {
            const response = await fetch(`${API_URL}/${currentReviewId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    year,
                    type,
                    region,
                    rating,
                    review
                }),
            });

            if (response.ok) {
                fetchReviews();
                updateReviewForm.reset();
                updateReviewForm.style.display = 'none';
                reviewForm.style.display = 'block';
            } else {
                console.error('Failed to update review:', await response.json());
            }
        } catch (error) {
            console.error('Error updating review:', error);
        }
    });

    window.deleteReview = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchReviews();
            } else {
                console.error('Failed to delete review:', await response.json());
            }
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    fetchReviews(); // Initial fetch of reviews
});
