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
    
    const concluirBtn = document.getElementById('concluirBtn');
    concluirBtn.addEventListener('click', function() {
        alert('Vistoria registrada com sucesso! Obrigado.');
    });
}); 

const botaoConcluir = document.getElementById('botaoconcluir');
function mostrarErro(idElemento, mensagem) {
    document.getElementById(idElemento).textContent = mensagem;
}

function limparErros() {
    mostrarErro('erro-step', '');
    mostrarErro('erro-macaco', '');
    mostrarErro('erro-chave', '');
}

function validarCheckbox() {
    limparErros();

    let ok = true;

    let step = document.getElementById("boxstep").checked;
    if (!step) {
       mostrarErro('erro-step', 'Marque se possui step.');
       ok = false;
    } 

    let macaco = document.getElementById("boxmacaco").checked;
    if (!macaco) {
       mostrarErro('erro-macaco', 'Verifique se possui macaco para continuar.');
       ok = false;
    } 

    let chave = document.getElementById("boxchave").checked;
    if (!chave) {
       mostrarErro('erro-chave', 'Verifique se possui chave para continuar.');
       ok = false;
    } 

    if (ok) {
        alert('Formulário enviado com sucesso!');
    }

    return ok;
}

//    botaoConcluir.addEventListener('click', function() {
//     let erros = [];

//     const step = document.getElementById("boxstep").value;
//     const macaco = document.getElementById("boxmacaco").value;
//     const chave = document.getElementById("boxchave").value;

//     console.log("step:", step);
//     console.log("macaco:", macaco);
//     console.log("chave:", chave);

//     if (!step && !macaco && !chave) {
//         erros.push("Selecione pelo menos um item do veículo (Step, Macaco ou Chave de Roda).");
//     }

// });