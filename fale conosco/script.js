// Form validation for the contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (validateForm()) {
        // If validation passes, we would normally submit the form
        // For now, just show a success message
        alert('Mensagem enviada com sucesso!');
        contactForm.reset();
      }
    });
    
    function validateForm() {
      let isValid = true;
      
      // Get form fields
      const nome = document.getElementById('nome');
      const email = document.getElementById('email');
      const assunto = document.getElementById('assunto');
      const mensagem = document.getElementById('mensagem');
      
      // Clear previous error messages
      clearErrors();
      
      // Validate Name (at least 3 characters)
      if (nome.value.trim().length < 3) {
        showError(nome, 'Por favor, insira seu nome completo (mínimo 3 caracteres)');
        isValid = false;
      }
      
      // Validate Email (using regex pattern)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        showError(email, 'Por favor, insira um email válido');
        isValid = false;
      }
      
      // Validate Subject (must be selected)
      if (assunto.value === '') {
        showError(assunto, 'Por favor, selecione um assunto');
        isValid = false;
      }
      
      // Validate Message (at least 10 characters)
      if (mensagem.value.trim().length < 10) {
        showError(mensagem, 'Por favor, insira uma mensagem com pelo menos 10 caracteres');
        isValid = false;
      }
      
      return isValid;
    }
    
    function showError(input, message) {
      // Get the parent form-group div
      const formGroup = input.parentElement;
      
      // Create error message element
      const errorMessage = document.createElement('div');
      errorMessage.className = 'error-message';
      errorMessage.innerText = message;
      
      // Add error class to the input
      input.classList.add('error-input');
      
      // Append error message after the input
      formGroup.appendChild(errorMessage);
    }
    
    function clearErrors() {
      // Remove all error messages
      const errorMessages = document.querySelectorAll('.error-message');
      errorMessages.forEach(function(error) {
        error.remove();
      });
      
      // Remove error class from inputs
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach(function(input) {
        input.classList.remove('error-input');
      });
    }
  });