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
