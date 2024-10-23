// Este bloco inicializa três variáveis para referenciar elementos HTML que serão manipulados:
// dialogueText: onde o texto do diálogo será exibido.
// nameInput: o campo de entrada de texto onde o jogador digitará seu nome.
// dialogueBox: a caixa onde o diálogo será mostrado.
const dialogueText = document.getElementById('dialogue-text');
const nameInput = document.getElementById('name-input');
const dialogueBox = document.getElementById('dialogue-box');

// A variável "initialText" contém o texto inicial que será exibido no diálogo
// assim que a página carregar. É uma saudação do personagem do jogo, perguntando o nome do jogador.
// "index" controla a posição do caractere atual a ser exibido no texto, e "speed" define a velocidade de digitação.
const initialText = "Olá!! me chamo Duck e bem vindo ao Duck's Math, qual o seu nome?";
let index = 0;
let speed = 50;

// A variável "dialogues" contém um array de diálogos que o jogo mostrará após o jogador digitar seu nome.
// O primeiro diálogo complementa a resposta do jogador com seu nome, e o segundo prepara o jogador para o jogo.
const dialogues = [
    "Acho ___ um nome muito bonito! Bom, como já deve imaginar, eu sou um pato matemático...",
    "E hoje vou testar seus conhecimentos. Você está preparado?"
];

// currentStep controla o progresso do diálogo. Inicialmente, é 0 (o jogador ainda não começou a interagir).
let currentStep = 0;

// A função typeWriter recebe um texto como argumento e exibe esse texto gradualmente na tela, 
// como se estivesse sendo digitado por uma máquina de escrever. Quando todo o texto é exibido,
// uma função de callback pode ser chamada para executar ações adicionais.
function typeWriter(text, callback) {
    index = 0;  // Reinicia o índice para começar a digitar do início do texto.
    dialogueText.innerHTML = '';  // Limpa o conteúdo anterior da área de diálogo.
    dialogueBox.style.display = 'block';  // Exibe a caixa de diálogo.
    
    // Função interna que exibe os caracteres um por um com base na velocidade definida (speed).
    function typing() {
        if (index < text.length) {
            dialogueText.innerHTML += text.charAt(index);  // Adiciona o próximo caractere ao diálogo.
            index++;
            setTimeout(typing, speed);  // Chama a função novamente após um pequeno atraso.
        } else if (callback) {
            callback();  // Se todo o texto foi exibido, executa a função callback (se fornecida).
        }
    }
    
    typing();  // Inicia o processo de digitação.
}

// Quando a página carrega (window.onload), o jogo exibe o texto inicial através da função typeWriter.
// Depois que o texto é completamente exibido, o campo de entrada de nome (nameInput) é mostrado, permitindo
// que o jogador digite seu nome.
window.onload = function() {
    typeWriter(initialText, () => {
        nameInput.style.display = 'block';  // Mostra o campo de input após a digitação do texto inicial.
    });
};

// A função updateDialogue é usada para exibir o próximo diálogo do jogo. Assim como a typeWriter, ela
// exibe o texto gradualmente e, ao final, cria uma mensagem para o jogador pressionar "Enter" para continuar.
function updateDialogue(text, callback) {
    typeWriter(text, () => {
        const continueMessage = document.createElement('div');  // Cria um novo elemento para a mensagem de continuação.
        continueMessage.className = 'continue-message';  // Define a classe para estilizar a mensagem.
        continueMessage.innerText = 'Pressione Enter para continuar...';  // Define o texto da mensagem.
        dialogueText.appendChild(continueMessage);  // Adiciona a mensagem na área de diálogo.
        if (callback) callback();  // Executa a função callback se fornecida.
    });
}

// Este bloco escuta o evento de tecla "Enter" no campo de input (nameInput). Quando o jogador
// pressiona "Enter", ele verifica se o nome foi digitado. Se sim, o campo de input desaparece, 
// e o próximo diálogo é exibido, substituindo o espaço "___" pelo nome digitado.
nameInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const name = nameInput.value;  // Obtém o nome digitado pelo jogador.
        if (name) {  // Verifica se um nome foi inserido.
            nameInput.style.display = 'none';  // Oculta o campo de input.
            updateDialogue(dialogues[0].replace('___', name), () => {  // Atualiza o diálogo com o nome do jogador.
                currentStep = 1;  // Avança para o próximo estágio do diálogo.
            });
        }
    }
});

// Este bloco geral escuta o evento "Enter" em qualquer lugar do documento, permitindo que o jogador 
// avance nos diálogos do jogo ao pressionar essa tecla. Dependendo do estágio (currentStep), ele exibe
// o próximo diálogo ou redireciona o jogador para a próxima fase do jogo (tela de perguntas).
document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && currentStep === 1) {
        // Se o jogador está no primeiro estágio (após o nome), exibe o segundo diálogo.
        updateDialogue(dialogues[1], () => {
            currentStep = 2;  // Avança para o próximo estágio.
        });
    } else if (event.key === 'Enter' && currentStep === 2) {
        // Se o jogador está no segundo estágio, ele é redirecionado para a página de perguntas.
        window.location.href = 'perguntas.html'; 
    }
});