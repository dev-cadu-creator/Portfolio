// =========================================
// 1. ABRIR E FECHAR A GAVETA DO CARRINHO
// =========================================
const carrinho = document.getElementById('carrinho');
const btnFechar = document.querySelector('.btn-fechar-carrinho');
const btnAbrirCarrinho = document.querySelector('.icone-carrinho');

// Fechar
if (btnFechar && carrinho) {
    btnFechar.addEventListener('click', () => {
        carrinho.classList.remove('aberto');
    });
}

// Abrir pelo botão flutuante
if (btnAbrirCarrinho && carrinho) {
    btnAbrirCarrinho.addEventListener('click', (event) => {
        event.preventDefault();
        carrinho.classList.add('aberto');
    });
}

// =========================================
// 2. A MÁGICA DE ADICIONAR PRODUTOS
// =========================================
let itensNoCarrinho = []; 

function atualizarCarrinho() {
    const containerItens = document.querySelector('.itens-carrinho');
    const valorTotalElemento = document.querySelector('.valor-total');
    const contadorCarrinho = document.getElementById('contador-carrinho');

    if (!containerItens) return;

    containerItens.innerHTML = ''; 
    let total = 0;

    itensNoCarrinho.forEach((item, index) => {
        containerItens.innerHTML += `
            <div class="item-no-carrinho">
                <img src="${item.imagem}" alt="${item.nome}" class="img-mini-carrinho">
                <div class="info-item-carrinho">
                    <h4>${item.nome}</h4>
                    <span class="preco-item-carrinho">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                </div>
            </div>
        `;
        total += item.preco;
    });
    function adicionarItem(produto) {
    // ... seu código que adiciona o item ao carrinho ...

    // Verifica se é uma tela de celular (largura menor ou igual a 768px)
    if (window.innerWidth <= 768) {
        // Esconde a div do carrinho. Troque 'id-do-seu-carrinho' pelo ID real que você usou.
        document.getElementById('id-do-seu-carrinho').style.display = 'none'; 
        
        // Opcional: Mostrar um alert rápido ou um "Toast" (notificação) dizendo "Adicionado!"
        alert('Item adicionado ao carrinho!');
    }
}

    if (valorTotalElemento) {
        valorTotalElemento.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    
    if (contadorCarrinho) {
        contadorCarrinho.innerText = itensNoCarrinho.length;
    }
}

// CONFIGURAÇÃO DOS BOTÕES DE COMPRA (AGORA USANDO DATA-ATTRIBUTES)
const botoesComprar = document.querySelectorAll('.btn-comprar');

botoesComprar.forEach(botao => {
    botao.addEventListener('click', function(event) {
        try {
            // Puxa os dados EXATOS e limpos que deixamos no HTML
            const nome = this.getAttribute('data-nome');
            const preco = parseFloat(this.getAttribute('data-preco'));
            
            // Puxa a imagem
            const card = this.closest('.card-produto');
            const imgTag = card.querySelector('.imagem-produto');
            const imagem = imgTag ? imgTag.getAttribute('src') : '';

            if (!nome || isNaN(preco)) {
                console.error("Erro: Produto configurado incorretamente no HTML.");
                return;
            }

            // Adiciona ao Array
            itensNoCarrinho.push({
                nome: nome,
                imagem: imagem,
                preco: preco
            });
            
            // Roda a atualização visual
            atualizarCarrinho();
            
            // Feedback visual de "piscada" no contador
            const contador = document.getElementById('contador-carrinho');
            if (contador) {
                contador.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    contador.style.transform = 'scale(1)';
                }, 300);
            }

            // Abre a gaveta automaticamente
            if (carrinho) carrinho.classList.add('aberto');

        } catch (erro) {
            console.error("Ops! Algo quebrou ao adicionar o produto:", erro);
        }
    }); 
}); 

// =========================================
// 3. FINALIZAR COMPRA (LÓGICA DE PLANTÃO MANTIDA)
// =========================================
const btnFinalizar = document.querySelector('.btn-finalizar-compra');

if (btnFinalizar) {
    btnFinalizar.addEventListener('click', function() {
        if (itensNoCarrinho.length === 0) {
            alert("Seu carrinho está vazio! Adicione alguns produtos primeiro.");
            return;
        }

        const zapNayara = "5534997340117"; 
        const zapTamires = "5534999999992"; 

        const dataBase = new Date(2026, 3, 7); // Mês começa no 0 (3 = Abril)
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0); 

        const diferencaDias = Math.floor((hoje - dataBase) / (1000 * 60 * 60 * 24));

        let zapPlantao = (diferencaDias % 2 === 0) ? zapNayara : zapTamires;
        let nomePlantao = (diferencaDias % 2 === 0) ? "Nayara" : "Tamires";

        let textoPedido = `Olá ${nomePlantao}! Gostaria de finalizar o seguinte pedido pelo site:\n\n`;
        let total = 0;

        itensNoCarrinho.forEach(item => {
            textoPedido += `- ${item.nome} (R$ ${item.preco.toFixed(2).replace('.', ',')})\n`;
            total += item.preco;
        });

        textoPedido += `\n*Total a pagar: R$ ${total.toFixed(2).replace('.', ',')}*`;

        const textoFormatado = encodeURIComponent(textoPedido);
        window.open(`https://wa.me/${zapPlantao}?text=${textoFormatado}`, '_blank');
    });
}

// =========================================
// 4. BOTÃO VOLTAR AO TOPO
// =========================================
const btnTopo = document.getElementById("btn-topo");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if (btnTopo) btnTopo.style.display = "flex"; // Alterado para flex para alinhar o ícone
    } else {
        if (btnTopo) btnTopo.style.display = "none";
    }
};

if (btnTopo) {
    btnTopo.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// =========================================
// 5. ESVAZIAR O CARRINHO
// =========================================
const btnLimpar = document.getElementById('btn-limpar-carrinho');

if (btnLimpar) {
    btnLimpar.addEventListener('click', function() {
        if (itensNoCarrinho.length === 0) {
            alert("O carrinho já está vazio!");
            return;
        }
        itensNoCarrinho = [];
        atualizarCarrinho();
    });
}

// =========================================
// 6. LÓGICA DE CONTATO (WHATSAPP GERAL)
// =========================================
const botaoVendas = document.getElementById('btn-whatsapp-vendas');
const botaoAssistencia = document.getElementById('btn-whatsapp-dinamico');

function chamarNoZap(event, setor) {
    event.preventDefault(); 

    const zapNayara = "5534997340117"; 
    const zapTamires = "5534999999992";

    const dataBase = new Date(2026, 3, 7); 
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); 

    const diferencaDias = Math.floor((hoje - dataBase) / (1000 * 60 * 60 * 24));

    let zapPlantao = (diferencaDias % 2 === 0) ? zapNayara : zapTamires;
    let nomePlantao = (diferencaDias % 2 === 0) ? "Nayara" : "Tamires";

    let mensagem = "";
    if (setor === "vendas") {
        mensagem = `Olá ${nomePlantao}! Vim pelo site da myPhone e gostaria de falar com uma vendedora.`;
    } else if (setor === "assistencia") {
        mensagem = `Olá ${nomePlantao}! Vim pelo site da myPhone e preciso de um orçamento de assistência técnica.`;
    }

    window.open(`https://wa.me/${zapPlantao}?text=${encodeURIComponent(mensagem)}`, '_blank');
}

if (botaoVendas) {
    botaoVendas.addEventListener('click', (e) => chamarNoZap(e, "vendas"));
}
if (botaoAssistencia) {
    botaoAssistencia.addEventListener('click', (e) => chamarNoZap(e, "assistencia"));
}

// =========================================
// 7. SCROLL SUAVE NA LOGO
// =========================================
const logoLink = document.querySelector('.logo-link');

if (logoLink) {
    logoLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evita o bug do link com id fixo
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
