
// cadastrar
function cadastrar() {
    const nome = document.getElementById("name").value;

    const telefone = document.getElementById("telefone").value;

    const endereco = document.getElementById("endereco").value;

    const cep= document.getElementById("cep").value;


            if(nome == ""){
                alert("Você precisa preencher o campo nome");
            }

            if(telefone == ""){
                alert("Você precisa preencher o campo telefone");
            }

             if(endereco == ""){
                alert("Você precisa preencher o campo endereco");
            }

             if(cep == ""){
                alert("Você precisa preencher o campo CEP");
            }

                  alert(nome + " - " + telefone + " - " + endereco + " - " + cep);
}