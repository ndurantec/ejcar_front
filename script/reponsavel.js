
// cadastrar
function cadastrar() {
    const nome = document.getElementById("name").value;

    const telefone = document.getElementById("telefone").value;

    const endereco = document.getElementById("endereco").value;

    const cep= document.getElementById("cep").value;


            if(nome == ""){
                alert("Você precisa preencher o campo nome");
            }

            if(telefone == ""){
                alert("Você precisa preencher o campo telefone");
            }

             if(endereco == ""){
                alert("Você precisa preencher o campo endereco");
            }

             if(cep == ""){
                alert("Você precisa preencher o campo CEP");
            }

                  alert(nome + " - " + telefone + " - " + endereco + " - " + cep);

                  alert("Sucesso! Operação concluída.");
}

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






function salvarResponsavel() {

    
        limparErros();

        if (!validarFormulario()) return;

        const dados = coletarDados();
        //console.log("Enviando criar conta:", dados);



   
     const nome = document.getElementById("name").value;

    const telefone = document.getElementById("telefone").value;

    const endereco = document.getElementById("endereco").value;

    const cep= document.getElementById("cep").value;


            if(nome == ""){
                alert("Você precisa preencher o campo nome");
            }

            if(telefone == ""){
                alert("Você precisa preencher o campo telefone");
            }

             if(endereco == ""){
                alert("Você precisa preencher o campo endereco");
            }

             if(cep == ""){
                alert("Você precisa preencher o campo CEP");
            }

                  alert(nome + " - " + telefone + " - " + endereco + " - " + cep);

                  alert("Sucesso! Operação concluída.");


    var headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Access-Control-Allow-Origin", "*");


    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/cadresp', { // altere a URL conforme seu endpoint
    
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


function alterarResponsavel() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function consultarResponsavel() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/listaresponsavel', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function deletarResponsavel() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}

