function mostrarErro(id, mensagem) {
    const erroElement = document.getElementById(id);
   if (erroElement) erroElement.textContent = mensagem;
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

function limparErros() {
   let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
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
   //const canvas = document.getElementById('signaturePad');

   console.log("O usuario --> " + localStorage.getItem("id_usuario") );

   return {
      responsavel: document.getElementById("responsavel").value.trim(),
      modelo: document.getElementById("modelo").value.trim(),
      placa: document.getElementById("placa").value.trim(),
      ano: document.getElementById("ano").value.trim(),
      cor: document.getElementById("cor").value.trim(),
      chassi: document.getElementById("chassi").value.trim(),
      idUsuario: localStorage.getItem("id_usuario"),
      seguroDto: {
        nome: document.getElementById("nomeSeguradora").value.trim(), 
        telefone: document.getElementById("numeroSeguradora").value.trim(),
        idUsuario: localStorage.getItem("id_usuario")
      }
    };
}


function popularDados(veiculo) {
    if (!veiculo) {
        console.error("Nenhum dado de veículo encontrado para popular a tela.");
        return;
    }

    console.log("Populando dados do veículo:", veiculo);

    // Campos principais do veículo
    document.getElementById("responsavel").value = veiculo.responsavel || "";
    document.getElementById("modelo").value = veiculo.modelo || "";
    document.getElementById("placa").value = veiculo.placa || "";
    document.getElementById("ano").value = veiculo.ano || "";
    document.getElementById("cor").value = veiculo.cor || "";
    document.getElementById("chassi").value = veiculo.chassi || "";

    // Se houver idUsuario no retorno, salvar no localStorage
    if (veiculo.idUsuario) {
        localStorage.setItem("id_usuario", veiculo.idUsuario);
    }

    // -------------------------
    //   Dados do Seguro
    // -------------------------
    const radioSim = document.getElementById("sim");
    const radioNao = document.getElementById("nao");

    if (veiculo.seguro) {

        // Tem seguradora → marca "Sim"
        radioSim.checked = true;


        document.getElementById("nomeSeguradora").value = veiculo.seguro.nome || "";
        document.getElementById("numeroSeguradora").value = veiculo.seguro.telefone || "";

        // salva idUsuario também no seguro (caso retorne separado)
        if (veiculo.seguroDto.idUsuario) {
            localStorage.setItem("id_usuario", veiculo.seguroDto.idUsuario);
        }
    } else {
        // Não tem seguradora → marca "Não"
        radioNao.checked = true;

        // Limpa os campos caso existam valores antigos
        document.getElementById("nomeSeguradora").value = "";
        document.getElementById("numeroSeguradora").value = "";
        console.warn("Nenhum dado de seguro encontrado no veículo.");
    }
}


function salvar() {
    
    console.log("Chamou o salvar");

    limparErros();

    if (!validarFormulario()) return;

    const dados = coletarDados();
    console.log( dados );

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/veiculo/cadveiculo', {

      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      body: JSON.stringify(dados),

      headers: headers

    }).then(async response => {
      let data = await response.json();

      console.log("resposta do servidor");//resposta do servidor
      console.log( data );
      

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
        localStorage.setItem("id_veiculo", data.id);
        mostrarMensagem(data.message || "✅ Veículo cadastrado com sucesso!", "sucesso");
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

    fetch('http://localhost:8080/veiculo/alterar', {

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
        localStorage.setItem("id_veiculo", data.id);
        mostrarMensagem(data.message || "✅ Veículo alterado com sucesso!", "sucesso");
      } 
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
}

function consultar() {

    limparErros();

    //if (!validarFormulario()) return;

    const dados = coletarDados();

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://localhost:8080/veiculo/placa', {

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
        popularDados(data);
      } 
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
}

function deletar() {
    limparErros();

   //if (!validarFormulario()) return;

   const dados = coletarDados();

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch('http://localhost:8080/veiculo/deletar', {

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
        localStorage.removeItem("id_veiculo");
        mostrarMensagem(data.message || "✅ Veículo deletado com sucesso!", "sucesso");        
      } 
    })
    .catch(error => console.error("Erro ao cadastrar:", error));
}
