window.onload = carregar();

function carregar(){
    var url = "http://localhost:8080/ProjetoContatosFinal/webresources/contato";
    var table = "<thead><th>ID</th><th>Nome</th><th>E-mail</th><th>Telefone</th></thead><tbody>";
    var tabela;
    $.get(url,function(data,status){
        var lista = JSON.parse(data);
        for(x in lista){
            table += "<tr class='linha'><td>" + lista[x].id + "</td><td>" + lista[x].nome + "</td><td>" + lista[x].email + "</td><td>" + lista[x].fone + "</td></tr>";
        }
        table += "</tbody>";
        document.getElementById("listaContatos").innerHTML = table;
        tabela = document.getElementById("listaContatos");
        var linhas = tabela.getElementsByTagName("tr");
        for(var i = 1; i < linhas.length; i++){
            linhas[i].addEventListener("click", function(){
                document.getElementById("excluir").disabled=false;
                var dados = this.getElementsByTagName("td");
                $("#id").val(dados[0].innerHTML);
                $("#nome").val(dados[1].innerHTML);
                $("#email").val(dados[2].innerHTML);
                $("#fone").val(dados[3].innerHTML);
            });
        }
    });
};

$(document).ready(function(){
    
    $(".campo").blur(function(){
        if($(this).val() === ""){
            $(this).css({"border" : "2px solid #F00", "padding": "2px"});
        } else{
            $(this).css({"border" : "1px solid #FFF", "padding": "2px"});
        }
    });
    
    $("#salvar").click(function(){
        var cont = 0;
        $(".campo").each(function(){
            if($(this).val() === ""){
                $(this).css({"border" : "2px solid #F00", "padding": "2px"});
                cont++;
            } else{
                $(this).css({"border" : "1px solid #FFF", "padding": "2px"});
            }
        });
        if(cont > 0){
            alert("Campos vazios!");
        } else{
            var id = $("#id").val();
            if (id === "") {
                var contato = JSON.stringify({
                    nome     : $("#nome").val(),
                    email : $("#email").val(),
                    fone    : $("#fone").val()
                });
                salvar(contato);    
            } else{
                var contato = JSON.stringify({
                    id: $("#id").val(),
                    nome: $("#nome").val(),
                    email: $("#email").val(),
                    fone: $("#fone").val()
                });
                alterar(contato);    
            }
        }
    });
    
    $("#excluir").click(function(){
        document.getElementById("excluir").disabled=true;
        var id = $("#id").val();
        if (id !== "") {
            excluir(id);
        }
    });
    
    $("#limpar").click(function(){
        limpar();
    });
    
    $("#pesquisar").click(function(){
        document.getElementById("excluir").disabled=false;
        buscar($("#idBusca").val());
    });
    
    function limpar(){
        document.getElementById("excluir").disabled=true;
        $(".campo").each(function(){
            $(this).val("");
        });
        $("#id").val("");
        $(".campo").css({"border" : "1px solid #FFF", "padding": "2px"});
    }
    
    function buscar(id){
        $("#idBusca").val("");
        var urlEspecifica = "http://localhost:8080/ProjetoContatosFinal/webresources/contato/" + id;
        $.get(urlEspecifica,function(retorno,status){
            var contato = JSON.parse(retorno);
            $("#id").val(contato.id);
            $("#nome").val(contato.nome);
            $("#email").val(contato.email);
            $("#fone").val(contato.fone);
        });
    };
    
    function excluir(id){
         $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/ProjetoContatosFinal/webresources/contato/" + id,
            complete: function(){
                limpar();
                carregar();
            }
        });
    };
    
    function salvar(data){
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ProjetoContatosFinal/webresources/contato",
            contentType: "application/json; charset=utf-8",
            data: data,
            dataType: "json",
            complete: function(){
                limpar();
                carregar();
            }
        });
    };
    
    function alterar(data){
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/ProjetoContatosFinal/webresources/contato",
            contentType: "application/json; charset=utf-8",
            data: data,
            dataType: "json",
            complete: function(){
                limpar();
                carregar();
            }
        });
    };
});