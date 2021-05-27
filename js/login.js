var boton=document.getElementById("boton").addEventListener("click",
function(e){

    var usuario=document.getElementById("Usuario").value;
    var password=document.getElementById("clave").value;

    if(usuario=="" || password==""){
       sweetalert("error","Faltan campos por llenar");
       e.preventDefault();
    }
    else{
        var ruta="usuario="+usuario+"&password="+password;
        $.ajax({
            type: "POST",
            url: "php/usuarios.php",
            data: ruta,
            success: function (response) {
                var respuesta="Datos incorrectos";
                
                if(response==0){
                    sweetalert("error","Datos incorrectos");
                }
               else{
                let datos=JSON.parse(response);
                datos.forEach(element => {
                    
                    if(element.usuario==usuario && element.password==password ){
                        window.location.href = "http://localhost/xampp/Sistema%20control%20de%20pagos6/menu.html";
                    }else{
                        
                    }
                });
            }
            }
        
        });
       e.preventDefault();
    }
})

function sweetalert(tipo,mensaje){
    switch(tipo){
        case "error":
            Swal.fire({
                title: 'Error!',
                text: mensaje,
                icon: 'error',
                confirmButtonText: 'Reintentar'
              })
             
        break;
    }
}