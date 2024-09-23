
// todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded', () => {
    let cerrarBtnAlerta=document.querySelectorAll('.btn-close')

     // Agrega un evento de clic a cada botón de cierre de alerta
    cerrarBtnAlerta.forEach(btn => btn.addEventListener('click', () => btn.parentElement.style.display = 'none'))

    window.onload = function () {
        //window.location.search obtiene la cadena de consulta de la URL actual.
        //URLSearchParams es una clase en JavaScript que se usa para trabajar con los parámetros de la URL
        //new URLSearchParams(...) usa esa cadena para crear un objeto que te permite trabajar fácilmente con los parámetros de la URL
        var urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('exito') === 'true') {
           document.getElementById('mensajeExito').style.display = 'block';
        } else if (urlParams.get('error') === 'true') {
           document.getElementById('mensajeError').style.display = 'block';
        }
    };

    // selecciona el formulario del dom
    const formulario = document.querySelector('form');
    // -----------------------------------------------------------------
    // funcion mostrarError
    // const input = document.querySelector('#password')
    // const mensaje = "campo obligatorio"

    const mostrarError = (input, mensaje) => {
        // accedemos al div padre
        const divPadre = input.parentNode;
        // encuentra el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        // agrega la clase de error al elemento padre
        divPadre.classList.add('error');
        // agrega mensaje de error
        errorText.innerText = mensaje;
    }
    
    // --------------------------------------------------------------
    //funcion eliminar mensaje de error
    const eliminarError = input => {
        // encontrar el elemento padre del campo
        const divPadre = input.parentNode;
        //eliminar la clase de error del elemento padre
        divPadre.classList.remove('error');
        // encuentra el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        //establecemos el texto como vacio
        errorText.innerText = '';
    }
    // ----------------------------------------------------------------
    //funcionalidad para corroborar si los campos estan completos
    formulario.querySelectorAll('input').forEach(input =>{
        //se activa cuando el valor de un elemento del formulario cambia y se sale del elemento
        input.addEventListener('change',()=>{
            //obtener el valor del campo seleccionado
            const valor = input.value.trim();//elimina cualquier espacio en blanco al principio y al final del valor obtenido.
            if(valor !== ''){
                eliminarError(input)
            }
        })
    })
    // ----------------------------------------------------------------
     // Función para validar un correo electrónico utilizando una expresión regular
     function isEmail(email) {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);//devuelve true si la cadena coincide con el patrón de la expresión regular
    }

    // funcion para validar el campo de email
    function validarEmail(campoId, mensaje) {
        // obtenemos elemento mediante id
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();
        // si el campo esta vacio
        if (email === '') {
            //establecemos mensaje de error
            mostrarError(campo, 'el correo electronico es obligatorio');
            // indicamos que la validacion ha fallado
            return false
        } else if (!isEmail(email)) {
            //establecemos mensaje de error 
            mostrarError(campo, mensaje);
            // indicamos que la validacion ha fallado
            return false
        }else{
            // si es valido eliminamos cualquier error
            eliminarError(campo);
            // indicamos que la validacion es exitosa
            return true
        }
    }

    function validarCampo(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if (value == '') {
            mostrarError(campo, mensaje);
            return false;//indicamos que la validacion fallo
        } else {
            eliminarError(campo)
            return true;//indicamos que la validacion ha sido exitosa
        }
    }
    // --------------------------------------------------------------------------------
    // funcion para validar el formulario
    const validarFormulario = () => {
        let validar = true;

        // validar campo email
        validar = validarEmail('email', 'el correo electronico no es valido') && validar;
        // validar contraseña
        validar = validarCampo('password', 'la contraseña es obligatoria') && validar;
        // validar nombre
        validar = validarCampo('name', 'el nombre es obligatorio');
        // validar apellido
        validar = validarCampo('surname', 'el apellido es obligatorio');
        // validar fecha de nacimiento
        validar = validarCampo('date', 'la fecha de nacimiento es obligatorio');

        return validar;

    }
    // ----------------------------------------------------------------------------------
    // agregar un evento de escucha para cuando se envia el formulario
    formulario.addEventListener('submit', event => {
        if (!validarFormulario()) {
            // mensaje no valido
            event.preventDefault()//evita que el formulario se envie
            console.log("El formulario no es valido");
        } else {
            console.log("Formulario enviado...");
        }
    })
})



