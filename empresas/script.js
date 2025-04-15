// Dados estruturados para empresas parceiras
const empresasParceiras = [
    {
        nome: "Supermercados Verdes",
        descricao: "Descontos exclusivos em produtos orgânicos e sustentáveis para participantes do programa.",
        beneficio: "10% de desconto em compras acima de R$ 100,00"
    },
    {
        nome: "EcoCasa - Materiais de Construção",
        descricao: "Materiais de construção sustentáveis e ecológicos com descontos especiais.",
        beneficio: "15% de desconto em produtos sustentáveis"
    },
    {
        nome: "ModaEco - Moda Sustentável",
        descricao: "Linha de roupas e acessórios produzidos com materiais reciclados.",
        beneficio: "Cupom de R$ 50,00 para primeira compra"
    },
    {
        nome: "BikeShare - Mobilidade Urbana",
        descricao: "Sistema de compartilhamento de bicicletas com benefícios para ecoativistas.",
        beneficio: "50% de desconto na primeira assinatura mensal"
    },
    {
        nome: "GreenTech - Eletrônicos Sustentáveis",
        descricao: "Dispositivos eletrônicos com tecnologia de baixo impacto ambiental.",
        beneficio: "Bônus de 100 pontos em primeira compra"
    }
];

// Dados estruturados para serviços exclusivos
const servicosExclusivos = [
    {
        nome: "Consultoria Ambiental Gratuita",
        descricao: "Sessão de consultoria para otimizar práticas sustentáveis em sua residência ou empresa."
    },
    {
        nome: "Workshop de Reciclagem Online",
        descricao: "Aulas mensais sobre técnicas de reciclagem, compostagem e redução de resíduos."
    },
    {
        nome: "Kit Sustentabilidade",
        descricao: "Kits personalizados com produtos reutilizáveis e dicas de consumo consciente."
    }
];

// Dados estruturados para benefícios do programa
const beneficiosPrograma = [
    {
        nome: "Pontuação Progressiva",
        descricao: "Quanto mais você recicla, mais pontos acumula. Níveis de participação com benefícios crescentes."
    },
    {
        nome: "Certificado de Impacto Ambiental",
        descricao: "Receba um certificado personalizado calculando sua contribuição para a redução de resíduos."
    },
    {
        nome: "Seguro Verde",
        descricao: "Descontos especiais em seguros residenciais e de automóvel para participantes ativos."
    },
    {
        nome: "Transferência Social",
        descricao: "Opção de converter pontos em doações para projetos socioambientais em sua comunidade."
    }
];

// Função para carregar as empresas parceiras
function carregarEmpresas() {
    const empresasContainer = document.getElementById('empresas-container');
    
    empresasParceiras.forEach(empresa => {
        const empresaItem = document.createElement('div');
        empresaItem.className = 'empresas-item';
        
        const titulo = document.createElement('h3');
        titulo.textContent = empresa.nome;
        
        const descricao = document.createElement('p');
        descricao.textContent = empresa.descricao;
        
        const beneficio = document.createElement('p');
        beneficio.textContent = `Benefício: ${empresa.beneficio}`;
        
        empresaItem.appendChild(titulo);
        empresaItem.appendChild(descricao);
        empresaItem.appendChild(beneficio);
        
        empresasContainer.appendChild(empresaItem);
    });
}

// Função para carregar os serviços exclusivos
function carregarServicos() {
    const servicosContainer = document.getElementById('servicos-container');
    
    servicosExclusivos.forEach(servico => {
        const servicoItem = document.createElement('div');
        servicoItem.className = 'servicos-item';
        
        const titulo = document.createElement('h3');
        titulo.textContent = servico.nome;
        
        const descricao = document.createElement('p');
        descricao.textContent = servico.descricao;
        
        servicoItem.appendChild(titulo);
        servicoItem.appendChild(descricao);
        
        servicosContainer.appendChild(servicoItem);
    });
}

// Função para carregar os benefícios do programa
function carregarBeneficios() {
    const beneficiosContainer = document.getElementById('beneficios-container');
    
    beneficiosPrograma.forEach(beneficio => {
        const beneficioItem = document.createElement('div');
        beneficioItem.className = 'benefit-item';
        
        const titulo = document.createElement('h3');
        titulo.textContent = beneficio.nome;
        
        const descricao = document.createElement('p');
        descricao.textContent = beneficio.descricao;
        
        beneficioItem.appendChild(titulo);
        beneficioItem.appendChild(descricao);
        
        beneficiosContainer.appendChild(beneficioItem);
    });
}

// Carregar todos os dados quando a página estiver completamente carregada
document.addEventListener('DOMContentLoaded', function() {
    carregarEmpresas();
    carregarServicos();
    carregarBeneficios();
});