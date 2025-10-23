/**
 * Main JavaScript for Shopyfi AI Assistant
 * Handles UI interactions and AI communication
 */

// Initialize AI Engine
const ai = new ShopyfiAI();

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');
const welcomeBanner = document.getElementById('welcomeBanner');
const settingsBtn = document.getElementById('settingsBtn');
const settingsPanel = document.getElementById('settingsPanel');
const closeSettings = document.getElementById('closeSettings');
const overlay = document.getElementById('overlay');
const saveSettingsBtn = document.getElementById('saveSettings');
const clearHistoryBtn = document.getElementById('clearHistory');
const resetKnowledgeBtn = document.getElementById('resetKnowledge');

// Settings sliders
const empathySlider = document.getElementById('empathyLevel');
const friendlinessSlider = document.getElementById('friendlinessLevel');
const formalitySlider = document.getElementById('formalityLevel');
const detailSlider = document.getElementById('detailLevel');

// Settings values
const empathyValue = document.getElementById('empathyValue');
const friendlinessValue = document.getElementById('friendlinessValue');
const formalityValue = document.getElementById('formalityValue');
const detailValue = document.getElementById('detailValue');

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadSettings();
    setupEventListeners();
});

/**
 * Initialize application
 */
function initializeApp() {
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 150) + 'px';
    });

    // Focus on input
    chatInput.focus();

    // Load conversation history
    loadConversationHistory();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Send message on button click
    sendBtn.addEventListener('click', handleSendMessage);

    // Send message on Enter key
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Settings panel
    settingsBtn.addEventListener('click', openSettings);
    closeSettings.addEventListener('click', closeSettingsPanel);
    overlay.addEventListener('click', closeSettingsPanel);
    saveSettingsBtn.addEventListener('click', saveSettings);

    // Clear history
    clearHistoryBtn.addEventListener('click', clearChatHistory);

    // Reset knowledge
    resetKnowledgeBtn.addEventListener('click', resetKnowledge);

    // Slider updates
    empathySlider.addEventListener('input', (e) => empathyValue.textContent = e.target.value);
    friendlinessSlider.addEventListener('input', (e) => friendlinessValue.textContent = e.target.value);
    formalitySlider.addEventListener('input', (e) => formalityValue.textContent = e.target.value);
    detailSlider.addEventListener('input', (e) => detailValue.textContent = e.target.value);
}

/**
 * Handle send message
 */
async function handleSendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;

    // Hide welcome banner
    if (welcomeBanner) {
        welcomeBanner.style.display = 'none';
    }

    // Add user message to chat
    addMessage(message, 'user');

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';

    // Show typing indicator
    showTypingIndicator();

    // Get AI response with delay
    setTimeout(async () => {
        try {
            const response = await ai.processMessage(message);
            hideTypingIndicator();
            addMessage(response, 'assistant');
            
            // Save conversation
            saveConversationHistory();
        } catch (error) {
            console.error('Error processing message:', error);
            hideTypingIndicator();
            addMessage('Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.', 'assistant');
        }
    }, ai.getResponseDelay());
}

/**
 * Send quick message from buttons
 */
function sendQuickMessage(message) {
    chatInput.value = message;
    handleSendMessage();
}

// Make sendQuickMessage globally available
window.sendQuickMessage = sendQuickMessage;

/**
 * Add message to chat
 */
function addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = role === 'user' ? 
        '<i class="fas fa-user"></i>' : 
        '<i class="fas fa-leaf"></i>';

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Format message with markdown-like syntax
    const formattedContent = formatMessage(content);
    messageContent.innerHTML = formattedContent;

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);

    chatMessages.appendChild(messageDiv);

    // Add appointment button if suggested
    if (role === 'assistant' && content.includes('agendar') && ai.settings.suggestAppointments) {
        addAppointmentButton();
    }

    // Scroll to bottom
    scrollToBottom();
}

/**
 * Format message with basic markdown
 */
function formatMessage(text) {
    // Convert markdown-like bold
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert newlines to <br>
    text = text.replace(/\n/g, '<br>');
    
    // Convert links
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="message-link">$1</a>');
    
    return text;
}

/**
 * Add appointment button to chat
 */
function addAppointmentButton() {
    const buttonDiv = document.createElement('div');
    buttonDiv.className = 'message-action';
    buttonDiv.innerHTML = `
        <a href="https://calendly.com/juanpedrohomeopata/citas-naturopata" 
           target="_blank" 
           class="btn-appointment">
            <i class="fas fa-calendar-plus"></i> Agendar Cita Ahora
        </a>
    `;
    chatMessages.appendChild(buttonDiv);
    scrollToBottom();
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    typingIndicator.style.display = 'flex';
    scrollToBottom();
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
    typingIndicator.style.display = 'none';
}

/**
 * Scroll chat to bottom
 */
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

/**
 * Open settings panel
 */
function openSettings() {
    settingsPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close settings panel
 */
function closeSettingsPanel() {
    settingsPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Load settings into UI
 */
function loadSettings() {
    const settings = ai.settings;
    
    empathySlider.value = settings.empathyLevel;
    empathyValue.textContent = settings.empathyLevel;
    
    friendlinessSlider.value = settings.friendlinessLevel;
    friendlinessValue.textContent = settings.friendlinessLevel;
    
    formalitySlider.value = settings.formalityLevel;
    formalityValue.textContent = settings.formalityLevel;
    
    detailSlider.value = settings.detailLevel;
    detailValue.textContent = settings.detailLevel;
    
    document.getElementById('showPrices').checked = settings.showPrices;
    document.getElementById('suggestAppointments').checked = settings.suggestAppointments;
    document.getElementById('proactiveMode').checked = settings.proactiveMode;
    document.getElementById('useEmojis').checked = settings.useEmojis;
    document.getElementById('responseSpeed').value = settings.responseSpeed;
    document.getElementById('greetingMessage').value = settings.greetingMessage;
}

/**
 * Save settings
 */
function saveSettings() {
    const settings = {
        empathyLevel: parseInt(empathySlider.value),
        friendlinessLevel: parseInt(friendlinessSlider.value),
        formalityLevel: parseInt(formalitySlider.value),
        detailLevel: parseInt(detailSlider.value),
        showPrices: document.getElementById('showPrices').checked,
        suggestAppointments: document.getElementById('suggestAppointments').checked,
        proactiveMode: document.getElementById('proactiveMode').checked,
        useEmojis: document.getElementById('useEmojis').checked,
        responseSpeed: document.getElementById('responseSpeed').value,
        greetingMessage: document.getElementById('greetingMessage').value
    };

    ai.saveSettings(settings);
    
    // Show success message
    showNotification('✅ Configuración guardada exitosamente');
    
    closeSettingsPanel();
}

/**
 * Clear chat history
 */
function clearChatHistory() {
    if (confirm('¿Estás seguro de que quieres borrar el historial de chat?')) {
        chatMessages.innerHTML = '';
        ai.clearHistory();
        welcomeBanner.style.display = 'flex';
        showNotification('🗑️ Historial borrado');
    }
}

/**
 * Reset knowledge base
 */
function resetKnowledge() {
    if (confirm('¿Estás seguro de que quieres restablecer la base de conocimientos?')) {
        ai.knowledgeBase = ai.initializeKnowledgeBase();
        showNotification('🔄 Base de conocimientos restablecida');
    }
}

/**
 * Show notification
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Save conversation history
 */
function saveConversationHistory() {
    try {
        localStorage.setItem('shopyfi_conversation_history', JSON.stringify(ai.conversationHistory));
    } catch (error) {
        console.error('Error saving conversation history:', error);
    }
}

/**
 * Load conversation history
 */
function loadConversationHistory() {
    try {
        const saved = localStorage.getItem('shopyfi_conversation_history');
        if (saved) {
            const history = JSON.parse(saved);
            
            // Only load last 10 messages to avoid overwhelming the UI
            const recentHistory = history.slice(-10);
            
            recentHistory.forEach(msg => {
                if (msg.role === 'user' || msg.role === 'assistant') {
                    addMessage(msg.content, msg.role);
                }
            });

            if (recentHistory.length > 0) {
                welcomeBanner.style.display = 'none';
            }

            ai.conversationHistory = history;
        }
    } catch (error) {
        console.error('Error loading conversation history:', error);
    }
}

/**
 * Handle window resize
 */
window.addEventListener('resize', function() {
    scrollToBottom();
});

/**
 * Prevent zoom on input focus (iOS)
 */
if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    const viewport = document.querySelector('meta[name=viewport]');
    viewport.setAttribute('content', viewport.content + ', maximum-scale=1.0');
}
