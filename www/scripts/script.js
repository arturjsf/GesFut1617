///VARIAVEIS DE CONTROLO
var clubeSelecionado = -1; //-1 se é um clube novo
var jogadorSeleccionado = -1; //-1 é um jogador novo

//CONTADORES
var contadorJogador = 1;
var contadorClube = 1;

//ARRAYS
var arrayJogadores = new Array();
var arrayClubes = new Array();

//ARRAYS DE ELEMENTOS 
var PosicaoJogador = ["GR", "DF", "MC","AV"];
var Paises = ["PTG","ESP","ARG","ALE","FRA","BRA","ITA","SUE","FRA","MEX"];


/**
 *  CONSTRUTOR JOGADOR
 * @param {*} nomeJogador 
 * @param {*} dtNascimento 
 * @param {*} paisJogador 
 * @param {*} posicao 
 * @param {*} altura 
 */
function Jogador(nomeJogador, data, paisJogador, altura, posicao) {
    this.idJogador = contadorJogador++;
    this.nomeJogador = nomeJogador;
    this.data = data;
    this.paisJogador = paisJogador;  
    this.altura = altura;
    this.posicao = posicao;
    this.disponivel = true; // um jogador quando é criado esta sempre disponivel a true
    this.calculaIdade = getAge(data);

    if (Jogador._inicializado == undefined) {
        Jogador.prototype.paraString = function () {
            return this.nomeJogador + ": " +this.posicao + " - " + this.disponivel;
        };
        Jogador._inicializado = true;
    }

    

}

/**
 *    CONSTRUTOR CLUBE. contem um array Equipa com os jogadores
 * @param {*} nomeClube 
 * @param {*} acr 
 * @param {*} paisClube 
 * @param {*} url 
 * @param {*} descricao 
 */
function Clube(nomeClube, acr, paisClube, url, descricao) {
    this.idClube = contadorClube++;
    this.nomeClube = nomeClube;
    this.acr = acr;
    this.paisClube = paisClube;
    this.url = url;
    this.descricao = descricao;
    this.Equipa = new Array(Jogador);
    this.valido = verificar11Clube();

    if (Clube._inicializado == undefined) {
        Clube.prototype.paraString = function () {
            return this.nomeClube + " - " + this.acr + " - " + this.paisClube + " - " + this.url + " " +this.descricao;
        };
        Clube._inicializado = true;
    }
}




/** --------------------------------------------------F U N C O E S    J O G A D O R  ---------------------------------------------------------
 */ 



/**
 * Adicionar ou edita o Jogador consoante a variavel de controlo selecionar Jogador
 */
function adicionarJogador() {
    // vai buscar o id da tabela
    // cria uma linha e celulas
    // vai buscar os dados dos inputs
    // e manda pra dentro das celulas
    if (!verificarDadosJogador()) {

           var nomeJogador = document.getElementById("nomeJogador").value;
           var data = document.getElementById("data").value;

           var comboBoxPais = document.getElementById("paisJogador");
           var paisJogador = comboBoxPais.options[comboBoxPais.selectedIndex].text;

            var altura = document.getElementById("altura").value;

            var comboBoxPosicao = document.getElementById("posicao");
            var posicao = comboBoxPosicao.options[comboBoxPosicao.selectedIndex].text;


            //se é um jogador novo ou se é um selecionado.
             if (jogadorSeleccionado == -1) {
                arrayJogadores.push(new Jogador(nomeJogador, data, paisJogador, altura, posicao));
            } else {
                arrayJogadores[jogadorSeleccionado].nomeJogador = nomeJogador;
                arrayJogadores[jogadorSeleccionado].data = data;
                arrayJogadores[jogadorSeleccionado].paisJogador = paisJogador;
                arrayJogadores[jogadorSeleccionado].altura = altura;
                arrayJogadores[jogadorSeleccionado].posicao = posicao;
                              
                jogadorSeleccionado = -1;
        }


        //limpa dos formularios
        document.getElementById("nomeJogador").value = "";
        document.getElementById("data").value = "";
        document.getElementById("altura").value = "";


        //e cria a tabela de jogadores
        criarTabelaJogadores();

    }
}




/**
 *  Metodo de criacao de tabela
 */
function criarTabelaJogadores() {

    imprimirArrayjogadores();

      if(arrayJogadores.length > 0){
    //criamos uma tabela nova que será substituida pela antiga que está no HTML
    var tabelaNova = document.createElement("table");
    tabelaNova.id = "tabelaJogadores";

    var caption = tabelaNova.createCaption();
    var titulo = document.createTextNode("LISTA JOGADORES");
    caption.appendChild(titulo);
    tabelaNova.appendChild(caption);

    //criar as celulas e texto
    var celulaCabecalhoID = document.createElement("th");
    var textoCabecalhoID = document.createTextNode("ID");
    celulaCabecalhoID.appendChild(textoCabecalhoID);

    var celulaCabecalhoNome = document.createElement("th");
    var textoCabecalhoNome = document.createTextNode("Nome");
    celulaCabecalhoNome.appendChild(textoCabecalhoNome);

    var celulaCabecalhoData = document.createElement("th");
    var textoCabecalhoData = document.createTextNode("Idade");
    celulaCabecalhoData.appendChild(textoCabecalhoData);
    
    var celulaCabecalhoPais = document.createElement("th");
    var textoCabecalhoPais = document.createTextNode("Pais");
    celulaCabecalhoPais.appendChild(textoCabecalhoPais);

    var celulaCabecalhoAltura = document.createElement("th");
    var textoCabecalhoAltura = document.createTextNode("Altura");
    celulaCabecalhoAltura.appendChild(textoCabecalhoAltura);

    var celulaCabecalhoPosicao = document.createElement("th");
    var textoCabecalhoPosicao = document.createTextNode("Posição");
    celulaCabecalhoPosicao.appendChild(textoCabecalhoPosicao);

    var celulaCabecalhoEDIT = document.createElement("th");
    var textoCabecalhoEDIT = document.createTextNode(" ");
    celulaCabecalhoEDIT.appendChild(textoCabecalhoEDIT);

    var celulaCabecalhoREMOVE = document.createElement("th");
    var textoCabecalhoREMOVE = document.createTextNode(" ");
    celulaCabecalhoREMOVE.appendChild(textoCabecalhoREMOVE);
   
    var celulaCabecalhoDisponibilidade = document.createElement("th");
    var textoCabecalhoDisponibilidade = document.createTextNode("Disponivel");
    celulaCabecalhoDisponibilidade.appendChild(textoCabecalhoDisponibilidade);
   

    //adicionar á TR
    var linhaCabecalho = document.createElement("tr");
    linhaCabecalho.appendChild(celulaCabecalhoID);
    linhaCabecalho.appendChild(celulaCabecalhoNome);
    linhaCabecalho.appendChild(celulaCabecalhoData);
    linhaCabecalho.appendChild(celulaCabecalhoPais);
    linhaCabecalho.appendChild(celulaCabecalhoAltura);
    linhaCabecalho.appendChild(celulaCabecalhoPosicao);
    linhaCabecalho.appendChild(celulaCabecalhoEDIT);
    linhaCabecalho.appendChild(celulaCabecalhoREMOVE);
    linhaCabecalho.appendChild(celulaCabecalhoDisponibilidade);

    
    tabelaNova.appendChild(linhaCabecalho);

    //Enquanto houverem jogadores na tabela arrayJogadores...
    for (var i = 0; i < arrayJogadores.length; i++) {   

        //var idJJ = arrayJogadores[i].idJogador;
        //console.log(arrayJogadores[i]);
        
        var linha = document.createElement("tr");
        linha.id = i;

        var celulaID = document.createElement("td");
        var idJogador = document.createTextNode(arrayJogadores[i].idJogador);
        celulaID.appendChild(idJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaID);

        var celulaNome = document.createElement("td");
        var nomeJogador = document.createTextNode(arrayJogadores[i].nomeJogador);
        celulaNome.appendChild(nomeJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaNome);

        var celulaIdade = document.createElement("td");
        var idade = document.createTextNode(arrayJogadores[i].calculaIdade);
        celulaIdade.appendChild(idade);
        //celulaTipo.style.border = "1px solid black";
        linha.appendChild(celulaIdade);

        var celulaPais = document.createElement("td");
        var paisJogador = document.createTextNode(arrayJogadores[i].paisJogador);
        celulaPais.appendChild(paisJogador);
        //celulaPreco.style.border = "1px solid black";
        linha.appendChild(celulaPais);

        
        var celulaAltura = document.createElement("td");
        var altura = document.createTextNode(arrayJogadores[i].altura);
        celulaAltura.appendChild(altura);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaAltura);

        
        var celulaPosicao = document.createElement("td");
        var posicao = document.createTextNode(arrayJogadores[i].posicao);
        celulaPosicao.appendChild(posicao);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaPosicao);

        
        var celulaEDIT = document.createElement("td");
        var imgEDITJogador = document.createElement('img');
        imgEDITJogador.setAttribute('id', linha.id);
        imgEDITJogador.setAttribute('src', 'images/edit.png');
        imgEDITJogador.onclick = function () { editarJogador(this.id); };
        celulaEDIT.appendChild(imgEDITJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaEDIT);

        var celulaREMOVE = document.createElement("td");
        var imgREMOVEJogador = document.createElement('img');
        imgREMOVEJogador.setAttribute('id', linha.id);
        imgREMOVEJogador.setAttribute('src', 'images/delete.png'); 
        imgREMOVEJogador.onclick = function () { removerJogador(this.id); };
        celulaREMOVE.appendChild(imgREMOVEJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaREMOVE);

        var celulaDisponibilidade = document.createElement("td");
        var disponivel = document.createTextNode(arrayJogadores[i].disponivel);
        celulaDisponibilidade.appendChild(disponivel);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaDisponibilidade);

        
        //linha.onclick = function () { editarJogador(this.) };

        tabelaNova.appendChild(linha);
    }

    //tabela.style.border = "2px solid black";
    tabelaNova.setAttribute("border", "1");
    var oldTabela = document.getElementById("tabelaJogadores");
    //faz a substituicao das tabelas
    document.getElementById("divTabelaJogadores").replaceChild(tabelaNova, oldTabela);
    document.getElementById("divTabelaJogadores").style.display = 'block';

    //cada vez que um jogador e criado e necessario atualizar a combobox do mercado
    gerarDropDownMercadoJogadoresLivres();
      }  
}

function imprimirArrayjogadores(){

    for (var index = 0; index < arrayJogadores.length; index++) {
        console.log("Jogador:"+ arrayJogadores[index].paraString());
        
    }
}





/**
 * Editar Jogador
 */
function editarJogador(indice) {

    console.log("Editar JOGADOR "+indice);

    jogadorSeleccionado = indice;

    document.getElementById("nomeJogador").value = arrayJogadores[indice].nomeJogador;
    document.getElementById("data").value = arrayJogadores[indice].data;
    document.getElementById("paisJogador").value = arrayJogadores[indice].paisJogador;
    document.getElementById("altura").value = arrayJogadores[indice].altura;
    document.getElementById("posicao").value = arrayJogadores[indice].posicao;

     //atualizacao da combobox de mercado
    gerarDropDownMercadoJogadoresLivres();
}


/**
 * Se nao existir num Clube, Apaga do arrayJogadores e mete os inputs a null
 */

function removerJogador(indice) {
   
    var divErrosCriacaoJogador = document.getElementById('divErrosCriacaoJogador');

    var confirmacao = confirm("Deseja apagar o Jogador?");
    
    if(confirmacao == true){
        //jogadorSeleccionado = indice;
    if (existeJogadorEmClube()) {
        divErrosCriacaoJogador.style.display = 'block';
         var textoErro;

         textoErro = document.createTextNode("O jogador já existe num Clube!");
           

        var oldErro = divErrosCriacaoJogador.firstChild;
        if (oldErro == null) {
            divErrosCriacaoJogador.appendChild(textoErro);
        } else {
            divErrosCriacaoJogador.replaceChild(textoErro, oldErro);
        }

    } else {
        arrayJogadores.splice(indice, 1);
        alert("Jogador apagado!");
    
         criarTabelaJogadores();
         loadConteudoJogador();
         
         
        //gerarDropDownPaisesJogador();
       // gerarDropDownPosicao();

        //atualizacao da combobox de mercado
         gerarDropDownMercadoJogadoresLivres();

        
    }
}else{
    return;
}
}


/** --------------------------------------------------F U N C O E S    C L U B E ---------------------------------------------------------
 */ 




/**
 * Adicionar ou edita o Clube consoante a variavel de controlo selecionar Clube
 */
function adicionarClube() {
    // vai buscar o id da tabela
    // cria uma linha e celulas
    // vai buscar os dados dos inputs
    // e manda pra dentro das celulas

    if (!verificarDadosClube()) {

           var nomeClube = document.getElementById("nomeClube").value;
           var acr = document.getElementById("acr").value;

           var comboBoxPais = document.getElementById("paisClube");
           var paisClube = comboBoxPais.options[comboBoxPais.selectedIndex].text;

            var url = document.getElementById("url").value;
            var descricao = document.getElementById("descricao").value;


            //se é uma Clube nova ou se é uma selecionado
             if (clubeSelecionado== -1) {
                arrayClubes.push(new Clube(nomeClube, acr, paisClube, url, descricao));
            } else {
                arrayClubes[clubeSelecionado].nomeClube = nomeClube;
                arrayClubes[clubeSelecionado].acr = acr;
                arrayClubes[clubeSelecionado].paisClube = paisClube;
                arrayClubes[clubeSelecionado].url = url;
                arrayClubes[clubeSelecionado].descricao = descricao;
                              
                clubeSelecionado = -1;
        }


        //limpa dos formularios
        document.getElementById("nomeClube").value = "";
        document.getElementById("acr").value = "";
        document.getElementById("url").value = "";
        document.getElementById("descricao").value = "";


        //e cria a tabela de Clubes
        criarTabelaClubes();

    }
}





/**
 *  Metodo de criacao de tabela
 */
function criarTabelaClubes() {


    if(arrayClubes.length > 0){

    //criamos uma tabela nova que será substituida pela antiga que está no HTML
    var tabelaNova = document.createElement("table");
    tabelaNova.id = "tabelaClubes";

    var caption = tabelaNova.createCaption();
    var titulo = document.createTextNode("LISTA CLUBES");
    caption.appendChild(titulo);
    tabelaNova.appendChild(caption);

    //criar as celulas e texto
    var celulaCabecalhoIDClube = document.createElement("th");
    var textoCabecalhoIDClube = document.createTextNode("ID");
    celulaCabecalhoIDClube.appendChild(textoCabecalhoIDClube);

    var celulaCabecalhoNome = document.createElement("th");
    var textoCabecalhoNome = document.createTextNode("Nome");
    celulaCabecalhoNome.appendChild(textoCabecalhoNome);

    var celulaCabecalhoAcr = document.createElement("th");
    var textoCabecalhoAcr = document.createTextNode("Acronimo");
    celulaCabecalhoAcr.appendChild(textoCabecalhoAcr);
    
    var celulaCabecalhoPais = document.createElement("th");
    var textoCabecalhoPais = document.createTextNode("Pais");
    celulaCabecalhoPais.appendChild(textoCabecalhoPais);

    var celulaCabecalhoWWW = document.createElement("th");
    var textoCabecalhoWWW = document.createTextNode("www");
    celulaCabecalhoWWW.appendChild(textoCabecalhoWWW);
   
     var celulaCabecalhoEDIT = document.createElement("th");
    var textoCabecalhoEDIT = document.createTextNode(" ");
    celulaCabecalhoEDIT.appendChild(textoCabecalhoEDIT);

    var celulaCabecalhoREMOVE = document.createElement("th");
    var textoCabecalhoREMOVE = document.createTextNode(" ");
    celulaCabecalhoREMOVE.appendChild(textoCabecalhoREMOVE);
  
  /*  var celulaCabecalhoADD = document.createElement("th");
    var textoCabecalhoADD = document.createTextNode("Adicionar jogador");
    celulaCabecalhoADD.appendChild(textoCabecalhoADD);*/

    var celulaCabecalhoValido = document.createElement("th");
    var textoCabecalhoValido = document.createTextNode("Completa");
    celulaCabecalhoValido.appendChild(textoCabecalhoValido);


    //adicionar á TR
    var linhaCabecalho = document.createElement("tr");  
    linhaCabecalho.appendChild(celulaCabecalhoIDClube);
    linhaCabecalho.appendChild(celulaCabecalhoNome);
    linhaCabecalho.appendChild(celulaCabecalhoAcr);
    linhaCabecalho.appendChild(celulaCabecalhoPais);
    linhaCabecalho.appendChild(celulaCabecalhoWWW);
    linhaCabecalho.appendChild(celulaCabecalhoEDIT);
    linhaCabecalho.appendChild(celulaCabecalhoREMOVE);    
  //  linhaCabecalho.appendChild(celulaCabecalhoADD);
    linhaCabecalho.appendChild(celulaCabecalhoValido);

    
    tabelaNova.appendChild(linhaCabecalho);

    //Enquanto houverem Clubes na tabela arrayClubes...
    for (var i = 0; i < arrayClubes.length; i++) {

        var linha = document.createElement("tr");
        linha.id = i;

        var celulaIDClube = document.createElement("td");
        var idClube = document.createTextNode(arrayClubes[i].idClube);
        celulaIDClube.appendChild(idClube);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaIDClube);

        var celulaNome = document.createElement("td");
        var nomeClube = document.createTextNode(arrayClubes[i].nomeClube);
        celulaNome.appendChild(nomeClube);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaNome);

        var celulaACR = document.createElement("td");
        var acr = document.createTextNode(arrayClubes[i].acr);
        celulaACR.appendChild(acr);
        //celulaTipo.style.border = "1px solid black";
        linha.appendChild(celulaACR);

        var celulaPais = document.createElement("td");
        var paisClube = document.createTextNode(arrayClubes[i].paisClube);
        celulaPais.appendChild(paisClube);
        //celulaPreco.style.border = "1px solid black";
        linha.appendChild(celulaPais);

          
        var celulaWWW = document.createElement("td");
        var url = document.createTextNode(arrayClubes[i].url);
        celulaWWW.appendChild(url);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaWWW);
       
        var celulaEDIT = document.createElement("td");
        var imgEDITClube = document.createElement('img');
        imgEDITClube.setAttribute('id', linha.id);
        imgEDITClube.setAttribute('src', 'images/edit.png'); 
        imgEDITClube.onclick = function () { editarClube(this.id) };
        celulaEDIT.appendChild(imgEDITClube);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaEDIT);

         var celulaREMOVE = document.createElement("td");
        var imgREMOVEClube = document.createElement('img');
        imgREMOVEClube.setAttribute('id', linha.id);
        imgREMOVEClube.setAttribute('src', 'images/delete.png'); 
        imgREMOVEClube.onclick = function () { removerClube(this.id) };
        celulaREMOVE.appendChild(imgREMOVEClube);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaREMOVE);
        
      /*  var celulaADD = document.createElement("td");
        var imgADDJogador = document.createElement('img');
        imgADDJogador.setAttribute('id', linha.id);
        imgADDJogador.setAttribute('src', 'images/add.png');
        imgADDJogador.onclick = function () { gerarDIVAdicionarJogador(this.id) };
        celulaADD.appendChild(imgADDJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaADD);*/

        var celulaValido = document.createElement("td");
        var valido = document.createTextNode(arrayClubes[i].valido);
        celulaValido.appendChild(valido);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaValido);




        //cada linha vai ter a propriedade onclick
        linha.id = i + "equipa";
        linha.onclick = function () { gerarDIVAdicionarJogador(this.id.charAt(0)) };
        tabelaNova.appendChild(linha);
    }

    //tabela.style.border = "2px solid black";
    tabelaNova.setAttribute("border", "1");
    var oldTabela = document.getElementById("tabelaClubes");
    //faz a substituicao das tabelas
    document.getElementById("divTabelaClubes").replaceChild(tabelaNova, oldTabela);
    document.getElementById("divTabelaClubes").style.display = 'block';  
    document.getElementById("divEquipa").style.display = 'block';

     //atualizacao da combobox de mercado
    gerarDropDownMercadoJogadoresLivres();
    }
    
}




/**
 * Editar Clubes
 */
function editarClube(indice) {

    clubeSelecionado = indice;

    document.getElementById("nomeClube").value = arrayClubes[indice].nomeClube;
    document.getElementById("acr").value = arrayClubes[indice].acr;
    document.getElementById("paisClube").value = arrayClubes[indice].paisClube;
    document.getElementById("url").value = arrayClubes[indice].url;
    document.getElementById("descricao").value = arrayClubes[indice].descricao;

}


/**
 * Se nao existir numa Competicao, Apaga do arrayClube e mete os inputs a null
 */
function removerClube(indice) {


    var divErrosCriacaoClube = document.getElementById('divErrosCriacaoClube');

    var confirmacao = confirm("Deseja apagar a Clube?");
    
    if(confirmacao == true){
     if (existeJogadorEmCompeticao() || arrayJogadoresClube.length > 0) {
        divErrosCriacaoClube.style.display = 'block';

        var textoErro;

        if (!existeJogadorEmCompeticao()){
            textoErro = document.createTextNode("A Clube já existe numa Competicao!");
        }else{
            textoErro = document.createTextNode("A Clube tem jogadores associados!");
        }

        var oldErro = divErrosCriacaoClube.firstChild;
        if (oldErro == null) {
            divErrosCriacaoClube.appendChild(textoErro);
        } else {
            divErrosCriacaoClube.replaceChild(textoErro, oldErro);
        }

    } else {
        arrayClubes.splice(indice, 1);
        
        criarTabelaClubes();
        loadConteudoClube();
       // gerarDropDownPaisesClube();
        gerarDropDownMercadoJogadoresLivres();
        

    // clear input text
    /*document.getElementById("nomeClube").value = "";
    document.getElementById("acr").value = "";
    document.getElementById("url").value = "";
    document.getElementById("descricao").value = "";*/

    }
    }else{
        return;
    }
}


/** --------------------------------------------F U N C O E S    E Q U I P A ---------------------------------------------------------
 */ 



/**
 * Adiciona o jogador selecionado na combobox ao array Equipa do Clube
 * Mete a disponibilidade desse jogador a false
 */
function gerarDIVAdicionarJogador(indiceEquipa) {

    console.log("ENTROU NO ADD J/E");

         loadConteudoEquipa(indiceEquipa);

         //criarTabelaMercadoJogadores();

         //criarTabelaEquipa(indiceEquipa);

    
}


function criarTabelaMercadoJogadores(indiceEquipa){

    //se tiver jogadores 
    if(arrayJogadores.length > 0){

    //criamos uma tabela nova que será substituida pela antiga que está no HTML
    var tabelaNova = document.createElement("table");
    tabelaNova.id = "tabelaClubes";
    }
}

/**
 * Adiciona o jogador á equipa e chama o criarTabelaEquipa para redesenhar a tabela com o novo jogador adicionado
 * @param {*} indice 
 */
function atribuirJogador(indiceJogador, indiceEquipa){

       //introduz na tabela jogadores por Clube
        arrayClubes[indiceEquipa].Equipa.push(".......");

        

        //e mete a disponibilidade do jogador a false
        arrayClubes[indiceEquipa].Equipa[indiceJogador].jogador.disponivel = false;


        criarTabelaEquipa(indiceEquipa);

}

/*
function adicionarJogadorClube() {

        //caso tente adicionar um jogador ja existente nessa Clube
        var divErrosJogadorClube = document.getElementById('divErrosJogadorClube');


        //vai buscar o jogador selecionado á comboBox
        var jogador = document.getElementById("cbListaJogadores").selectedIndex;

        //verifica se o jogador ja existe na Clube e se ta disponivel. se ja existe exibe a msg de erro
        var exists = false;
        for (var i = 0; i < arrayJogadoresClube.length; i++) {
            if (arrayJogadoresClube[i].Clube == clubeSelecionado 
                && arrayJogadoresClube[i].jogador == jogador 
                && arrayJogadores[jogador.idJogador].disponivel == false) {
                exists = true;
                divErrosJogadorClube.style.display = 'block';
            }
        }

        //se nao existir adiciona á tabela, disable da msg de erro e mete a disponibilidade do jogador a false
        if (!exists) {
            arrayJogadoresClube.push(clubeSelecionado, jogador);
            arrayJogadores[jogador.idJogador].disponivel = false;
            divErrosJogadorClube.style.display = 'none';
        }

        //cria a tabela com osjogadores da Clube atualizados
        criarTabelaJogadoresPorClube();
    
}
*/

function criarTabelaEquipa(indice){

    //clubeSelecionado = indice;

    //tabela nova que vai ser substituida pela antiga que esta no html
    var tabelaNova = document.createElement("table");
    tabelaNova.id = "tabelaEquipa";

    //cabecalho tabela
    var caption = tabelaNova.createCaption();
    var titulo = document.createTextNode("Lista Jogadores");
    caption.appendChild(titulo);
    tabelaNova.appendChild(caption);

    //criar as celulas e texto
    var celulaCabecalhoID = document.createElement("th");
    var textoCabecalhoID = document.createTextNode("ID");
    celulaCabecalhoID.appendChild(textoCabecalhoID);

    var celulaCabecalhoNomeJogador = document.createElement("th");
    var textoCabecalhoNomeJogador = document.createTextNode("Nome");
    celulaCabecalhoNomeJogador.appendChild(textoCabecalhoNomeJogador);

    var celulaCabecalhoPosicao = document.createElement("th");
    var textoCabecalhoPosicao = document.createTextNode("Posição");
    celulaCabecalhoPosicao.appendChild(textoCabecalhoPosicao);
   
    var celulaCabecalhoREMOVE = document.createElement("th");
    var textoCabecalhoREMOVE = document.createTextNode("Desatribuir Jogador");
    celulaCabecalhoREMOVE.appendChild(textoCabecalhoREMOVE);



    //adicionar á TR
    var linhaCabecalho = document.createElement("tr");
    linhaCabecalho.appendChild(celulaCabecalhoID);
    linhaCabecalho.appendChild(celulaCabecalhoNome);
    linhaCabecalho.appendChild(celulaCabecalhoPosicao);
    linhaCabecalho.appendChild(celulaCabecalhoREMOVE);

    tabelaNova.appendChild(linhaCabecalho);


    //Enquanto houverem jogadores na tabela arrayJogadoresClube...
    for (var i = 0; i < arrayClubes[indice].Equipa.length; i++) {

        var linha = document.createElement("tr");

        var celulaID = document.createElement("td");
        var id = document.createTextNode(arrayJ);
        celulaID.appendChild(id);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaID);
    
        var celulaNome = document.createElement("td");
        var nomeJogador = document.createTextNode(arrayJogadoresClube[i].jogador.nomeJogador);
        celulaNome.appendChild(nomeJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaNome);

        
        var celulaPosicao = document.createElement("td");
        var posicao = document.createTextNode(arrayJogadoresClube[i].jogador.posicao);
        celulaPosicao.appendChild(posicao);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaPosicao);
  
        var celulaREMOVE = document.createElement("td");
        var remover = document.createTextNode(arrayJogadoresClube[i].jogador.posicao);
        celulaPosicao.appendChild(posicao);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaPosicao);

        //cada linha vai ter a propriedade onclick para podermos desatribuir o jogador da Clube
        linha.id = i + "jogador";
        linha.onclick = function () { desatribuirJogador(this.id.charAt(0)) };
        tabelaNova.appendChild(linha);
    }

    //tabela.style.border = "2px solid black";
    tabelaNova.setAttribute("border", "1");
    var oldTabela = document.getElementById("tabelaJogadoresPorClube");
    //faz a substituicao das tabelas
    document.getElementById("tabelaJogadoresPorClube").replaceChild(tabelaNova, oldTabela);
    document.getElementById("tabelaJogadoresPorClube").style.display = 'block';

     //atualizar a combobox do mercado
    gerarDropDownMercadoJogadoresLivres();
}

/**
 * Basicamente remove da tabelaEquipa e volta a colocar o jogador disponivel 
 * @param {*} indice 
 */
function desatribuirJogador(indice){

}


/** --------------------------------------------------L O A D    D A S    P A G I N A S ---------------------------------------------------------
 */ 

/**
 * load conteudo da pagina HOME
 */
function loadConteudoHome() {
    
    document.getElementById("conteudoHome").style.display = 'block';

    document.getElementById("conteudoPaginaJogador").style.display = 'none';
    document.getElementById("conteudoPaginaClube").style.display = 'none';
    document.getElementById("conteudoPaginaLiga").style.display = 'none';
    document.getElementById("conteudoPaginaTaca").style.display = 'none';   
    
}



/**
 * Faz o load do conteudo da pagina jogador, (form e tabela).
 * Se o arrayJogadores tiver vazio oculta a tabela e mostra uma msg de alerta
 */
function loadConteudoJogador() {
    
    document.getElementById("conteudoPaginaJogador").style.display = 'block';

    document.getElementById("conteudoHome").style.display = 'none';
    document.getElementById("conteudoPaginaClube").style.display = 'none';  
    document.getElementById("conteudoPaginaLiga").style.display = 'none';
    document.getElementById("conteudoPaginaTaca").style.display = 'none';

    if(arrayJogadores.length == 0){
        document.getElementById("divTabelaJogadores").style.display = 'none' // nao seria none?;
        document.getElementById("divNaoExistemJogadores").style.display = 'block';
    }else{
         document.getElementById("divTabelaJogadores").style.display = 'block';
         document.getElementById("divNaoExistemJogadores").style.display = 'none';      
    }
}



/**
 * Faz o load do conteudo da pagina Clube, (form e tabela).
 * 
 */
function loadConteudoClube() {
 
    document.getElementById("conteudoPaginaClube").style.display = 'block';

    document.getElementById("conteudoHome").style.display = 'none';
    document.getElementById("conteudoPaginaJogador").style.display = 'none';
    document.getElementById("conteudoPaginaLiga").style.display = 'none';
    document.getElementById("conteudoPaginaTaca").style.display = 'none';

    
    if(arrayClubes.length == 0){
        document.getElementById("divTabelaClubes").style.display = 'none'; // nao seria none?;
        document.getElementById("divNaoExistemClubes").style.display = 'block';
        //document.getElementById("divEquipa").style.display = 'none';

        
    }else{
         document.getElementById("divTabelaClubes").style.display = 'block';  
         document.getElementById("divNaoExistemClubes").style.display = 'none';
         //document.getElementById("divEquipa").style.display = 'block';
    }
}




/**
 * Faz o load do conteudo da div Adicionar jogadores á Equipa. 
 * São 2 tabelas. Uma com os jogadores livres e outra com a equipa a serem adicionados
 * 
 */
function loadConteudoEquipa(indice) {
 
    document.getElementById("divEquipa").style.display = 'block';
    
    if(arrayClubes[indice].Equipa.length == 0){
        document.getElementById("divMercadoJogadores").style.display = 'none'; // nao seria none?;
        document.getElementById("divErrosEquipa").style.display = 'block';

        
    }else{
         document.getElementById("divMercadoJogadores").style.display = 'block';  
         document.getElementById("divErrosEquipa").style.display = 'none';
    }
}




/**
 * Faz o load do conteudo da pagina Liga
 *
 */
function loadConteudoLiga() {
 
    document.getElementById("conteudoPaginaLiga").style.display = 'block';

    document.getElementById("conteudoHome").style.display = 'none';
    document.getElementById("conteudoPaginaJogador").style.display = 'none';
    document.getElementById("conteudoPaginaClube").style.display = 'none';
    document.getElementById("conteudoPaginaTaca").style.display = 'none';
}



/**
 * Faz o load do conteudo da pagina Taca
 * 
 */
function loadConteudoTaca() {
 
    document.getElementById("conteudoPaginaTaca").style.display = 'block';
    document.getElementById("conteudoHome").style.display = 'none';
    document.getElementById("conteudoPaginaJogador").style.display = 'none';
    document.getElementById("conteudoPaginaClube").style.display = 'none';
    document.getElementById("conteudoPaginaLiga").style.display = 'none';
}

/** --------------------------------------------------M E T O D O S   A U X I L I A R E S--------------------------------------------------------------
 */ 



 
 /**
  *  verifica se os valores estao vazios,  se a data esta no formato correto e se a altura é numero
  */
function verificarDadosJogador() {
    var isEmpty = false;

    var nomeJogador = document.getElementById("nomeJogador").value;
    var data = document.getElementById("data").value;
    var altura = document.getElementById("altura").value;

    var divErrosCriacaoJogador = document.getElementById('divErrosCriacaoJogador');
    var divNaoExistemJogadores = document.getElementById('divNaoExistemJogadores');

    var textoErro;
    if (nomeJogador == "" || data == "" || altura == "" || isNaN(altura)) {
        divErrosCriacaoJogador.style.display = 'block';
        textoErro = document.createTextNode("Error: Preencha todos os dados!");

        isEmpty = true;


        if(isNaN(altura)){
            textoErro = document.createTextNode("Error: Altura inválida!");
            isEmpty = true;
        } 

        //substitui a msg de erro antiga pela nova
        var oldErro = divErrosCriacaoJogador.firstChild;

        if (oldErro == null) {
            divErrosCriacaoJogador.appendChild(textoErro);
        } else {
            divErrosCriacaoJogador.replaceChild(textoErro, oldErro);
        }

    }else{

        //sucesso
        divErrosCriacaoJogador.style.display = 'none';
        divNaoExistemJogadores.style.display = 'none';
        isEmpty = false;
    }

    return isEmpty;
}





 /**
  *  verifica se os valores estao vazios,
  */
function verificarDadosClube() {
    var isEmpty = false;

    var nomeClube = document.getElementById("nomeClube").value;
    var acr = document.getElementById("acr").value;
    var url = document.getElementById("url").value;

    var divErrosCriacaoClube = document.getElementById('divErrosCriacaoClube');
    var divNaoExistemClubes = document.getElementById('divNaoExistemClubes');

    var textoErro;
    if (nomeClube == "" || acr == "" || url == "") {
        divErrosCriacaoClube.style.display = 'block';
        textoErro = document.createTextNode("Error: Preencha todos os dados!");

        isEmpty = true;

        //substitui a msg de erro antiga pela nova
        var oldErro = divErrosCriacaoClube.firstChild;

        if (oldErro == null) {
            divErrosCriacaoClube.appendChild(textoErro);
        } else {
            divErrosCriacaoClube.replaceChild(textoErro, oldErro);
        }

    }else{
        divErrosCriacaoClube.style.display = 'none';
        divNaoExistemClubes.style.display = 'none';
        isEmpty = false;
    }

    return isEmpty;
}


/**
 *  Verifica se uma Clube tem 11 jogadores (1GR, 4DF, 4ME, 2AV)
 */
function verificar11Clube(){
   return false;
}






/**
 * Metodo Aux chamado pelo removerJogador. Verifica se um jogador ja existe numa Clube.
 */
function existeJogadorEmClube() {
    if (jogadorSeleccionado == -1) {
        return false;
    } else {
        for (var i = 0; i < arrayClubes.length; i++) {
            if (arrayClubes[i].jogador == jogadorSeleccionado) {
                return true;
            }
        }
    }
    return false;
}




/**
 * Metodo Aux chamado pelo removerClube. Verifica se um Clube existe nalguma competicao
 */
function existeJogadorEmCompeticao() {
    if (clubeSelecionado == -1) {
        return false;
    } else {
        for (var i = 0; i < arrayCompeticao.length; i++) {
            if (arrayCompeticao[i].Clube == clubeSelecionado) {
                return true;
            }
        }
    }
    return false;
}




/**
 * Gera a combobox de paises do jogador
 */
function gerarDropDownPaisesJogador() {
    var cbPaises = document.getElementById("paisJogador");
    for (var i = 0; i < Paises.length; i++) {
        var opcoes = new Option(Paises[i], Paises[i]);
        cbPaises.options[i] = opcoes;
    }
}



/**
 * Gera a combobox de paises do Clube
 */
function gerarDropDownPaisesClube() {
    var cbPaises = document.getElementById("paisClube");
    for (var i = 0; i < Paises.length; i++) {
        var opcoes = new Option(Paises[i], Paises[i]);
        cbPaises.options[i] = opcoes;
    }
}


/**
 * gera a combobox de posicoes
 */
function gerarDropDownPosicao() {
    var cbPosicao = document.getElementById("posicao");
    for (var i = 0; i < PosicaoJogador.length; i++) {
        var opcoes = new Option(PosicaoJogador[i], PosicaoJogador[i]);
        cbPosicao.options[i] = opcoes;
    }
}




/**
 * gera a combobox de jogadores livres
 */
function gerarDropDownMercadoJogadoresLivres() {

    console.log("entrou no mercado");
    var cbMercadoJogadores = document.getElementById("cbListaJogadores");
    for (var i = 0; i < arrayJogadores.length; i++) {
        console.log("entrou no FOR mercado");

        if(arrayJogadores[i].disponivel == true){
            var opcoes = new Option(arrayJogadores[i].paraString(), i);
            cbMercadoJogadores.options[i] = opcoes;
        }
    }
}







/**
 *  Recebe uma data e calcula a idade
 * @param {*} dateString 
 */
function getAge(dateString){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

