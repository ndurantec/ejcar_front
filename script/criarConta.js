document.addEventListener('DOMContentLoaded', function() {
    // Configuração da Assinatura
    const canvas = document.getElementById('signaturePad');
    const clearBtn = document.getElementById('clearSignature');
    const ctx = canvas.getContext('2d');

    // 🚨 NOVO: Variável global para armazenar a string Base64 do canvas limpo
    let emptySignatureData = '';
    
    function initCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 200;
        
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#000';
        ctx.fillStyle = '#f9f9f9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 🚨 NOVO: Captura o Base64 do canvas limpo após a inicialização
        emptySignatureData = canvas.toDataURL('image/png');
    }
    
    initCanvas();
    
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    function startDrawing(e) {
        isDrawing = true;
        const pos = getPosition(e);
        [lastX, lastY] = [pos.x, pos.y];
        
        e.preventDefault();
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const pos = getPosition(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        
        [lastX, lastY] = [pos.x, pos.y];
        
        e.preventDefault();
    }
    
    function stopDrawing() {
        isDrawing = false;
    }

    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        
        if (e.type.includes('touch')) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    
    function clearSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f9f9f9';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000'; 
    }
    
    // Event Listeners da Assinatura
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    
    clearBtn.addEventListener('click', clearSignature);
    window.addEventListener('resize', initCanvas);

    // 🚨 NOVO: Função auxiliar para verificar e obter a assinatura
    window.getSignatureData = function() {
        const currentSignature = canvas.toDataURL('image/png');
        
        // Compara a assinatura atual com a assinatura do canvas limpo
        if (currentSignature === emptySignatureData) {
            return null; // Retorna nulo se o canvas estiver vazio
        }
        return currentSignature; // Retorna o Base64 se houver desenho
    };



    // Toggle Senha
    document.getElementById('toggleSenha').addEventListener('click', function() {
        toggleSenha('toggleSenha', 'senha');
    });

    document.getElementById('toggleConfirme').addEventListener('click', function() {
        toggleSenha('toggleConfirme', 'confirme');
    });

    // Botões
    // document.getElementById('botaocriar').addEventListener('click', criarconta);
    // document.getElementById('botaosalvar').addEventListener('click', salvar);
    // document.getElementById('botaodeletar').addEventListener('click', deletar);
    // document.getElementById('botaotrocar').addEventListener('click', atualizar);
});

// Função para Toggle da Senha
function toggleSenha(botaoId, inputId) {
    const botao = document.getElementById(botaoId);
    const input = document.getElementById(inputId);
    const icon = botao.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fa fa-eye';
    }
}

// // Função para guardar os dados
// function guardarDados(conta) {
//     const contasExistentes = JSON.parse(localStorage.getItem('contas')) || [];
//     contasExistentes.push(conta);
//     localStorage.setItem('contas', JSON.stringify(contasExistentes));
//     console.log('Conta salva:', conta);
// }

// Função para obter contas
// function obterContas() {
//     return JSON.parse(localStorage.getItem('contas')) || [];
// }

// Função principal para criar conta

// Função Salvar
// function salvar() {
    
//     const nome = document.getElementById("nome").value.trim();
//     const cpf = document.getElementById("cpf").value.trim();
//     const telefone = document.getElementById("telefone").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const usuario = document.getElementById("usuario").value.trim();
    
//     console.log("=== DADOS SALVOS ===");
//     console.log("Nome: " + nome);
//     console.log("CPF: " + cpf);
//     console.log("Telefone: " + telefone);
//     console.log("Email: " + email);
//     console.log("Usuário: " + usuario);
//     console.log("=====================");
    
//     alert('Dados salvos no console!');
// }


// Função para limpar formulário
function limparFormulario() {

    document.querySelector('form').reset();
    const canvas = document.getElementById('signaturePad');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    console.log("📝 Formulário limpo!");
}



function toggleSenha(botaoId, inputId) {
    const botao = document.getElementById(botaoId);
    const input = document.getElementById(inputId);
    const icon = botao.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fa fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fa fa-eye';
    }
}




// function validarFormulario() {
//      //limparErros();

//     // Captura dos valores do formulário
//     let nome = document.getElementById("nome").value;
//     let cpf = document.getElementById("cpf").value;
//     let telefone = document.getElementById("telefone").value;
//     let email = document.getElementById("email").value;
//     let senha = document.getElementById("senha").value;
//     let confirme = document.getElementById("confirme").value;
//     let assinatura = document.getElementById("signaturePad").value;


//     let ok = true;

//     if (!nome) { mostrarErro('erro-nome', 'Verifique se possui nome para continuar.'); ok = false; }
//     if (!cpf) { mostrarErro('erro-cpf', 'Verifique se possui cpf para continuar.'); ok = false; }
//     if (!telefone) { mostrarErro('erro-telefone', 'Verifique se possui nome para continuar.'); ok = false; }
//     if (!email) { mostrarErro('erro-email', 'Verifique se possui email para continuar.'); ok = false; }
//     if (!senha) { mostrarErro('erro-senha', 'Verifique se possui senha para continuar.'); ok = false; }
//     if (!confirme) { mostrarErro('erro-confirme', 'Verifique se possui confirme senha para continuar.'); ok = false; }
//     if (!assinatura) { mostrarErro('erro-assinatura', 'Verifique se possui assinatura para continuar.'); ok = false; }

//     return ok;
// };

function validarFormulario() {
    // limparErros(); // Assumindo que esta função existe e limpa as mensagens de erro

    // Captura dos valores do formulário
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    //let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirme = document.getElementById("confirme").value;
    
    // 🚨 NOVO: Captura a assinatura usando a função que verifica se o canvas está vazio.
    // Retorna a string Base64 OU null (se estiver vazio).
    let assinaturaData = window.getSignatureData(); 

    let ok = true;

    if (!nome) { mostrarErro('erro-nome', 'Verifique se possui nome para continuar.'); ok = false; }
    if (!cpf) { mostrarErro('erro-cpf', 'Verifique se possui cpf para continuar.'); ok = false; }
    //if (!telefone) { mostrarErro('erro-telefone', 'Verifique se possui telefone para continuar.'); ok = false; } // Corrigido a mensagem
    if (!email) { mostrarErro('erro-email', 'Verifique se possui email para continuar.'); ok = false; }
    if (!senha) { mostrarErro('erro-senha', 'Verifique se possui senha para continuar.'); ok = false; }
    if (!confirme) { mostrarErro('erro-confirme', 'Verifique se possui confirme senha para continuar.'); ok = false; }
    
    // 🚨 VALIDAÇÃO CORRETA DA ASSINATURA: Verifica se o retorno não é nulo.
    if (!assinaturaData) { 
        mostrarErro('erro-assinatura', 'É necessário preencher a assinatura para continuar.'); 
        ok = false; 
    }
    
    // Se a validação for bem-sucedida, você pode querer armazenar 'assinaturaData'
    // em algum lugar para que a função que chama 'validarFormulario' possa acessá-la.
    // No entanto, é mais limpo deixar a coleta na função 'coletarDados'.

    return ok;
};







// function coletarDados() {

//     const canvas = document.getElementById('signaturePad');
  
//     return {
//         nome: document.getElementById("nome").value.trim(),
//         cpf: document.getElementById("cpf").value.trim(),
//         telefone: document.getElementById("telefone").value.trim(),
//         email: document.getElementById("email").value.trim(),
//         user: document.getElementById("usuario").value.trim(),
//         password: document.getElementById("senha").value.trim(),
//         confirmarSenha: document.getElementById("confirme").value.trim(),
//         assinatura: canvas.toDataURL(),// converte assinatura para Base64
//         idUsuario: localStorage.getItem("id_usuario"),

//         usuarioDto: {
//             id: localStorage.getItem("id_usuario") // ou pegue de um campo <input hidden>
//         }
//     };
// }

function coletarDados() {

    // 🚨 NOVO: Obtém a string Base64 da assinatura (retorna null se estiver vazia).
    const assinaturaBase64 = window.getSignatureData(); 
 
    return {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value.trim(),
        //telefone: document.getElementById("telefone").value.trim(),
        email: document.getElementById("email").value.trim(),
        user: document.getElementById("usuario").value.trim(),
        password: document.getElementById("senha").value.trim(),
        confirmarSenha: document.getElementById("confirme").value.trim(),
        
        // 🚨 AQUI ESTÁ A MUDANÇA: Usa o resultado já verificado da função auxiliar
        imagemBase64: assinaturaBase64, // Será o Base64 ou null
        
        idUsuario: localStorage.getItem("id_usuario"),

        usuarioDto: {
            id: localStorage.getItem("id_usuario") // ou pegue de um campo <input hidden>
        }
    };
}


function limparCampos() {
    console.log("Iniciando limpeza dos campos do formulário...");

    // 1. Limpa os campos de texto/input
    document.getElementById("nome").value = "";
    document.getElementById("cpf").value = "";
    //document.getElementById("telefone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("usuario").value = "";
    document.getElementById("senha").value = "";
    document.getElementById("confirme").value = "";

    // 2. Limpa a Assinatura (Canvas)
    const canvas = document.getElementById('signaturePad');
    if (canvas) {
        // Tenta usar a instância da biblioteca de assinatura (mais seguro)
        if (typeof signaturePadInstance !== 'undefined' && signaturePadInstance.clear) {
            signaturePadInstance.clear();
        } else {
             // Caso a instância não esteja disponível, limpa o canvas manualmente
             const ctx = canvas.getContext('2d');
             ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    // 3. Limpa mensagens de erro/sucesso (se a função existir)
    if (typeof limparErros === 'function') {
        limparErros();
    }
    
    // 4. Limpa o ID do usuário salvo no localStorage, tratando o próximo como novo
    localStorage.removeItem("id_usuario"); 
    
    console.log("Limpeza concluída. Formulário pronto para novo registro.");
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

function popularDados(usuario) {

    console.log("Chamou a função popularDados");

    if (!usuario) {
        console.error("Nenhum dado de usuário encontrado para popular a tela.");
        return;
    }

    // Preenche os campos do formulário
    document.getElementById("nome").value = usuario.nome || "";
    document.getElementById("email").value = usuario.email || "";
    document.getElementById("telefone").value = usuario.telefone || "";
    document.getElementById("senha").value = usuario.senha || "";
    document.getElementById("cpf").value = usuario.cpf || "";
    document.getElementById("usuario").value = usuario.usuario || "";

    if (usuario.assinatura) {
      // ...
      const canvasElement = document.getElementById("signaturePad");
      const ctx = canvasElement.getContext('2d');

      // 🚨 CORREÇÃO PRINCIPAL AQUI: Garante que o Base64 tenha o prefixo
        let assinaturaBase64 = usuario.assinatura;
        if (!assinaturaBase64.startsWith('data:')) {
             // Seu backend está retornando apenas a parte pura do Base64, então adicionamos o prefixo:
             assinaturaBase64 = 'data:image/png;base64,' + assinaturaBase64;
        }


        const img = new Image();
        
        img.onload = function() {
            // Limpa o canvas antes de desenhar a imagem salva
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            // Desenha a imagem Base64 no canvas
            ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
            mostrarMensagem("Dados e assinatura carregados com sucesso!", "sucesso");
        };
        
        // Atribui a string Base64 CORRIGIDA
        img.src = assinaturaBase64; 

    } else {
        // Se não houver Base64, garante que o canvas esteja limpo e visível
        const canvasElement = document.getElementById("signaturePad");
        canvasElement.getContext('2d').clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasElement.classList.remove('hidden');
        
        mostrarMensagem("Dados carregados, mas nenhuma assinatura encontrada.", "erro");


    }

    // Armazena o id do usuário no localStorage (caso ainda não esteja salvo)
    if (usuario.id) {
        localStorage.setItem("id_usuario", usuario.id);
    }
}



function salvar() {

    limparErros();

    console.log("A função 'criar conta' foi chamada e está executando a lógica de salvar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    console.log("Enviando criar conta:", dados);

    console.log( dados );

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/usuario/insert', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',

        body: JSON.stringify (dados),
    
        headers: headers

    })
    .then(async response => {
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
                    limparCampos();
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
        localStorage.setItem("id_usuario", data.id);
        mostrarMensagem(data.message || "✅ Conta cadastrada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));

}




function atualizar() {

    limparErros();

    console.log("A função 'atualizar' foi chamada e está executando a lógica de atualizar.");
    
    //if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    dados.id = localStorage.getItem("id_usuario");

    console.log( dados );

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/usuario/atualizar', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',

        body: JSON.stringify (dados),
    
        headers: headers

    })
    .then(async response => {
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
        localStorage.setItem("id_usuario", data.id);
        mostrarMensagem(data.message || "✅ Conta atualizada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}



function deletar() {
    
    limparErros();

    console.log("A função 'deletar' foi chamada e está executando a lógica de deletar.");
    
    //if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    dados.id = localStorage.getItem("id_usuario");

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/usuario/deletar', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',

        body: JSON.stringify(dados),
    
        headers: headers

    })
    .then(async response => {
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
                    limparCampos();
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
        localStorage.removeItem("id_usuario");
        mostrarMensagem(data.message || "✅ Conta deletada com sucesso!", "sucesso");
        limparCampos();
      }
    })
    .catch(error => console.error(error));

}




function consultar() {

    limparErros();

    console.log("A função 'consultar' foi chamada e está executando a lógica de alterar.");
    
    //if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log( dados );

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/usuario/buscarPorNome', {
        
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',

        body: JSON.stringify (dados),
    
        headers: headers

    })
    .then(async response => {
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
        localStorage.setItem("id_usuario", data.id);
        popularDados(data);
        mostrarMensagem(data.message || "✅ Conta consultada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}