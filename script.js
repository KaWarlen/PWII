// 1. Modo Claro / Escuro
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.body.removeAttribute('data-theme');
    } else {
        document.body.setAttribute('data-theme', 'dark');
    }
});

// 2. Mudar Cor do Card
function changeCardColor(event, btn) {
    // Impede que o clique no botão ative a centralização do card
    event.stopPropagation();

    const card = btn.closest('.card');
    let currentColorIndex = parseInt(card.getAttribute('data-color-index') || '0');
    
    // Altera entre 0 e 1 (dois padrões de cor de fundo)
    currentColorIndex = (currentColorIndex + 1) % 2;
    card.setAttribute('data-color-index', currentColorIndex);
    
    // Removemos os estilos inline para que o CSS faça o trabalho de colorir
    card.style.backgroundColor = '';
    const name = card.querySelector('.name');        
    const role = card.querySelector('.role');        
    const skillsH4 = card.querySelector('.skills h4'); 
    
    if(name) name.style.color = '';
    if(role) role.style.color = '';
    if(skillsH4) skillsH4.style.color = '';
}

// 3. Seguir / Deixar de Seguir
function toggleFollow(event, btn) {
    event.stopPropagation();

    const card = btn.closest('.card');
    const followersSpan = card.querySelector('.followers-count');
    let followersCount = parseInt(followersSpan.textContent.replace(/\D/g, ''));

    const isFollowing = btn.classList.contains('following');

    if (isFollowing) {
        // Deixar de seguir
        followersCount--;
        btn.classList.remove('following');
        btn.textContent = 'Seguir';
    } else {
        // Seguir
        followersCount++;
        btn.classList.add('following');
        btn.textContent = 'Deixar de Seguir';
    }

    followersSpan.textContent = followersCount;
}

// 4. Trocar Avatar para imagem do PC
function swapAvatar(event, btn) {
    event.stopPropagation();

    const card = btn.closest('.card');
    const imgInfo = card.querySelector('.avatar');

    // Cria um elemento de input do tipo arquivo dinamicamente
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Aceita apenas imagens

    fileInput.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            // Cria um link temporário local para a imagem selecionada
            const imageUrl = URL.createObjectURL(file);
            imgInfo.src = imageUrl;

            // Opcional: Limpar a memória do navegador após o carregamento
            imgInfo.onload = function() {
                URL.revokeObjectURL(imageUrl);
            };
        }
    };

    // Simula o clique para abrir a janela do sistema (Explorador de Arquivos)
    fileInput.click();
}

// 5. Centralizar Card no Clique
const cards = document.querySelectorAll('.card');
const overlay = document.getElementById('overlay');

cards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Se clicar nos botões, não centraliza (já tratado com stopPropagation)
        
        // Ativar/Desativar card
        if (this.classList.contains('active')) {
            closeActiveCard();
        } else {
            closeActiveCard(); // fecha outros se abertos
            this.classList.add('active');
            overlay.classList.add('active');
        }
    });
});

overlay.addEventListener('click', closeActiveCard);

function closeActiveCard() {
    const activeCard = document.querySelector('.card.active');
    if (activeCard) {
        activeCard.classList.remove('active');
        overlay.classList.remove('active');
    }
}
