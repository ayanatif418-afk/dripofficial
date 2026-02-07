// ============================================
// CONTACT PAGE — FORM HANDLING & WHATSAPP
// ============================================

const contactForm = document.getElementById('contactForm');
const whatsappNumber = '923352723423';

// Form submission handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Format WhatsApp message
    const whatsappMessage = formatContactMessage(formData);
    
    // Open WhatsApp with formatted message
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showSuccessMessage();
    
    // Reset form after submission
    contactForm.reset();
});

function formatContactMessage(data) {
    const subjectLabels = {
        'general': 'General Inquiry',
        'order': 'Order Support',
        'custom': 'Custom/Bespoke Order',
        'wholesale': 'Wholesale & Empire Partnerships',
        'collaboration': 'Brand Collaboration',
        'press': 'Press & Media'
    };
    
    const subjectLabel = subjectLabels[data.subject] || data.subject;
    
    let message = `📋 DRIP CONTACT FORM SUBMISSION\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `👤 NAME: ${data.name}\n`;
    message += `📧 EMAIL: ${data.email}\n`;
    
    if (data.phone) {
        message += `📱 PHONE: ${data.phone}\n`;
    }
    
    message += `📂 INQUIRY TYPE: ${subjectLabel}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `💬 MESSAGE:\n${data.message}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━━━━`;
    
    return message;
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: var(--empire-gold);
        color: var(--obsidian-black);
        padding: 1.5rem 2rem;
        font-family: 'Space Mono', monospace;
        font-size: 0.9rem;
        font-weight: 700;
        letter-spacing: 0.1em;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 40px rgba(212, 175, 55, 0.4);
    `;
    
    notification.textContent = 'MESSAGE SENT VIA WHATSAPP ✓';
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Get Directions button handler
const directionsBtn = document.querySelector('.btn-directions');
if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
        // Replace with actual coordinates when available
        const mapsUrl = 'https://maps.google.com/?q=Karachi,Pakistan';
        window.open(mapsUrl, '_blank');
    });
}

// Real-time form validation
const inputs = contactForm.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#FF3333';
        } else {
            input.style.borderColor = 'rgba(212, 175, 55, 0.2)';
        }
    });
    
    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--empire-gold)';
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#FF3333';
    }
});

// Phone number formatting (Pakistan)
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    // Auto-add Pakistan country code
    if (value.length > 0 && !value.startsWith('92')) {
        if (value.startsWith('0')) {
            value = '92' + value.substring(1);
        } else if (value.startsWith('3')) {
            value = '92' + value;
        }
    }
    
    // Format as: +92 XXX XXXXXXX
    if (value.startsWith('92') && value.length > 2) {
        value = '+92 ' + value.substring(2, 5) + ' ' + value.substring(5);
    }
    
    e.target.value = value.trim();
});

// Initialize
console.log('Contact page initialized');