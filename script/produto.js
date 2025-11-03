function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}

function coletarDados() {
    const canvas = document.getElementById('signaturePad');
  
    return {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value.trim()
    };
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

function salvarProduto() {

   limparErros();

   if (!validarFormulario()) return;

   const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

  
  var form = document.querySelector("form");
  var valorCampo = document.getElementById("valor");
  var descricaoCampo = document.getElementById("descricao");
  var erroValor = document.querySelector(".erro-valor");
  var erroDescricao = document.querySelector(".erro-descricao");

  

    // Limpa mensagens anteriores
    erroValor.textContent = "";
    erroDescricao.textContent = "";

    var valor = valorCampo.value.trim();
    var descricao = descricaoCampo.value.trim();
    var valido = true;

    // Validação do campo valor
    if (valor === "" || isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) {
      erroValor.textContent = "Por favor, informe um valor maior que zero.";
      valido = false;
    }

    // Validação do campo descrição
    if (descricao === "") {
      erroDescricao.textContent = "Por favor, preencha a descrição.";
      valido = false;
    }

    // Se tudo estiver certo
    if (valido) {
      erroValor.textContent = "";
      erroDescricao.textContent = "";
      alert("Produto cadastrado com sucesso!");
      form.reset();
    }
  
     var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

   


    // Envia os dados via fetch
    fetch("http://127.0.0.1:8080/responsaveis", { // altere a URL conforme seu endpoint
       

    
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

     var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

function consultarProduto() {
   
     
        

    // Envia os dados via fetch
    fetch("http://127.0.0.1:8080/responsaveis", { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}  

function alterarProduto() {
   


    // Envia os dados via fetch
    fetch("http://127.0.0.1:8080/responsaveis", { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}  


function deletarProduto() {
   


    // Envia os dados via fetch
    fetch("http://localhost:8080/produto/{id}", { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
} 


