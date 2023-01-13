window.onload = () => {

    let $ = (tag) => document.querySelector(tag);
    let $$ = (tag) => document.querySelectorAll(tag);

    let email = $('#title');
    let pass = $('#cover');
    let eye = $('#description');


    //Validaciones
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/;
    let regExpEmail = /^[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    //Email
    email.addEventListener('blur', (e) => {

        let value = e.target.value;

        switch (true) {
            case !value.trim():
                $('#errortitle').innerHTML = "Debe ingresar un titulo"
                validationsErrors = true;
                break;

            default:
                $('#errortitle').innerHTML = ""
                validationsErrors = false
                break;
        }
    })

    //Pass
    pass.addEventListener("blur", (e) => {

        let value = e.target.value;

        switch (true) {

            case !value.trim():
                $("#errorcover").innerHTML = "Debe ingresar la url de una imagen"
                validationsErrors = true;
                break;


            default:
                $("#errorcover").innerHTML = ""
                validationsErrors = false;
                break;
        }
    })
    eye.addEventListener("blur", (e) => {

        let value = e.target.value;

        switch (true) {

            case !value.trim():
                $("#errordes").innerHTML = "Debe ingresar una descripcion "
                validationsErrors = true;
                break;


            default:
                $("#errordes").innerHTML = ""
                validationsErrors = false;
                break;
        }
    })

  
}