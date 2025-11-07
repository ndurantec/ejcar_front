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


function logar() {
   
   limparErros();
    
    if (!validarFormulario()) return;

    const dados = coletarDados();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
     
    console.log("Usuário:", usuario);
    console.log("Senha:", senha);
    console.log("Email:", email);
    console.log("Telefone:", telefone);

    document.getElementById('erro-usuario').textContent = '';
    document.getElementById('erro-senha').textContent = '';
    document.getElementById('erro-email').textContent = '';
    document.getElementById('erro-telefone').textContent = '';

   
    if (usuario === '') {
       document.getElementById('erro-usuario').textContent = 'Preencha o usuário!';
    }

    if (senha === '') {
       document.getElementById('erro-senha').textContent = 'Preencha a senha!';
    }

    if (email === '') {
       document.getElementById('erro-email').textContent = 'Preencha o email!';
    }

    if (telefone === '') {
        document.getElementById('erro-telefone').textContent = 'Preencha o telefone!';
     }

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");
    
    fetch('http://127.0.0.1:8080/responsaveis'), {

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
          alert(" Login cadastrado com sucesso!")
        } else {
          alert("Cadastro concluído, mas o ID não foi retornado.")
        }
      })
      .catch(error => console.error("Erro ao cadastrar:", error));

    //    fetch('http://127.0.0.1:8080/responsaveis', { 
         
    //        method: 'POST',
    //     mode: 'cors',
    //     cache: 'no-cache',
    //     body: JSON.stringify(
    //         dados
    //     ),
    
    //     headers: headers

    // }).then(response => {
           
    // }).then(data => {
       
    // }).catch(error => {
       
    // });

}
