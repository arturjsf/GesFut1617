///VARIAVEIS DE CONTROLO
var clubeSelecionado = -1; //-1 se é um clube novo
var jogadorSeleccionado = -1; //-1 é um jogador novo
var tacaSelecionada = -1;
var controloJogadoresDefault = true;
var controloClubesDefault = true;
var controloTacasDefault = true;

//CONTADORES
var contadorJogador = 1;
var contadorClube = 1;
var contadorTaca = 1;

//ARRAYS
var arrayJogadores = new Array();
var arrayClubes = new Array();
var arrayTacas = new Array();

//COMO DEVERIAMOS TER COMECADO OS ARRAYS 
/*
function Jogadores(){
    this.arrayJogadores = new Array();
}

function Clubes(){
    this.arrayClubes = new Array();
}

function Tacas(){
    this.arrayTacas = new Array();
}
*/
//ARRAYS DE ELEMENTOS 
var PosicaoJogador = ["GR", "DF", "MC","AV"];
var Paises = ["Portugal","Espanha","Argentina","Alemanha","França","Brasil","Italia","Suecia","França","Mexico"];


/**
 * ------------------------------------------------C O N S T R U T O R E S---------------------------------------------------------
 */

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
    this.nomeJogador = nomeJogador ? nomeJogador.toString() : ""; //o toString era desnecessário pois o argumento vem de uma string. Mas assim fica robusta em relação a outras chamadas
    this.data = data;
    this.paisJogador = paisJogador;  
    this.altura = altura;
    this.posicao = posicao;
    this.disponivel = true; // um jogador quando é criado esta sempre disponivel a true
    this.calculaIdade = getAge(data);

    if (Jogador._inicializado == undefined) {
        Jogador.prototype.paraString = function () {
            return this.idJogador + " " + this.nomeJogador + ": " +this.posicao + " - " + this.disponivel;
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
    this.nomeClube = nomeClube ? nomeClube.toString() : "";
    this.acr = acr;
    this.paisClube = paisClube;
    this.url = url;
    this.descricao = descricao;
    this.Equipa = new Array();
    this.valido = verificar11Equipa();

    if (Clube._inicializado == undefined) {
        Clube.prototype.paraString = function () {
            return this.nomeClube + " - " + this.acr + " - " + this.paisClube + " - " + this.url + " " +this.descricao;
        };
        Clube._inicializado = true;
    }
}


/**
 * Construtor Taca contem um array de Clubes. so quando comeca a Taca k a atividade passa a true
 * @param {*} nomeTaca 
 * @param {*} numeroEdicoes 
 * @param {*} numeroEquipas 
 */
function Taca(nomeTaca, edicaoTaca, numeroClubes){
    this.idTaca = contadorTaca++;
    this.nomeTaca = nomeTaca;
    this.edicaoTaca = edicaoTaca;
    this.numeroClubes = numeroClubes;
    this.atividade = false;
    this.Clubes = new Array();
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
        //e atualiza o mercado de jogadores
        criarTabelaMercadoJogadores();

    }
}




/**
 *  Metodo de criacao de tabela
 */
function criarTabelaJogadores() {

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
        var disponivel = arrayJogadores[i].disponivel;
        var imgDisponibilidade = document.createElement('img');

        if(disponivel){
            imgDisponibilidade.setAttribute('src', 'images/true.png'); 
        }else{
            imgDisponibilidade.setAttribute('src', 'images/false.png'); 
        }

        celulaDisponibilidade.appendChild(imgDisponibilidade);
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
   criarTabelaMercadoJogadores();
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

    //atualiza a tabela de jogadores
   // criarTabelaJogadores();

     //atualizacao da combobox de mercado
    //criarTabelaMercadoJogadores();
    
}


/**
 * Se nao existir num Clube, Apaga do arrayJogadores e mete os inputs a null
 */
function removerJogador(indice) {
   
    var divErrosCriacaoJogador = document.getElementById('divErrosCriacaoJogador');

    var confirmacao = confirm("Deseja apagar o Jogador?");
    
    if(confirmacao == true){
        //jogadorSeleccionado = indice;
    if (arrayJogadores[indice].disponivel == false) {
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
        criarTabelaMercadoJogadores();
        //criarTabelaEquipa(clubeSelecionado);

        
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


            //se é u Clube novo ou se é um selecionado
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
        
        var celulaValido = document.createElement("td");
        var valido = arrayClubes[i].valido;
        var imgValido = document.createElement('img');

        if(valido){
            imgValido.setAttribute('src', 'images/true.png'); 
        }else{
            imgValido.setAttribute('src', 'images/false.png'); 
        }

        celulaValido.appendChild(imgValido);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaValido);


        //cada linha vai ter a propriedade onclick
        linha.id = i + "clube";
        linha.onclick = function () { loadConteudoEquipa(this.id.charAt(0)) };
        tabelaNova.appendChild(linha);
    }

    //tabela.style.border = "2px solid black";
    tabelaNova.setAttribute("border", "1");
    var oldTabela = document.getElementById("tabelaClubes");
    //faz a substituicao das tabelas
    document.getElementById("divTabelaClubes").replaceChild(tabelaNova, oldTabela);
    document.getElementById("divTabelaClubes").style.display = 'block';  

     //atualizacao da combobox de mercado
    //criarTabelaMercadoJogadores();
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
 * Se nao existir numa Taca, Apaga do arrayClube e mete os inputs a null
 */
function removerClube(indice) {


    var divErrosCriacaoClube = document.getElementById('divErrosCriacaoClube');

    var confirmacao = confirm("Deseja apagar a Clube?");
    
    if(confirmacao == true){
     if (existeClubeEmTaca() || arrayClubes[indice].Equipa.length > 0) {
        divErrosCriacaoClube.style.display = 'block';

        var textoErro;

        if (!existeClubeEmTaca()){
            textoErro = document.createTextNode("O Clube já existe numa Taça!");
        }else{
            textoErro = document.createTextNode("O Clube tem jogadores associados!");
        }

        var oldErro = divErrosCriacaoClube.firstChild;
        if (oldErro == null) {
            divErrosCriacaoClube.appendChild(textoErro);
        } else {
            divErrosCriacaoClube.replaceChild(textoErro, oldErro);  
        }

    } else {
        arrayClubes.splice(indice, 1);
        alert("Clube apagado!");
        
        criarTabelaClubes();
        criarTabelaMercadoJogadores();
        loadConteudoClube();
        //loadConteudoEquipa();
       // gerarDropDownPaisesClube();
        //gerarDropDownMercadoJogadoresLivres();
        
        

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
 * Tabela de jogadores livres
 */
function criarTabelaMercadoJogadores() {

      if(arrayJogadores.length > 0){

    //criamos uma tabela nova que será substituida pela antiga que está no HTML
    var tabelaNova = document.createElement("table");
    tabelaNova.id = "tabelaMercadoJogadores";

    var caption = tabelaNova.createCaption();
    var titulo = document.createTextNode("LISTA JOGADORES LIVRES");
    caption.appendChild(titulo);
    tabelaNova.appendChild(caption);

    //criar as celulas e texto
    var celulaCabecalhoID = document.createElement("th");
    var textoCabecalhoID = document.createTextNode("ID");
    celulaCabecalhoID.appendChild(textoCabecalhoID);

    var celulaCabecalhoNome = document.createElement("th");
    var textoCabecalhoNome = document.createTextNode("Nome");
    celulaCabecalhoNome.appendChild(textoCabecalhoNome);

    var celulaCabecalhoPosicao = document.createElement("th");
    var textoCabecalhoPosicao = document.createTextNode("Posição");
    celulaCabecalhoPosicao.appendChild(textoCabecalhoPosicao);
   
    var celulaCabecalhoDisponibilidade = document.createElement("th");
    var textoCabecalhoDisponibilidade = document.createTextNode("Disponivel");
    celulaCabecalhoDisponibilidade.appendChild(textoCabecalhoDisponibilidade);

    var celulaCabecalhoADD = document.createElement("th");
    var textoCabecalhoADD = document.createTextNode(" ");
    celulaCabecalhoADD.appendChild(textoCabecalhoADD);
   

    //adicionar á TR
    var linhaCabecalho = document.createElement("tr");
    linhaCabecalho.appendChild(celulaCabecalhoID);
    linhaCabecalho.appendChild(celulaCabecalhoNome);
    linhaCabecalho.appendChild(celulaCabecalhoPosicao);
    linhaCabecalho.appendChild(celulaCabecalhoDisponibilidade);
    linhaCabecalho.appendChild(celulaCabecalhoADD);

    
    tabelaNova.appendChild(linhaCabecalho);

    //Enquanto houverem jogadores na tabela arrayJogadores...
    for (var i = 0; i < arrayJogadores.length; i++) {   

        if (arrayJogadores[i].disponivel == true){

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

        
        var celulaPosicao = document.createElement("td");
        var posicao = document.createTextNode(arrayJogadores[i].posicao);
        celulaPosicao.appendChild(posicao);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaPosicao);

        var celulaDisponibilidade = document.createElement("td");
        var disponivel = document.createTextNode(arrayJogadores[i].disponivel);
        celulaDisponibilidade.appendChild(disponivel);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaDisponibilidade);


        var celulaADD = document.createElement("td");
        var imgADDJogador = document.createElement('img');
        imgADDJogador.setAttribute('id', linha.id);
        imgADDJogador.setAttribute('src', 'images/add.png'); 
        imgADDJogador.onclick = function () { atribuirJogador(this.id); };
        celulaADD.appendChild(imgADDJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaADD);

        
        //linha.onclick = function () { editarJogador(this.) };

        tabelaNova.appendChild(linha);
    }
    }
    //tabela.style.border = "2px solid black";
    tabelaNova.setAttribute("border", "1");
    var oldTabela = document.getElementById("tabelaMercadoJogadores");
    //faz a substituicao das tabelas
    document.getElementById("divTabelaMercadoJogadores").replaceChild(tabelaNova, oldTabela);
    document.getElementById("divTabelaMercadoJogadores").style.display = 'block';

    //cada vez que um jogador e criado e necessario atualizar a combobox do mercado
    //gerarDropDownMercadoJogadoresLivres();
      }  
}




/**
 * Adiciona o jogador á equipa e chama o criarTabelaEquipa para redesenhar a tabela com o novo jogador adicionado
 * @param {*} indice 
 */
function atribuirJogador(indiceJogador){

        var indiceClube = clubeSelecionado;


        //jogadorSeleccionado = indiceJogador;

       //introduz na tabela jogadores por Clube
        arrayClubes[indiceClube].Equipa.push(arrayJogadores[indiceJogador]);

        
        //e mete a disponibilidade do jogador a false no arrayJogadores e no arrayEquipa que está dentro do arrayClubes
        arrayJogadores[indiceJogador].disponivel = false;
       // arrayClubes[indiceClube].Equipa[indiceJogador].disponivel = false;
        

        //atualiza a tabela de jogadores com o jogador a false
        criarTabelaJogadores();

        //imprimir tabela para testar se o jogador foi atribuido á equipa
        //imprimirTabela(indiceJogador);

        //cria/atualiza a tabela com o jogador adicionado
        criarTabelaEquipa(clubeSelecionado);

        //verifica se a equipa ja tem 11
        verificar11Equipa();

        loadConteudoEquipa(clubeSelecionado);

}

/**
 * Basicamente remove da tabelaEquipa e volta a colocar o jogador disponivel 
 * @param {*} indice 
 */
function desatribuirJogador(indiceJogador){

    var indiceClube = clubeSelecionado;

    //GUARDA O ID ANTES DE FAZER O SPLICE
    //os indexes do arrayEquipas nao e arrayJogador nao sao os mesmos. É necessario encontrar o index correto do arrayJogadores atraves do ID do jogador
    var idJogador = arrayClubes[indiceClube].Equipa[indiceJogador].idJogador;

    //remove do arrayEquipa
    arrayClubes[indiceClube].Equipa.splice(indiceJogador, 1);

    

    //devolve o indice correto atraves do ID jo jogador
    var indiceArrayJogadores = findJogadorByID(idJogador);

    //e mete disponivel a true no array de jogadores
    arrayJogadores[indiceArrayJogadores].disponivel = true;

    //atualiza a tabela de jogadores com o jogador a true
    criarTabelaJogadores();


     //cria/atualiza a tabela com o jogador removido
    criarTabelaEquipa(clubeSelecionado);

    //verifica se a equipa ja tem 11
    verificar11Equipa();

    loadConteudoEquipa(clubeSelecionado);
    

}

function findJogadorByID(idJogador){

    for (var index = 0; index < arrayJogadores.length; index++) {
            if(arrayJogadores[index].idJogador == idJogador){
                    return index;
            }
    }
}

function imprimirTabela(indiceJogador){



    for (var index = 0; index < arrayClubes[clubeSelecionado].Equipa.length; index++) {

        console.log(" Imprime: "+arrayClubes[clubeSelecionado].Equipa[indiceJogador].nomeJogador.toString()+"");
        
    }
}

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
    var textoCabecalhoREMOVE = document.createTextNode(" ");
    celulaCabecalhoREMOVE.appendChild(textoCabecalhoREMOVE);



    //adicionar á TR
    var linhaCabecalho = document.createElement("tr");
    linhaCabecalho.appendChild(celulaCabecalhoID);
    linhaCabecalho.appendChild(celulaCabecalhoNomeJogador);
    linhaCabecalho.appendChild(celulaCabecalhoPosicao);
    linhaCabecalho.appendChild(celulaCabecalhoREMOVE);

    tabelaNova.appendChild(linhaCabecalho);


    //Enquanto houverem jogadores na tabela arrayJogadoresClube...
    for (var i = 0; i < arrayClubes[indice].Equipa.length; i++) {

        var linha = document.createElement("tr");
        linha.id = i;
        
        var celulaID = document.createElement("td");
        var id = document.createTextNode(arrayClubes[indice].Equipa[i].idJogador);
        celulaID.appendChild(id);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaID);
    
        var celulaNome = document.createElement("td");
        var nomeJogador = document.createTextNode(arrayClubes[indice].Equipa[i].nomeJogador);
        celulaNome.appendChild(nomeJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaNome);

        
        var celulaPosicao = document.createElement("td");
        var posicao = document.createTextNode(arrayClubes[indice].Equipa[i].posicao);
        celulaPosicao.appendChild(posicao);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaPosicao);

        var celulaDesatribuir = document.createElement("td");
        var imgDesatribuirJogador = document.createElement('img');
        imgDesatribuirJogador.setAttribute('id', linha.id);
        imgDesatribuirJogador.setAttribute('src', 'images/remove.png'); 
        imgDesatribuirJogador.onclick = function () { desatribuirJogador(this.id.charAt(0)) };
        celulaDesatribuir.appendChild(imgDesatribuirJogador);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaDesatribuir);

        tabelaNova.appendChild(linha);
    }

    //tabela.style.border = "2px solid black";
    tabelaNova.setAttribute("border", "1");
    var oldTabela = document.getElementById("tabelaEquipa");
    //faz a substituicao das tabelas
    document.getElementById("divTabelaEquipa").replaceChild(tabelaNova, oldTabela);
    document.getElementById("divTabelaEquipa").style.display = 'block';

    

     //atualizar a tabela do mercado
    criarTabelaMercadoJogadores();
}



/**
 * -------------------------------------------------F U N C O E S   T A C A ------------------------------------------------------------------
 */


/**
 * Adicionar ou edita o Taca consoante a variavel de controlo selecionar Taca
 */
function adicionarTaca() {
    // vai buscar o id da tabela
    // cria uma linha e celulas
    // vai buscar os dados dos inputs
    // e manda pra dentro das celulas
    if (!verificarDadosTaca()) {
        if (!verificarNumeroClubes()){

           var nomeTaca = document.getElementById("nomeTaca").value;
           var edicaoTaca = document.getElementById("edicaoTaca").value;
           var numeroClubes = document.getElementById("numeroClubes").value;



            //se é uma taca nova ou se é um selecionado.
             if (tacaSelecionada == -1) {
                arrayTacas.push(new Taca(nomeTaca, edicaoTaca, numeroClubes));
            } else {
                arrayTacas[tacaSelecionada].nomeTaca = nomeTaca;
                arrayTacas[tacaSelecionada].edicaoTaca = edicaoTaca;
                arrayTacas[tacaSelecionada].numeroClubes = numeroClubes;
                              
                tacaSelecionada = -1;
        }


        //limpa dos formularios
        document.getElementById("nomeTaca").value = "";
        document.getElementById("edicaoTaca").value = "";
        document.getElementById("numeroClubes").value = "";


        //e cria a tabela da taca
        criarTabelaTacas();
    }
}
}



/**
 *  Metodo de criacao de tabela
 */
function criarTabelaTacas() {


    if(arrayTacas.length > 0){

    //criamos uma tabela nova que será substituida pela antiga que está no HTML
    var tabelaNova = document.createElement("table");
    tabelaNova.id = "tabelaTacas";

    var caption = tabelaNova.createCaption();
    var titulo = document.createTextNode("LISTA TAÇAS");
    caption.appendChild(titulo);
    tabelaNova.appendChild(caption);

    //criar as celulas e texto
    var celulaCabecalhoIDTaca = document.createElement("th");
    var textoCabecalhoIDTaca = document.createTextNode("ID");
    celulaCabecalhoIDTaca.appendChild(textoCabecalhoIDTaca);

    var celulaCabecalhoNomeTaca = document.createElement("th");
    var textoCabecalhoNomeTaca = document.createTextNode("Nome Taça");
    celulaCabecalhoNomeTaca.appendChild(textoCabecalhoNomeTaca);

    var celulaCabecalhoEdicoes = document.createElement("th");
    var textoCabecalhoEdicoes = document.createTextNode("Edições");
    celulaCabecalhoEdicoes.appendChild(textoCabecalhoEdicoes);

    var celulaCabecalhoClubes = document.createElement("th");
    var textoCabecalhoClubes = document.createTextNode("Clubes");
    celulaCabecalhoClubes.appendChild(textoCabecalhoClubes);
    
    var celulaCabecalhoREMOVE = document.createElement("th");
    var textoCabecalhoREMOVE = document.createTextNode(" ");
    celulaCabecalhoREMOVE.appendChild(textoCabecalhoREMOVE);

    //adicionar á TR
    var linhaCabecalho = document.createElement("tr");  
    linhaCabecalho.appendChild(celulaCabecalhoIDTaca);
    linhaCabecalho.appendChild(celulaCabecalhoNomeTaca);
    linhaCabecalho.appendChild(celulaCabecalhoEdicoes);
    linhaCabecalho.appendChild(celulaCabecalhoClubes);
    linhaCabecalho.appendChild(celulaCabecalhoREMOVE);

    
    tabelaNova.appendChild(linhaCabecalho);

    //Enquanto houverem Taças no arrayTaças
    for (var i = 0; i < arrayTacas.length; i++) {

        var linha = document.createElement("tr");
        linha.id = i;

        var celulaIDTaca = document.createElement("td");
        var idTaca = document.createTextNode(arrayTacas[i].idTaca);
        celulaIDTaca.appendChild(idTaca);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaIDTaca);

        var celulaNome = document.createElement("td");
        var nomeTaca = document.createTextNode(arrayTacas[i].nomeTaca);
        celulaNome.appendChild(nomeTaca);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaNome);

        var celulaEdicoes = document.createElement("td");
        var numeroEdicoes = document.createTextNode(arrayTacas[i].edicaoTaca);
        celulaEdicoes.appendChild(numeroEdicoes);
        //celulaTipo.style.border = "1px solid black";
        linha.appendChild(celulaEdicoes);

        var celulaClubes = document.createElement("td");
        var numeroClubes = document.createTextNode(arrayTacas[i].numeroClubes);
        celulaClubes.appendChild(numeroClubes);
        //celulaPreco.style.border = "1px solid black";
        linha.appendChild(celulaClubes);
        

        var celulaREMOVE = document.createElement("td");
        var imgREMOVETaca = document.createElement('img');
        imgREMOVETaca.setAttribute('id', linha.id);
        imgREMOVETaca.setAttribute('src', 'images/delete.png'); 
        imgREMOVETaca.onclick = function () { removerTaca(this.id) };
        celulaREMOVE.appendChild(imgREMOVETaca);
        //celulaNome.style.border = "1px solid black";
        linha.appendChild(celulaREMOVE);
        
        //cada linha vai ter a propriedade onclick
        linha.id = i + "taca";
        linha.onclick = function () { loadConteudoTorneio(this.id.charAt(0)) };
        tabelaNova.appendChild(linha);
    }

    //tabela.style.border = "2px solid black";
    tabelaNova.setAttribute("border", "1");
    var oldTabela = document.getElementById("tabelaTacas");
    //faz a substituicao das tabelas
    document.getElementById("divTabelaTacas").replaceChild(tabelaNova, oldTabela);
    document.getElementById("divTabelaTacas").style.display = 'block';  


    }
    
}



/**
 * Se nao existir numa Taca, Apaga do arrayClube e mete os inputs a null
 */
function removerTaca(indice) {


    var divErrosCriacaoTaca = document.getElementById('divErrosCriacaoTaca');

    var confirmacao = confirm("Deseja apagar a Taça?");
    
    if(confirmacao == true){
     if (existeTacaEmAtividade()) {
        divErrosCriacaoClube.style.display = 'block';

        var textoErro;
            textoErro = document.createTextNode("A taça ainda está em atividade!");


        var oldErro = divErrosCriacaoTaca.firstChild;
        if (oldErro == null) {
            divErrosCriacaoTaca.appendChild(textoErro);
        } else {
            divErrosCriacaoTaca.replaceChild(textoErro, oldErro);  
        }

    } else {
        arrayTacas.splice(indice, 1);
        alert("Taça apagada!");
        
        criarTabelaTacas();
        loadConteudoTaca();
        
    
        //limpa dos formularios
        document.getElementById("nomeTaca").value = "";
        document.getElementById("edicaoTaca").value = "";
        document.getElementById("numeroClubes").value = "";

    }
    }else{
        return;
    }
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

/*    if(controloJogadoresDefault == true){
        jogadoresDefault();
        controloJogadoresDefault = false;
    }*/
    
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

/*
     if(controloClubesDefault == true){
        clubesDefault();
        controloClubesDefault = false;
    }
 */
    document.getElementById("conteudoPaginaClube").style.display = 'block';

    document.getElementById("conteudoHome").style.display = 'none';
    document.getElementById("conteudoPaginaJogador").style.display = 'none';
    document.getElementById("conteudoPaginaLiga").style.display = 'none';
    document.getElementById("conteudoPaginaTaca").style.display = 'none';

    
    if(arrayClubes.length == 0){
        document.getElementById("divTabelaClubes").style.display = 'none'; // nao seria none?;
        document.getElementById("divNaoExistemClubes").style.display = 'block';
        document.getElementById("divEquipa").style.display = 'none';

        
    }else{
         document.getElementById("divTabelaClubes").style.display = 'block';  
         document.getElementById("divNaoExistemClubes").style.display = 'none';
         //document.getElementById("divEquipa").style.display = 'block';
    }
}




/**
 * Faz o load do conteudo da div Adicionar jogadores á Equipa. 
 * Contem 3 divs. Erros, 
 * 
 */
function loadConteudoEquipa(indice) {

    console.log("Entrou no conteudo Equipa"+arrayClubes[indice].nomeClube);

    clubeSelecionado = indice;
 
    var divEquipa = document.getElementById("divEquipa");
    var divErrosEquipa = document.getElementById('divErrosEquipa');
    var divMercadoJogadores = document.getElementById('divTabelaMercadoJogadores');
    var divTabelaEquipa = document.getElementById('divTabelaEquipa');

    divEquipa.style.display = 'block';
    
    //se array de jogadores esta vazio ou se nao existem jogadores na equipa
    if(arrayJogadores.length == 0 || arrayClubes[indice].Equipa.length == 0){

        var textoErros;
        if(arrayJogadores.length == 0){
            textoErros = document.createTextNode("Não existem jogadores no Mercado! Crie um jogador primeiro!");
            divMercadoJogadores.style.display = 'none';
            divTabelaEquipa.style.display = 'none';
        }else{           
            textoErros = document.createTextNode("Equipa sem jogadores! Adicione um jogador");
            divMercadoJogadores.style.display = 'block';
            divTabelaEquipa.style.display = 'none';
        }

          var oldErro = divErrosEquipa.firstChild;

        if (oldErro == null) {
            divErrosEquipa.appendChild(textoErros);
        } else {
            divErrosEquipa.replaceChild(textoErros, oldErro);
        }

        divErrosEquipa.style.display = 'block';
          
        
        //sucesso
    }else{
         divErrosEquipa.style.display = 'none';
         divMercadoJogadores.style.display = 'block';
         divTabelaEquipa.style.display = 'block';

         //tem de mostrar a tabela Equipa consoante a equipa clicada
         criarTabelaEquipa(clubeSelecionado);
    }
}



function loadConteudoTorneio(indice){

    tacaSelecionada = indice;

    console.log("Entrou dentro do torneio");

    var divTorneio = document.getElementById("divTorneio");
    var divTabelaTorneio = document.getElementById('divTabelaTorneio');

    divTorneio.style.display = 'block';


    

    
}


/**
 * Faz o load do conteudo da pagina Taca
 * 
 */
function loadConteudoTaca() {

/*
       if(controloTacasDefault == true){
        tacasDefault();
        controloTacasDefault = false;
    }
*/
 
    document.getElementById("conteudoPaginaTaca").style.display = 'block';

    document.getElementById("conteudoHome").style.display = 'none';
    document.getElementById("conteudoPaginaJogador").style.display = 'none';
    document.getElementById("conteudoPaginaClube").style.display = 'none';
    document.getElementById("conteudoPaginaLiga").style.display = 'none';

     if(arrayTacas.length == 0){
        document.getElementById("divTabelaTacas").style.display = 'none' // nao seria none?;
        document.getElementById("divNaoExistemTacas").style.display = 'block';
    }else{
         document.getElementById("divTabelaTacas").style.display = 'block';
         document.getElementById("divNaoExistemTacas").style.display = 'none';      
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


/** -------------------------------------------------- M E T O D O S   A U X I L I A R E S --------------------------------------------------------------
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
        textoErro = document.createTextNode("Error: Preencha todos os dados corretamente!");

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
        textoErro = document.createTextNode("Error: Preencha todos os dados corretamente!");

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
  *  verifica se os valores estao vazios,
  */
function verificarDadosTaca() {
    var isEmpty = false;

        var nomeTaca = document.getElementById("nomeTaca").value;
        var edicaoTaca = document.getElementById("edicaoTaca").value;
        var numeroClubes = document.getElementById("numeroClubes").value;

      var divErrosCriacaoTaca = document.getElementById('divErrosCriacaoTaca');
      var divNaoExistemTacas = document.getElementById('divNaoExistemTacas');

    var textoErro;
    if (nomeTaca == "" || edicaoTaca == "" || numeroClubes == "" || isNaN(edicaoTaca) || isNaN(numeroClubes) ) {
        divErrosCriacaoTaca.style.display = 'block';
        textoErro = document.createTextNode("Error: Preencha todos os dados corretamente!");

        isEmpty = true;


        if(isNaN(edicaoTaca) || isNaN(numeroClubes)){
            textoErro = document.createTextNode("Error: Introduza um valor numérico!");
            isEmpty = true;
        } 


        //substitui a msg de erro antiga pela nova
        var oldErro = divErrosCriacaoTaca.firstChild;

        if (oldErro == null) {
            divErrosCriacaoTaca.appendChild(textoErro);
        } else {
            divErrosCriacaoTaca.replaceChild(textoErro, oldErro);
        }

    }else{
        divErrosCriacaoTaca.style.display = 'none';
        divNaoExistemTacas.style.display = 'none';
        isEmpty = false;
    }

    return isEmpty;
}




/**
 * O numero de clubes  introduzido tem de ser 4 ou 8 ou 1
 */
function verificarNumeroClubes(){

    var isNotMultiple = false;

    var numeroClubes = document.getElementById("numeroClubes").value;
    var divErrosCriacaoTaca = document.getElementById('divErrosCriacaoTaca'); 
    var divNaoExistemTacas = document.getElementById('divNaoExistemTacas');

    var textoErro;

        if(numeroClubes == 4 || numeroClubes == 8 || numeroClubes == 16){


             divErrosCriacaoTaca.style.display = 'none';
            divNaoExistemTacas.style.display = 'none';
            isNotMultiple = false; 
           

            
        
    }else{
        

            divErrosCriacaoTaca.style.display = 'block';
            textoErro = document.createTextNode("Error: Numero de Clubes invalido! (4,8 ou 16)");
            isNotMultiple = true; 



            //substitui a msg de erro antiga pela nova
        var oldErro = divErrosCriacaoTaca.firstChild;

        if (oldErro == null) {
            divErrosCriacaoTaca.appendChild(textoErro);
        } else {
            divErrosCriacaoTaca.replaceChild(textoErro, oldErro);
        }



        }
        

        return isNotMultiple;
}





/**
 *  Verifica se um Clube tem 11 jogadores (1GR, 4DF, 4ME, 2AV)
 */
function verificar11Equipa(){
   return false;
}








/**
 * Metodo Aux chamado pelo removerJogador. Verifica se um jogador ja existe numa Clube.
 */
/*
function existeJogadorEmClube() {
    if (jogadorSeleccionado == -1) {
        return false;
    } else {
        for (var i = 0; i < arrayClubes.length; i++) {
            if (arrayClubes[i].Equipa.selectedIndex == jogadorSeleccionado) {
                return true;
            }
        }
    }
    return false;
}


*/

/**
 * Metodo Aux chamado pelo removerClube. Verifica se um Clube existe nalguma Taça
 */
function existeClubeEmTaca() {
    if (clubeSelecionado == -1) {
        return false;
    } else {
        for (var i = 0; i < arrayTacas.length; i++) {
            if (arrayTacas[i].Clube == clubeSelecionado) {
                return true;
            }
        }
    }
    return false;
}



function existeTacaEmAtividade() {
  
  if (tacaSelecionada == -1) {
        return false;
    } else {
        for (var i = 0; i < arrayTacas.length; i++) {
            if (arrayTacas[i].atividade == tacaSelecionada) {
                if(arrayTacas[i].atividade == true){
                return true;
                }
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

 
 /**
  * --------------------------------------------V A L O R E S    O M I S S A O ------------------------------------------------
  */
function jogadoresDefault(){
 
        var arrayJogadoresDefault = [new Jogador("Cristiano Ronaldo", "1985/03/25", "Portugal", "185", "AV"), 
                                    new Jogador("Messi", "1989/03/25", "Argentina", "150", "AV"),
                                    new Jogador("Messi", "1989/03/25", "Argentina", "150", "AV"),
                                    new Jogador("Buffon", "1985/03/25", "Italia", "180", "GR"),
                                    new Jogador("Ibra", "1983/03/25", "Suecia", "190", "DF"),
                                    new Jogador("ryu", "1983/03/25", "Suecia", "190", "DF"),
                                    new Jogador("Ibra", "1983/03/25", "Portugal", "190", "DF"),
                                    new Jogador("josh", "1983/03/25", "Portugal", "190", "DF"),
                                    new Jogador("bern", "1983/03/25", "Portugal", "190", "DF"),
                                    new Jogador("juan", "1983/03/25", "Portugal", "190", "MC"),
                                    new Jogador("ze", "1983/03/25", "Portugal", "190", "MC"),
                                    new Jogador("joao", "1983/03/25", "Portugal", "190", "MC"),
                                    new Jogador("rui", "1983/03/25", "Portugal", "190", "MC"),
                                    new Jogador("xico", "1983/03/25", "Portugal", "190", "DF"),
                                    new Jogador("mike", "1983/03/25", "Portugal", "190", "AV"),
                                    new Jogador("Ibra", "1983/03/25", "Portugal", "190", "AV"),];


        for (var index = 0; index < arrayJogadoresDefault.length; index++) {
         
                arrayJogadores.push(arrayJogadoresDefault[index]);
            
        }

            criarTabelaJogadores();
}


function clubesDefault(){

        var clube1 = new Clube("Real Madrid", "RMA", "Espanha", "www.real.com", " Los blancos");
        var clube2 = new Clube("Juventus", "JUV", "Italia", "www.juve.com", " ");
        var clube3 = new Clube("Bayern", "BAY", "Alemanha", "www.bayern.com", " ");
        var clube4 = new Clube("Barcelona", "BAR", "Espanha", "www.barca.com", " ");

            arrayClubes.push(clube1);
            arrayClubes.push(clube2);
            arrayClubes.push(clube3);
            arrayClubes.push(clube4);

            criarTabelaClubes();
}


function tacasDefault(){

        var taca1 = new Taca("Taça CTT 16/17", "6", "8");
            arrayTacas.push(taca1);
            criarTabelaTacas();
}


function onLoadDefaults(){

    jogadoresDefault();
    clubesDefault();
    tacasDefault();
    


}





