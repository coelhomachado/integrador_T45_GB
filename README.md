
# Projeto EcoTroca

## Sobre o Projeto

O site Html "Ecotroca", faz parte do Trabalho de Conclusão do Curso da Proz Talento Cloud, de "Introdução à Programação", do Projeto Integrador, da Turma 45 | Grupo B.

Criado por @felipemoriya, o site foi desenvolvido com a ideia de unir o útil ao agradável, de ser sustentável, ecológico ao meio-ambiente, mas ao mesmo tempo, trazer um ganho para sociedade, qual seja trazendo um ganho de brindes, benefícios e descontos aos seus usuários.

### Pré-Requisitos:

- Fazer a troca de Reciclados
- Juntar pontos, para posterior, troca.

#### Etapas / Instruções de Uso:

- Ler Atentamente as Regras;
- Concordar com os termos;
- Cadastrar-se com os dados;
- Começar a trocar produtos;
- Receber os prêmios!

### Licença
- Olhar e se inspirar!






## Sistema de Troca de Recicláveis por Prêmios

Este projeto implementa um sistema para troca de produtos recicláveis por prêmios, produtos ou benefícios, através de cadastramento prévio dos usuários.

## Modelo Entidade-Relacionamento (ER)

O sistema é composto pelas seguintes entidades principais:

1. **Usuário**: Pessoas cadastradas que podem entregar materiais recicláveis e receber pontos.
2. **Material Reciclável**: Tipos de materiais que podem ser trocados por pontos.
3. **Entrega**: Registro de materiais recicláveis entregues pelos usuários.
4. **Prêmio**: Produtos, serviços ou benefícios que podem ser adquiridos com pontos.
5. **Resgate**: Registro de prêmios resgatados pelos usuários.
6. **Ponto de Coleta**: Locais onde os usuários podem entregar os materiais recicláveis.

### Diagrama ER

```
+----------------+       +------------------+       +----------------+
|    USUÁRIO     |       |     ENTREGA      |       |   MATERIAL     |
+----------------+       +------------------+       +----------------+
| PK id_usuario  |<----->| PK id_entrega    |<----->| PK id_material |
|    nome        |       |    data_entrega  |       |    nome        |
|    email       |       |    quantidade    |       |    tipo        |
|    telefone    |       |    pontos        |       |    pts_por_kg  |
|    endereco    |       | FK id_usuario    |       |    descricao   |
|    cpf         |       | FK id_material   |       +----------------+
|    pontos_total|       | FK id_ponto      |
+----------------+       +------------------+
       ^                          ^
       |                          |
       v                          v
+----------------+       +------------------+
|    RESGATE     |       |  PONTO_COLETA    |
+----------------+       +------------------+
| PK id_resgate  |       | PK id_ponto      |
|    data_resgate|       |    nome          |
|    pontos_gastos|      |    endereco      |
| FK id_usuario  |       |    horario_func  |
| FK id_premio   |       |    telefone      |
+----------------+       +------------------+
       ^
       |
       v
+----------------+
|    PRÊMIO      |
+----------------+
| PK id_premio   |
|    nome        |
|    descricao   |
|    valor_pontos|
|    quantidade  |
|    tipo        |
+----------------+
```

### Relacionamentos

- Um **Usuário** pode fazer várias **Entregas** de materiais recicláveis (1:N)
- Um **Usuário** pode realizar vários **Resgates** de prêmios (1:N)
- Um **Material Reciclável** pode estar em várias **Entregas** (1:N)
- Um **Prêmio** pode estar em vários **Resgates** (1:N)
- Uma **Entrega** é realizada em um **Ponto de Coleta** (N:1)

## Implementação do Banco de Dados (3FN)

As tabelas foram projetadas seguindo a 3ª Forma Normal:
- Todas as tabelas estão na 1FN (valores atômicos)
- Todas as tabelas estão na 2FN (dependências totais da chave primária)
- Não há dependências transitivas (3FN)

### Criação das Tabelas

```sql
-- Criação do banco de dados
CREATE DATABASE sistema_reciclagem;
USE sistema_reciclagem;

-- Tabela de Usuários
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(200),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    pontos_total INT DEFAULT 0,
    data_cadastro DATE NOT NULL
);

-- Tabela de Materiais Recicláveis
CREATE TABLE material (
    id_material INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- Papel, Plástico, Metal, Vidro, etc
    pts_por_kg DECIMAL(10,2) NOT NULL,
    descricao TEXT
);

-- Tabela de Pontos de Coleta
CREATE TABLE ponto_coleta (
    id_ponto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    horario_func VARCHAR(100),
    telefone VARCHAR(20)
);

-- Tabela de Prêmios
CREATE TABLE premio (
    id_premio INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    valor_pontos INT NOT NULL,
    quantidade INT NOT NULL DEFAULT 0,
    tipo VARCHAR(50) -- Produto, Desconto, Serviço, etc
);

-- Tabela de Entregas
CREATE TABLE entrega (
    id_entrega INT AUTO_INCREMENT PRIMARY KEY,
    data_entrega DATETIME NOT NULL,
    quantidade DECIMAL(10,2) NOT NULL, -- em kg
    pontos INT NOT NULL,
    id_usuario INT NOT NULL,
    id_material INT NOT NULL,
    id_ponto INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_material) REFERENCES material(id_material),
    FOREIGN KEY (id_ponto) REFERENCES ponto_coleta(id_ponto)
);

-- Tabela de Resgates
CREATE TABLE resgate (
    id_resgate INT AUTO_INCREMENT PRIMARY KEY,
    data_resgate DATETIME NOT NULL,
    pontos_gastos INT NOT NULL,
    id_usuario INT NOT NULL,
    id_premio INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY (id_premio) REFERENCES premio(id_premio)
);
```

### Inserção de Dados de Teste

```sql
-- Inserção de dados de teste para usuários
INSERT INTO usuario (nome, email, telefone, endereco, cpf, pontos_total, data_cadastro) VALUES
('Maria Silva', 'maria@email.com', '(11) 98765-4321', 'Rua das Flores, 123, São Paulo-SP', '123.456.789-01', 250, '2023-01-15'),
('João Oliveira', 'joao@email.com', '(21) 99876-5432', 'Av. Principal, 456, Rio de Janeiro-RJ', '234.567.890-12', 480, '2023-02-10'),
('Ana Santos', 'ana@email.com', '(31) 97654-3210', 'Rua do Comércio, 789, Belo Horizonte-MG', '345.678.901-23', 150, '2023-03-05'),
('Pedro Costa', 'pedro@email.com', '(41) 96543-2109', 'Av. das Árvores, 321, Curitiba-PR', '456.789.012-34', 320, '2023-04-20');

-- Inserção de dados de teste para materiais recicláveis
INSERT INTO material (nome, tipo, pts_por_kg, descricao) VALUES
('Garrafa PET', 'Plástico', 10.00, 'Garrafas plásticas de refrigerantes, água e outros líquidos'),
('Papel branco', 'Papel', 5.00, 'Papel sulfite, folhas de caderno, papel de impressão'),
('Latas de alumínio', 'Metal', 15.00, 'Latas de refrigerante, cerveja e outras bebidas'),
('Vidro', 'Vidro', 8.00, 'Garrafas e frascos de vidro'),
('Papelão', 'Papel', 3.00, 'Caixas de papelão e embalagens');

-- Inserção de dados de teste para pontos de coleta
INSERT INTO ponto_coleta (nome, endereco, horario_func, telefone) VALUES
('EcoPonto Centro', 'Rua Central, 100, Centro, São Paulo-SP', 'Seg-Sex: 8h-18h, Sáb: 8h-12h', '(11) 3333-4444'),
('Recicla Mais', 'Av. Verde, 200, Jardins, Rio de Janeiro-RJ', 'Seg-Sex: 9h-17h', '(21) 4444-5555'),
('Ponto Verde', 'Rua Ecológica, 300, Centro, Belo Horizonte-MG', 'Seg-Sáb: 8h-19h', '(31) 5555-6666');

-- Inserção de dados de teste para prêmios
INSERT INTO premio (nome, descricao, valor_pontos, quantidade, tipo) VALUES
('Sacola Ecológica', 'Sacola reutilizável feita de material reciclado', 50, 100, 'Produto'),
('Desconto Supermercado', 'Cupom de 10% de desconto em compras acima de R$100', 100, 50, 'Desconto'),
('Caneca Térmica', 'Caneca térmica de alumínio para bebidas', 150, 30, 'Produto'),
('Vale Transporte', 'Crédito para transporte público', 200, 20, 'Serviço'),
('Curso Online', 'Curso introdutório sobre sustentabilidade e meio ambiente', 300, 10, 'Serviço');

-- Inserção de dados de teste para entregas
INSERT INTO entrega (data_entrega, quantidade, pontos, id_usuario, id_material, id_ponto) VALUES
('2023-05-10 14:30:00', 5.5, 55, 1, 1, 1),  -- Maria entregou 5.5kg de garrafas PET
('2023-05-12 10:15:00', 8.0, 40, 2, 2, 2),  -- João entregou 8kg de papel branco
('2023-05-15 16:45:00', 3.2, 48, 3, 3, 3),  -- Ana entregou 3.2kg de latas de alumínio
('2023-05-16 09:30:00', 6.0, 48, 4, 4, 1),  -- Pedro entregou 6kg de vidro
('2023-05-20 13:20:00', 10.0, 30, 1, 5, 2), -- Maria entregou 10kg de papelão
('2023-05-22 11:10:00', 7.5, 112, 2, 3, 3); -- João entregou 7.5kg de latas de alumínio

-- Inserção de dados de teste para resgates
INSERT INTO resgate (data_resgate, pontos_gastos, id_usuario, id_premio) VALUES
('2023-05-25 15:40:00', 50, 1, 1),   -- Maria resgatou uma sacola ecológica
('2023-05-27 12:35:00', 100, 2, 2),  -- João resgatou um desconto de supermercado
('2023-05-30 14:20:00', 150, 4, 3),  -- Pedro resgatou uma caneca térmica
('2023-06-02 10:45:00', 200, 2, 4),  -- João resgatou um vale transporte
('2023-06-05 16:15:00', 50, 3, 1);   -- Ana resgatou uma sacola ecológica
```

## Consultas SQL

### Consulta 1: Listar todas as entregas com informações do usuário, material e ponto de coleta

```sql
SELECT 
    e.id_entrega, 
    e.data_entrega, 
    e.quantidade, 
    e.pontos, 
    u.nome AS usuario, 
    m.nome AS material, 
    p.nome AS ponto_coleta
FROM entrega e
JOIN usuario u ON e.id_usuario = u.id_usuario
JOIN material m ON e.id_material = m.id_material
JOIN ponto_coleta p ON e.id_ponto = p.id_ponto
ORDER BY e.data_entrega DESC;
```

### Consulta 2: Encontrar os 5 usuários que mais acumularam pontos

```sql
SELECT 
    u.nome, 
    u.email, 
    u.pontos_total,
    COUNT(e.id_entrega) AS total_entregas
FROM usuario u
LEFT JOIN entrega e ON u.id_usuario = e.id_usuario
GROUP BY u.id_usuario
ORDER BY u.pontos_total DESC
LIMIT 5;
```

### Consulta 3: Calcular a quantidade total de cada material reciclável coletado

```sql
SELECT 
    m.nome,
    m.tipo,
    SUM(e.quantidade) AS quantidade_total_kg,
    SUM(e.pontos) AS pontos_gerados
FROM material m
JOIN entrega e ON m.id_material = e.id_material
GROUP BY m.id_material
ORDER BY quantidade_total_kg DESC;
```

### Consulta 4: Listar todos os resgates com informações do usuário e do prêmio

```sql
SELECT 
    r.id_resgate,
    r.data_resgate,
    r.pontos_gastos,
    u.nome AS usuario,
    p.nome AS premio,
    p.tipo AS tipo_premio
FROM resgate r
JOIN usuario u ON r.id_usuario = u.id_usuario
JOIN premio p ON r.id_premio = p.id_premio
ORDER BY r.data_resgate DESC;
```

### Consulta 5: Calcular o desempenho de cada ponto de coleta

```sql
SELECT 
    p.nome AS ponto_coleta,
    p.endereco,
    COUNT(e.id_entrega) AS total_entregas,
    SUM(e.quantidade) AS total_kg_coletados,
    SUM(e.pontos) AS total_pontos_gerados
FROM ponto_coleta p
LEFT JOIN entrega e ON p.id_ponto = e.id_ponto
GROUP BY p.id_ponto
ORDER BY total_kg_coletados DESC;
```

### Consulta 6: Mostrar o histórico de atividades (entregas e resgates) de um usuário específico

```sql
SELECT 
    'Entrega' AS tipo_atividade,
    e.data_entrega AS data_atividade,
    m.nome AS item,
    e.quantidade AS quantidade,
    e.pontos AS pontos,
    NULL AS pontos_gastos
FROM entrega e
JOIN material m ON e.id_material = m.id_material
WHERE e.id_usuario = 2 -- ID do João

UNION ALL

SELECT 
    'Resgate' AS tipo_atividade,
    r.data_resgate AS data_atividade,
    p.nome AS item,
    NULL AS quantidade,
    NULL AS pontos,
    r.pontos_gastos
FROM resgate r
JOIN premio p ON r.id_premio = p.id_premio
WHERE r.id_usuario = 2 -- ID do João

ORDER BY data_atividade DESC;
```

### Consulta 7: Encontrar os prêmios mais populares (mais resgatados)

```sql
SELECT 
    p.nome,
    p.tipo,
    p.valor_pontos,
    COUNT(r.id_resgate) AS total_resgates
FROM premio p
LEFT JOIN resgate r ON p.id_premio = r.id_premio
GROUP BY p.id_premio
ORDER BY total_resgates DESC;
```

## Como usar este projeto

1. Execute os comandos SQL para criar o banco de dados e as tabelas
2. Insira os dados de teste fornecidos
3. Execute as consultas para verificar o funcionamento do sistema

## Possíveis Extensões

- Implementação de sistema de níveis para usuários baseado em pontos acumulados
- Desenvolvimento de API para integração com aplicativo móvel
- Adição de funcionalidade de notificações para usuários sobre novos prêmios
- Implementação de sistema de gamificação (conquistas, rankings, desafios)
- Dashboard administrativo para monitoramento das métricas do sistema
- Funcionalidade de geração de relatórios estatísticos e ambientais
