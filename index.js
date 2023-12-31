document.getElementById('span1').addEventListener('click', function () {
    const dashboardContainer = document.getElementById('dashboard-container');
    const numberOfCards = 6;

    fetch(`https://picsum.photos/v2/list?page=1&limit=${numberOfCards}`)
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                const card = createCard(image);
                dashboardContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching images:', error));

    function createCard(image) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = image.download_url;
        img.alt = image.author;

        card.appendChild(img);

        card.addEventListener('click', () => showCardInfo(image));

        return card;
    }
});

function showCardInfo(image) {
    const infoDiv = createInfoDiv(image);

    const closeButton = createCloseButton(infoDiv);

    document.body.appendChild(infoDiv);
}

function createInfoDiv(image) {
    const infoDiv = document.createElement('div');
    infoDiv.className = 'card-info';
    infoDiv.innerHTML = `
        <p><strong>Author:</strong> ${image.author}</p>
        <p><strong>Image URL:</strong> ${image.download_url}</p>
    `;
    applyStyles(infoDiv, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '2px solid #333',
        padding: '20px',
        backgroundColor: '#fff',
        zIndex: '999',
    });
    return infoDiv;
}

function createCloseButton(infoDiv) {
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', () => document.body.removeChild(infoDiv));
    infoDiv.appendChild(closeButton);
}

document.addEventListener('DOMContentLoaded', function () {
    const orangePart = document.getElementById('orangePart');
    const dashboardContainer = document.getElementById('dashboard-container');

    orangePart.addEventListener('click', addNewCard);

    function addNewCard() {
        fetchRandomImage()
            .then(image => dashboardContainer.appendChild(createCard(image)))
            .catch(error => console.error('Error fetching random image:', error));
    }

    function createCard(image) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = image.download_url;
        img.alt = image.author;

        const cardContent = document.createElement('p');
        cardContent.textContent = 'New Card Content';

        card.appendChild(img);
        card.appendChild(cardContent);

        return card;
    }

    function fetchRandomImage() {
        return fetch('https://picsum.photos/200/300')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            });
    }
});

// Utility function to apply styles to an element
function applyStyles(element, styles) {
    for (const [key, value] of Object.entries(styles)) {
        element.style[key] = value;
    }
}




document.addEventListener('DOMContentLoaded', function () {
    const orangePart = document.getElementById('orangePart');
    const cardContainer = document.getElementById('card-container');

    orangePart.addEventListener('click', function () {
        openAddCardWindow();
    });

    function openAddCardWindow() {
        // Open a new window for adding a new card
        const addCardWindow = window.open('', '_blank');
        
        // Add HTML content to the new window
        addCardWindow.document.write(`
            <div>
                <label for="author">Author:</label>
                <input type="text" id="author" name="author" required>
            </div>
            <div>
                <label for="imageUrl">Image URL:</label>
                <input type="text" id="imageUrl" name="imageUrl" required>
            </div>
            <div>
                <button onclick="addCard()">Add Card</button>
            </div>
        `);
    }

    // Function to add a new card to the card container
    window.addCard = function () {
        const authorInput = addCardWindow.document.getElementById('author');
        const imageUrlInput = addCardWindow.document.getElementById('imageUrl');

        const author = authorInput.value.trim();
        const imageUrl = imageUrlInput.value.trim();

        if (author && imageUrl) {
            // Create a new card
            const newCard = createCard(author, imageUrl);

            // Append the new card to the card container
            cardContainer.appendChild(newCard);

            // Close the add card window
            addCardWindow.close();
        } else {
            alert('Please fill in all fields.');
        }
    };

    function createCard(author, imageUrl) {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = author;

        card.appendChild(img);

        // Add any additional content or styling as needed

        return card;
    }
});

