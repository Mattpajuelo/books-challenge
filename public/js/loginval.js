window.onload = () => {

    let $ = (tag) => document.querySelector(tag);
    let $$ = (tag) => document.querySelectorAll(tag);

    let email = $('#email');
    let pass = $('#password');
  ;


  
    let regExpEmail = /^[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

   
    email.addEventListener("blur", (e) => {

        let value = e.target.value;

        switch (true) {

            case !value.trim():
                $("#errorEmai").innerHTML = "Debe ingresar una email"
                validationsErrors = true;
                break;
                
            case !regExpEmail.test(email.value):
                $('#errorEmail').innerHTML = "No es un email valido"
                validationsErrors = true;
                break;


            default:
                $("#errorcover").innerHTML = ""
                validationsErrors = false;
                break;
        }
    })
    pass.addEventListener("blur", (e) => {

        let value = e.target.value;

        switch (true) {

            case !value.trim():
                $("#errorpas").innerHTML = "Debe ingresar una contraseña"
                validationsErrors = true;
                break;


            default:
                $("#errorpas").innerHTML = ""
                validationsErrors = false;
                break;
        }
    })

  
}