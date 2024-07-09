document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.top10-box');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

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
});



document.addEventListener("DOMContentLoaded", function () {

    var wineEntries = document.querySelectorAll('.wine-entry');


    wineEntries.forEach(function (entry) {
        var wineImage = entry.querySelector('.wine-image img');
        var wineLink = document.createElement('a');
        wineLink.href = 'moreInfo.html';
        wineLink.appendChild(wineImage.cloneNode(true));
        entry.querySelector('.wine-image').appendChild(wineLink);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const wineEntries = document.querySelectorAll('.wine-entry');
    const wineFilters = document.querySelectorAll('.wine-filter');
    const regionFilters = document.querySelectorAll('.region-filter');

    function filterWines() {
        const selectedWineTypes = Array.from(wineFilters)
            .filter(button => button.classList.contains('active'))
            .map(button => button.dataset.value);

        const selectedRegions = Array.from(regionFilters)
            .filter(button => button.classList.contains('active'))
            .map(button => button.dataset.value);

        wineEntries.forEach(entry => {
            const wineType = entry.dataset.type;
            const region = entry.dataset.region;

            const typeMatch = selectedWineTypes.length === 0 || selectedWineTypes.includes(wineType);
            const regionMatch = selectedRegions.length === 0 || selectedRegions.includes(region);

            if (typeMatch && regionMatch) {
                entry.style.display = '';
            } else {
                entry.style.display = 'none';
            }
        });
    }

    function toggleFilter(event) {
        event.target.classList.toggle('active');
        filterWines();
    }

    wineFilters.forEach(button => button.addEventListener('click', toggleFilter));
    regionFilters.forEach(button => button.addEventListener('click', toggleFilter));
});


document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const wineEntries = document.querySelectorAll(".wine-entry");
    const modal = document.getElementById("wineModal");
    const closeModalButton = document.querySelector(".close-button");

    // Function to filter wines and update background color
    function filterWinesAndColor(button) {
        const filterType = button.dataset.value;

        // Update background color based on filter type
        switch (filterType) {
            case 'red':
                document.body.style.backgroundColor = 'var(--red-color)';
                break;
            case 'white':
                document.body.style.backgroundColor = 'var(--white-color)';
                break;
            case 'rose':
                document.body.style.backgroundColor = 'var(--rose-color)';
                break;
            case 'bubbles':
                document.body.style.backgroundColor = 'var(--bubbles-color)';
                break;
            case 'dessert':
                document.body.style.backgroundColor = 'var(--dessert-color)';
                break;
            default:
                document.body.style.backgroundColor = 'white'; // Default color
                break;
        }

        // Filter wine entries based on the button clicked
        wineEntries.forEach(entry => {
            if (entry.dataset.type === filterType || filterType === 'all') {
                entry.style.display = "block";
            } else {
                entry.style.display = "none";
            }
        });
    }

    // Event listener for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Toggle active class for styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter wines and update background color
            filterWinesAndColor(button);
        });
    });

    // Code to handle modal and close button (unchanged from your previous implementation)
    wineEntries.forEach(entry => {
        entry.addEventListener("click", () => {
            // Populating modal with wine details
            const wineName = entry.querySelector("h3").textContent;
            const wineImage = entry.querySelector("img").src;
            const wineType = entry.dataset.type;
            const wineRegion = entry.dataset.region;
            const wineRating = entry.querySelector(".rating").textContent;
            const winePrice = entry.querySelector(".price").textContent;
            const wineDescription = entry.dataset.description || "No description available.";

            document.getElementById("modalWineName").textContent = wineName;
            document.getElementById("modalWineImage").src = wineImage;
            document.getElementById("modalWineType").textContent = `Type: ${wineType}`;
            document.getElementById("modalWineRegion").textContent = `Region: ${wineRegion}`;
            document.getElementById("modalWineRating").textContent = `Rating: ${wineRating}`;
            document.getElementById("modalWinePrice").textContent = `Price: ${winePrice}`;
            document.getElementById("modalWineDescription").textContent = `Description: ${wineDescription}`;

            // Display modal
            modal.style.display = "block";
        });
    });

    // Event listener for closing modal
    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal if user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});


// Smooth scroll functionality for anchor links (from https://css-tricks.com/snippets/jquery/smooth-scrolling/)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});