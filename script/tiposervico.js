document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const select = document.getElementById("modalidade");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio real do formulário

    const tipoServico = select.value;

    if (tipoServico) {
      alert("Você selecionou: " + tipoServico);
      // Aqui você pode redirecionar ou salvar a escolha
    } else {
      alert("Por favor, selecione um tipo de serviço.");
    }
  });
});



function salvarTipo() {
   
  limparErros();

  if (!validarFormulario()) return;

  const dados = coletarDados();


    // Envia os dados via fetch
    fetch('http://localhost:8080/tipo_servico/cadtiposervico', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
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








function deletarTipo() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/tipo_servico/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function atualizarTipo() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/tipo_servico/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function consultarTipo() {
   
var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    // Envia os dados via fetch
    fetch('http://localhost:8080/tipo_servico/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}
         
fetch('http://localhost:8080/professor/insert', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    })
    










