// Validação do funcionario
function validarFuncionario(nome) {
  if (nome.trim() === "") return "O nome do funcionário não pode estar vazio";
  if (nome.trim().length < 3) return "O nome do funcionário deve ter pelo menos 3 caracteres";
  return "";
}

// Validação da data
function validarDataServico(data) {
  if (data === "") return "Por favor, selecione uma data";
  let hoje = new Date();
  let dataDigitada = new Date(data);
  if (dataDigitada > hoje) return "A data não pode ser futura";
  return "";
}

// Validação do servico
function validarRealizado(realizado) {
  if (!realizado) return "Por favor, selecione se o serviço foi realizado";
  return "";
}

// Validação do formulario
document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let funcionario = document.getElementById("funcionario").value;
    let dataServico = document.getElementById("data").value;
    let realizado = document.querySelector('input[name="realizado"]:checked');

    let erros = [];

    let erroFuncionario = validarFuncionario(funcionario);
    if (erroFuncionario) erros.push(erroFuncionario);

    let erroData = validarDataServico(dataServico);
    if (erroData) erros.push(erroData);

    let erroRealizado = validarRealizado(realizado);
    if (erroRealizado) erros.push(erroRealizado);

    if (erros.length > 0) {
      alert("Erros encontrados:\n\n" + erros.join("\n"));
      return;
    }

    console.log("Funcionário:", funcionario.trim());
    console.log("Data do Serviço:", dataServico);
    console.log("Serviço realizado:", realizado.value);

    alert("Dados enviados com sucesso!");
    form.reset();
  });
});


