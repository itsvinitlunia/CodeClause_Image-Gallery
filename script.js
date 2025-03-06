const images = [
    {
        id: 1,
        title: "Gateway of India",
        description: "Historic monument built during the British Raj",
        imageUrl: "Resources/Gateway of India.jpg",
        categories: ["landmarks"],
        tags: ["historic", "architecture", "tourist-spot"],
        liked: false
    },
    {
        id: 2,
        title: "Marine Drive",
        description: "The Queen's Necklace - Mumbai's iconic waterfront",
        imageUrl: "Resources/Marine Drives.jpg",
        categories: ["landmarks"],
        tags: ["waterfront", "skyline", "evening"],
        liked: false
    },
    {
        id: 3,
        title: "Vada Pav",
        description: "Mumbai's famous street food delicacy",
        imageUrl: "Resources/Vada Pav.jpg",
        categories: ["food"],
        tags: ["street-food", "spicy", "vegetarian"],
        liked: false
    },
    {
        id: 4,
        title: "Elephanta Caves",
        description: "Ancient cave temples dedicated to Lord Shiva",
        imageUrl: "Resources/Elephanta Caves.jpg",
        categories: ["landmarks", "culture"],
        tags: ["unesco", "history", "sculpture"],
        liked: false
    },
    {
        id: 5,
        title: "Juhu Beach",
        description: "Popular beach known for its street food and sunset views",
        imageUrl: "Resources/Juhu Beach.jpg",
        categories: ["beaches"],
        tags: ["sunset", "street-food", "recreation"],
        liked: false
    },
    {
        id: 6,
        title: "Bandra-Worli Sea Link",
        description: "Iconic cable-stayed bridge connecting Bandra and Worli",
        imageUrl: "Resources/Sea Link.jpg",
        categories: ["landmarks"],
        tags: ["infrastructure", "engineering", "skyline"],
        liked: false
    },
    {
        id: 7,
        title: "Ganesh Chaturthi Celebration",
        description: "Mumbai's biggest festival celebrating Lord Ganesha",
        imageUrl: "Resources/Ganesh.jpg",
        categories: ["culture"],
        tags: ["festival", "tradition", "celebration"],
        liked: false
    },
    {
        id: 8,
        title: "Bombay Pav Bhaji",
        description: "Iconic Mumbai street food dish",
        imageUrl: "Resources/Pav Bhaji.jpg",
        categories: ["food"],
        tags: ["street-food", "spicy", "vegetarian"],
        liked: false
    },
    {
        id: 9,
        title: "Chhatrapati Shivaji Terminus",
        description: "UNESCO World Heritage Site and historic railway station",
        imageUrl: "Resources/CST.jpg",
        categories: ["landmarks", "culture"],
        tags: ["unesco", "colonial", "architecture"],
        liked: false
    },
    {
        id: 10,
        title: "Versova Beach",
        description: "Clean beach known for successful cleanup initiatives",
        imageUrl: "Resources/Versova.jpg",
        categories: ["beaches"],
        tags: ["environment", "sunset", "clean"],
        liked: false
    },
    {
        id: 11,
        title: "Local Train",
        description: "Mumbai's famous local train railway network system",
        imageUrl: "Resources/Local Train.jpg",
        categories: ["culture", "infrastructure","engineering"],
        tags: ["tradition", "service", "unique"],
        liked: false
    },
    {
        id: 12,
        title: "Colaba Causeway Market",
        description: "Popular shopping street with various goods",
        imageUrl: "Resources/Colaba.jpg",
        categories: ["culture"],
        tags: ["shopping", "street", "touristy"],
        liked: false
    }
];

// DOM Elements
const gallery = document.getElementById('gallery');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize the gallery
function initGallery() {
    // Load from localStorage if available
    const savedImages = localStorage.getItem('mumbaiGalleryImages');
    if (savedImages) {
        const parsedImages = JSON.parse(savedImages);
        // Update our images array with saved liked status
        parsedImages.forEach(savedImg => {
            const imgIndex = images.findIndex(img => img.id === savedImg.id);
            if (imgIndex !== -1) {
                images[imgIndex].liked = savedImg.liked;
            }
        });
    }
    
    renderGallery('all');
    setupEventListeners();
}

// Render gallery based on filter
function renderGallery(filter) {
    gallery.innerHTML = '';
    
    let filteredImages;
    if (filter === 'all') {
        filteredImages = images;
    } else if (filter === 'liked') {
        filteredImages = images.filter(image => image.liked);
    } else {
        filteredImages = images.filter(image => image.categories.includes(filter));
    }
    
    if (filteredImages.length === 0) {
        gallery.innerHTML = '<div class="no-images"><p>No images found for this category</p></div>';
        return;
    }
    
    filteredImages.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item new-item';
        
        // Create tag HTML
        const tagsHTML = image.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        
        galleryItem.innerHTML = `
            <img src="${image.imageUrl}" alt="${image.title}">
            <button class="like-btn ${image.liked ? 'liked' : ''}" data-id="${image.id}">
                <i class="fas fa-heart"></i>
            </button>
            <div class="item-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
                <div class="item-tags">
                    ${tagsHTML}
                </div>
            </div>
        `;
        
        gallery.appendChild(galleryItem);
    });
    
    // Add event listeners to the new like buttons
    document.querySelectorAll('.like-btn').forEach(btn => {
        btn.addEventListener('click', handleLikeClick);
    });
}

// Handle like button clicks
function handleLikeClick(e) {
    const button = e.currentTarget;
    const imageId = parseInt(button.getAttribute('data-id'));
    
    const imageIndex = images.findIndex(img => img.id === imageId);
    if (imageIndex !== -1) {
        // Toggle liked status
        images[imageIndex].liked = !images[imageIndex].liked;
        
        // Update button appearance
        button.classList.toggle('liked');
        
        // Save to localStorage
        saveToLocalStorage();
        
        // If we're in the liked filter, we need to re-render
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        if (activeFilter === 'liked' && !images[imageIndex].liked) {
            renderGallery('liked');
        }
    }
}

// Save current state to localStorage
function saveToLocalStorage() {
    localStorage.setItem('mumbaiGalleryImages', JSON.stringify(images));
}

// Setup event listeners
function setupEventListeners() {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get filter value and render gallery
            const filter = this.getAttribute('data-filter');
            renderGallery(filter);
        });
    });
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', initGallery);