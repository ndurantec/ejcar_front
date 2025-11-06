document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let responsavel = document.getElementById("responsavel").value.trim();
    let modelo = document.getElementById("modelo").value.trim();
    let placa = document.getElementById("placa").value.trim();
    let ano = document.getElementById("ano").value.trim();
    let cor = document.getElementById("cor").value.trim();
    let chassi = document.getElementById("chassi").value.trim();
    let seguradora = document.querySelector('input[name="realizado"]:checked');

    if (responsavel === "") {
      alert("Você precisa preencher o nome do responsável");
      return;
    }

    if (modelo === "") {
      alert("Por favor, preencha o modelo do veículo");
      return;
    }

    if (placa === "") {
      alert("Por favor, preencha a placa do veículo");
      return;
    }

    if (ano === "") {
      alert("Por favor, preencha o ano do veículo");
      return;
    }

    if (cor === "") {
      alert("Por favor, preencha a cor do veículo");
      return;
    }

    if (chassi === "") {
      alert("Por favor, preencha o número do chassi");
      return;
    }

    if (!seguradora) {
      alert("Por favor, selecione se o veículo tem seguradora");
      return;
    }

    alert("Sucesso! Dados do veículo cadastrados.");

    form.reset();
  });
});


function limparErros() {
  let erros = document.querySelectorAll('.erro');
  erros.forEach(e => e.textContent = '');
}

function validarFormulario() {
  limparErros();

  let responsavel = document.getElementById("responsavel").value;
  let modelo = document.getElementById("modelo").value;
  let placa = document.getElementById("placa").value;
  let ano = document.getElementById("ano").value;
  let cor = document.getElementById("cor").value;
  let chassi = document.getElementById("chassi").value;
  let seguradora = document.querySelector('input[name="realizado"]:checked');

  let ok = true;

  if (!responsavel) { mostrarErro('erro-responsavel', 'Verifique se possui nome do responsável para continuar.'); ok = false; }
  if (!modelo) { mostrarErro('erro-modelo', 'Verifique se possui modelo do veículo para continuar.'); ok = false; }
  if (!placa) { mostrarErro('erro-placa', 'Verifique se possui placa para continuar.'); ok = false; }
  if (!ano) { mostrarErro('erro-ano', 'Verifique se possui ano do veículo para continuar.'); ok = false; }
  if (!cor) { mostrarErro('erro-cor', 'Verifique se possui cor para continuar.'); ok = false; }
  if (!chassi) { mostrarErro('erro-chassi', 'Verifique se possui chassi para continuar.'); ok = false; }
  if (!seguradora) { mostrarErro('erro-seguradora', 'Verifique se selecionou se o veículo tem seguradora.'); ok = false; }

  return ok;
}

function coletarDados() {
  return {
    responsavel: document.getElementById("responsavel").value.trim(),
    modelo: document.getElementById("modelo").value.trim(),
    placa: document.getElementById("placa").value.trim(),
    ano: document.getElementById("ano").value.trim(),
    cor: document.getElementById("cor").value.trim(),
    chassi: document.getElementById("chassi").value.trim(),
    seguradora: document.querySelector('input[name="realizado"]:checked').value
  };
}

function salvar() {
  limparErros();

  if (!validarFormulario()) return;

  const dados = coletarDados();

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch('http://localhost:8080/servico/{id}', { 

    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(dados),
    headers: headers
  }).then(response => {
    if (response.ok) {
      alert("Veículo cadastrado com sucesso!");
    } else {
      alert("Erro ao cadastrar o veículo.");
    }
  }).catch(error => {
    alert("Erro de conexão. Tente novamente.");
  });
}

function alterar() {
  limparErros();

  if (!validarFormulario()) return;

  const dados = coletarDados();

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch('http://localhost:8080/servico/{id}', { 
    
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(dados),
    headers: headers
  }).then(response => {
    if (response.ok) {
      alert("Veículo alterado com sucesso!");
    } else {
      alert("Erro ao alterar o veículo.");
    }
  }).catch(error => {
    alert("Erro de conexão. Tente novamente.");
  });
}

function deletar() {
  limparErros();

  if (!validarFormulario()) return;

  const dados = coletarDados();

  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");

  fetch('http://localhost:8080/veiculo/{id}', { 

    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(dados),
    headers: headers
  }).then(response => {
    if (response.ok) {
      alert("Veículo deletado com sucesso!");
    } else {
      alert("Erro ao deletar o veículo.");
    }
  }).catch(error => {
    alert("Erro de conexão. Tente novamente.");
  });
}

function mostrarErro(id, mensagem) {
  const erroElement = document.getElementById(id);
  if (erroElement) erroElement.textContent = mensagem;
}
