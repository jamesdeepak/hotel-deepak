// app.js

// Initialize Global Variables
let fuse;
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initRAG();
    renderMenu(hotelData.menu);
    initAnimations();
    initMobileMenu();
});

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Optional: Animate icon
    });
}

// --- RAG Chatbot Logic ---

function initRAG() {
    const options = {
        keys: ['keywords', 'text'],
        threshold: 0.4, // Fuzzy match threshold
        includeScore: true
    };
    // ragCorpus comes from knowledge_base.js
    fuse = new Fuse(ragCorpus, options);
}

function toggleChat() {
    const widget = document.getElementById('chat-widget');
    const icon = document.getElementById('chat-toggle-icon');
    widget.classList.toggle('closed');

    if (widget.classList.contains('closed')) {
        icon.setAttribute('data-lucide', 'chevron-up');
    } else {
        icon.setAttribute('data-lucide', 'chevron-down');
        // Force refresh icon
        lucide.createIcons();
    }
}

function openChat() {
    const widget = document.getElementById('chat-widget');
    widget.classList.remove('closed');
    const icon = document.getElementById('chat-toggle-icon');
    icon.setAttribute('data-lucide', 'chevron-down');
    lucide.createIcons();
}

function handleUserQuery() {
    const query = chatInput.value.trim();
    if (!query) return;

    // 1. Add User Message
    addMessage(query, 'user');
    chatInput.value = '';

    // 2. Process with RAG
    setTimeout(() => {
        const response = getRAGResponse(query);
        addMessage(response, 'bot');
    }, 600); // Fake delay for realism
}

function getRAGResponse(query) {
    if (!fuse) return "I'm still learning the menu...";

    const results = fuse.search(query);

    if (results.length > 0) {
        // Return best match
        return results[0].item.answer;
    } else {
        // Fallback
        return "I'm not sure about that. Try asking about our 'Biryani', 'Location', or 'Opening Hours'!";
    }
}

function askQuestion(question) {
    chatInput.value = question;
    handleUserQuery();
}

function addMessage(text, sender) {
    const div = document.createElement('div');
    div.classList.add('message', sender);
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Allow Enter key to send
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserQuery();
});


// --- Menu Logic ---

function renderMenu(items) {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = items.map(item => `
        <div class="menu-item fade-in">
            <div class="menu-img-wrapper">
                <img src="${item.image}" alt="${item.name}" class="menu-img" onerror="this.src='https://via.placeholder.com/400x300?text=Delicious+Food'">
            </div>
            <div class="menu-info">
                <div class="menu-header">
                    <span>${item.name}</span>
                    <span class="price">${item.price}</span>
                </div>
                <div class="menu-desc">${item.description}</div>
                <button class="btn-secondary" style="font-size:0.8rem; padding:0.4rem 0.8rem; width:100%;">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Filter Logic
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Active class
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter
        const cat = btn.dataset.cat;
        if (cat === 'all') {
            renderMenu(hotelData.menu);
        } else {
            const filtered = hotelData.menu.filter(item => item.category === cat);
            renderMenu(filtered);
        }
    });
});


// --- Animations (GSAP) ---
function initAnimations() {
    // Register scroll trigger
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });
}
