function entrar() {
    window.location.href='/page/login.html'
}

function criarconta() {
    window.location.href='/page/criarConta.html'
}

function orcamento() {
    window.location.href='/page/orcamento.html'
}

function cadastrarveiculo() {
    window.location.href='/page/veiculo.html'
}

function vistoria() {
    window.location.href='/page/vistoria.html'
}

function agendamento() {
    window.location.href='/page/agendamento.html'
}

function servico() {
    window.location.href='/page/servico.html'
}

function produto() {
    window.location.href='/page/produto.html'
}

function tipodeservico() {
    window.location.href='/page/tiposervico.html'
}

function responsavel() {
    window.location.href='/page/responsavel.html'
}

document.addEventListener("DOMContentLoaded", () => {
    const userId = localStorage.getItem("id_usuario");
    //const authContainer = document.getElementById("user-auth");
    const menu = document.getElementById("menu-opcoes");

    //Trocar para o usuário que for o administrador - Exemplo 1
    if (userId === "8") {
        // Remove os botões "Criar Conta" e "Entrar"
        // if (authContainer) {
        //     authContainer.innerHTML = `
        //         <span class="usuario-logado">Usuário: ${userId}</span>
        //         <button onclick="sair()">Sair</button>
        //     `;
        // }

        // Adiciona itens ao menu (exemplo)
        if (menu) {
            const novoItem1 = document.createElement("button");
            novoItem1.textContent = "Orçamento";
            novoItem1.onclick = () => window.location.href = "/page/orcamento.html";

            const novoItem2 = document.createElement("button");
            novoItem2.textContent = "Vistoria";
            novoItem2.onclick = () => window.location.href = "/page/vistoria.html";

            const novoItem3 = document.createElement("button");
            novoItem3.textContent = "Serviço";
            novoItem3.onclick = () => window.location.href = "/page/servico.html";

            const novoItem4 = document.createElement("button");
            novoItem4.textContent = "Tipo de Serviço";
            novoItem4.onclick = () => window.location.href = "/page/tiposervico.html";

            const novoItem5 = document.createElement("button");
            novoItem5.textContent = "Produto";
            novoItem5.onclick = () => window.location.href = "/page/produto.html";


            menu.appendChild(novoItem1);
            menu.appendChild(novoItem2);
            menu.appendChild(novoItem3);
            menu.appendChild(novoItem4);
            menu.appendChild(novoItem4);

        }
    }
});

function sair() {
    localStorage.removeItem("id_usuario");
    window.location.reload();
}

