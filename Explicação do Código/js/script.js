// Este bloco seleciona os elementos HTML relacionados ao botão "Sobre" e à janela modal de descrição.
// Esses elementos serão utilizados para abrir e fechar a janela que contém informações sobre o jogo.
// Quando o usuário clica no botão "Sobre", a janela modal é exibida com uma animação de entrada (fade-in).
// Ao clicar no botão de fechar, a janela desaparece gradualmente com uma animação de saída (fade-out).
const descriptionButton = document.getElementById('description-button');
const descriptionModal = document.getElementById('description-modal');
const closeDescriptionButton = document.getElementById('close-description');

// Adiciona um evento ao botão "Sobre" para exibir a modal com informações do jogo.
// O modal aparece com uma animação suave ao ser clicado no botão "Sobre".
descriptionButton.addEventListener('click', () => {
    descriptionModal.style.display = 'block';
    descriptionModal.classList.remove('fade-out');
    descriptionModal.classList.add('fade-in');
});

// Adiciona um evento ao botão de fechar a janela modal de descrição.
// O modal desaparece suavemente com uma animação de "fade-out" e é completamente oculto após 0,5 segundos.
closeDescriptionButton.addEventListener('click', () => {
    descriptionModal.classList.remove('fade-in');
    descriptionModal.classList.add('fade-out');
    setTimeout(() => {
        descriptionModal.style.display = 'none';
    }, 500);
});

// Este bloco lida com o botão "Sair" e a janela modal de confirmação de saída.
// Quando o usuário clica em "Sair", a janela de confirmação aparece, perguntando se ele deseja realmente sair do jogo.
// O jogador tem a opção de confirmar (fechar a aba) ou cancelar (fechar a janela de confirmação).
const exitButton = document.getElementById('exit-button');
const confirmationModal = document.getElementById('confirmationModal');
const confirmExitButton = document.getElementById('confirmExit');
const cancelExitButton = document.getElementById('cancelExit');

// Ao clicar no botão "Sair", a janela modal de confirmação de saída é exibida com uma animação de entrada.
exitButton.addEventListener('click', () => {
    confirmationModal.style.display = 'block';
    confirmationModal.classList.remove('fade-out');
    confirmationModal.classList.add('fade-in');
});

// Ao clicar no botão "Não", a janela modal de confirmação desaparece com uma animação de "fade-out",
// e após 0,5 segundos, ela é completamente ocultada, cancelando o pedido de saída.
cancelExitButton.addEventListener('click', () => {
    confirmationModal.classList.remove('fade-in');
    confirmationModal.classList.add('fade-out');
    setTimeout(() => {
        confirmationModal.style.display = 'none';
    }, 500);
});

// Ao clicar no botão "Sim", a aba atual do navegador tenta ser fechada.
// Em alguns navegadores modernos, o fechamento de abas pode ser bloqueado por questões de segurança.
confirmExitButton.addEventListener('click', () => {
    window.open('', '_self').close();
});

// Este bloco lida com o botão "Jogar", que redireciona o jogador para a página principal do jogo.
// Ao clicar, o jogador é levado para a página "game.html", onde o jogo realmente acontece.
const playButton = document.getElementById('play-button');

playButton.addEventListener('click', () => {
    window.location.href = 'game.html';
});