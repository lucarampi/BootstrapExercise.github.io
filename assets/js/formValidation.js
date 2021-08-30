var get = (x) => $(x)
var set = (x) => $(x)
var flag_name = false
var flag_email = false
var flag_cpf = false
var flag_city = false
var flag_state = false
var flag_zip = false
var flag_adressType = false
var flag_email = false



$(document).ready(function () {
    // OK
    get("#inputName")[0]
    get("#inputEmail")[0]
    get("#inputCPF")[0]
    get("#inputCity")[0]
    get("#inputState")[0]
    get("#inputZip")[0]
    get("#inputAdressType")[0]
    get("form")[0]


    inputName.addEventListener('blur', () => { 
        if (nameValidation(inputName)) {
            flag_name = true;
            return flag_name
        }
        flag_name = false
        return flag_name
    });
    inputEmail.addEventListener('blur', () => {
        if (emailValidation(inputEmail)) {
            flag_email = true
            return flag_email
        }
        flag_email = false
        return flag_email
    });
    inputCPF.addEventListener('blur', () => {

        if (cpfValidation(inputCPF)) {
            flag_cpf = true
            return flag_cpf
        }
        flag_cpf = false
        return flag_cpf
    });
    inputCity.addEventListener('blur', () => {

        if (cityValidation(inputCity)) {
            flag_city = true
            return flag_city
        }
        flag_city = false
        return flag_city

    });
    inputState.addEventListener('blur', () => {
        if (valida(inputState)) {
            flag_state = true
            return flag_state
        }
        flag_state = false
        return flag_state
    });
    inputZip.addEventListener('blur', () => {

        if (zipValidation(inputZip)) {
            flag_zip = true
            return flag_zip
        }
        flag_zip = false
        return flag_zip
    });
    inputAdressType.addEventListener('blur', () => {

        if (valida(inputAdressType)) {
            flag_adressType = true
            return flag_adressType
        }
        flag_adressType = false
        return flag_adressType

    });

});

var zipValidation = function (element) {
    let temp = element.value.replace("-", "")
    if (isNaN(Number(temp)) || Number(temp) <= 0 || temp.length < 8 || temp.length >= 9) {
        element.style.backgroundColor = "rgb(246, 195, 195)"
        element.style.borderColor = 'red';
        return false
    } else {
        element.style.backgroundColor = "white"
        element.style.borderColor = 'green';
        return true
    }
}

function nameValidation(name) {
    if (name.value == "" || !isNaN(name.value)) {
        name.style.backgroundColor = 'rgb(246, 195, 195)';
        name.style.borderColor = 'red';
        return false
    }
    name.style.backgroundColor = 'white';
    name.style.borderColor = 'green';
    return true
}

function cityValidation(city) {
    if (city.value == "" || !isNaN(city.value)) {
        city.style.backgroundColor = 'rgb(246, 195, 195)';
        city.style.borderColor = 'red';
        return false
    }
    city.style.backgroundColor = 'white';
    city.style.borderColor = 'green';
    return true
}

function emailValidation(element) {
    if (element.checkValidity() && element.value != "" && element.value != " ") {
        element.style.backgroundColor = "white"
        element.style.borderColor = 'green';
        return true
    }
    element.style.backgroundColor = "rgb(246, 195, 195)"
    element.style.borderColor = 'red';
    return false
}

function cpfValidation(element) { //funcao validar cpf
    var cpfNumeros = element.value.replace(".", "").replace(".", "").replace("-", ""); //remove ponto, espacos e traco do cpf
    var noveDig = cpfNumeros.substr(0, 9); // variavel para receber os 9 digitos →111222333←44
    var dezDig = cpfNumeros.substr(0, 10); //variavel para receber 10 digitos →1112223334←4
    var somaNove = 0; //soma dos 9 digitos
    var somaDez = 0; // soma dos 10 digitos

    //VALIDAR PRIMERO DIGITO 111.222.333-→4←4
    // PASSO1: fazer a multiplicacao e soma dos 9 digitos
    // Exemplo:
    //           3   2   5  .  6   5   4  .  2   6   5  -  x   y
    //          10   9   8     7   6   5     4   3   2
    //           _________________________________________
    //somaNove= 30 +18+ 40  + 42 +30 +20  +  8 + 18 +10
    var multiplicador = 10; // multiplicador dos 9 digitos
    for (i = 0; i < 9; i++) {
        var numero = noveDig.substr(i, 1)
        somaNove += numero * multiplicador
        multiplicador--
    }

    // PASSO2: pegar o resto da divisão por 11 de somaNove*10
    var resultadoMod1 = (x = ((somaNove * 10) % 11)) => (x == 10) ? 0 : x

    //VALIDAR SEGUNDO DIGITO 111.→222←.333-44
    // PASSO1: fazer a multiplicacao e soma dos 10 (9 NUMEROS + PRIMEIRO VERIFICADOR(111.222.333-4→4←)) digitos
    // Exemplo:
    //           3   2   5  .  6   5   4  .  2   6   5  -  1   y
    //          11  10   9     8   7   6     5   4   3     2
    //           _________________________________________
    //somaDez= 30 +18+ 40  + 42 +30 +20  +  8 + 18 +10 +  2
    multiplicador = 11 // multiplicado dos 10 digitos
    for (i = 0; i < 10; i++) {
        var numero = dezDig.substr(i, 1)
        somaDez += numero * multiplicador
        multiplicador--
    }

    // PASSO2: pegar o resto da divisão por 11 de somaDez*10
    var resultadoMod2 = (x = ((somaDez * 10) % 11)) => (x == 10) ? 0 : x

    // Metodo do colega Everto Jorge
    // for (let i = 0; i < 9; i++) {
    //     if (teste === `${i}${i}${i}${i}${i}${i}${i}${i}${i}`) {
    //         alert("ok")
    //         break;
    //     }
    // }

    //000.000.000-00, 111.111.111-11, 222.222.222-222, ..., 999.999.999-99
    var first = cpfNumeros.slice(0, 3)  //pega do primeiro ao terceiro numero do cpf
    var second = cpfNumeros.slice(3, 6) //pega do quarto ao sexto digito numero do cpf
    var third = cpfNumeros.slice(6, 9)  //pega do setimo ao nono digito numero do cpf
    //Verifica de é um caso de excessão. Se for retorna true                                
    var verifyExeption = () => (first == second && second == third) ? true : false

    //Verifica se é excessão e se não for, verifica os digitos de validação do sistema de CPF 
    if (!verifyExeption() && (resultadoMod1().toString() + resultadoMod2().toString()) === cpfNumeros.substr(9, 2)) {
        element.style.backgroundColor = "white";
        element.style.borderColor = "green";

        return true
    }
    element.style.backgroundColor = "rgb(246, 195, 195)";
    element.style.borderColor = "red";
    return false

}

// Validação genérica para campo vazio
function valida(element) {
    if (element.value == "") { //Verifica se o valor do elemento passado é nulo
        element.style.backgroundColor = "rgb(246, 195, 195)";//Se for nulo muda o background para vermelho 
        element.style.borderColor = 'red';
        return false; //retorna false
    }
    element.style.backgroundColor = "white";//Se não for nulo muda o background para branco
    element.style.borderColor = "green";
    return true;//retorna true
}