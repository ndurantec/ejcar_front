document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const select = document.getElementById("modalidade");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio real do formulário

    const tipoServico = select.value;

    if (tipoServico) {
      alert("Você selecionou: " + tipoServico);
      // Aqui você pode redirecionar ou salvar a escolha
    } else {
      alert("Por favor, selecione um tipo de serviço.");
    }
  });
});



function salvarTipo() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/tipo_servico/cadtiposervico', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function deletarTipo() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/tipo_servico/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function atualizarTipo() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/tipo_servico/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}


function consultarTipo() {
   


    // Envia os dados via fetch
    fetch('http://localhost:8080/tipo_servico/{id}', { // altere a URL conforme seu endpoint
       
    }).then(response => {
           
    }).then(data => {
       
    }).catch(error => {
       
    });
}







