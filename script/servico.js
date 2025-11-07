document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let funcionario = document.getElementById("funcionario").value.trim();
    let dataServico = document.getElementById("data").value;
    let realizado = document.querySelector('input[name="realizado"]:checked');

    if (funcionario === "") {
      alert("Você precisa preencher o nome do funcionário");
      return;
    }

    if (dataServico === "") {
      alert("Por favor, selecione uma data");
      return;
    }

    if (!realizado) {
      alert("Por favor, selecione se o serviço foi realizado");
      return;
    }

    alert("Sucesso! Operação concluída.");

    form.reset();
  });
});

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


   let funcionario = document.getElementById("funcionario").value.trim();
    let dataServico = document.getElementById("data").value;
    let realizado = document.querySelector('input[name="realizado"]:checked');

    let ok = true

    if (funcionario === "") {
      alert("Você precisa preencher o nome do funcionário");
      return;
    }

    if (dataServico === "") {
      alert("Por favor, selecione uma data");
      return;
    }

    if (!realizado) {
      alert("Por favor, selecione se o serviço foi realizado");
      return;
    }

    alert("Sucesso! Operação concluída.");

    form.reset();

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/servico/cadservico'), {

      method: 'POST',
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
        alert(" Serviço cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
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




