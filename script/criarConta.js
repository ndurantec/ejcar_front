document.addEventListener('DOMContentLoaded', function() {
    // Configuração da Assinatura
    const canvas = document.getElementById('signaturePad');
    const clearBtn = document.getElementById('clearSignature');
    const ctx = canvas.getContext('2d');
    
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

    // Toggle Senha
    document.getElementById('toggleSenha').addEventListener('click', function() {
        toggleSenha('toggleSenha', 'senha');
    });

    document.getElementById('toggleConfirme').addEventListener('click', function() {
        toggleSenha('toggleConfirme', 'confirme');
    });

    // Botões
    document.getElementById('botaocriar').addEventListener('click', criarconta);
    document.getElementById('botaosalvar').addEventListener('click', salvar);
    document.getElementById('botaodeletar').addEventListener('click', deletar);
    document.getElementById('botaotrocar').addEventListener('click', atualizar);
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
function salvar() {
    
    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    
    console.log("=== DADOS SALVOS ===");
    console.log("Nome: " + nome);
    console.log("CPF: " + cpf);
    console.log("Telefone: " + telefone);
    console.log("Email: " + email);
    console.log("Usuário: " + usuario);
    console.log("=====================");
    
    alert('Dados salvos no console!');
}


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




function validarFormulario() {
     //limparErros();

    // Captura dos valores do formulário
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let confirme = document.getElementById("confirme").value;
    let assinatura = document.getElementById("assinatura").value;


    let ok = true;

    if (!nome) { mostrarErro('erro-nome', 'Verifique se possui nome para continuar.'); ok = false; }
    if (!cpf) { mostrarErro('erro-cpf', 'Verifique se possui cpf para continuar.'); ok = false; }
    if (!telefone) { mostrarErro('erro-telefone', 'Verifique se possui nome para continuar.'); ok = false; }
    if (!email) { mostrarErro('erro-email', 'Verifique se possui email para continuar.'); ok = false; }
    if (!senha) { mostrarErro('erro-senha', 'Verifique se possui senha para continuar.'); ok = false; }
    if (!confirme) { mostrarErro('erro-confirme', 'Verifique se possui confirme senha para continuar.'); ok = false; }
    if (!assinatura) { mostrarErro('erro-assinatura', 'Verifique se possui assinatura para continuar.'); ok = false; }

    return ok;
};



function coletarDados() {

    const canvas = document.getElementById('signaturePad');
  
    return {
        nome: document.getElementById("nome").value.trim(),
        cpf: document.getElementById("cpf").value.trim(),
        telefone: document.getElementById("telefone").value.trim(),
        email: document.getElementById("email").value.trim(),
        user: document.getElementById("usuario").value.trim(),
        password: document.getElementById("senha").value.trim(),
        confirmarSenha: document.getElementById("confirme").value.trim(),
        assinatura: canvas.toDataURL(),// converte assinatura para Base64
        idUsuario: localStorage.getItem("id_usuario"),

        usuarioDto: {
            id: localStorage.getItem("id_usuario") // ou pegue de um campo <input hidden>
        }
    };
}




function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}
function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}





function criarconta() {

    limparErros();

    console.log("A função 'criar conta' foi chamada e está executando a lógica de salvar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

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
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/usuario/id', {
        
        method: 'PUT',
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
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/usuario/id', {
        
        method: 'DELETE',
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
        mostrarMensagem(data.message || "✅ Conta deletada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));

}




function alterarUsuario() {

    limparErros();

    console.log("A função 'alterar' foi chamada e está executando a lógica de alterar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/usuario/insert', {
        
        method: 'PUT',
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