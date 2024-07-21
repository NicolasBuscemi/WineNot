document.addEventListener("DOMContentLoaded", function () {
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
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
