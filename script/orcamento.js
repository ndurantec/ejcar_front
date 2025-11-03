function finalizar(){
    const chassi = document.getElementById("chassi").value;

    const placa = document.getElementById("placa").value;
    
    const produto = document.getElementById("produto").value;

    const mao_de_obra = document.getElementById("mao_de_obra").value;
    alert(chassi + " - " + placa + " - " + produto + " - " + mao_de_obra);

        if(chassi == ""){
                alert("Você precisa preencher o campo chassi");
        }

        if(placa == ""){
                alert("Você precisa preencher o campo placa");
        }

        if(produto == ""){
                alert("Você precisa preencher o campo produto");
        }
     
        if(mao_de_obra == ""){
                alert("Você precisa preencher o campo mao de obra");
        }
     
       function coletarDados() {
    const canvas = document.getElementById('signaturePad');
  
    return {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value.trim()
    };
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

function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}

}  
function cadastrarorcamento() {

         var headers = new Headers();
         headers.append("Content-Type", "application/json");
         headers.append("Access-Control-Allow-Origin", "*");


       const chassi = document.getElementById("chassi").value;

       const placa = document.getElementById("placa").value;
    
       const produto = document.getElementById("produto").value;

       const mao_de_obra = document.getElementById("mao_de_obra").value;
       alert(chassi + " - " + placa + " - " + produto + " - " + mao_de_obra);

        if(chassi == ""){
                alert("Você precisa preencher o campo chassi");
        }

        if(placa == ""){
                alert("Você precisa preencher o campo placa");
        }

        if(produto == ""){
                alert("Você precisa preencher o campo produto");
        }
     
        if(mao_de_obra == ""){
                alert("Você precisa preencher o campo mao de obra");
        }
        
      fetch("http://localhost:8080/orcamento/cadorca",{

         
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


}
      ).then(response => {
           
      }).then(data => {
       
      }).catch(error => {
       
      });
}

function consultarorcamento(){

        

        limparErros();
    
    if (!validarFormulario()) return;

    const dados = coletarDados();

    

              fetch("http://localhost:8080/orcamento/{id}", 

                {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    }
       
      ).then(response => {
           
      }).then(data => {
       
      }).catch(error => {
       
      });
}

function deletar(){

        limparErros();
    
    if (!validarFormulario()) return;

    const dados = coletarDados();

              fetch("http://localhost:8080/orcamento/{id}", 

                {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    }
       
      ).then(response => {
           
      }).then(data => {
       
      }).catch(error => {
       
      });
}

function atualizar(){


              fetch("http://localhost:8080/orcamento/{id}", 

                {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    }
       
      ).then(response => {
           
      }).then(data => {
       
      }).catch(error => {
       
      });
}
