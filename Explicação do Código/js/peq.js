// Estas variáveis capturam elementos HTML que serão manipulados ao longo do jogo:
// - dialogueText: a área onde os textos de diálogo e instruções são exibidos.
// - questionContainer: o contêiner onde a pergunta atual será exibida.
// - questionText: o elemento que exibe o texto da pergunta.
// - option1, option2, option3: botões que representam as opções de resposta.
// - feedback: exibe mensagens indicando se o jogador acertou ou errou a pergunta.
// - feedbackContainer: um elemento criado dinamicamente para mostrar as mensagens de feedback.
const dialogueText = document.getElementById('dialogue-text');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const feedback = document.getElementById('feedback');
const feedbackContainer = document.createElement('div');

// O array "questions" contém uma série de perguntas e respostas para o jogo. 
// Cada objeto dentro do array representa uma pergunta com três opções de resposta, 
// além da resposta correta indicada pelo índice "answer". 
// Essas perguntas serão embaralhadas para apresentar ao jogador em ordem aleatória.
const questions = [
    {
        question: "Qual é a solução de x² + 1 = 0 no conjunto dos números complexos?",
        options: ["x = 1", "x = i", "x = -i"],
        answer: 1
    },
    {
        question: "Qual é a fórmula do número imaginário 'i' ao quadrado?",
        options: ["i² = 1", "i² = -1", "i² = 0"],
        answer: 1
    },
    {
        question: "Qual o volume de um cubo de aresta 4 cm?",
        options: ["16 cm³", "64 cm³", "32 cm³"],
        answer: 1
    },
    {
        question: "Qual é a soma dos expoentes do polinômio P(x) = x³ - 6x² + 11x - 6?",
        options: ["6", "0", "3"],
        answer: 0
    },
    {
        question: "Um cilindro reto tem altura de 12 cm e raio da base de 5 cm. Qual é o volume desse cilindro?",
        options: ["150πcm3", "300πcm3", "600πcm3"],
        answer: 1
    },
    {
        question: "O que representa a parte imaginária de um número complexo z = a + bi?",
        options: ["a", "b", "i"],
        answer: 1
    },
    {
        question: "Qual é o volume de uma esfera de raio 3 cm? (Use π ≈ 3.14)",
        options: ["113.04 cm³", "36π cm³", "150 cm³"],
        answer: 0
    },
    {
        question: "Quantas faces tem um dodecaedro?",
        options: ["12", "20", "6"],
        answer: 0
    },
    {
        question: "Qual é o determinante da matriz identidade 3x3?",
        options: ["0", "1", "3"],
        answer: 1
    },
    {
        question: "Qual o valor de i^4?",
        options: ["1", "0", "-1"],
        answer: 0
    },
    {
        question: "Qual é a equação do plano que passa pelos pontos A(1,0,0), B(0,1,0) e C(0,0,1)?",
        options: ["x + y + z = 1", "x - y + z = 0", "x + y + z = 0"],
        answer: 0
    },
    {
        question: "Se z = 2 + 3i, qual é o conjugado de z?",
        options: ["2 - 3i", "-2 + 3i", "2 + 3i"],
        answer: 0
    },
    {
        question: "Qual é o grau do polinômio P(x) = x³ - 4x² + 7x - 2?",
        options: ["1", "2", "3"],
        answer: 2
    },
    {
        question: "Qual o volume de um cilindro de raio 2 cm e altura 5 cm?",
        options: ["40π cm³", "20 cm³", "20π cm³"],
        answer: 2
    },
    {
        question: "Qual a solução da equação x² + 4 = 0 no conjunto dos números complexos?",
        options: ["x = 2i", "x = i", "x = -2i"],
        answer: 0
    }
];

// As variáveis "shuffledQuestions", "currentQuestionIndex" e "score" ajudam a controlar o progresso do jogo:
// - shuffledQuestions: armazenará as perguntas embaralhadas para garantir que o jogador veja as perguntas em uma ordem diferente a cada vez.
// - currentQuestionIndex: mantém o controle de qual pergunta o jogador está respondendo atualmente.
// - score: registra a pontuação do jogador, que aumenta a cada resposta correta.
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// A função "window.onload" é executada assim que a página é carregada. 
// Ela embaralha as perguntas e chama a função "typeWriter" para exibir uma mensagem de boas-vindas ao jogador.
// Depois que a mensagem é exibida, a função "showQuestion" é chamada para exibir a primeira pergunta.
window.onload = function() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);  // Embaralha as perguntas.
    typeWriter("Responda com calma, boa atividade!", () => {  // Exibe uma mensagem inicial.
        setTimeout(() => {
            dialogueText.classList.add('fade-out');  // Faz a mensagem inicial desaparecer após um tempo.
        }, 1000);
        setTimeout(showQuestion, 100);  // Chama a função para exibir a primeira pergunta.
    });
};

// A função "typeWriter" exibe o texto caractere por caractere, simulando o efeito de digitação.
// Quando todo o texto foi exibido, uma função de callback pode ser executada, permitindo que outra ação seja realizada.
function typeWriter(text, callback) {
    dialogueText.innerHTML = '';  // Limpa o conteúdo anterior do diálogo.
    let index = 0;  // Índice para controlar a posição no texto.
    
    // Função interna que exibe os caracteres um por um.
    function typing() {
        if (index < text.length) {
            dialogueText.innerHTML += text.charAt(index);  // Adiciona o próximo caractere ao diálogo.
            index++;
            setTimeout(typing, 50);  // Chama novamente após um breve intervalo.
        } else if (callback) {
            callback();  // Chama o callback quando o texto está completo.
        }
    }
    
    typing();  // Inicia o efeito de digitação.
}

// A função "showQuestion" exibe a pergunta atual na tela. Ela atualiza o texto da pergunta e as três opções de resposta.
// Também torna visíveis os botões de resposta e define ações específicas para quando o jogador clicar em uma das opções.
function showQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];  // Obtém a pergunta atual.
    questionText.innerText = currentQuestion.question;  // Exibe o texto da pergunta.
    option1.innerText = currentQuestion.options[0];  // Exibe a primeira opção de resposta.
    option2.innerText = currentQuestion.options[1];  // Exibe a segunda opção de resposta.
    option3.innerText = currentQuestion.options[2];  // Exibe a terceira opção de resposta.

    // Torna visível o contêiner da pergunta e os botões de opção.
    questionContainer.classList.remove('hidden');
    option1.classList.remove('hidden');
    option2.classList.remove('hidden');
    option3.classList.remove('hidden');

    // Define as ações que acontecem quando o jogador clica em uma das opções de resposta.
    option1.onclick = () => checkAnswer(0);  // Verifica se a primeira opção está correta.
    option2.onclick = () => checkAnswer(1);  // Verifica se a segunda opção está correta.
    option3.onclick = () => checkAnswer(2);  // Verifica se a terceira opção está correta.
}

// A função "checkAnswer" verifica se a opção escolhida pelo jogador está correta ou errada.
// Exibe uma mensagem de feedback e, se estiver correta, adiciona 20 pontos à pontuação do jogador.
function checkAnswer(selectedOption) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];  // Obtém a pergunta atual.
    feedback.classList.remove('hidden');  // Torna visível a área de feedback.

    // Verifica se a opção escolhida pelo jogador corresponde à resposta correta.
    if (selectedOption === currentQuestion.answer) {
        feedback.innerText = "Correto!";  // Exibe "Correto!" se a resposta for certa.
        feedback.className = "feedback-box correct";  // Adiciona uma classe CSS para estilizar o feedback.
        score += 20;  // Aumenta a pontuação.
    } else {
        feedback.innerText = "Incorreto!";  // Exibe "Incorreto!" se a resposta for errada.
        feedback.className = "feedback-box incorrect";  // Adiciona uma classe CSS para estilizar o feedback.
    }

    feedback.style.display = 'block';  // Exibe o feedback.

    // Após um intervalo, o feedback desaparece e a próxima pergunta é exibida.
    setTimeout(() => {
        feedback.style.display = 'none';  // Oculta o feedback.
        feedback.classList.add('hidden');
        currentQuestionIndex++;  // Avança para a próxima pergunta.
        
        // Se ainda houver perguntas, exibe a próxima; caso contrário, mostra a pontuação final.
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion();
        } else {
            displayFinalScore();  // Mostra a pontuação final do jogador.
        }
    }, 2000);  // O feedback é exibido por 2 segundos antes de desaparecer.
}

// A função "displayFinalScore" é chamada quando todas as perguntas foram respondidas.
// Ela exibe a pontuação final do jogador no contêiner de feedback.
function displayFinalScore() {
    feedback.innerText = `Fim das perguntas! Sua pontuação final é: ${score} pontos`;  // Mostra a pontuação final.
    feedback.className = "feedback-box correct";  // Estiliza a mensagem final.
    feedback.style.display = 'block';  // Torna a mensagem visível.
}

// Este bloco permite ao jogador retornar ao menu principal ao clicar no botão "returnMenuButton".
// O botão redireciona o jogador para a página "menu.html".
const returnMenuButton = document.querySelector('.return-menu');
returnMenuButton.onclick = function() {
    window.location.href = 'menu.html';  // Redireciona para o menu.
};