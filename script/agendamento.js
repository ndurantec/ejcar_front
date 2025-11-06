function cadastrar() {
    const dataEntrada = document.getElementById("entradaVeiculo").value;

    const dataSaida = document.getElementById("saidaVeiculo").value;

    const seguradoraSim = document.getElementById("seguradoraSim").value;

    const seguradoraNao= document.getElementById("seguradoraNao").value;


            if(dataEntrada == ""){
                alert("Você precisa preencher a entrada do veiculo");
            }

            if(dataSaida == ""){
                alert("Você precisa preencher a saida do veiculo");
            }

             if(seguradoraSim, seguradoraNao == ""){
                alert("Você precisa preencher o campo endereco");
            }


                alert(dataEntrada + " - " + dataSaida + " - " + seguradoraSim + " - " + seguradoraNao )
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








function salvar() {


        
        limparErros();

        if (!validarFormulario()) return;

        const dados = coletarDados();
        //console.log("Enviando criar conta:", dados);



     const dataEntrada = document.getElementById("entradaVeiculo").value;

    const dataSaida = document.getElementById("saidaVeiculo").value;

    const seguradoraSim = document.getElementById("seguradoraSim").value;

    const seguradoraNao= document.getElementById("seguradoraNao").value;


            if(dataEntrada == ""){
                alert("Você precisa preencher a entrada do veiculo");
            }

            if(dataSaida == ""){
                alert("Você precisa preencher a saida do veiculo");
            }

             if(seguradoraSim, seguradoraNao == ""){
                alert("Você precisa preencher o campo endereco");
            }


                alert(dataEntrada + " - " + dataSaida + " - " + seguradoraSim + " - " + seguradoraNao )

    var headers = new Headers();

    headers.append("Content-Type", "application/json");

    headers.append("Access-Control-Allow-Origin", "*");
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/agenda/cadagenda', { // altere a URL conforme seu endpoint
       
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


function alterar() {

        limparErros();

        if (!validarFormulario()) return;

        const dados = coletarDados();
        //console.log("Enviando criar conta:", dados);3


        var headers = new Headers();

        headers.append("Content-Type", "application/json");

        headers.append("Access-Control-Allow-Origin", "*");

   
    // Envia os dados via fetch
    fetch('http://localhost:8080/agenda/{id}', { // altere a URL conforme seu endpoint

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


function consultar() {

        limparErros();

        if (!validarFormulario()) return;

        const dados = coletarDados();
        //console.log("Enviando criar conta:", dados);3


        var headers = new Headers();

        headers.append("Content-Type", "application/json");

        headers.append("Access-Control-Allow-Origin", "*");

   
    // Envia os dados via fetch
    fetch('http://localhost:8080/agenda/agenda', { // altere a URL conforme seu endpoint

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


function deletar() {

        limparErros();

        if (!validarFormulario()) return;

        const dados = coletarDados();
        //console.log("Enviando criar conta:", dados);3


        var headers = new Headers();

        headers.append("Content-Type", "application/json");

        headers.append("Access-Control-Allow-Origin", "*");

   
    // Envia os dados via fetch
    fetch('http://localhost:8080/agenda/{id}', { // altere a URL conforme seu endpoint

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
