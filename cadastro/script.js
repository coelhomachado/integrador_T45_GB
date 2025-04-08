// Seleção dos elementos do formulário
const form = document.getElementById('cadastroForm');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const confirmarSenha = document.getElementById('confirmarSenha');

// Função para validar email
function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Função para validar senha
function validarSenha(senha) {
    // Senha deve ter pelo menos 4 caracteres, incluindo letras e números
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
    return re.test(senha);
}

// Função para exibir erro
function mostrarErro(input, mensagem) {
    const formGroup = input.parentElement;
    const mensagemErro = document.createElement('div');
    
    mensagemErro.className = 'mensagem-erro';
    mensagemErro.innerText = mensagem;
    
    // Remove qualquer mensagem de erro anterior
    const mensagemErroExistente = formGroup.querySelector('.mensagem-erro');
    if (mensagemErroExistente) {
        formGroup.removeChild(mensagemErroExistente);
    }
    
    formGroup.appendChild(mensagemErro);
    input.classList.add('input-erro');
}

// Função para remover erro
function removerErro(input) {
    const formGroup = input.parentElement;
    const mensagemErro = formGroup.querySelector('.mensagem-erro');
    
    if (mensagemErro) {
        formGroup.removeChild(mensagemErro);
    }
    
    input.classList.remove('input-erro');
}

// Função para validar campos individuais
function validarCampo(input, validacao, mensagemErro) {
    if (validacao) {
        removerErro(input);
        return true;
    } else {
        mostrarErro(input, mensagemErro);
        return false;
    }
}

// Event listeners para validação em tempo real
nome.addEventListener('blur', () => {
    validarCampo(nome, nome.value.trim().length >= 3, 'Nome deve ter pelo menos 3 caracteres');
});

email.addEventListener('blur', () => {
    validarCampo(email, validarEmail(email.value), 'Email inválido');
});

senha.addEventListener('blur', () => {
    validarCampo(senha, validarSenha(senha.value), 
        'A senha deve ter pelo menos 4 caracteres, incluindo letras e números');
});

confirmarSenha.addEventListener('blur', () => {
    validarCampo(confirmarSenha, confirmarSenha.value === senha.value, 
        'As senhas não coincidem');
});

// Event listener para o envio do formulário
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar todos os campos
    const nomeValido = validarCampo(nome, nome.value.trim().length >= 3, 
        'Nome deve ter pelo menos 3 caracteres');
    
    const emailValido = validarCampo(email, validarEmail(email.value), 
        'Email inválido');
    
    const senhaValida = validarCampo(senha, validarSenha(senha.value), 
        'A senha deve ter pelo menos 4 caracteres, incluindo letras e números');
    
    const confirmarSenhaValido = validarCampo(confirmarSenha, confirmarSenha.value === senha.value, 
        'As senhas não coincidem');
    
    // Se todos os campos forem válidos, enviar o formulário
    if (nomeValido && emailValido && senhaValida && confirmarSenhaValido) {
        // Aqui você pode adicionar o código para enviar os dados para o servidor
        alert('Cadastro realizado com sucesso!');
        form.reset();
    }
});

// Adicionar listener para o botão cancelar
document.querySelector('.btn-secondary').addEventListener('click', function() {
    form.reset();
    // Remover todos os erros
    document.querySelectorAll('.mensagem-erro').forEach(erro => erro.remove());
    document.querySelectorAll('.input-erro').forEach(input => input.classList.remove('input-erro'));
});
