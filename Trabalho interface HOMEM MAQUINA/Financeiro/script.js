// Inicializa os lançamentos do localStorage ou cria um array vazio
let lancamentos = JSON.parse(localStorage.getItem('meus_lancamentos')) || [];

document.addEventListener('DOMContentLoaded', () => {
    configurarDataPadrao();
    atualizarDashboard();

    // Evento de envio do formulário de lançamento
    const form = document.querySelector('.form-lancamento form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        registrarLancamento();
    });

    // Evento de filtro por data
    const btnFiltrar = document.getElementById('btn-filtrar');
    btnFiltrar.addEventListener('click', filtrarPorData);
});

// Coloca a data de hoje automaticamente nos campos de data
function configurarDataPadrao() {
    const hoje = new Date().toISOString().split('T')[0];
    document.getElementById('data').value = hoje;
    document.getElementById('filtro-data').value = hoje;
}

function registrarLancamento() {
    const tipo = document.getElementById('tipo').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;
    const descricao = document.getElementById('descricao').value;

    const novoLancamento = { tipo, valor, data, descricao, id: Date.now() };

    lancamentos.push(novoLancamento);
    localStorage.setItem('meus_lancamentos', JSON.stringify(lancamentos));

    atualizarDashboard();
    document.querySelector('.form-lancamento form').reset();
    configurarDataPadrao();
    alert('Lançamento registrado com sucesso!');
}

function atualizarDashboard() {
    const hoje = new Date();
    
    const totais = {
        hoje: { rec: 0, des: 0 },
        semana: { rec: 0, des: 0 },
        mes: { rec: 0, des: 0 }
    };

    lancamentos.forEach(l => {
        const dataLancamento = new Date(l.data + 'T00:00:00');
        const valor = l.valor;

        // Lógica de hoje
        if (dataLancamento.toDateString() === hoje.toDateString()) {
            totais.hoje[l.tipo === 'receita' ? 'rec' : 'des'] += valor;
        }

        // Lógica do mês atual
        if (dataLancamento.getMonth() === hoje.getMonth() && dataLancamento.getFullYear() === hoje.getFullYear()) {
            totais.mes[l.tipo === 'receita' ? 'rec' : 'des'] += valor;
        }

        // Lógica da semana (últimos 7 dias)
        const diffTime = Math.abs(hoje - dataLancamento);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 7) {
            totais.semana[l.tipo === 'receita' ? 'rec' : 'des'] += valor;
        }
    });

    // Atualiza a interface
    exibirValores('hoje', totais.hoje);
    exibirValores('semana', totais.semana);
    exibirValores('mes', totais.mes);
}

function exibirValores(periodo, dados) {
    const recEl = document.getElementById(`rec-${periodo}`);
    const desEl = document.getElementById(`des-${periodo}`);
    const lucroEl = document.getElementById(`lucro-${periodo}`);

    recEl.innerText = `R$ ${dados.rec.toFixed(2).replace('.', ',')}`;
    desEl.innerText = `R$ ${dados.des.toFixed(2).replace('.', ',')}`;
    
    const lucro = dados.rec - dados.des;
    lucroEl.innerText = `R$ ${lucro.toFixed(2).replace('.', ',')}`;
    lucroEl.style.color = lucro >= 0 ? '#00e676' : '#ff5252';
}

function filtrarPorData() {
    const dataFiltro = document.getElementById('filtro-data').value;
    const resultadoDiv = document.getElementById('resultado-filtro');
    
    if (!dataFiltro) return;

    let rec = 0, des = 0;
    lancamentos.filter(l => l.data === dataFiltro).forEach(l => {
        if (l.tipo === 'receita') rec += l.valor;
        else des += l.valor;
    });

    const saldo = rec - des;
    resultadoDiv.innerHTML = `
        Dia ${dataFiltro.split('-').reverse().join('/')}: <br>
        <span style="color: #00e676">Entradas: R$ ${rec.toFixed(2)}</span> | 
        <span style="color: #ff5252">Saídas: R$ ${des.toFixed(2)}</span> | 
        <span>Saldo: R$ ${saldo.toFixed(2)}</span>
    `;
}