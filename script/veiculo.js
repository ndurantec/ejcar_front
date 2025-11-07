document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});

function limparErros() {
   let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}

function mostrarErro(id, mensagem) {
    const erroElement = document.getElementById(id);
   if (erroElement) erroElement.textContent = mensagem;
}

function validarFormulario() {
   limparErros();

  let responsavel = document.getElementById("responsavel").value.trim();
  let modelo = document.getElementById("modelo").value.trim();
  let placa = document.getElementById("placa").value.trim();
  let ano = document.getElementById("ano").value.trim();
  let cor = document.getElementById("cor").value.trim();
  let chassi = document.getElementById("chassi").value.trim();
  let seguradora = document.querySelector('input[name="realizado"]:checked');

  let ok = true;

  if (!responsavel) {
    mostrarErro('erro-responsavel', 'Verifique se possui nome do responsável para continuar.');
    ok = false;
  }
  if (!modelo) {
    mostrarErro('erro-modelo', 'Verifique se possui modelo do veículo para continuar.');
    ok = false;
  }
  if (!placa) {
    mostrarErro('erro-placa', 'Verifique se possui placa para continuar.');
    ok = false;
  }
  if (!ano) {
    mostrarErro('erro-ano', 'Verifique se possui ano do veículo para continuar.');
    ok = false;
  }
  if (!cor) {
    mostrarErro('erro-cor', 'Verifique se possui cor para continuar.');
    ok = false;
  }
  if (!chassi) {
    mostrarErro('erro-chassi', 'Verifique se possui chassi para continuar.');
    ok = false;
  }
  if (!seguradora) {
    mostrarErro('erro-seguradora', 'Verifique se selecionou se o veículo tem seguradora.');
    ok = false;
  }

  return ok;
}

function coletarDados() {
   const canvas = document.getElementById('signaturePad');

   return {
      responsavel: document.getElementById("responsavel").value.trim(),
      modelo: document.getElementById("modelo").value.trim(),
      placa: document.getElementById("placa").value.trim(),
      ano: document.getElementById("ano").value.trim(),
      cor: document.getElementById("cor").value.trim(),
      chassi: document.getElementById("chassi").value.trim(),
      seguradora: document.querySelector('input[name="realizado"]:checked').value
    };
}

function salvar() {
    limparErros();

    if (!validarFormulario()) return;

    const dados = coletarDados();

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/veiculo/cadveiculo'), {

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
        alert("Veículo cadastrado com sucesso!")
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

    fetch('http://localhost:8080/veiculo/{id}'), {

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
        alert("Veículo cadastrado com sucesso!")
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

    fetch('http://localhost:8080/veiculo/{id}'), {

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
        alert("Veículo cadastrado com sucesso!")
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

  fetch('http://localhost:8080/veiculo/{id}'), {

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
        alert("Veiculo cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
      }
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
}
