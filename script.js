// Selecionando todos os projetos
const projetos = document.querySelectorAll('.projeto');

// Adicionando evento mousemove para cada projeto
projetos.forEach((projeto) => {
  projeto.addEventListener('mousemove', (e) => {
    const rect = projeto.getBoundingClientRect();

    // Calcula a posição do mouse em relação ao centro do projeto
    const x = (e.clientX - rect.left) / rect.width;  // Posição X normalizada (0 a 1)
    const y = (e.clientY - rect.top) / rect.height; // Posição Y normalizada (0 a 1)

    // Ajusta os valores para a rotação (variação de -30 a 30 graus para mais intensidade)
    const rotateX = (y - 0.5) * 60; // Inclinação no eixo X
    const rotateY = (x - 0.5) * -60; // Inclinação no eixo Y

    // Aplicar a rotação e escala
    if (!projeto.style.transform.includes('rotateY(180deg)')) { // Apenas se não estiver virado
      projeto.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
    }
  });

  // Adicionando evento de clique para virar o card
  projeto.addEventListener('click', () => {
    // Alterna entre a parte da frente e a parte de trás
    if (projeto.style.transform.includes('rotateY(180deg)')) {
      projeto.style.transform = 'rotateY(0deg)'; // Volta para a parte da frente
    } else {
      projeto.style.transform = 'rotateY(180deg)'; // Vira para a parte de trás
    }
  });

  projeto.addEventListener('mouseleave', () => {
    projeto.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`; // Restaura a rotação inicial
  });
});

// Seleciona o elemento do cursor personalizado
const customCursor = document.querySelector('.custom-cursor');

// Função para mover o flash do cursor conforme o movimento do mouse
document.addEventListener('mousemove', (e) => {
  // Calcula a posição do cursor (ajusta para centralizar o efeito)
  const x = e.clientX - customCursor.offsetWidth / 2;
  const y = e.clientY - customCursor.offsetHeight / 2;
  
  // Aplica a transformação para mover o efeito
  customCursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});
