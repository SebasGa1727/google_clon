document.addEventListener('DOMContentLoaded', () => {
    // Referencias del DOM
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const clearBtn = document.getElementById('clearBtn');
    const suggestionsBox = document.getElementById('suggestionsBox');
    const appsMenuBtn = document.getElementById('appsMenuBtn');
    const appsMenu = document.getElementById('appsMenu');
    const micBtn = document.getElementById('micBtn');
    const lensBtn = document.getElementById('lensBtn');
    const micModal = document.getElementById('micModal');
    const lensModal = document.getElementById('lensModal');
    const searchSubmitBtn = document.getElementById('searchSubmitBtn');
    const luckyBtn = document.getElementById('luckyBtn');
    const toastBox = document.getElementById('toastBox');
    const googleLogo = document.getElementById('googleLogo');

    // Lista mock de sugerencias populares
    const mockKeywords = [
        'google translate',
        'google maps',
        'google drive',
        'google gemini',
        'google flights',
        'google docs',
        'google scholar',
        'clima hoy',
        'noticias del mundo',
        'calculadora online',
        'conversor de divisas',
        'youtube videos'
    ];

    // Mostrar / Ocultar botón de limpiar (clearBtn) y filtrar sugerencias
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        
        if (query.length > 0) {
            clearBtn.style.display = 'flex';
            renderSuggestions(query);
        } else {
            clearBtn.style.display = 'none';
            suggestionsBox.classList.remove('active');
        }
    });

    // Limpiar texto al hacer clic en X
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        suggestionsBox.classList.remove('active');
        searchInput.focus();
    });

    // Renderizar sugerencias interactivas
    function renderSuggestions(query) {
        const matches = mockKeywords.filter(item => item.includes(query)).slice(0, 6);
        
        if (matches.length === 0) {
            suggestionsBox.classList.remove('active');
            return;
        }

        suggestionsBox.innerHTML = '';
        matches.forEach(item => {
            const row = document.createElement('div');
            row.className = 'suggestion-item';
            
            // Resaltar texto coincidente
            const regex = new RegExp(`(${query})`, 'gi');
            const highlighted = item.replace(regex, '<strong>$1</strong>');

            row.innerHTML = `
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <span>${highlighted}</span>
            `;

            row.addEventListener('click', () => {
                searchInput.value = item;
                executeSearch(item);
            });

            suggestionsBox.appendChild(row);
        });

        suggestionsBox.classList.add('active');
    }

    // Ocultar sugerencias si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-wrapper')) {
            suggestionsBox.classList.remove('active');
        }
        if (!e.target.closest('#appsMenuBtn') && !e.target.closest('#appsMenu')) {
            appsMenu.classList.remove('open');
        }
    });

    // Enviar formulario (Búsqueda funcional)
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        executeSearch(searchInput.value.trim());
    });

    searchSubmitBtn.addEventListener('click', () => {
        executeSearch(searchInput.value.trim());
    });

    // Función para ejecutar búsqueda
    function executeSearch(query) {
        if (!query) {
            showToast('Por favor escribe algo para buscar');
            searchInput.focus();
            return;
        }
        // Redirecciona a la búsqueda oficial de Google
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }

    // Botón "Voy a tener suerte" -> Redirecciona a Doodles o primera coincidencia
    luckyBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I`;
        } else {
            window.location.href = 'https://www.google.com/doodles';
        }
    });

    // Alternar Menú de Apps de Google
    appsMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        appsMenu.classList.toggle('open');
    });

    // Modales de Micrófono y Lens
    micBtn.addEventListener('click', () => {
        micModal.classList.add('open');
    });

    lensBtn.addEventListener('click', () => {
        lensModal.classList.add('open');
    });

    // Efecto lúdico en el logo (Onda Neón animada en letras)
    googleLogo.addEventListener('click', () => {
        const letters = googleLogo.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transform = 'translateY(-14px) scale(1.15)';
                setTimeout(() => {
                    letter.style.transform = '';
                }, 280);
            }, index * 60);
        });
    });

    // Cerrar modales al hacer clic en el backdrop
    [micModal, lensModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModals();
            }
        });
    });

    // Dropzone de Google Lens simulada
    const lensDropzone = document.getElementById('lensDropzone');
    lensDropzone.addEventListener('click', () => {
        showToast('Búsqueda visual de Lens simulada');
        setTimeout(closeModals, 800);
    });

    // Toast helper
    function showToast(message) {
        toastBox.textContent = message;
        toastBox.classList.add('show');
        setTimeout(() => {
            toastBox.classList.remove('show');
        }, 3000);
    }

    // Atajos de teclado: ESC para cerrar menús
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
            suggestionsBox.classList.remove('active');
            appsMenu.classList.remove('open');
        }
    });
});

// Funciones globales para botones onclick
function closeModals() {
    document.getElementById('micModal').classList.remove('open');
    document.getElementById('lensModal').classList.remove('open');
}

function switchLanguage(lang) {
    const toast = document.getElementById('toastBox');
    toast.textContent = `Idioma seleccionado: ${lang}`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}