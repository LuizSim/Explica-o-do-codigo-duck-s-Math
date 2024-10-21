// Seleciona o elemento HTML onde o texto do diálogo será exibido (com o id 'dialogue-text')
const dialogueText = document.getElementById('dialogue-text');

// Seleciona o campo de input onde o jogador inserirá seu nome (com o id 'name-input')
const nameInput = document.getElementById('name-input');

// Seleciona o contêiner da caixa de diálogo (com o id 'dialogue-box')
const dialogueBox = document.getElementById('dialogue-box');

// Define o texto inicial que será exibido na caixa de diálogo
const initialText = "Olá!! me chamo Duck e bem vindo ao Duck's Math, qual o seu nome?";

// Variável que controla o índice atual do texto a ser exibido (para o efeito de digitação)
let index = 0;

// Velocidade de digitação do texto (em milissegundos)
let speed = 50; // 50ms por caractere

// Array contendo os diálogos subsequentes que serão mostrados após o nome do jogador ser inserido
const dialogues = [
    // O primeiro diálogo usará o nome do jogador para personalizar a mensagem
    "Acho ___ um nome muito bonito! Bom, como já deve imaginar, eu sou um pato matemático...",
    // O segundo diálogo desafia o jogador para uma atividade
    "E hoje vou testar seus conhecimentos. Você está preparado?"
];

// Variável que controla o passo atual do diálogo (para saber em que etapa o jogador está)
let currentStep = 0;

// Função que simula o efeito de digitação, exibindo o texto caractere por caractere
function typeWriter(text, callback) {
    // Reseta o índice para começar do início do texto
    index = 0;
    // Limpa qualquer texto existente no elemento de diálogo
    dialogueText.innerHTML = '';
    // Garante que a caixa de diálogo esteja visível
    dialogueBox.style.display = 'block';

    // Função interna que adiciona um caractere de cada vez ao diálogo
    function typing() {
        if (index < text.length) {
            // Adiciona o caractere atual ao conteúdo da caixa de diálogo
            dialogueText.innerHTML += text.charAt(index);
            // Incrementa o índice para pegar o próximo caractere
            index++;
            // Chama a função de digitação de novo após o tempo definido pela velocidade
            setTimeout(typing, speed);
        } else if (callback) {
            // Se o texto estiver completo e houver um callback, executa-o
            callback();
        }
    }
    typing(); // Inicia o processo de digitação
}

// Função que é executada quando a página é carregada
window.onload = function() {
    // Exibe o texto inicial com o efeito de digitação
    typeWriter(initialText, () => {
        // Quando o texto termina de ser digitado, o campo de input para o nome do jogador é exibido
        nameInput.style.display = 'block';
    });
};

// Função que atualiza o diálogo na tela com o próximo texto e uma mensagem de continuar
function updateDialogue(text, callback) {
    // Exibe o novo texto com o efeito de digitação
    typeWriter(text, () => {
        // Cria um novo elemento que indica para o jogador que ele pode continuar pressionando Enter
        const continueMessage = document.createElement('div');
        continueMessage.className = 'continue-message'; // Classe CSS para estilização
        continueMessage.innerText = 'Pressione Enter para continuar...'; // Mensagem exibida
        // Adiciona essa mensagem ao final do diálogo
        dialogueText.appendChild(continueMessage);

        // Se houver um callback, executa-o após a digitação do texto
        if (callback) callback();
    });
}

// Adiciona um "event listener" no campo de input de nome, que será acionado quando o jogador pressiona Enter
nameInput.addEventListener('keypress', (event) => {
    // Verifica se a tecla pressionada foi "Enter"
    if (event.key === 'Enter') {
        // Captura o valor inserido pelo jogador no campo de nome
        const name = nameInput.value;

        // Se o jogador tiver inserido um nome
        if (name) {
            // Esconde o campo de input de nome
            nameInput.style.display = 'none';

            // Atualiza o diálogo, inserindo o nome do jogador no primeiro diálogo
            updateDialogue(dialogues[0].replace('___', name), () => {
                // Define a etapa atual do diálogo como 1
                currentStep = 1;
            });
        }
    }
});

// Adiciona um "event listener" no documento para detectar quando o jogador pressiona Enter
document.addEventListener('keypress', (event) => {
    // Verifica se a tecla pressionada foi "Enter" e se o diálogo está no passo 1
    if (event.key === 'Enter' && currentStep === 1) {
        // Atualiza o diálogo para a segunda mensagem
        updateDialogue(dialogues[1], () => {
            // Define a etapa atual do diálogo como 2
            currentStep = 2;
        });
    // Se o jogador pressionar Enter enquanto estiver no passo 2
    } else if (event.key === 'Enter' && currentStep === 2) {
        // Redireciona o jogador para a página 'perguntas.html', onde as perguntas do jogo começam
        window.location.href = 'perguntas.html'; 
    }
});
