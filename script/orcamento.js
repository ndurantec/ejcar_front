// function finalizar(){
//     const chassi = document.getElementById("chassi").value;

//     const placa = document.getElementById("placa").value;
    
//     const produto = document.getElementById("produto").value;

//     const mao_de_obra = document.getElementById("mao_de_obra").value;
//     alert(chassi + " - " + placa + " - " + produto + " - " + mao_de_obra);

//         if(chassi == ""){
//                 alert("Você precisa preencher o campo chassi");
//         }

//         if(placa == ""){
//                 alert("Você precisa preencher o campo placa");
//         }

//         if(produto == ""){
//                 alert("Você precisa preencher o campo produto");
//         }
     
//         if(mao_de_obra == ""){
//                 alert("Você precisa preencher o campo mao de obra");
//         }
     
//        function coletarDados() {
//     const canvas = document.getElementById('signaturePad');
  
//     return {
//         nome: document.getElementById("nome").value.trim(),
//         cpf: document.getElementById("cpf").value.trim()
//     };
// }
 
// function coletarDados() {
//     const canvas = document.getElementById('signaturePad');
  
//     return {
//         nome: document.getElementById("nome").value.trim(),
//         cpf: document.getElementById("cpf").value.trim()
//     };
// }

// function validarFormulario() {
//     //limparErros();

//     // Captura dos valores do formulário
//     let nome = document.getElementById("nome").value;
//     let cpf = document.getElementById("cpf").value;
    
//     let ok = true;

//     if (!nome) { mostrarErro('erro-nome', 'Verifique se possui nome para continuar.'); ok = false; }
//     if (!cpf) { mostrarErro('erro-cpf', 'Verifique se possui cpf para continuar.'); ok = false; }
    

//     return ok;
// }

// function limparErros() {
//     let erros = document.querySelectorAll('.erro');
//     erros.forEach(e => e.textContent = '');
// }

// }  
// function cadastrarorcamento() {

//          var headers = new Headers();
//          headers.append("Content-Type", "application/json");
//          headers.append("Access-Control-Allow-Origin", "*");


//        const chassi = document.getElementById("chassi").value;

//        const placa = document.getElementById("placa").value;
    
//        const produto = document.getElementById("produto").value;

//        const mao_de_obra = document.getElementById("mao_de_obra").value;
//        alert(chassi + " - " + placa + " - " + produto + " - " + mao_de_obra);

//         if(chassi == ""){
//                 alert("Você precisa preencher o campo chassi");
//         }

//         if(placa == ""){
//                 alert("Você precisa preencher o campo placa");
//         }

//         if(produto == ""){
//                 alert("Você precisa preencher o campo produto");
//         }
     
//         if(mao_de_obra == ""){
//                 alert("Você precisa preencher o campo mao de obra");
//         }
        
//       fetch("http://localhost:8080/orcamento/cadorca",{

         
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         body: JSON.stringify(
//             dados
//         ),
    
//         headers: headers


// }
//       ).then(response => {
           
//       }).then(data => {
       
//       }).catch(error => {
       
//       });
// }

// function consultarorcamento(){

        

//         limparErros();
    
//     if (!validarFormulario()) return;

//     const dados = coletarDados();

    

//               fetch("http://localhost:8080/orcamento/{id}", 

//                 {
        
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         body: JSON.stringify(
//             dados
//         ),
    
//         headers: headers


//     }
       
//       ).then(response => {
           
//       }).then(data => {
       
//       }).catch(error => {
       
//       });
// }

// function deletar(){

//         limparErros();
    
//     if (!validarFormulario()) return;

//     const dados = coletarDados();

//               fetch("http://localhost:8080/orcamento/{id}", 

//                 {
        
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         body: JSON.stringify(
//             dados
//         ),
    
//         headers: headers


//     }
       
//       ).then(response => {
           
//       }).then(data => {
       
//       }).catch(error => {
       
//       });
// }

// function atualizar(){


//               fetch("http://localhost:8080/orcamento/{id}", 

//                 {
        
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         body: JSON.stringify(
//             dados
//         ),
    
//         headers: headers


//     }
       
//       ).then(response => {
           
//       }).then(data => {
       
//       }).catch(error => {
       
//       });
// }
function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}
function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}


function validarFormulario() {
    //limparErros();

    // Captura dos valores do formulário
    let chassi = document.getElementById("chassi").value;
    let placa = document.getElementById("placa").value;
    let produto = document.getElementById("produto").value;
    let servico = document.getElementById("servico").value;
    let mao_de_obra = document.getElementById("mao_de_obra").value;


    let ok = true;

    if (!chassi) { mostrarErro('erro-chassi', 'Verifique se possui chassi para continuar.'); ok = false; }
    if (!placa) { mostrarErro('erro-placa', 'Verifique se possui placa para continuar.'); ok = false; }
    if (!produto) { mostrarErro('erro-produto', 'Verifique se possui produto para continuar.'); ok = false; }
    if (!servico) { mostrarErro('erro-servico', 'Verifique se possui servico para continuar.'); ok = false; }
    if (!mao_de_obra) { mostrarErro('erro-mao_de_obra', 'Verifique se possui valor para continuar.'); ok = false; }

    return ok;
}

function coletarDados() {
    const canvas = document.getElementById('signaturePad');
  
    return {
        chassi: document.getElementById("chassi").value.trim(),
        veiculo: document.getElementById("veiculo").value.trim(),
        produto: document.getElementById("produto").value.trim(),
        servico: document.getElementById("servico").value.trim(),
        mao_de_obra: document.getElementById("mao_de_obra").value.trim(),
        idUsuario: localStorage.getItem("id_usuario"),
        veiculoDto : {
          id : localStorage.getItem("id_veiculo")
        }


    };
}


function cadastrarorcamento() {

    limparErros();
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));
    console.log("JSON enviado ao backend:", JSON.stringify(dados, null, 2));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/orcamento/cadorca', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    }).then(async response => {
      let data = await response.json();

      console.log(data);
      

      if (!response.ok) {
        // Caso sejam erros de validação no DTO
        if (typeof data === "object") {
          let mensagens = Object.values(data).join("<br>");

          console.log("Entrou dento do if data ==== object");
          console.log("----------------------------------------------");
          console.log(mensagens);
          console.log("----------------------------------------------");

            let mensagensGlobais = []; // Para erros que não mapeiam para um campo específico

            for (const [campo, mensagem] of Object.entries(data)) {
                // Mapeia o nome do campo do backend ('cpf', 'email', etc.) para o ID do elemento no HTML
                const idElementoErro = "erro-" + campo; // Ex: 'cpf_error_message'

                console.log("========================================================");
                console.log(idElementoErro);
                console.log("========================================================");
                // Tenta exibir o erro no elemento específico
                if (document.getElementById(idElementoErro)) {
                    //CHAMANDO A SUA FUNÇÃO mostrarErro(idElemento, mensagem)
                    mostrarErro(idElementoErro, mensagem);
                                        
                } 



            }

          
        } else {
          mostrarMensagem("⚠️ Erro desconhecido", "erro");
        }
        throw new Error("Erro de validação");
      }

      return data;
    }).then(data => {
      if (data.id) {
        localStorage.setItem("id_orcamento", data.id);
        // mostrarMensagem(data.message || "✅ Professor cadastrado com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}

//deletar 


function deletarorcamento() {

  limparErros();
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/orcamento/{id}', {
        
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    }).then(async response => {
      let data = await response.json();

      console.log(data);
      

      if (!response.ok) {
        // Caso sejam erros de validação no DTO
        if (typeof data === "object") {
          let mensagens = Object.values(data).join("<br>");

          console.log("Entrou dento do if data ==== object");
          console.log("----------------------------------------------");
          console.log(mensagens);
          console.log("----------------------------------------------");

            let mensagensGlobais = []; // Para erros que não mapeiam para um campo específico

            for (const [campo, mensagem] of Object.entries(data)) {
                // Mapeia o nome do campo do backend ('cpf', 'email', etc.) para o ID do elemento no HTML
                const idElementoErro = "erro-" + campo; // Ex: 'cpf_error_message'

                console.log("========================================================");
                console.log(idElementoErro);
                console.log("========================================================");
                // Tenta exibir o erro no elemento específico
                if (document.getElementById(idElementoErro)) {
                    //CHAMANDO A SUA FUNÇÃO mostrarErro(idElemento, mensagem)
                    mostrarErro(idElementoErro, mensagem);
                                        
                } 



            }

          
        } else {
          mostrarMensagem("⚠️ Erro desconhecido", "erro");
        }
        throw new Error("Erro de validação");
      }

      return data;
    })
    .then(data => {
      if (data.id) {
        localStorage.setItem("id_orcamento", data.id);
        // mostrarMensagem(data.message || "✅ Professor cadastrado com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}
//CONSULTAR

function consultarorcamento() {

  limparErros(); 
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/orcamento/tabelaOrcamento', {
        
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    }).then(async response => {
      let data = await response.json();

      console.log(data);
      

      if (!response.ok) {
        // Caso sejam erros de validação no DTO
        if (typeof data === "object") {
          let mensagens = Object.values(data).join("<br>");

          console.log("Entrou dento do if data ==== object");
          console.log("----------------------------------------------");
          console.log(mensagens);
          console.log("----------------------------------------------");

            let mensagensGlobais = []; // Para erros que não mapeiam para um campo específico

            for (const [campo, mensagem] of Object.entries(data)) {
                // Mapeia o nome do campo do backend ('cpf', 'email', etc.) para o ID do elemento no HTML
                const idElementoErro = "erro-" + campo; // Ex: 'cpf_error_message'

                console.log("========================================================");
                console.log(idElementoErro);
                console.log("========================================================");
                // Tenta exibir o erro no elemento específico
                if (document.getElementById(idElementoErro)) {
                    //CHAMANDO A SUA FUNÇÃO mostrarErro(idElemento, mensagem)
                    mostrarErro(idElementoErro, mensagem);
                                        
                } 



            }

          
        } else {
          mostrarMensagem("⚠️ Erro desconhecido", "erro");
        }
        throw new Error("Erro de validação");
      }

      return data;
    })
    .then(data => {
      if (data.id) {
        localStorage.setItem("id_orcamento", data.id);
        // mostrarMensagem(data.message || "✅ Professor cadastrado com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}

//ATUALIZAR

function atualizarorcamento() {

  limparErros();
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/orcamento/{id}', {
        
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers


    }).then(async response => {
      let data = await response.json();

      console.log(data);
      

      if (!response.ok) {
        // Caso sejam erros de validação no DTO
        if (typeof data === "object") {
          let mensagens = Object.values(data).join("<br>");

          console.log("Entrou dento do if data ==== object");
          console.log("----------------------------------------------");
          console.log(mensagens);
          console.log("----------------------------------------------");

            let mensagensGlobais = []; // Para erros que não mapeiam para um campo específico

            for (const [campo, mensagem] of Object.entries(data)) {
                // Mapeia o nome do campo do backend ('cpf', 'email', etc.) para o ID do elemento no HTML
                const idElementoErro = "erro-" + campo; // Ex: 'cpf_error_message'

                console.log("========================================================");
                console.log(idElementoErro);
                console.log("========================================================");
                // Tenta exibir o erro no elemento específico
                if (document.getElementById(idElementoErro)) {
                    //CHAMANDO A SUA FUNÇÃO mostrarErro(idElemento, mensagem)
                    mostrarErro(idElementoErro, mensagem);
                                        
                } 



            }

          
        } else {
          mostrarMensagem("⚠️ Erro desconhecido", "erro");
        }
        throw new Error("Erro de validação");
      }

      return data;
    }).then(data => {
      if (data.id) {
        localStorage.setItem("id_orcamento", data.id);
        // mostrarMensagem(data.message || "✅ Professor cadastrado com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}
