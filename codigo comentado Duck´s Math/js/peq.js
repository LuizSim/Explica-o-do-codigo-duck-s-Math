// Seleciona o elemento onde o texto do diálogo será exibido (com o id 'dialogue-text')
const dialogueText = document.getElementById('dialogue-text');

// Seleciona o contêiner que vai conter a pergunta e as opções (com o id 'question-container')
const questionContainer = document.getElementById('question-container');

// Seleciona o elemento onde o texto da pergunta será exibido (com o id 'question-text')
const questionText = document.getElementById('question-text');

// Seleciona os elementos onde as opções de resposta serão exibidas (com os ids 'option1', 'option2', e 'option3')
const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');

// Seleciona o elemento onde o feedback (correto/incorreto) será exibido após o usuário responder (com o id 'feedback')
const feedback = document.getElementById('feedback');

// Cria um novo elemento para o contêiner de feedback
const feedbackContainer = document.createElement('div');

// Define o array de perguntas e respostas. Cada objeto tem uma pergunta, um array de opções e o índice da resposta correta
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

// Variável que conterá uma lista embaralhada das perguntas
let shuffledQuestions = [];

// Índice da pergunta atual que está sendo exibida
let currentQuestionIndex = 0;

// Pontuação do usuário
let score = 0;

// Função chamada quando a página é carregada
window.onload = function() {
    // Embaralha as perguntas aleatoriamente
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    // Exibe o texto inicial com efeito de digitação e, em seguida, oculta o diálogo e mostra a primeira pergunta
    typeWriter("Responda com calma, boa atividade!", () => {
        setTimeout(() => {
            // Adiciona um efeito de fade-out ao texto do diálogo
            dialogueText.classList.add('fade-out');
        }, 1000);

        // Mostra a primeira pergunta após um pequeno atraso
        setTimeout(showQuestion, 100);
    });
};

// Função que simula o efeito de digitação (mostra o texto caractere por caractere)
function typeWriter(text, callback) {
    dialogueText.innerHTML = ''; // Limpa o conteúdo atual do diálogo
    let index = 0; // Índice para controlar o caractere atual sendo exibido

    // Função interna que adiciona um caractere por vez ao elemento 'dialogueText'
    function typing() {
        if (index < text.length) {
            // Adiciona o próximo caractere ao conteúdo do diálogo
            dialogueText.innerHTML += text.charAt(index);
            index++; // Avança para o próximo caractere
            setTimeout(typing, 50); // Controla a velocidade da digitação (50ms por caractere)
        } else if (callback) {
            // Chama o callback quando o texto completo for exibido
            callback();
        }
    }
    typing(); // Inicia o efeito de digitação
}

// Função que exibe a pergunta atual e suas opções de resposta
function showQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]; // Pega a pergunta atual

    // Define o texto da pergunta e das opções de resposta nos elementos apropriados
    questionText.innerText = currentQuestion.question;
    option1.innerText = currentQuestion.options[0];
    option2.innerText = currentQuestion.options[1];
    option3.innerText = currentQuestion.options[2];

    // Garante que os elementos da pergunta e das opções estejam visíveis
    questionContainer.classList.remove('hidden');
    option1.classList.remove('hidden');
    option2.classList.remove('hidden');
    option3.classList.remove('hidden');

    // Associa funções de clique a cada opção, verificando se o usuário escolheu a resposta correta ou não
    option1.onclick = () => checkAnswer(0);
    option2.onclick = () => checkAnswer(1);
    option3.onclick = () => checkAnswer(2);
}

// Função que verifica se a resposta escolhida pelo usuário está correta
function checkAnswer(selectedOption) {
    const currentQuestion = shuffledQuestions[currentQuestionIndex]; // Pega a pergunta atual
    feedback.classList.remove('hidden'); // Garante que o feedback esteja visível

    // Verifica se a resposta selecionada está correta
    if (selectedOption === currentQuestion.answer) {
        // Se a resposta estiver correta, exibe "Correto!" e aplica a classe de estilo correta
        feedback.innerText = "Correto!";
        feedback.className = "feedback-box correct";
        score += 20; // Adiciona 20 pontos à pontuação do usuário
    } else {
        // Se a resposta estiver incorreta, exibe "Incorreto!" e aplica a classe de estilo incorreta
        feedback.innerText = "Incorreto!";
        feedback.className = "feedback-box incorrect";
    }

    feedback.style.display = 'block'; // Exibe o feedback visualmente

    // Aguarda 2 segundos antes de ocultar o feedback e mostrar a próxima pergunta ou o resultado final
    setTimeout(() => {
        feedback.style.display = 'none'; // Oculta o feedback
        feedback.classList.add('hidden'); // Reaplica a classe que esconde o feedback
        currentQuestionIndex++; // Avança para a próxima pergunta

        // Verifica se há mais perguntas; se sim, exibe a próxima, senão, exibe a pontuação final
        if (currentQuestionIndex < shuffledQuestions.length) {
            showQuestion(); // Exibe a próxima pergunta
        } else {
            displayFinalScore(); // Exibe a pontuação final
        }
    }, 2000); // Tempo de espera de 2 segundos antes de prosseguir
}

// Função que exibe a pontuação final quando todas as perguntas forem respondidas
function displayFinalScore() {
    feedback.innerText = `Fim das perguntas! Sua pontuação final é: ${score} pontos`; // Exibe a pontuação final
    feedback.className = "feedback-box correct"; // Aplica a classe de estilo "correct" para a pontuação final
    feedback.style.display = 'block'; // Torna o feedback visível
}

// Seleciona o botão de retorno ao menu principal (com a classe 'return-menu')
const returnMenuButton = document.querySelector('.return-menu');

// Define o comportamento do botão de retornar ao menu: redireciona o usuário para a página 'index.html'
returnMenuButton.onclick = function() {
    window.location.href = 'index.html'; // Redireciona para o menu principal
};