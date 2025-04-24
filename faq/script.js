
        // Inicializa o Mermaid para renderizar o diagrama ER
        document.addEventListener('DOMContentLoaded', function() {
          mermaid.initialize({
              startOnLoad: true,
              theme: 'default',
              securityLevel: 'loose',
              fontFamily: 'Montserrat, sans-serif'
          });
      });


// Função para renderizar o diagrama ER
function renderDiagram() {
  const diagramContainer = document.querySelector('.mermaid');
  diagramContainer.textContent = dbData.derDiagram;

  // Se estiver usando mermaid.js (precisa ser adicionado)
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({ startOnLoad: true });
    mermaid.init(undefined, '.mermaid');
  }
}

      
// Dados do banco de dados
const dbData = {
  tables: {
    ponto_coleta: {
      header: ["ponto_id", "nome", "endereco", "horario de funcionamento", "telefone"],
      rows: [
        [1, "Ponto Eco Central", "Av. Paulista, s/n - São Paulo", "Seg-Sex: 8h-18h, Sáb: 9h-13h", "(11) 3456-7890"],
        [2, "Recicla Rio", "Av. Atlântica, s/n - Rio de Janeiro", "Seg-Sex: 9h-19h", "(21) 3345-6789"],
        [3, "Eco Minas", "Av. Afonso Pena, s/n - Belo Horizonte", "Seg-Sex: 8h-18h", "(31) 3234-5678"]
      ]
    },
    material: {
      header: ["material_id", "tipo", "descricao", "pontos_por_kg"],
      rows: [
        [1, "Papel", "Papel branco, jornal, revista, papelão", 20],
        [2, "Plástico", "PET, PEAD, PEBD, embalagens em geral", 30],
        [3, "Metal", "Alumínio, aço, latas", 50],
        [4, "Vidro", "Garrafas, potes, frascos", 15]
      ]
    },
    beneficio: {
      header: ["beneficio_id", "nome", "descricao", "pontos_necessarios", "validade"],
      rows: [
        [1, "Cupom 10% Loja Verde", "Desconto de 10% em compras na Loja Verde", 100, "2025-12-31"],
        [2, "Ecobag Exclusiva", "Ecobag de material reciclado com design exclusivo", 200, "2025-12-31"],
        [3, "Desconto Transporte Público", "Crédito de R$20 para transporte público", 300, "2025-12-31"]
      ]
    }
  },
  
  sqlQueries: [
    {
      title: "1. Consulta para listar usuários e total de pontos acumulados:",
      query: `SELECT u.usuario_id, u.nome, u.email, SUM(c.pontos_totais) AS pontos_acumulados
FROM usuario u
JOIN coleta c ON u.usuario_id = c.usuario_id
GROUP BY u.usuario_id, u.nome, u.email
ORDER BY pontos_acumulados DESC;`
    },
    {
      title: "2. Consulta para mostrar materiais mais reciclados por tipo:",
      query: `SELECT m.tipo, m.descricao, SUM(ic.peso) AS peso_total
FROM material m
JOIN item_coleta ic ON m.material_id = ic.material_id
GROUP BY m.tipo, m.descricao
ORDER BY peso_total DESC;`
    },
    {
      title: "3. Consulta para listar os resgates de benefícios por usuário:",
      query: `SELECT u.nome, b.nome AS beneficio, r.data_resgate, r.pontos_utilizados
FROM usuario u
JOIN resgate r ON u.usuario_id = r.usuario_id
JOIN beneficio b ON r.beneficio_id = b.beneficio_id
ORDER BY r.data_resgate DESC;`
    },
    {
      title: "4. Consulta para analisar desempenho dos pontos de coleta:",
      query: `SELECT pc.nome AS ponto_coleta, COUNT(c.coleta_id) AS total_coletas,
SUM(c.peso_total) AS peso_total_coletado
FROM ponto_coleta pc
JOIN coleta c ON pc.ponto_id = c.ponto_id
GROUP BY pc.nome
ORDER BY peso_total_coletado DESC;`
    }
  ]
};

  
  // Função para renderizar tabelas
  function renderTables() {
    for (const [tableName, tableData] of Object.entries(dbData.tables)) {
      const tableEl = document.querySelector(`table[data-table="${tableName}"]`);
      if (!tableEl) continue;
      
      // Limpar tabela existente
      tableEl.innerHTML = '';
      
      // Criar cabeçalho
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      
      tableData.header.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      
      thead.appendChild(headerRow);
      tableEl.appendChild(thead);
      
      // Criar corpo da tabela
      const tbody = document.createElement('tbody');
      
      tableData.rows.forEach(row => {
        const tr = document.createElement('tr');
        
        row.forEach(cellData => {
          const td = document.createElement('td');
          td.textContent = cellData;
          tr.appendChild(td);
        });
        
        tbody.appendChild(tr);
      });
      
      tableEl.appendChild(tbody);
    }
  }
  
  // Função para renderizar consultas SQL
  function renderSqlQueries() {
    const queriesContainer = document.querySelector('.sql-queries-container');
    if (!queriesContainer) return;
    
    queriesContainer.innerHTML = '';
    
    dbData.sqlQueries.forEach(query => {
      const queryDiv = document.createElement('div');
      queryDiv.classList.add('sql-query-item');
      
      const title = document.createElement('h4');
      title.textContent = query.title;
      queryDiv.appendChild(title);
      
      const queryCode = document.createElement('div');
      queryCode.classList.add('sql-query');
      queryCode.textContent = query.query;
      queryDiv.appendChild(queryCode);
      
      queriesContainer.appendChild(queryDiv);
    });
  }
  
  // Inicializar quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', function() {
    renderDiagram();
    renderTables();
    renderSqlQueries();
  });
  