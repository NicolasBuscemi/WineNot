document.addEventListener("DOMContentLoaded", function () {
    // Filter buttons and modal functionality
    const filterButtons = document.querySelectorAll(".filter-btn");
    const wineEntries = document.querySelectorAll(".wine-entry");
    const modal = document.getElementById("wineModal");
    const closeModalButton = document.querySelector(".close-button");

    if (filterButtons.length > 0 && wineEntries.length > 0 && modal && closeModalButton) {
        function filterWinesAndColor(button) {
            const filterType = button.dataset.value;

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
                    document.body.style.backgroundColor = 'white';
                    break;
            }

            wineEntries.forEach(entry => {
                if (entry.dataset.type === filterType || filterType === 'all') {
                    entry.style.display = "block";
                } else {
                    entry.style.display = "none";
                }
            });
        }

        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                filterWinesAndColor(button);
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
                document.getElementById("modalWineRating").textContent = `Rating: ${wineRating}`;
                document.getElementById("modalWinePrice").textContent = `Price: ${winePrice}`;
                document.getElementById("modalWineDescription").textContent = `Description: ${wineDescription}`;

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
    } else {
        if (closeModalButton === null) console.error("Close button not found");
        if (modal === null) console.error("Modal not found");
        if (filterButtons.length === 0) console.error("No filter buttons found");
        if (wineEntries.length === 0) console.error("No wine entries found");
    }
});
