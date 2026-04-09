// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker failed', err));
    });
}

// Card Glare Effect
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });

    // Touch support for glare
    card.addEventListener('touchmove', e => {
        const rect = card.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});

// App Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const closeChatbot = document.getElementById('close-chatbot');
const sendMsg = document.getElementById('send-msg');
const userInput = document.getElementById('user-input');
const messagesContainer = document.getElementById('chatbot-messages');

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('hidden');
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.classList.add('hidden');
});

const addMessage = (text, sender) => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
};

const handleSend = () => {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';

    // Mock Bot Logic
    setTimeout(() => {
        let response = "I'm sorry, I'm just a portal assistant. You can check the HRMS or Webmail links above for most info!";
        const query = text.toLowerCase();
        
        if (query.includes('hrms') || query.includes('attendance')) {
            response = "You can access HRMS to mark your attendance or view salary slips by clicking the large purple card on the home screen.";
        } else if (query.includes('mail') || query.includes('email')) {
            response = "Click the 'Webmail' card to open your official company email login page.";
        } else if (query.includes('hello') || query.includes('hi')) {
            response = "Hello! I'm the Mindcraft AI. How can I assist you with your company tools today?";
        }
        
        addMessage(response, 'bot');
    }, 800);
};

sendMsg.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
