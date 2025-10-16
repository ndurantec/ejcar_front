const botaoEntrar = document.getElementById('entrar');

botaoEntrar.addEventListener('click', function(evento) {
    evento.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
    console.log("Email:", email);
});