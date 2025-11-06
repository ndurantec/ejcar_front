document.addEventListener('DOMContentLoaded', function() {
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
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    
    clearBtn.addEventListener('click', clearSignature);
    window.addEventListener('resize', initCanvas);

    document.getElementById('toggleSenha').addEventListener('click', function() {
        toggleSenha('toggleSenha', 'senha');
    });

    document.getElementById('toggleConfirme').addEventListener('click', function() {
        toggleSenha('toggleConfirme', 'confirme');
    });

});

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
    document.querySelectorAll('.erro').forEach(erro => erro.textContent = '');

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
    const confirme = document.getElementById("confirme").value;
    
    let ok = true;

    if (nome === '') {
        document.getElementById('erro-nome').textContent = 'Preencha o nome!';
        ok = false;
    }

    if (cpf === '') {
        document.getElementById('erro-cpf').textContent = 'Preencha o CPF!';
        ok = false;
    }

    if (telefone === '') {
        document.getElementById('erro-telefone').textContent = 'Preencha o telefone!';
        ok = false;
    }

    if (email === '') {
        document.getElementById('erro-email').textContent = 'Preencha o email!';
        ok = false;
    }

    if (usuario === '') {
        document.getElementById('erro-usuario').textContent = 'Preencha o usuário!';
        ok = false;
    }

    if (senha === '') {
        document.getElementById('erro-senha').textContent = 'Preencha a senha!';
        ok = false;
    }

    if (confirme === '') {
        document.getElementById('erro-confirme').textContent = 'Confirme a senha!';
        ok = false;
    }

    if (senha !== confirme) {
        document.getElementById('erro-confirme').textContent = 'As senhas não coincidem!';
        ok = false;
    }

    if (ok) {
        console.log("Nome:", nome);
        console.log("CPF:", cpf);
        console.log("Telefone:", telefone);
        console.log("Email:", email);
        console.log("Usuário:", usuario);
        console.log("Senha:", senha);
        console.log("Confirme:", confirme);
        console.log("Formulário válido!");
        alert('Conta criada com sucesso!');
    } else {
        console.log("Formulário inválido!");
    }

    return ok;
}
document.getElementById('criar').addEventListener('click', function(evento) {
    evento.preventDefault();
    validarFormulario();
});

function concluir() {

    limparErros();

    console.log("A função 'salvarUsuario' foi chamada e está executando a lógica de salvar.");

    if (!validarFormulario()) return;

    const dados = coletarDados();

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://127.0.0.1:8080/responsaveis', {
       
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(
            dados
        ),
    
        headers: headers

    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
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
          localStorage.setItem("id_usuario", data.id);
          mostrarMensagem(data.message || "✅ Usuario cadastrado com sucesso!", "sucesso");
        }
      })
      .catch(error => console.error(error));

}

function salvar() {

    limparErros();

    console.log("A função 'salvarUsuario' foi chamada e está executando a lógica de salvar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

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
        mostrarMensagem(data.message || "✅ Usuario cadastrado com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}       


function deletar() {
    
    limparErros();

    if (!validarFormulario()) return;

    const dados = coletarDados();

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    fetch('http://127.0.0.1:8080/responsaveis', {

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
      })
      .then(data => {
        if (data.id) {
          localStorage.setItem("id_usuario", data.id);
          mostrarMensagem(data.message || "✅ Usuario cadastrado com sucesso!", "sucesso");
        }
      })
      .catch(error => console.error(error));

}











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
        cpf: document.getElementById("cpf").value.trim(),
        //telefone: document.getElementById("telefone").value.trim(),
        email: document.getElementById("email").value.trim(),
        user: document.getElementById("usuario").value.trim(),
        password: document.getElementById("senha").value.trim(),
        confirmarSenha: document.getElementById("confirme").value.trim(),
        assinatura: canvas.toDataURL(),// converte assinatura para Base64

    };

}


function consultarUsuario() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/listaresponsavel', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}

function alterarUsuario() {
   
    // Envia os dados via fetch
    fetch('http://localhost:8080/responsavel/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });

}