// Seleciona o botão de descrição (com o id 'description-button') e o armazena na variável descriptionButton
const descriptionButton = document.getElementById('description-button');

// Seleciona o modal de descrição (com o id 'description-modal') e o armazena na variável descriptionModal
const descriptionModal = document.getElementById('description-modal');

// Seleciona o botão de fechar a descrição (com o id 'close-description') e o armazena na variável closeDescriptionButton
const closeDescriptionButton = document.getElementById('close-description');

// Adiciona um "event listener" ao botão de descrição, que executa uma função quando o botão é clicado
descriptionButton.addEventListener('click', () => {
    // Quando o botão é clicado, o modal de descrição é exibido na tela (style.display = 'block' torna o elemento visível)
    descriptionModal.style.display = 'block';

    // Remove a classe 'fade-out' (se ela estiver presente) para garantir que o modal não tenha uma animação de "desaparecimento"
    descriptionModal.classList.remove('fade-out');

    // Adiciona a classe 'fade-in' para aplicar uma animação de "aparecimento" ao modal
    descriptionModal.classList.add('fade-in');
});

// Adiciona um "event listener" ao botão de fechar a descrição, que executa uma função quando o botão é clicado
closeDescriptionButton.addEventListener('click', () => {
    // Remove a classe 'fade-in' para interromper a animação de "aparecimento" do modal
    descriptionModal.classList.remove('fade-in');

    // Adiciona a classe 'fade-out' para aplicar uma animação de "desaparecimento" ao modal
    descriptionModal.classList.add('fade-out');

    // Após 500 milissegundos (tempo da animação), o modal é ocultado ajustando seu estilo display para 'none'
    setTimeout(() => {
        descriptionModal.style.display = 'none';
    }, 500); // O tempo da animação é de 500ms antes de o modal desaparecer completamente
});

// Seleciona o botão de sair (com o id 'exit-button') e o armazena na variável exitButton
const exitButton = document.getElementById('exit-button');

// Seleciona o modal de confirmação de saída (com o id 'confirmationModal') e o armazena na variável confirmationModal
const confirmationModal = document.getElementById('confirmationModal');

// Seleciona o botão para confirmar a saída (com o id 'confirmExit') e o armazena na variável confirmExitButton
const confirmExitButton = document.getElementById('confirmExit');

// Seleciona o botão para cancelar a saída (com o id 'cancelExit') e o armazena na variável cancelExitButton
const cancelExitButton = document.getElementById('cancelExit');

// Adiciona um "event listener" ao botão de sair, que exibe o modal de confirmação quando o botão é clicado
exitButton.addEventListener('click', () => {
    // Quando o botão "Sair" é clicado, o modal de confirmação de saída é exibido (style.display = 'block' torna o modal visível)
    confirmationModal.style.display = 'block';

    // Remove a classe 'fade-out' para garantir que o modal não tenha uma animação de "desaparecimento"
    confirmationModal.classList.remove('fade-out');

    // Adiciona a classe 'fade-in' para aplicar uma animação de "aparecimento" ao modal de confirmação
    confirmationModal.classList.add('fade-in');
});

// Adiciona um "event listener" ao botão de cancelar saída, que fecha o modal de confirmação quando o botão é clicado
cancelExitButton.addEventListener('click', () => {
    // Remove a classe 'fade-in' para interromper a animação de "aparecimento" do modal
    confirmationModal.classList.remove('fade-in');

    // Adiciona a classe 'fade-out' para aplicar uma animação de "desaparecimento" ao modal de confirmação
    confirmationModal.classList.add('fade-out');

    // Após 500 milissegundos, o modal de confirmação é ocultado ajustando seu estilo display para 'none'
    setTimeout(() => {
        confirmationModal.style.display = 'none';
    }, 500); // O tempo da animação é de 500ms antes de o modal desaparecer completamente
});

// Adiciona um "event listener" ao botão de confirmar saída, que fecha a janela quando o botão é clicado
confirmExitButton.addEventListener('click', () => {
    // Fecha a janela do navegador quando o usuário confirma a saída
    window.open('', '_self').close(); // '_self' faz referência à janela atual, e o método 'close()' fecha a janela
});

// Seleciona o botão de jogar (com o id 'play-button') e o armazena na variável playButton
const playButton = document.getElementById('play-button');

// Adiciona um "event listener" ao botão de jogar, que redireciona o usuário para a página 'game.html' quando o botão é clicado
playButton.addEventListener('click', () => {
    // Redireciona o usuário para a página 'game.html'
    window.location.href = 'game.html'; // Muda a URL da página atual para 'game.html', iniciando o jogo
});
