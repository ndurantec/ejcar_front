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
    let dataSaida = document.getElementById("dataSaida").value;
    let dataEntrada = document.getElementById("dataEntrada").value;
    let horaSaida = document.getElementById("horaSaida").value;
    let horaEntrada = document.getElementById("horaEntrada").value;
    
    let ok = true;

    if (!dataEntrada) { mostrarErro('erro-nome', 'Verifique se possui data de entrada para continuar.'); ok = false; }
    if (!dataSaida) { mostrarErro('erro-cpf', 'Verifique se possui data de saida para continuar.'); ok = false; }
    if (!horaEntrada) { mostrarErro('erro-cpf', 'Verifique se possui hora de entrada para continuar.'); ok = false; }
    if (!horaSaida) { mostrarErro('erro-cpf', 'Verifique se possui hora de saida para continuar.'); ok = false; }
    return ok;
}

function coletarDados() {
    const canvas = document.getElementById('signaturePad');
  
    return {
        dataSaida: document.getElementById("dataSaida").value.trim(),
        dataEntrada: document.getElementById("dataEntrada").value.trim(),
        horaSaida: document.getElementById("horaSaida").value.trim(),
        horaEntrada: document.getElementById("horaEntrada").value.trim(),
        idUsuario: localStorage.getItem("id_usuario"),
        veiculoDto: {
            id: localStorage.getItem("id_veiculo") // ou pegue de um campo <input hidden>
        },
        servicoDto: {
            id: localStorage.getItem("id_servico") // ou pegue de um campo <input hidden>
        }
    };
}


function salvar() {
        
        limparErros();

        if (!validarFormulario()) return;

        const dados = coletarDados();
        //console.log("Enviando criar conta:", dados);

        console.log(dados);

    // const dataEntrada = document.getElementById("entradaVeiculo").value;

    // const dataSaida = document.getElementById("saidaVeiculo").value;

    // const horaEntrada = document.getElementById("horaEntrada").value;

    // const horaSaida = document.getElementById("horaSaida").value;


            // if(dataEntrada == ""){
            //     alert("Você precisa preencher a entrada do veiculo");
            // }

            // if(dataSaida == ""){
            //     alert("Você precisa preencher a saida do veiculo");
            // }

            //  if(horaEntrada == ""){
            //     alert("Você precisa preencher a hora de entrada");
            // }
            
            //  if(horaSaida == ""){
            //     alert("Você precisa preencher a hora de saida");
            // }

            //     alert(dataEntrada + " - " + dataSaida + " - " + horaSaida + " - " + horaEntrada )

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


    }).then(async response => {
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
    }).then(data => {
      if (data.id) {
        localStorage.setItem("id_responsavel", data.id);
        // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
        alert("Responsável cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
      }
    })
    .catch(error => console.error("Erro ao cadastrar:", error))
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

       
    }).then(async response => {
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
    }).then(data => {
      if (data.id) {
        localStorage.setItem("id_responsavel", data.id);
        // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
        alert("Responsável cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
      }
    })
    .catch(error => console.error("Erro ao cadastrar:", error))
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

       
    }).then(async response => {
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
    }).then(data => {
      if (data.id) {
        localStorage.setItem("id_responsavel", data.id);
        // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
        alert("Responsável cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
      }
    })
    .catch(error => console.error("Erro ao cadastrar:", error))
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
       
    }).then(async response => {
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
    }).then(data => {
      if (data.id) {
        localStorage.setItem("id_responsavel", data.id);
        // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
        alert("Responsável cadastrado com sucesso!")
      } else {
        alert("Cadastro concluído, mas o ID não foi retornado.")
      }
    })
    .catch(error => console.error("Erro ao cadastrar:", error))
}
