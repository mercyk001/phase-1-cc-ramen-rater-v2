
document.addEventListener('DOMContentLoaded', main);

const BASE_URL = 'http://localhost:3000/ramens';

function main() {
    displayRamens();
    addSubmitListener();
    addEditListener();
}

// Fetch and display all ramen images
function displayRamens() {
    fetch(BASE_URL)
        .then(response => response.json())
        .then(ramens => {
            const ramenMenu = document.getElementById('ramen-menu');
            ramens.forEach(ramen => {
                const img = document.createElement('img');
                img.src = ramen.image;
                img.alt = ramen.name;
                img.addEventListener('click', () => handleClick(ramen));
                ramenMenu.appendChild(img);
            });
            // Display details of the first ramen
            if (ramens.length > 0) {
                handleClick(ramens[0]);
            }
        });
}

// Display ramen details on click
function handleClick(ramen) {
    document.getElementById('detail-image').src = ramen.image;
    document.getElementById('detail-name').textContent = ramen.name;
    document.getElementById('detail-restaurant').textContent = ramen.restaurant;
    document.getElementById('insert-rating-here').textContent = ramen.rating;
    document.getElementById('insert-comment-here').textContent = ramen.comment;
}

// Add new ramen
function addSubmitListener() {
    const form = document.getElementById('new-ramen');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const newRamen = {
            name: event.target['name'].value,
            restaurant: event.target['restaurant'].value,
            image: event.target['image'].value,
            rating: event.target['rating'].value,
            comment: event.target['comment'].value
        };
        addRamenToMenu(newRamen);
        form.reset();
    });
}

// Helper function to add ramen to menu
function addRamenToMenu(ramen) {
    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.addEventListener('click', () => handleClick(ramen));
    ramenMenu.appendChild(img);
}

// Update ramen details
function addEditListener() {
    const form = document.getElementById('edit-ramen');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const updatedRating = event.target['rating'].value;
        const updatedComment = event.target['comment'].value;
        document.getElementById('insert-rating-here').textContent = updatedRating;
        document.getElementById('insert-comment-here').textContent = updatedComment;
    });
}