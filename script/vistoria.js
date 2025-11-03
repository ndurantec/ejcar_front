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
    
    // Centralizar o combobox e atualizar o termo quando uma opção for selecionada
    const comboboxContainer = document.querySelector('.combobox-container');
    if (comboboxContainer) {
        comboboxContainer.style.display = 'flex';
        comboboxContainer.style.flexDirection = 'column';
        comboboxContainer.style.alignItems = '';
        comboboxContainer.style.marginBottom = '10px';
    }
    
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

const botaoConcluir = document.getElementById('botaoconcluir');
    function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}

function limparErros() {
    mostrarErro('erro-step', '');
    mostrarErro('erro-macaco', '');
    mostrarErro('erro-chave', '');
    mostrarErro('erro-descricao', '');
    mostrarErro('erro-termo', '');
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

botaoConcluir.addEventListener('click', validarCheckbox);

function salvar() {
    const dados = {
        step: document.getElementById("boxstep").checked,
        macaco: document.getElementById("boxmacaco").checked,
        chave: document.getElementById("boxchave").checked,
        descricao: document.getElementById("descricao").value,
        proprietario: document.getElementById("proprietario").textContent,
        marcaModelo: document.getElementById("marcaModelo").textContent,
        placa: document.getElementById("placa").textContent,
        termoAceito: document.getElementById("termoAceite").checked
    };
    console.log('Dados salvos:', dados);
}

function concluir() {
    if (validarCheckbox()) {
        fetch('http://127.0.0.1:8080/responsaveis', {
           
        }).then(response => {
               
        }).then(data => {
           
        }).catch(error => {
           
        });
    }
}

function deletar() {
    fetch('http://localhost:8080/vistoria/{id}', {
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}

function atualizar() {
    fetch('http://localhost:8080/vistoria/{id}', {
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
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