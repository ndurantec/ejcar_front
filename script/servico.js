// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector("form");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();

//     let funcionario = document.getElementById("funcionario").value.trim();
//     let dataServico = document.getElementById("data").value;
//     let realizado = document.querySelector('input[name="realizado"]:checked');

//     if (funcionario === "") {
//       alert("Você precisa preencher o nome do funcionário");
//       return;
//     }

//     if (dataServico === "") {
//       alert("Por favor, selecione uma data");
//       return;
//     }

//     if (!realizado) {
//       alert("Por favor, selecione se o serviço foi realizado");
//       return;
//     }

//     alert("Sucesso! Operação concluída.");

//     form.reset();
//   });
// });

function mostrarErro(id, mensagem) {
    const erroElement = document.getElementById(id);
   if (erroElement) erroElement.textContent = mensagem;
}

function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}

function validarFormulario() {
    //limparErros();

    // Captura dos valores do formulário
    let codigo = document.getElementById("codigo").value;
    let funcionario = document.getElementById("funcionario").value;
    let servicoRealizado = document.querySelector('input[name="realizado"]:checked');
    let data = document.getElementById("data").value;
   
    let ok = true;

    if (!codigo) { mostrarErro('erro-codigo', 'Verifique se digitou o código para continuar.'); ok = false; }
    if (!funcionario) { mostrarErro('erro-funcionario', 'Verifique se possui funcionário para continuar.'); ok = false; }
    if (!servicoRealizado) { mostrarErro('erro-servicoRealizado', 'Verifique se marcou o serviço como realizado ou não para continuar.'); ok = false; }
    if (!data) { mostrarErro('erro-data', 'Verifique se selecionou a data do serviço para continuar.'); ok = false; }   
    return ok;
}

function mostrarMensagem(texto, tipo) {
  const mensagemDiv = document.getElementById("erro-mensagem");
  mensagemDiv.innerHTML = texto;

  if (tipo === "sucesso") {
    mensagemDiv.className = "mensagem sucesso";
  } else {
    mensagemDiv.className = "mensagem erro";
  }
}

function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}


function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}

function coletarDados() {

    const servicoRealizado = document.querySelector('input[name="realizado"]:checked');
     
    return {
        codigo:           document.getElementById("codigo").value.trim(),
        funcionario:      document.getElementById("funcionario").value.trim(),
        servicoRealizado: servicoRealizado ? servicoRealizado.value : "",
        data:             document.getElementById("data").value,        
        idUsuario:        localStorage.getItem("id_usuario")
    };
}

function salvar() {

  console.log("chamou o salvar...");

  limparErros();

  if (!validarFormulario()) return;

  const dados = coletarDados();

  console.log( dados );

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch('http://localhost:8080/servico/cadservico', {

    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(dados),

    headers: headers

  }).then(async response => {
      let data = await response.json();

      console.log(data);//resposta do servidor
      

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
         //alert("⚠️ " + text);
        }
        throw new Error("Erro de validação");
      }

      return data;
    })
    .then(data => {
      if (data.id) {
        localStorage.setItem("id_servico", data.id);
        mostrarMensagem(data.message || "✅ Serviço cadastrado com sucesso!", "sucesso");
      } 
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
}

function alterar() {

  limparErros();

  if (!validarFormulario()) return;

  const dados = coletarDados();

  var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
   
    fetch('http://localhost:8080/servico/{id}'), {

      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(dados),
      
      headers: headers

  }.then(async response => {
      let data = await response.data();

      console.log(data);//resposta do servidor
      

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
         // mostrarMensagem("⚠️ Erro desconhecido", "erro");
         //alert("⚠️ " + text);
        }
        throw new Error("Erro de validação");
      }

      return data;
    })
    .then(data => {
      if (data.id) {
        localStorage.setItem("id_veiculo", data.id);
        // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
        alert("Serviço cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
      }
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
}

function consultar() {

   limparErros();

    if (!validarFormulario()) return;

    const dados = coletarDados();

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/servico/{id}'), {

      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(dados),
      
      headers: headers

  }.then(async response => {
      let data = await response.data();

      console.log(data);//resposta do servidor
      

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
         // mostrarMensagem("⚠️ Erro desconhecido", "erro");
         //alert("⚠️ " + text);
        }
        throw new Error("Erro de validação");
      }

      return data;
    })
    .then(data => {
      if (data.id) {
        localStorage.setItem("id_veiculo", data.id);
        // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
        alert("Serviço cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
      }
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
}

function deletar() {

  limparErros();

  if (!validarFormulario()) return;

  const dados = coletarDados();

  var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
   
    fetch('http://localhost:8080/servico/{id}'), {

    method: 'DELETE',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(dados),

    headers: headers

  }.then(async response => {
      let data = await response.data();

      console.log(data);//resposta do servidor
      

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
         // mostrarMensagem("⚠️ Erro desconhecido", "erro");
         //alert("⚠️ " + text);
        }
        throw new Error("Erro de validação");
      }

      return data;
    })
    .then(data => {
      if (data.id) {
        localStorage.setItem("id_veiculo", data.id);
        // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
        alert("Serviço cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
      }
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
}