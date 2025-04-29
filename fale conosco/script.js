document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Adicionar CSS para estilização de erro
    const style = document.createElement('style');
    style.textContent = `
        .error {
            border: 2px solid red !important;
            background-color: #ffeeee !important;
        }
        
        .error-message {
            color: red;
            font-size: 0.8em;
            margin-top: 5px;
            display: block;
        }
    `;
    document.head.appendChild(style);
    
    // Função para validar email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Função para mostrar erro
    function showError(input, message) {
        // Adicionar classe de erro ao input
        input.classList.add('error');
        
        // Verificar se já existe mensagem de erro
        let errorMsg = input.nextElementSibling;
        if(errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.textContent = message;
        } else {
            // Criar e adicionar mensagem de erro
            errorMsg = document.createElement('span');
            errorMsg.classList.add('error-message');
            errorMsg.textContent = message;
            input.insertAdjacentElement('afterend', errorMsg);
        }
    }
    
    // Função para remover erro
    function removeError(input) {
        input.classList.remove('error');
        
        // Remover mensagem de erro se existir
        const errorMsg = input.nextElementSibling;
        if(errorMsg && errorMsg.classList.contains('error-message')) {
            errorMsg.remove();
        }
    }
    
    // Validação em tempo real para cada campo
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if(this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Função para validar um campo específico
    function validateField(field) {
        switch(field.id) {
            case 'nome':
                if(field.value.trim() === '') {
                    showError(field, 'Por favor, informe seu nome completo');
                    return false;
                } else if(field.value.trim().length < 3) {
                    showError(field, 'Nome deve ter pelo menos 3 caracteres');
                    return false;
                } else {
                    removeError(field);
                    return true;
                }
                break;
                
            case 'email':
                if(field.value.trim() === '') {
                    showError(field, 'Por favor, informe seu e-mail');
                    return false;
                } else if(!isValidEmail(field.value.trim())) {
                    showError(field, 'Por favor, informe um e-mail válido');
                    return false;
                } else {
                    removeError(field);
                    return true;
                }
                break;
                
            case 'assunto':
                if(field.value === '') {
                    showError(field, 'Por favor, selecione um assunto');
                    return false;
                } else {
                    removeError(field);
                    return true;
                }
                break;
                
            case 'mensagem':
                if(field.value.trim() === '') {
                    showError(field, 'Por favor, escreva sua mensagem');
                    return false;
                } else if(field.value.trim().length < 10) {
                    showError(field, 'Mensagem deve ter pelo menos 10 caracteres');
                    return false;
                } else {
                    removeError(field);
                    return true;
                }
                break;
        }
    }
    
    // Validação no envio do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isFormValid = true;
        
        // Validar todos os campos
        inputs.forEach(input => {
            if(!validateField(input)) {
                isFormValid = false;
            }
        });
        
        if(isFormValid) {
            // Se todos os campos estiverem válidos, exibir mensagem de sucesso
            alert('Mensagem enviada com sucesso!');
            form.reset();
        }
    });
});