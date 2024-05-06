/*

Desenvolvimento Web e Mobile

Desafio JS - Site de cadastro com validação de campos

Henrique Marques

*/

// Criando os objetos dos elementos de texto do form
var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
var senha = document.querySelector("#inputPassword");
var senhaForca = document.querySelector("#passStrengthMeter");
var senhaHelp = document.querySelector("#inputPasswordHelp");
var mensagemSucesso = document.querySelector("#inputResult");
var form = document.querySelector("#singleForm");



// Adicionando manipuladores de eventos para verificar a senha enquanto o usuário digita + verificar nome e ano de nascimento em tempo real
senha.addEventListener('input', function () {
    mostrarForcaSenha();
});

nome.addEventListener('input', function () {
    mostrarForcaSenha();
});

ano.addEventListener('input', function () {
    mostrarForcaSenha();
});


/* Declarando o evento listener para o campos de texto do form. 
Uma vez o foco do campo "inputName" mude, será chamada a função "validarNome" */
nome.addEventListener('focusout', validarNome);

ano.addEventListener('focusout', validarAno);

email.addEventListener('focusout', validarEmail);

form.addEventListener('submit', function (event) {
    event.preventDefault();
    validarForms();
});


/* Declaração tradicional de função validarNome(e) 'e' é o objeto do tipo evento que contém,
além de outras propriedades, o objeto que iniciou o evento, neste caso o objeto 'nome' */
// Validação do nome
function validarNome(e){ 
    // Declaração da expressão regular (regex) para definir o formato de um nome válido
    const regexNome = /^[a-zA-Z]{6,}$/;
    
    console.log(e); // impressão em console do objeto evento e
    console.log(e.target.value); // impressão em console do valor do objeto 'nome' que originou o evento   

    // Caso o nome seja inválido, muda o conteúdo e o estilo do objeto nomeHelp (elemento HTML com id=inputNameHelp)
    if (e.target.value.trim().match(regexNome)==null){
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color="red";
        mensagemSucesso.textContent = ''
    } else {
        nomeHelp.textContent = "";
    }       
}


// Validação do ano
function validarAno(e){

    const regexAno = /^\d{4}$/;
    const valorAno = ano.value;
    console.log(e);
    console.log(valorAno);


    if (!regexAno.test(valorAno)) {
        anoHelp.textContent = "Ano inválido. Insira um número de 4 dígitos.";
        anoHelp.style.color = "red";
        mensagemSucesso.textContent = '';
    } else if (parseInt(valorAno) > 2022) {
        anoHelp.textContent = "Ano inválido. O ano não pode ser maior que 2022";
        anoHelp.style.color="red";
        mensagemSucesso.textContent = ''
    } else if (parseInt(valorAno) < 1900){
        anoHelp.textContent = "Ano inválido. O ano não pode ser menor que 1900";
        anoHelp.style.color="red";
        mensagemSucesso.textContent = ''
    } else {
        anoHelp.textContent = "";
    }        

}


// Validação do email
function validarEmail(e) {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z\d]+\.(br|com|net|org)$/;

    console.log(e);
    console.log(e.target.value);

    if (e.target.value.trim().match(regexEmail)==null){
        emailHelp.textContent = "Formato de email inválido"; 
        emailHelp.style.color="red";
        mensagemSucesso.textContent = ''
    } else {
        emailHelp.textContent = "";
    } 

}


// Validação da senha
function validarSenha(senha, nome, ano) {

    // Invalidando a senha caso não tenha entre 6 e 20 caracteres
    if (senha.length < 6 || senha.length > 20) {
        senhaForca.value = 0;
        return 'Senha inválida';
    }
    
    // Invalidando a senha caso não contenha pelo menos uma letra, um número e um caractere especial
    if (!/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-\"'])/.test(senha) || 
        !/(?=.*[0-9])/.test(senha) || 
        !/(?=.*[a-zA-Z])/.test(senha)) {
        senhaForca.value = 0;
        return 'Senha inválida';
    }

    // Invalidando a senha caso contenha o nome ou senha inseridos pelo usuário
    if (senha.includes(nome) || senha.includes(ano)) {
        senhaForca.value = 0;
        return 'Senha inválida';
    }

    return 'Senha válida';

}

function mostrarForcaSenha() {
    const senha_trim = senha.value.trim();
    const nome_trim = nome.value.trim();
    const ano_trim = parseInt(ano.value.trim());
    
    // Se o campo de senha estiver vazio, limpar a barra de progresso e o status
    if (!senha_trim) {
        senhaForca.value = 0;
        senhaHelp.textContent = '';
        return;
    }

    const resultadoValidacaoSenha = validarSenha(senha_trim, nome_trim, ano_trim);
    // Se a senha for inválida, exibir "Senha inválida"
    if (resultadoValidacaoSenha !== "Senha válida") {
        senhaHelp.textContent = resultadoValidacaoSenha;
        senhaHelp.style.color="red";
        return;
    }

    // Atualizando o status de força da senha na tela (fraca, moderada ou forte)
    const senhaForcaValue = getForcaSenha(senha_trim);
    senhaHelp.textContent = senhaForcaValue;
    senhaHelp.style.color="black";
}

// Calculando a força da senha
function getForcaSenha(senha) {
    // Considerando o tamanho 8 para uma senha fraca
    if (senha.length <= 8) {
        if (/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-\"'])/.test(senha) && /(?=.*[0-9])/.test(senha)) {
            senhaForca.value = 7.5;
            return 'Senha fraca';
        }
    // Considerando o tamanho 12 para uma senha média
    } else if (senha.length > 8 && senha.length <= 12) {
        if (/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-\"'])/.test(senha) && 
            /(?=.*[0-9])/.test(senha) && 
            /(?=.*[A-Z])/.test(senha)) {
            senhaForca.value = 15;
            return 'Senha moderada';
        }
    // Acima do tamanho 12, pode ser uma senha forte
    } else {
        if (/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-\"'].*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-\"']){2,}/.test(senha) && 
            /(?=.*[0-9].*[0-9]){2,}/.test(senha) && 
            /(?=.*[A-Z].*[A-Z]){2,}/.test(senha)) {
            senhaForca.value = 30;
            return 'Senha forte';

        } else if (/(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\|\-\"'])/.test(senha) && 
                   /(?=.*[0-9])/.test(senha) && 
                   /(?=.*[A-Z])/.test(senha)) {
            
            // Nesse caso, por já ser uma "Senha moderada", o caso padrão é esse status, uma vez que, mesmo se houver mais de 12 caracteres,
            // talvez não cumpra o requisito de possuir mais de uma letra maiúscula, número e caractere especial para que seja uma "Senha forte".
            senhaForca.value = 22.5;
            return 'Senha moderada';
        }

        senhaForca.value = 7.5;
        return 'Senha fraca';
    }

    // O caso padrão é uma "Senha fraca" (caso seja válida), uma vez que, mesmo se houver mais de 8 caracteres,
    // talvez não cumpra o requisito de possuir uma letra maiúscula para que seja uma "Senha moderada".
    senhaForca.value = 7.5;
    return 'Senha fraca';
}

function validarForms() {
    const senha_trim = senha.value.trim();
    const nome_trim = nome.value.trim();
    const ano_trim = parseInt(ano.value.trim());

    const resultadoValidacaoSenha = validarSenha(senha_trim, nome_trim, ano_trim);

    // Mensagem para senhas inválidas
    if (resultadoValidacaoSenha !== "Senha válida") {
        senhaHelp.textContent = "Formato de senha inválida"; 
        senhaHelp.style.color="red";
        alert('Insira uma senha válida.');
        mensagemSucesso.textContent = ''
        return;
    }

    // Se todos os campos forem válidos, exibir mensagem de sucesso
    mensagemSucesso.textContent = 'Cadastro realizado com sucesso!';
}