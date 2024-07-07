document.addEventListener("DOMContentLoaded", function() {
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

document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const wineEntries = document.querySelectorAll(".wine-entry");
    const modal = document.getElementById("wineModal");
    const closeModalButton = document.querySelector(".close-button");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filterType = button.dataset.value;

            if (button.classList.contains("wine-filter")) {
                wineEntries.forEach(entry => {
                    if (entry.dataset.type === filterType) {
                        entry.style.display = "block";
                    } else {
                        entry.style.display = "none";
                    }
                });
            } else if (button.classList.contains("region-filter")) {
                wineEntries.forEach(entry => {
                    if (entry.dataset.region === filterType) {
                        entry.style.display = "block";
                    } else {
                        entry.style.display = "none";
                    }
                });
            }
        });
    });

    wineEntries.forEach(entry => {
        entry.addEventListener("click", () => {
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
            document.getElementById("modalWineRating").textContent = wineRating;
            document.getElementById("modalWinePrice").textContent = winePrice;
            document.getElementById("modalWineDescription").textContent = wineDescription;

            modal.style.display = "block";
        });
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

