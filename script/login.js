function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}

function validarFormulario() {
    //limparErros();

    // Captura dos valores do formulário
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    
    let ok = true;

    if (!nome) { mostrarErro('erro-nome', 'Verifique se possui nome para continuar.'); ok = false; }
    if (!cpf) { mostrarErro('erro-cpf', 'Verifique se possui cpf para continuar.'); ok = false; }
    

    return ok;
}

function coletarDados() {
    const canvas = document.getElementById('signaturePad');
  
    return {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value.trim()
    };
}


function logar() {
   
   limparErros();
    
    if (!validarFormulario()) return;

    const dados = coletarDados();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;

     
    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
    console.log("Email:", email);

    document.getElementById('erro-usuario').textContent = '';
    document.getElementById('erro-senha').textContent = '';
    document.getElementById('erro-email').textContent = '';

   
    if (usuario === '') {
       document.getElementById('erro-usuario').textContent = 'Preencha o usuário!';
    }

    if (senha === '') {
       document.getElementById('erro-senha').textContent = 'Preencha a senha!';
    }

    if (email === '') {
       document.getElementById('erro-email').textContent = 'Preencha o email!';
    }

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    
       fetch('http://127.0.0.1:8080/responsaveis', { 
         
           method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers

    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });

}
