//Variaveis
let fields = document.querySelectorAll('[required]');
let formValidity = false; //Valida se o formulário está ou não com erros
let image = document.getElementById('background');
let logo = document.getElementById('logo');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

//y, x
let x = 0;
let y = 16;

//Variáveis inputs
let input_name = document.getElementById('name');
let input_charge = document.getElementById('charge');
let input_tel = document.getElementById('tel');

//Variáveis buttons
const buttonGenerator = document.getElementById('gerar');
const close = document.getElementById('close');
const newButton = document.getElementById('newCharge');
const download = document.getElementById('btn')


//Texto da Assinatura
const text = [

    "Controladoria Geral",
    "Av. Erasmo Braga, nº 118",
    "12º e 13º andares",
    "Centro - Rio de Janeiro",
    "CEP: 20020-000"

]

function ValidateField(field){

    //Logica para verificar se existem erros
    function verifyErrors(){

        let foundError = false;

        for(let error in field.validity){

            if(field.validity[error] && !field.validity.valid){

                foundError = error;

            }

        }

        return foundError;

    }

    function customMessage(typeError){

        const messages = {

            text: {
                
                valueMissing: "Por favor, preencha este campo",

            },

            tel: {

                valueMissing: "Por favor, preencha seu telefone"

            }

        };

        return messages[field.type][typeError];

    }

    function setCustomMessage(message){

        const spanError = field.parentNode.querySelector("span.error");

        if(message){

            spanError.classList.add("active");
            spanError.innerHTML = message;

        }else{

            spanError.classList.remove("active");
            spanError.innerHTML = '';

        }

    }

    return function(){

        const error = verifyErrors()

        if(error){

            const message = customMessage(error);
            formValidity = false;
            field.style.borderColor = "red";
            setCustomMessage(message);

        }else{

            field.style.borderColor = "green";
            formValidity = true;
            setCustomMessage();

        }

    }

}

function customValidation(event){

    const field = event.target;
    const validation = ValidateField(field)

    validation();

}

for(field of fields){

    field.addEventListener("invalid", event =>{

        //eliminar bubble
        event.preventDefault();

        customValidation(event);

    });

    field.addEventListener("blur", customValidation);
    field.addEventListener("keyup", customValidation);

}

//Ativando Modal x Fechando modal
buttonGenerator.addEventListener("click", modalOnClik);
close.addEventListener("click", ()=>{

    document.querySelector('.modal-overlay').classList.remove('active');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

})

function modalOnClik(){

    if(formValidity && fields[0].value != '' && fields[1].value !='' && fields[2].value !=''){

        document.querySelector('.modal-overlay').classList.add('active');
        split()

        if(chargeSplit.length > 1){

            ctx.drawImage(image, 0, 0, 700, 230);
            ctx.drawImage(logo, 0, 0, 200, 200);

            ctx.font = 'bold 20px Arial';
            ctx.fillText(input_name.value, 210, 23);

            ctx.fillStyle = '#0B2F78'
            ctx.font = '900 13px  Arial';
            ctx.fillText(chargeSplit[0], 210, 25+y);

            ctx.fillStyle = '#0B2F78'
            ctx.font = '900 13px  Arial';
            ctx.fillText(chargeSplit[1], 210, 43+y);

            ctx.fillStyle = 'black';
            ctx.font = '900 13px Arial'
            ctx.fillText(text[0], 210, 60+y)
                        
            ctx.fillStyle = 'black';
            ctx.font = '600 13px Arial'
            ctx.fillText(text[1], 210, 80+y)
                        
            ctx.fillStyle = 'black';
            ctx.font = '600 13px Arial'
            ctx.fillText(text[2], 210, 100+y)
                        
            ctx.fillStyle = 'black';
            ctx.font = '600 13px Arial'
            ctx.fillText(text[3], 210, 120+y)
                        
            ctx.fillStyle = 'black';
            ctx.font = '600 13px Arial'
            ctx.fillText(text[4], 210, 140+y)

            ctx.fillStyle = 'black'
            ctx.font = '900 13px  Arial';
            ctx.fillText(input_tel.value, 210, 180);

        }else{

            ctx.drawImage(image, 0, 0, 700, 230);
            ctx.drawImage(logo, 0, 0, 200, 200);

            ctx.font = 'bold 20px Arial';
            ctx.fillText(input_name.value, 210, 25);

            ctx.fillStyle = '#0B2F78'
            ctx.font = '900 13px  Arial';
            ctx.fillText(input_charge.value, 210, 35+y);

            ctx.fillStyle = 'black';
            ctx.font = '900 13px Arial'
            ctx.fillText(text[0], 210, 60+y)
                        
            ctx.fillStyle = 'black';
            ctx.font = '600 13px Arial'
            ctx.fillText(text[1], 210, 80+y)
                        
            ctx.fillStyle = 'black';
            ctx.font = '600 13px Arial'
            ctx.fillText(text[2], 210, 100+y)
                        
            ctx.fillStyle = 'black';
            ctx.font = '600 13px Arial'
            ctx.fillText(text[3], 210, 120+y)
                        
            ctx.fillStyle = 'black';
            ctx.font = '600 13px Arial'
            ctx.fillText(text[4], 210, 140+y)

            ctx.fillStyle = 'black'
            ctx.font = '900 13px  Arial';
            ctx.fillText(input_tel.value, 210, 180);

        }

    } else {

        fields.forEach((field)=>{

            field.style.borderColor = "red";

        });

    }

}

function split(){

    chargeSplit = input_charge.value.split(', ', 2)
    return chargeSplit

}

//Botão de download
download.onclick = function() {

    const a = document.createElement('a');
    a.download = `Assinatura_${input_name.value}`;
    a.href = canvas.toDataURL()
    a.click()

}



