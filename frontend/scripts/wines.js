// frontend/scripts/wines.js
document.addEventListener("DOMContentLoaded", async function () {
    const wineNotContainer = document.createElement('div');
    wineNotContainer.className = 'wine-not-container';
    wineNotContainer.innerHTML = '<h1>WINE NOT</h1>';
    document.body.appendChild(wineNotContainer);

    async function fetchWines(type) {
        const response = await fetch(`https://api.sampleapis.com/wines/${type}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${type} wines`);
        }
        return response.json();
    }

    async function fetchAllWines() {
        try {
            const [reds, whites, roses, bubbles, desserts] = await Promise.all([
                fetchWines('reds'),
                fetchWines('whites'),
                fetchWines('rose'),
                fetchWines('sparkling'),
                fetchWines('dessert')
            ]);
            return { reds, whites, roses, bubbles, desserts };
        } catch (error) {
            console.error('Error fetching wines:', error);
        }
    }

    const { reds, whites, roses, bubbles, desserts } = await fetchAllWines();
    const wineContainer = document.querySelector('.wine-container');

    function createWineEntry(wine, type) {
        const wineEntry = document.createElement('div');
        wineEntry.classList.add('wine-entry');
        wineEntry.dataset.type = type;
        wineEntry.dataset.region = wine.location || 'Unknown';
        wineEntry.dataset.winery = wine.winery || 'Unknown Winery';
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
        wineContainer.innerHTML = ''; // Clear the container
        wines.forEach(wine => wineContainer.appendChild(createWineEntry(wine, type)));
    }

    renderWines(reds, 'red'); // Default to reds

    function openModal(wine, type) {
        const modal = document.getElementById("wineModal");
        const modalContent = modal.querySelector(".modal-content");

        modalContent.innerHTML = `
            <div class="modal-text">
                <h2 id="modalWineName">${wine.wine}</h2>
                <div id="modalWineType">Type: ${type}</div>
                <div id="modalWineRegion">Region: ${wine.location || 'Unknown'}</div>
                <div id="modalWineRating">Rating: ${wine.rating.average || 'N/A'}/5</div>
                <div id="modalWineWinery">Winery: ${wine.winery || 'Unknown Winery'}</div>
            </div>
            <div class="modal-image">
                <img id="modalWineImage" src="${wine.image || 'path/to/placeholder.png'}" alt="${wine.wine}">
            </div>
            <span class="close-button">&times;</span>
        `;

        modal.style.display = "block";
        modal.querySelector(".close-button").addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    const modal = document.getElementById("wineModal");

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Filter buttons functionality
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
});
