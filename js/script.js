// ============================================
// MENÚ MÓVIL
// ============================================
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            const menu = document.querySelector('.nav-menu');
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        }
    });
});

// ============================================
// SCROLL REVEAL - ANIMACIONES AL HACER SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));
});

// ============================================
// CONTADOR DE ESTADÍSTICAS ANIMADO
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ============================================
// GALERÍA LIGHTBOX
// ============================================
let currentImageIndex = 0;
const images = [
    'images/pestañas.jpg',
    'images/gelsemipermanente.jpg',
    'images/geldiseño.jpg',
    'images/rubber.jpg',
    'images/diseño.jpg',
    'images/pedicura.jpg',
    'images/trabajo7.jpg',
    'images/trabajo8.jpg',
    'images/trabajo9.jpg',
    'images/trabajo10.jpg'
];

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = images[index];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeLightbox(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById('lightbox-img').src = images[currentImageIndex];
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
    if (e.key === 'ArrowLeft') {
        changeLightbox(-1);
    }
    if (e.key === 'ArrowRight') {
        changeLightbox(1);
    }
});

document.getElementById('lightbox')?.addEventListener('click', function(e) {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// ============================================
// CARRUSEL DE TESTIMONIOS
// ============================================
let currentTestimonioIndex = 0;
const testimonios = document.querySelectorAll('.testimonio-card');
const dots = document.querySelectorAll('.dot');

function showTestimonio(index) {
    testimonios.forEach((testimonio, i) => {
        testimonio.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    if (index >= testimonios.length) {
        currentTestimonioIndex = 0;
    } else if (index < 0) {
        currentTestimonioIndex = testimonios.length - 1;
    } else {
        currentTestimonioIndex = index;
    }
    
    testimonios[currentTestimonioIndex].classList.add('active');
    dots[currentTestimonioIndex].classList.add('active');
}

function currentTestimonio(index) {
    showTestimonio(index);
}

setInterval(() => {
    showTestimonio(currentTestimonioIndex + 1);
}, 5000);

// ============================================
// FAQ ACORDEÓN
// ============================================
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ============================================
// SISTEMA DE PROMOCIONES MEJORADO
// ============================================
const serviciosPromocion = [
    { id: 1, nombre: 'Pestañas 1x1', precio: 25, imagen: 'images/pestañas.jpg' },
    { id: 2, nombre: 'Manicure en gel', precio: 25, imagen: 'images/gelsemipermanente.jpg' },
    { id: 3, nombre: 'Manicure rubber', precio: 40, imagen: 'images/rubber.jpg' },
    { id: 4, nombre: 'Manicure con diseño', precio: 30, imagen: 'images/geldiseño.jpg' },
    { id: 5, nombre: 'Manicure soft gel', precio: 40, imagen: 'images/diseño.jpg' },
    { id: 6, nombre: 'Pedicura', precio: 35, imagen: 'images/pedicura.jpg' },
    { id: 7, nombre: 'Maquillaje Profesional', precio: 40, imagen: 'images/sonia.jpg' },
    { id: 8, nombre: 'Peinados', precio: 30, imagen: 'images/peinado.jpg' },
    { id: 9, nombre: 'Henna', precio: 25, imagen: 'images/henna.jpg' },
    { id: 10, nombre: 'Planchado', precio: 20, imagen: 'images/planchado.jpg' }
];

let serviciosSeleccionados = [];

// Generar cards de servicios para promociones
function generarServiciosPromocion() {
    const grid = document.getElementById('promociones-grid');
    if (!grid) return;
    
    serviciosPromocion.forEach(servicio => {
        const card = document.createElement('div');
        card.className = 'servicio-card';
        card.dataset.id = servicio.id;
        card.innerHTML = `
            <div class="checkbox-custom">
                <i class="fas fa-check"></i>
            </div>
            <img src="${servicio.imagen}" alt="${servicio.nombre}">
            <h3>${servicio.nombre}</h3>
            <p>Servicio profesional de alta calidad</p>
            <div class="precio-tag">S/ ${servicio.precio}</div>
        `;
        
        card.addEventListener('click', () => toggleServicioPromocion(servicio.id));
        grid.appendChild(card);
    });
}

// Toggle selección de servicio
function toggleServicioPromocion(id) {
    const index = serviciosSeleccionados.findIndex(s => s.id === id);
    
    if (index > -1) {
        serviciosSeleccionados.splice(index, 1);
    } else {
        if (serviciosSeleccionados.length >= 2) {
            mostrarAlerta('Solo puedes seleccionar 2 servicios para la promoción 🎁');
            return;
        }
        const servicio = serviciosPromocion.find(s => s.id === id);
        serviciosSeleccionados.push(servicio);
    }
    
    actualizarUIPromocion();
    actualizarResumenPromocion();
}

// Actualizar UI de cards
function actualizarUIPromocion() {
    document.querySelectorAll('#promociones-grid .servicio-card').forEach(card => {
        const id = parseInt(card.dataset.id);
        const seleccionado = serviciosSeleccionados.some(s => s.id === id);
        
        if (seleccionado) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

// Actualizar resumen
function actualizarResumenPromocion() {
    const resumen = document.getElementById('resumen-promocion');
    const contenido = document.getElementById('contenido-resumen-promocion');
    const contador = document.getElementById('contador-servicios');
    const btnReservar = document.getElementById('btn-reservar-promocion');
    
    if (!resumen || !contenido || !contador || !btnReservar) return;
    
    contador.textContent = serviciosSeleccionados.length;
    
    if (serviciosSeleccionados.length === 0) {
        resumen.classList.add('empty');
        contenido.innerHTML = `
            <div class="mensaje-vacio">
                <i class="fas fa-hand-pointer"></i>
                <p>Selecciona tus servicios favoritos para ver tu promoción</p>
            </div>
        `;
        btnReservar.textContent = 'Selecciona servicios';
        btnReservar.disabled = true;
    } else {
        resumen.classList.remove('empty');
        
        const subtotal = serviciosSeleccionados.reduce((sum, s) => sum + s.precio, 0);
        const descuento = serviciosSeleccionados.length === 2 ? subtotal * 0.08 : 0;
        const total = subtotal - descuento;
        
        contenido.innerHTML = `
            <div class="servicios-seleccionados">
                ${serviciosSeleccionados.map(s => `
                    <div class="servicio-item">
                        <span class="servicio-item-nombre">${s.nombre}</span>
                        <span class="servicio-item-precio">S/ ${s.precio}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="divider"></div>
            
            <div class="resumen-totales">
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>S/ ${subtotal.toFixed(2)}</span>
                </div>
                ${descuento > 0 ? `
                    <div class="total-row">
                        <span>Descuento<span class="descuento-badge">8% OFF</span></span>
                        <span>-S/ ${descuento.toFixed(2)}</span>
                    </div>
                ` : ''}
                <div class="total-row destacado">
                    <span>TOTAL:</span>
                    <span>S/ ${total.toFixed(2)}</span>
                </div>
            </div>
        `;
        
        btnReservar.textContent = serviciosSeleccionados.length === 2 
            ? `Reservar por S/ ${total.toFixed(2)}` 
            : 'Selecciona un servicio más';
        btnReservar.disabled = false;
        
        if (serviciosSeleccionados.length === 2) {
            crearConfetti();
        }
    }
}

// Botón reservar promoción
document.addEventListener('DOMContentLoaded', function() {
    generarServiciosPromocion();
    
    const btnReservar = document.getElementById('btn-reservar-promocion');
    if (btnReservar) {
        btnReservar.addEventListener('click', () => {
            if (serviciosSeleccionados.length === 0) return;
            
            const serviciosTexto = serviciosSeleccionados.map(s => s.nombre).join(' + ');
            const subtotal = serviciosSeleccionados.reduce((sum, s) => sum + s.precio, 0);
            const descuento = serviciosSeleccionados.length === 2 ? subtotal * 0.08 : 0;
            const total = subtotal - descuento;
            
            const mensaje = `¡Hola! 🎉 Quiero reservar la promoción:\n\n${serviciosTexto}\n\nTotal: S/ ${total.toFixed(2)}${descuento > 0 ? ' (con 8% descuento)' : ''}\n\n¿Cuándo tienen disponibilidad? 😊`;
            
            const url = `https://wa.me/51922358283?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
            
            crearConfetti();
        });
    }
});

// Alerta personalizada
function mostrarAlerta(mensaje) {
    const alerta = document.createElement('div');
    alerta.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
        font-weight: 600;
        max-width: 300px;
    `;
    alerta.textContent = mensaje;
    document.body.appendChild(alerta);
    
    setTimeout(() => {
        alerta.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => alerta.remove(), 400);
    }, 3000);
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const messageEl = document.getElementById('form-message');

    if (form && messageEl) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value.trim();
            const servicio = document.getElementById('servicio').value.trim();
            const especificacion = document.getElementById('especificacion').value.trim();

            if (!nombre || !servicio || !especificacion) {
                messageEl.textContent = 'Por favor, completa todos los campos.';
                messageEl.className = 'error';
                messageEl.style.display = 'block';
                return;
            }

            const mensaje = `Hola, soy ${nombre} 💅\n\nQuiero reservar el servicio: ${servicio}\n\nDetalles: ${especificacion}\n\n¡Gracias! 😊`;
            const numero = '51922358283';
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
            
            window.open(url, '_blank');

            messageEl.textContent = '¡Mensaje enviado! WhatsApp se abrirá con tu solicitud.';
            messageEl.className = 'success';
            messageEl.style.display = 'block';
            
            form.reset();
            crearConfetti();
            
            setTimeout(() => { 
                messageEl.style.display = 'none'; 
            }, 5000);
        });
    }
});

// ============================================
// CHATBOT
// ============================================
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.classList.toggle('minimized');
    }
}

function sendBotMessage(option) {
    const messagesContainer = document.getElementById('chatbot-messages');
    if (!messagesContainer) return;
    
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.innerHTML = `<p>${option}</p>`;
    messagesContainer.appendChild(userMsg);
    
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'bot-message';
        
        let response = '';
        switch(option) {
            case 'Precios':
                response = `
                    <p>Estos son algunos de nuestros precios: 💅</p>
                    <p style="line-height: 1.8;">• Pestañas 1x1: S/25<br>
                    • Manicure gel-color entero: S/25<br>
                    • Manicure gel-diseños: desde S/30<br>
                    • Sistema soft gel: desde S/35<br>
                    • Rubber: desde S/40<br>
                    • Pedicura: desde S/35<br>
                    • Maquillaje: desde S/40</p>
                `;
                break;
            case 'Horarios':
                response = '<p>Atendemos de Lunes a Domingo de 11:00 AM a 8:00 PM , para citas mas temprano, reservar por whatsApp🕐</p>';
                break;
            case 'Ubicación':
                response = '<p>Estamos ubicados en Huaral, Galeria Cahuas (Ex Elektra) Stand 40. Contáctanos por WhatsApp para la dirección exacta 📍</p>';
                break;
            case 'Promociones':
                response = '<p>¡Tenemos promociones increíbles! 🎁 Elige 2 servicios y obtén 8% de descuento automático. Visita nuestra sección de promociones.</p>';
                break;
            default:
                response = '<p>Gracias por tu mensaje. ¿En qué más puedo ayudarte?</p>';
        }
        
        botMsg.innerHTML = response;
        messagesContainer.appendChild(botMsg);
        
        const whatsappBtn = document.createElement('div');
        whatsappBtn.className = 'bot-message';
        whatsappBtn.innerHTML = `
            <div class="quick-replies">
                <button onclick="openWhatsAppFromBot()">📱 Reservar por WhatsApp</button>
            </div>
        `;
        messagesContainer.appendChild(whatsappBtn);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function handleUserMessage() {
    const input = document.getElementById('chatbot-user-input');
    if (!input) return;
    
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesContainer = document.getElementById('chatbot-messages');
    
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(userMsg);
    
    input.value = '';
    
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'bot-message';
        
        const msgLower = message.toLowerCase();
        
        if (msgLower.includes('precio') || msgLower.includes('costo') || msgLower.includes('cuanto')) {
            sendBotMessage('Precios');
            return;
        } else if (msgLower.includes('horario') || msgLower.includes('hora')) {
            sendBotMessage('Horarios');
            return;
        } else if (msgLower.includes('donde') || msgLower.includes('ubicacion') || msgLower.includes('direccion')) {
            sendBotMessage('Ubicación');
            return;
        } else if (msgLower.includes('promocion') || msgLower.includes('descuento') || msgLower.includes('oferta')) {
            sendBotMessage('Promociones');
            return;
        } else {
            botMsg.innerHTML = '<p>Gracias por tu mensaje. Para una atención personalizada, te recomiendo contactarnos por WhatsApp. ¿Te gustaría hacerlo ahora?</p>';
        }
        
        messagesContainer.appendChild(botMsg);
        
        const whatsappBtn = document.createElement('div');
        whatsappBtn.className = 'bot-message';
        whatsappBtn.innerHTML = `
            <div class="quick-replies">
                <button onclick="openWhatsAppFromBot()">📱 Contactar por WhatsApp</button>
            </div>
        `;
        messagesContainer.appendChild(whatsappBtn);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 500);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function openWhatsAppFromBot() {
    const url = 'https://wa.me/51922358283?text=Hola%20KP-Style,%20vengo%20desde%20el%20chatbot%20y%20necesito%20información';
    window.open(url, '_blank');
}

document.getElementById('chatbot-user-input')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

// ============================================
// EXIT POPUP
// ============================================
let exitPopupShown = false;

document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 0 && !exitPopupShown) {
        showExitPopup();
        exitPopupShown = true;
    }
});

function showExitPopup() {
    const popup = document.getElementById('exit-popup');
    if (popup) {
        popup.classList.add('active');
    }
}

function closeExitPopup() {
    const popup = document.getElementById('exit-popup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// ============================================
// EFECTO CONFETTI
// ============================================
function crearConfetti() {
    const colores = ['#D4AF37', '#FFB6C1', '#FFF', '#FFD700'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colores[Math.floor(Math.random() * colores.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const fallDuration = Math.random() * 3 + 2;
        const endLeft = parseFloat(confetti.style.left) + (Math.random() - 0.5) * 100;
        
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0, left: endLeft + '%' }
        ], {
            duration: fallDuration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, fallDuration * 1000);
    }
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
    }
});

// ============================================
// INICIALIZACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ KP-STYLE cargado correctamente');
    
    // Mostrar chatbot minimizado al inicio
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.classList.add('minimized');
    }
    
    // Mostrar exit popup después de 30 segundos (solo una vez)
    setTimeout(() => {
        if (!exitPopupShown) {
            showExitPopup();
            exitPopupShown = true;
        }
    }, 30000);
    
    // Log de debug
    console.log('📱 Sistema de promociones: Activo');
    console.log('💬 Chatbot: Activo');
    console.log('📸 Galería: Activa');
    console.log('⭐ Testimonios: Activos');
    console.log('❓ FAQ: Activo');
});
