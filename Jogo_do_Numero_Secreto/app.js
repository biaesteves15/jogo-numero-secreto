let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    chute = parseInt(chute);

    if (isNaN(chute)) {
        exibirTextoNaTela('p', 'Digite um número');
    }
     else if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        numeroLimite = numeroLimite + 10;
    }else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor.');
        }else if (chute < numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é maior.');
        }
        tentativas ++;
        limparCampo();
        // if (tentativas >= 10) {
        //     exibirTextoNaTela('p', 'Você perdeu :(');
        //     reiniciarJogo(); // Reinicia o jogo
        // }
        // jogoPerdido();
    }
}

// function jogoPerdido(){
//     if (tentativas >= 10){
//         exibirTextoNaTela('p', 'Você perdeu :(');
//         document.getElementById('reiniciar').setAttribute('disabled', true);
//         numeroLimite = 10;
//     }
//     exibirMensagemInicial();

// }

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let qtdElementosLista = listaNumerosSorteados.length;

    if (qtdElementosLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    if (numeroLimite > 100 || numeroSecreto > 100){
        numeroLimite = 10;
        exibirMensagemInicial();
    }
}



