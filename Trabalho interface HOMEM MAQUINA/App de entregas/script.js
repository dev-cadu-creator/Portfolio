// Função disparada para calcular o lucro da corrida
function calcular() {
    const valorBruto = parseFloat(document.getElementById('valorBruto').value);
    const distanciaKM = parseFloat(document.getElementById('distanciaKM').value);
    const resultadoDiv = document.getElementById('resultado');
    const resLucro = document.getElementById('resLucro');
    const resMargem = document.getElementById('resMargem');
    const msgElement = document.getElementById('msg');

    // Validação de entrada
    if (isNaN(valorBruto) || isNaN(distanciaKM) || valorBruto <= 0 || distanciaKM <= 0) {
        alert("Preencha os valores corretamente, parceiro!");
        return;
    }

    // Configuração de custo baseada no seu Voyage G8
    const custoPorKm = 0.50; 
    const custoRota = distanciaKM * custoPorKm;
    const lucroLiquido = valorBruto - custoRota;
    const margem = (lucroLiquido / valorBruto) * 100;

    // Exibição dos resultados formatados
    resultadoDiv.style.display = 'block';
    resLucro.innerHTML = `Lucro Líquido: <strong>R$ ${lucroLiquido.toFixed(2).replace('.', ',')}</strong>`;
    resMargem.innerHTML = `Margem: ${margem.toFixed(1)}% | Custo Rota: R$ ${custoRota.toFixed(2).replace('.', ',')}`;

    // Feedback visual de performance da rota
    if (margem >= 50) {
        msgElement.innerHTML = "✅ ROTA BOA! PODE IR.";
        msgElement.style.color = "#00e676";
        resultadoDiv.style.borderLeft = "5px solid #00e676";
    } else {
        msgElement.innerHTML = "⚠️ ROTA RUIM! CILADA.";
        msgElement.style.color = "#ff5252";
        resultadoDiv.style.borderLeft = "5px solid #ff5252";
    }
}

// Lógica de controle do Modal de Logout e inicialização
document.addEventListener('DOMContentLoaded', () => {
    const btnSair = document.getElementById('btn-logout');
    const modal = document.getElementById('modal-sair');
    const btnSim = document.getElementById('confirmar-sair');
    const btnNao = document.getElementById('cancelar-sair');

    if (btnSair && modal) {
        // Abre o modal estilizado em vez do confirm() padrão do navegador
        btnSair.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        // Confirmação de saída: redireciona para o login
        btnSim.addEventListener('click', () => {
            window.location.href = "../Login/index.html";
        });

        // Cancelamento: apenas fecha o modal e volta ao app
        btnNao.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Fecha o modal se o usuário clicar fora da caixa de conteúdo
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});