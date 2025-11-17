
function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
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

function limparMensagem() {
  const mensagem = document.getElementById('erro-mensagem');
  if (mensagem) mensagem.textContent = '';
}

function validarFormulario() {
    //limparErros();
    
    // Captura dos valores do formulário
    let nome = document.getElementById("nome").value;
    
    let ok = true;
    
    if (!nome) { mostrarErro('erro-nome', 'Verifique se possui nome para continuar.'); ok = false; }
    
    return ok;
}

function coletarDados() {
      
    return {        
        nome: document.getElementById("nome").value.trim(),
        idUsuario: localStorage.getItem("id_usuario")       
    };
}

function limparCampos() {
    console.log("Iniciando limpeza dos campos do formulário...");

    // 1. Limpa os campos de texto/input
    document.getElementById("nome").value = "";
     
    
    console.log("Limpeza concluída. Formulário pronto para novo registro.");
}



function salvar() {
    
    limparErros();
    
    if (!validarFormulario()) return;
    
    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);
    console.log(dados);
    
   // console.log(JSON.stringify(dados));//enviando dados

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    // Envia os dados via fetch
    fetch("http://localhost:8080/produto/cadproduto", { // altere a URL conforme seu endpoint
       
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
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
                      limparCampos();
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
          localStorage.setItem("id_produto", data.id);
          mostrarMensagem(data.message || "✅ Produto cadastrado com sucesso!", "sucesso");          
          limparCampos();
          limparMensagem();
        }
      })
      .catch(error => console.error("Erro ao cadastrar:", error));

}

function consultar() {
    limparErros();
    
    //if (!validarFormulario()) return;
    
    const dados = coletarDados();

    //console.log("Enviando criar conta:", dados);
    
    console.log( dados );//enviando dados
    
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
   
    // Envia os dados via fetch
    fetch("http://localhost:8080/produto/buscarPorNome", { // altere a URL conforme seu endpoint

        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
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
          }
          throw new Error("Erro de validação");
        }
  
        return data;
      })
      .then(data => {
        if (data.id) {
          localStorage.setItem("id_produto", data.id);
          mostrarMensagem(data.message || "✅ Produto encontrado!", "sucesso");          
        } 
      })
      .catch(error => console.error("Erro ao cadastrar:", error));
   }
    

function alterar() {

    limparErros();
    
    if (!validarFormulario()) return;

    
    const dados = coletarDados();
    dados.id = localStorage.getItem("id_produto");
    //console.log("Enviando criar conta:", dados);
    
    console.log( dados );//enviando dados

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
   
    // Envia os dados via fetch
    fetch("http://localhost:8080/produto/alterar", { // altere a URL conforme seu endpoint

        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
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
          localStorage.setItem("id_produto", data.id);
          // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
          alert("Produto cadastrado com sucesso!")
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
    //console.log("Enviando criar conta:", dados);
    
    console.log(JSON.stringify(dados));//enviando dados
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    // Envia os dados via fetch
    fetch("http://localhost:8080/produto/{id}"), { // altere a URL conforme seu endpoint

        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
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
          localStorage.setItem("id_produto", data.id);
          // mostrarMensagem(data.message || "✅ Responsavel cadastrado com sucesso!", "sucesso");
          alert("Produto cadastrado com sucesso!")
        } else {
          alert("Cadastro concluído, mas o ID não foi retornado.")
        }
      })
      .catch(error => console.error("Erro ao cadastrar:", error))
} 


