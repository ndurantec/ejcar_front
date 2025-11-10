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
    
                   // Botão limpar//
    clearBtn.addEventListener('click', clearSignature);
    
    window.addEventListener('resize', initCanvas);
    
    const modalidadeSelect = document.getElementById('modalidade');
    if (modalidadeSelect) {
        modalidadeSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value) {
                document.getElementById('marcaModelo').textContent = selectedOption.text.trim();
            }
        });
    }
}); 

const botaoSalvar = document.getElementById('botaosalvar');
    function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}

function limparErros() {
    mostrarErro('erro-step', '');
    mostrarErro('erro-macaco', '');
    mostrarErro('erro-chave', '');
    mostrarErro('erro-equipamentos', '');
    mostrarErro('erro-descricao', '');
    mostrarErro('erro-termo', '');
    mostrarErro('erro-assinatura', '');
}

function validarCheckbox() {

    limparErros();

    let step = document.getElementById("boxstep").checked;
    let macaco = document.getElementById("boxmacaco").checked;
    let chave = document.getElementById("boxchave").checked;
    let descricao = document.getElementById("descricao").value;
    let proprietario = document.getElementById("proprietario").textContent;
    let marcaModelo = document.getElementById("marcaModelo").textContent;
    let placa = document.getElementById("placa").textContent;
    let termo = document.getElementById("termoAceite").checked;

    console.log("Step:", step);
    console.log("Macaco:", macaco);
    console.log("Chave de Roda:", chave);
    console.log("Outros itens:", descricao);
    console.log("Proprietário:", proprietario);
    console.log("Marca/Modelo:", marcaModelo);
    console.log("Placa:", placa);
    console.log("Termo aceito:", termo);

    let ok = true;

    if (!step) {
        mostrarErro('erro-step', 'Verifique se possui step para continuar.');
        ok = false;
    } 

    if (!macaco) {
        mostrarErro('erro-macaco', 'Verifique se possui macaco para continuar.');
        ok = false;
    } 

    if (!chave) {
        mostrarErro('erro-chave', 'Verifique se possui chave para continuar.');
        ok = false;
    } 

    if (descricao.trim() === '') {
        mostrarErro('erro-descricao', 'Descreva os outros itens!');
        ok = false;
    }

    if (!termo) {
        mostrarErro('erro-termo', 'Aceite os termos para continuar!');
        ok = false;
    }

    if (ok) {
        alert('✅ Vistoria concluída com sucesso!');
    }

    return ok;
}

document.querySelectorAll('.campo-termo-label').forEach(label => {
    label.addEventListener('click', function() {
        const tipo = this.id === 'proprietario' ? 'nome do proprietário' : 
                    this.id === 'marcaModelo' ? 'marca e modelo' : 'placa';
        
        const valor = prompt(`Digite o ${tipo}:`);
        if (valor && valor.trim()) {
            this.textContent = valor.trim();
        }
    });
});

botaoSalvar.addEventListener('click', validarCheckbox);

function validarFormulario() {

    // Captura dos valores do formulário
    let step = document.getElementById("step").value;
    let macaco = document.getElementById("macaco").value;
    let chaveDeRoda = document.getElementById("chaveDeRoda").value;
    let equipamentos = document.getElementById("equipamentos").value;
    let outrosItens = document.getElementById("outrosItens").value;
    let termo = document.getElementById("termo").value;
    let assinatura = document.getElementById("assinatura").value;

    let ok = true;

    if (!step) { mostrarErro('erro-step', 'Verifique se possui step para continuar.'); ok = false; }
    if (!macaco) { mostrarErro('erro-macaco', 'Verifique se possui macaco para continuar.'); ok = false; }
    if (!chaveDeRoda) { mostrarErro('erro-chaveDeRoda', 'Verifique se possui chaveDeRoda para continuar.'); ok = false; }
    if (!equipamentos) { mostrarErro('erro-equipamentos', 'Verifique se possui equipamentos para continuar.'); ok = false; }
    if (!outrosItens) { mostrarErro('erro-outrosItens', 'Verifique se possui outrosItens para continuar.'); ok = false; }
    if (!termo) { mostrarErro('erro-termo', 'Verifique se aceitou o termo para continuar.'); ok = false; }
    if (!assinatura) { mostrarErro('erro-assinatura', 'Verifique se a assinatura está preenchida para continuar.'); ok = false; }
    return ok;

}

function coletarDados() {
  
    return {
        step: document.getElementById("boxstep").checked,
        chaveDeRoda: document.getElementById("boxchaveDeRoda").value.trim(),
        macaco: document.getElementById("boxmacaco").value.trim(),
        equipamento: document.getElementById("boxequipamento").value.trim(),
        outrosItens: document.getElementById("boxoutrosItens").value.trim(),
        termo: document.getElementById("boxtermo").value.trim(),
        imagemBase64:  document.getElementById('signaturePad').toDataURL(),// converte assinatura para Base64
<<<<<<< HEAD
        idUsuario: localStorage.getItem("id_usuario")

        veiculoDto: {
            id: localStorage.getItem("id_veiculo") // ou pegue de um campo <input hidden>
=======
        idUsuario: localStorage.getItem("id_usuario"),

        vistoriaDto: {
            id: localStorage.getItem("id_vistoria") // ou pegue de um campo <input hidden>
>>>>>>> 7e61f18e1c517dc7a0b9fe39b6e8631808eeae0d
        }
    };
}

function salvar() {
  
    function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }

    console.log("A função 'salvar' foi chamada e está executando a lógica de salvar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
<<<<<<< HEAD
    console.log("Enviando vistoria:", dados);
=======
    console.log("Enviando criar conta:", dados);
>>>>>>> 7e61f18e1c517dc7a0b9fe39b6e8631808eeae0d

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/vistoria/insert', {
        
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
        mostrarMensagem(data.message || "✅ Vistoria cadastrada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}

function consultar() {
  
    function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }

    console.log("A função 'consultar' foi chamada e está executando a lógica de consulta.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/vistoria/id', {
        
        method: 'GET',
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
        mostrarMensagem(data.message || "✅ Vistoria consultada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}

function deletar() {

    function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }

    console.log("A função 'deletar' foi chamada e está executando a lógica de deletar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/vistoria/insert', {
        
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
        mostrarMensagem(data.message || "✅ Vistoria deletada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}

function atualizar() {


    function mostrarErro(idElemento, mensagem) {
        document.getElementById(idElemento).textContent = mensagem;
    }
    function limparErros() {
        let erros = document.querySelectorAll('.erro');
        erros.forEach(e => e.textContent = '');
    }

    console.log("A função 'atualizar' foi chamada e está executando a lógica de atualizar.");
    
    if (!validarFormulario()) return;

    const dados = coletarDados();
    //console.log("Enviando criar conta:", dados);

    console.log(JSON.stringify(dados));

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");


    fetch('http://localhost:8080/vistoria/insert', {
        
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
        mostrarMensagem(data.message || "✅ Vistoria atualizada com sucesso!", "sucesso");
      }
    })
    .catch(error => console.error(error));
}

// Função para imprimir/gerar PDF da vistoria
function imprimirVistoria() {
    if (!document.getElementById('termoAceite').checked) {
        alert('É necessário aceitar os termos antes de imprimir a vistoria.');
        return;
    }

    const canvas = document.getElementById('signaturePad');
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let isEmpty = true;
    
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] !== 0) {
            isEmpty = false;
            break;
        }
    }
    
    if (isEmpty) {
        alert('É necessário fornecer uma assinatura antes de imprimir a vistoria.');
        return;
    }

    const janelaImpressao = window.open('', '_blank');
    const conteudo = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Vistoria Veicular - EJCAR</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .cabecalho { text-align: center; border-bottom: 2px solid #d32f2f; padding-bottom: 10px; margin-bottom: 20px; }
                .dados-vistoria { margin-bottom: 20px; }
                .item { margin: 5px 0; }
                .assinatura { margin-top: 30px; border-top: 1px solid #000; padding-top: 10px; }
                .data { text-align: right; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="cabecalho">
                <h1>Vistoria Veicular - EJCAR</h1>
                <p>Cascavel-Paraná</p>
            </div>
            
            <div class="dados-vistoria">
                <h2>Dados da Vistoria</h2>
                <div class="item"><strong>Fluxo:</strong> ${document.querySelector('input[name="fluxo"]:checked').value === 'entrada' ? 'Entrada' : 'Saída'}</div>
                <div class="item"><strong>Veículo:</strong> ${document.getElementById('modalidade').options[document.getElementById('modalidade').selectedIndex].text}</div>
                <div class="item"><strong>Proprietário:</strong> ${document.getElementById('proprietario').textContent}</div>
                <div class="item"><strong>Marca/Modelo:</strong> ${document.getElementById('marcaModelo').textContent}</div>
                <div class="item"><strong>Placa:</strong> ${document.getElementById('placa').textContent}</div>
            </div>
            
            <div class="itens-vistoria">
                <h2>Itens Verificados</h2>
                <div class="item"><strong>Step:</strong> ${document.getElementById('boxstep').checked ? 'Presente' : 'Ausente'}</div>
                <div class="item"><strong>Macaco:</strong> ${document.getElementById('boxmacaco').checked ? 'Presente' : 'Ausente'}</div>
                <div class="item"><strong>Chave de Roda:</strong> ${document.getElementById('boxchave').checked ? 'Presente' : 'Ausente'}</div>
                <div class="item"><strong>Outros Itens:</strong> ${document.getElementById('descricao').value || 'Nenhum'}</div>
            </div>
            
            <div class="termo">
                <h2>Termo de Aceitação</h2>
                <p>
                    Eu, ${document.getElementById('proprietario').textContent},
                    proprietário do veículo ${document.getElementById('marcaModelo').textContent},
                    placa ${document.getElementById('placa').textContent},
                    declaro, para todos os fins de direito, que concordo e atesto que o meu veículo 
                    ${document.querySelector('input[name="fluxo"]:checked').value === 'entrada' ? 'entrou' : 'saiu'} nas instalações da oficina EJCAR com os seguintes objetos em seu interior. 
                    Compreendo que esta lista representa os itens presentes no veículo no momento da 
                    sua ${document.querySelector('input[name="fluxo"]:checked').value === 'entrada' ? 'entrada' : 'saída'} na oficina.
                </p>
            </div>
            
            <div class="assinatura">
                <p><strong>Assinatura do Proprietário:</strong></p>
                <img src="${canvas.toDataURL()}" style="max-width: 400px; border: 1px solid #ccc;">
            </div>
            
            <div class="data">
                <p>Data: ${new Date().toLocaleDateString('pt-BR')}</p>
            </div>
        </body>
        </html>
    `;
    
    janelaImpressao.document.write(conteudo);
    janelaImpressao.document.close();

    janelaImpressao.onload = function() {
        janelaImpressao.print();
    };
}

function limparErros() {
    let erros = document.querySelectorAll('.erro');
    erros.forEach(e => e.textContent = '');
}
