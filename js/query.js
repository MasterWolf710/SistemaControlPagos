$(document).ready(function () {

    //CARGAR MODULOS AL PRESIONAR EL MENU
    $('ul.lista-menu li a:first').addClass('active');
    $('.section article').hide();
    $('.section article:first').show();
    var resolucion=$( window ).width();

    
    cargarpanel();
    function cargarpanel(){
        $.ajax({
            type: "GET",
            url: "php/cargarpanel.php",
            success: function (response) {
                let datos=JSON.parse(response);
                let template='';
                datos.forEach(data => {

                    template +=`<div class="llenadopanel">
                    <ul class="ul" dataidServicio=${data.idServicio} dataID=${data.id} dataEmpresa=${data.empresa} dataservicio=${data.tiposervicio}>
                      <li class="columna11">
                        <span class="far fa-id-card"></span>
                      </li>
                        <li class="columna21">
                          <h2 >${data.estado}</h2>
                        </li>
                        <li class="columna31">
                          <h2>${data.empresa}</h2>
                        </li>
                        <li class="columna41">
                          <h2>${data.tiposervicio}</h2>
                        </li>
                        <li class="columna51">
                          <button class="registrarpago">Pagar</button>
                        </li>
                        
                    </ul>
                </div> 
                    `
                });
                $(".formpanel").html(template);
            }
        });
    }

      // AL PRESIONAR EL BOTON DE PAGAR SE ABRE EL MENU
     $(document).on("click",".registrarpago", function () {
        let element=$(this)[0].parentElement.parentElement;
     
        let id=$(element).attr("dataID");
        let empresa=$(element).attr("dataEmpresa");
        let servicio=$(element).attr("dataservicio");
        let iddelservicio=$(element).attr("dataidServicio");  
        Swal.fire({
            title: '<h1>Pagos</h1>',
            html:' <div class="contenedorpagorestante">'+
            '<div class="datoclientepagorestante">'+
              '<div class="clientepagorestante">'+
                '<h3>Cliente:</h3>'+
              '</div>'+
              '<div class="nombreclientepagorestante">'+
                '<h3>Nombre</h3>'+
              '</div>'+
            '</div>'+
      
            '<div class="conceptodepagorestante">'+
              '<div class="conceptodepago">'+
                '<h3>Concepto:</h3>'+
              '</div>'+
              '<div class="descripciondelpago">'+
                '<h3>Concepto</h3>'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="tablpagorestante">'+
            '<table class="egt">'+
             
              
            '</table>'+
          '</div>',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton:false,
            focusConfirm: false,
                
          })
       
                  $(".nombreclientepagorestante h3").text(empresa);
                  $(".descripciondelpago h3").text(servicio);   
                    //TRAER LOS DATOS DEL PAGO
                    
                    let cadena="idCliente="+id+"&tiposervicio="+servicio+"&estado="+"Activo";
                    $.ajax({
                      type: "GET",
                      url: "php/consultariddelservicio.php",
                      data: cadena,
                      success: function (response) {
                        let datos=JSON.parse(response);
                        datos.forEach(data => {
                            let idservicio=data.idServicio;
                            let condicion="idServicio="+idservicio+"&estado="+"Adeudo";
                            $.ajax({
                              type: "GET",
                              url: "php/seleccionarpagos.php",
                              data: condicion,
                              success: function (respuesta) {
                                let gatos=JSON.parse(respuesta);
                                let template='';
                                gatos.forEach(data => {
                                  template +=`
                                  '<tr>'+
                                  '<th>Fecha</th>'+
                                  '<th>Monto</th>'+
                                  '<th>Pagar</th>'+
                                  '</tr>'+

                                  <tr>
                                  <td id="fechatabla">${data.Fecha}</td>+
                                  <td id="montotabla">${data.montodepago}</td>+
                                  <td><input type="checkbox" id="check" value="Bike"></td>
                                  </tr>
                                  `
                              });
                              $(".egt").html(template);
                              var content=document.getElementById("fechatabla").innerText;
                              var checkbox=document.getElementById("check");
                              checkbox.addEventListener("change",validarcheck, false);
                              function validarcheck(){
                                var checked=checkbox.checked;

                                if(checked){
                                  Swal.fire({
                                    title: "Pagar",
                                    text: "¿Desea registrar este pago?",
                                    icon: 'question',
                                    showCancelButton: true,
                                    confirmButtonText: "Registrar",
                                    cancelButtonText: "Cancelar",
                                })
                                .then(resultado => {
                                    if (resultado.value) {
                                      cadena="idServicio="+iddelservicio+"&Fecha="+content;
                                      $.ajax({
                                          type: "POST",
                                          url: "php/actualizarpago.php",
                                          data: cadena,
                                          success: function (response) {
                                            sweetalert("succes","Pago Registrado");

                                            var valor="idServicio="+iddelservicio+"&estado="+"Adeudo";
                                            console.log(valor);
                                            $.ajax({
                                              type: "GET",
                                              url: "php/contadordepagos.php",
                                              data: valor,
                                              success: function (response) {
                                                valor="idServicio="+iddelservicio;
                                                console.log(response);
                                                if(response==0){
                                                  console.log("entro");
                                                  $.ajax({
                                                    type: "POST",
                                                    url: "php/actualizarservicios.php",
                                                    data: valor,
                                                    success: function (r) {

                                                      console.log(r);
                                                      cargarpanel();
                                                    }
                                                  });
                                                }
                                              }
                                            });
                                          }
                                        });

                                    }
                                    else{
                                      alert("NO HAS PAGADO");
                                    }
                                });
                                }
                                else{
                                  console.log("cerrado")
                                }
                              }
                              }
                            });
                      });
                      }
                    });
    });

    $('ul.lista-menu li a').click(function(){
        $('ul.lista-menu li a').removeClass('active');
        $(this).addClass('active')
        $('.section article').hide();

        var activeTab=$(this).attr('href')
        $(activeTab).show();

    }) 
    //LLENAR EL PANEL AL HACER CLICK
    $("#panelabrir").click(function(){
        cargarpanel();
    })
    //LLENAR EL SELECT AL ABRIR SERVICIOS
    $("#servicioslink").click(function(){
        reiniciarregistroservicio();
        var select = document.getElementById("representante");
        for (let i = select.options.length; i >= 0; i--) {
            select.remove(i);
          }
          var element=document.createElement("option");
          element.innerHTML = "Selecciona un representante.."; //Metemos el texto en la opción
          select.appendChild(element);

        $(".consultadepagoscontenedor").hide();
        $.ajax({
            type: "GET",
            url: "php/llenarcontactos.php",
            success: function (response) {
                let datos=JSON.parse(response);
                
                //select.remove(select.selectedIndex);
                datos.forEach(data => {
                    
                    var option = document.createElement("option");
                    option.innerHTML = data.representante; //Metemos el texto en la opción

                    option.value=data.representante;
                    select.appendChild(option)
                });
            }
        });
    })
    //DETERMINAR EL LLENADO DE DATOS EN SERVICIOS Y POSTERIOR
    //LLENAR EL TICKET
    let pago;
    $(".registrarpagos").click(function(e){
        var classboton=document.getElementById("registrarpagos");
        var pagos=document.getElementById("pagos").value;
        var representante=document.getElementById("representante").value;
        var servicioarealizar=document.getElementById("servicio").value;
        if(classboton.className==="registrarpagos"){
            if(pagos=="" || representante==="Seleccione una Registro..."||servicioarealizar===""){
                console.log(representante);
                sweetalert("error","Faltan datos por llenar");
            }else{
                $(this).addClass("generarticket")
                $(this).removeClass("registrarpagos")
                $(this).text("Generar ticket");
                $(".cantidaddepagos").hide();
                $(".consultadepagoscontenedor").show();
                let template="";
                pago=parseInt(pagos);
                for(var i=0; i<pago;i++){
                    template+=`<div class="consultadepagos">
                    <div class="fechadepago">
                    <label for="fecha">Fecha de pago</label>
                    <input type="date" name="fecha${i}" class="fecha">
                    </div>
                    <div class="montodepago">
                    <label for="montopago">Monto</label>
                    <input type="number" name="montopago${i}" class="montopago">
                    </div>
                    </div>
                `;
                }
            $(".consultadepagoscontenedor").html(template);
            }
            
        }
        else{
          if(resolucion<700){
            $(".registrodeservicio").hide();
            $(".descripciondepago").show();
            }
            $("div.derecho h2").text(representante);
            $("div.descripcionesdepago #descripciomservicios").text(servicioarealizar);
            var sumadepago=0;
            for(var i=0;i<pago;i++){
                var cantidad=parseFloat(document.getElementsByName("montopago"+i)[0].value);
                sumadepago=sumadepago+cantidad;
            }
            $("div.pagorestantenumero h2").text(sumadepago);
            
        }
        e.preventDefault();
    })
    //REALIZAR ALTAS EN LA BASE DE DATOS
    $("#AceptarA").click(function(e){
        var empresa=document.getElementById("empresa").value;
        var representante=document.getElementById("representanten").value;
        var numero=document.getElementById("number").value;
        var correo=document.getElementById("correo").value
        if(empresa=="" || representante==""|| numero==""|| correo==""){
            sweetalert("error","Faltan datos por llenar");
        }else{
        var ruta="empresa="+empresa+"&representante="+representante+
        "&numero="+numero+"&correo="+correo;
        $.ajax({
            type: "POST",
            url: "php/igresarcliente.php",
            data: ruta,
            success: function (respuesta) {
                sweetalert("succes","Cliente Registrado");
                $("#empresa").val("");
                $("#representanten").val("");
                $("#number").val("");
                $("#correo").val("");
            }
        });
        }
        e.preventDefault();
    });

    //TRAER LOS CONTACTOS
    $("#contactos").click(function(){
       buscarcontactos();
    })
    /***********************BUSQUEDA DE CONTACTOS*************************** */
    $("#txtBusquedaContactos").keyup(function (e) { 
        var buscar=document.getElementById("txtBusquedaContactos").value;
      if(buscar!=""){
        var ruta="representante="+buscar;        
        $.ajax({
            type: "POST",
            url: "php/consultacontacto.php",
            data: ruta,
            success: function (response) {
                let datos=JSON.parse(response);
                let template='';
                datos.forEach(data => {
                    template +=`<div class="llenado">
                    <ul class="ul">
                      <li class="columna1">
                        <span class="fas fa-user-tie"></span>
                      </li>
                        <li class="columna2">
                          <h2>${data.id}</h2>
                        </li>
                        <li class="columna3">
                          <h2>${data.representante}</h2>
                        </li>
                        <li class="columna4">
                          <h2>${data.empresa}</h2>
                        </li>
                        <li class="columna5">
                          <button class="modificar">Modificar</button>
                          <button class="eliminar">Eliminar</button>
                        </li>
                        
                    </ul>
                </div> 
                    `
                });
                $(".form2").html(template);
            }
        });
      } else{
          buscarcontactos();
      }
        
        
    });

    /***********REPORTES LLENAR LAS ENTRADAS Y SALIDAS***************/
    $("#reportesdeeys").click(function(){
      $.ajax({
        type: "GET",
        url: "php/seleccionarentradas.php",
        success: function (response) {
          let gatos=JSON.parse(response);
          let template='';
          var sumadeentradas=0;
          gatos.forEach(data => {

              template +=`
              <tr>
              <td>${data.Fecha}</td>+
              <td>${data.tiposervicio}</td>+
              <td>${data.montodepago}</td>
              </tr>
              `
              sumadeentradas=sumadeentradas+parseInt(data.montodepago);
          })
          $("#bodyentradas").html(template);
          $(".totaldepagoentrada").text("$"+sumadeentradas);
        }
      });

      llenartablagastos();
    })

/*************ELIMINAR******************************/
    $(document).on("click",".eliminar", function(){
        let element=$(this)[0].parentElement.parentElement;
        console.log(element);
        let id=$(element).attr("dataID")
        console.log(id);
        
        Swal.fire({
        title: "Contactos",
        text: "¿Desea eliminar este registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
            $.post("php/eliminarcontacto.php",{id},function(response){
                sweetalert("succes",response);
                buscarcontactos();
            })
        } 
    });
    })
    /*************MODIFICAR******************************/
    $(document).on("click",".modificar",function(e){
        //CREAR LA VENTANA MODAL DEL SWEETALERT
        Swal.fire({
            title: '<h1>Actualizar Datos</h1>',
            html:
              '<div class="form3">'+
              '<form action="">'+
                '<label for="Empresa" class="actualizar">Empresa</label>'+
                '<input type="text" name="Empresa" id="empresaactualizar">'+
      
                '<label for="representante" class="actualizar">Representante</label>'+
               '<input type="text" name="representante" id="representantenactualizar">'+
      
                '<label for="numero" class="actualizar">Telefono</label>'+
                '<input type="number" name="numero" id="numberactualizar">'+
      
                '<label for="correo" class="actualizar">Correo</label>'+
                '<input type="email" name="correo" id="correoactualizar">'+
      
                '<div class="boton">'+
                '<input type="submit" class="Actualizar" id="Actualizarcliente" value="Guardar">'+
                '</div>'+
              '</form>'+
              '</div>',
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton:false,
            focusConfirm: false,
                
          })
          //DETECTAR EL BOTON DE REGISTRAR PAGO
           

        //LLENAR LOS DATOS DE LA VENTANA MODAL
        let element=$(this)[0].parentElement.parentElement;
        let id=$(element).attr("dataID")
        console.log(id);
        var cadena="id="+id;
        $.ajax({
            type: "GET",
            url: "php/actualizarclientes.php",
            data: cadena,
            success: function (response) {
                console.log(response)
                
                let datos=JSON.parse(response);
                datos.forEach(data => {
                    $("#empresaactualizar").val(data.empresa);
                    $("#representantenactualizar").val(data.representante);
                    $("#numberactualizar").val(data.numero);
                    $("#correoactualizar").val(data.correo);

                });
            }
        });

        
        $("#Actualizarcliente").click(function(e){
            var empresa=document.getElementById("empresaactualizar").value;
            var representante=document.getElementById("representantenactualizar").value;
            var numero=document.getElementById("numberactualizar").value;
            var correo=document.getElementById("correoactualizar").value
            if(empresa=="" || representante==""|| numero==""|| correo==""){
            }else{
            var ruta="id="+id+"&empresa="+empresa+"&representante="+representante+
            "&numero="+numero+"&correo="+correo;
            $.ajax({
                type: "POST",
                url: "php/actualizaciondecliente.php",
                data: ruta,
                success: function (respuesta) {
                    sweetalert("succes","Cliente Actualizado")
                    buscarcontactos();
                }
            });
            }
            e.preventDefault();
        })  
        e.preventDefault();
    })
   
    /*****************GUARDAR PAGOS****************************************/
    $(".guardarpagos").click(function(e){
        var idServiciocliente;
        var precio=$(".pagorestantenumero h2").text();
        var representante=document.getElementById("representante").value;
        var fecha=document.getElementById("fecha").value;
        var serviciorealizar=document.getElementById("servicio").value;
        var estado="Activo";
        
        if(precio!="0"){
           var cadena="representante="+representante;
           var repre;
                    /****************CONSULTAR EL IDDELCLIENTE***************/
            $.ajax({
                type: "POST",
                url: "php/obteneridcliente.php",
                data:cadena,
                success: function (response) {
                    let datos=JSON.parse(response);
                    datos.forEach(data => {
                       repre=data.id;
                       var cadena="idCliente="+repre+"&Fecha="+fecha+"&tiposervicio="+serviciorealizar+
                       "&estado="+estado;
                       /****************REGISTRAR EL SERVICIO*********************************/
                       $.ajax({
                           type: "POST",
                           url: "php/ingresarservicios.php",
                           data: cadena,
                           success: function (response) {
                               

                               //OBTENER EL REGISTRO  ULTIMO
                         $.ajax({
                            type: "GET",
                            url: "php/consultaidservicio.php",
                            success: function (response) {
                                let datos=JSON.parse(response);
                                datos.forEach(data => {
                                idServiciocliente=data.idServicio;
                               //REGISTRAR LOS PAGOS
                                    for(var i=0;i<pago;i++){
                                    var cantidad=parseFloat(document.getElementsByName("montopago"+i)[0].value);
                                    var fecha=document.getElementsByName("fecha"+i)[0].value;
                                    var estadoactual="Adeudo";
                                    var registrodepago="idServiciocliente="+idServiciocliente+"&fecha="+fecha+"&cantidad="+cantidad+"&estado="+
                                    estadoactual;
                                    $.ajax({
                                        type: "POST",
                                        url: "php/ingresarpagos.php",
                                        data: registrodepago,
                                        success: function (respuestad) {
                                            reiniciarregistroservicio();
                                        }
                                    });
                                    }
                                });
                            }
                            });
                            sweetalert("succes","Servicio Registrado");
                           }
                       });
                    });
                }
            });
            e.preventDefault();
        }
        else{
            sweetalert("error","Aun no existen pagos");
        }
    })

    /************REGISTRAR LOS GASTOS******************/
    $("#botonsalidas").click(function(){
      Swal.fire({
        title: '<h1>Registrar Gasto</h1>',
        html:
          '<div class="form3">'+
          '<form action="" method="POST">'+
            '<label for="fecha" class="actualizar">Fecha</label>'+
            '<input type="date" name="fecha" id="reportefecha">'+
  
            '<label for="concepto" class="actualizar">Descripción del pago</label>'+
           '<input type="text" name="concepto" id="reporteconcepto">'+
  
            '<label for="monto" class="actualizar">Monto Pagado</label>'+
            '<input type="number" name="monto" id="reportemonto">'+
  
  
            '<div class="boton">'+
            '<input type="submit" class="Actualizar" id="saldar" value="Guardar">'+
            '</div>'+
          '</form>'+
          '</div>',
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton:false,
        focusConfirm: false,
            
      })

      $("#saldar").click(function(e){
        console.log("entro");
        
        var fechaderegistro=document.getElementById("reportefecha").value;
        var conceptoreporte=document.getElementById("reporteconcepto").value;
        var montoreporte=document.getElementById("reportemonto").value;
        console.log("entro");
        if(fechaderegistro=="" || conceptoreporte=="" || montoreporte==""){
          sweetalert("error","Datos vacios");
        }else{
  
          cadena="fecha="+fechaderegistro+"&concepto="+conceptoreporte+"&monto="+montoreporte;
          console.log(cadena);
        $.ajax({
          type: "POST",
          url: "php/registrargasto.php",
          data: cadena,
          success: function (response) {
            sweetalert("succes",response);
            llenartablagastos();
          }
        });
        e.preventDefault();
        }
        
      })

    })
    /*************************REGISTRAR GASTO********************************************/

    

/*******************ACTUALIZAR CLIENTE********************************************** */ 
    /*******************SWEETALERT************************************** */
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
            case "succes":
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 1500
                  })
            break;

        }
    }
/***************FUNCTIONS*************************** */
    function buscarcontactos(){
        $.ajax({
            type: "GET",
            url: "php/llenarcontactos.php",
            success: function (response) {
                //se convierte a un jason arreglo
                let datos=JSON.parse(response);
                let template='';
                datos.forEach(data => {
                    template +=`<div class="llenado">
                    <ul class="ul" dataID=${data.id}>
                      <li class="columna1">
                        <span class="fas fa-user-tie"></span>
                      </li>
                        <li class="columna2">
                          <h2 >${data.id}</h2>
                        </li>
                        <li class="columna3">
                          <h2>${data.representante}</h2>
                        </li>
                        <li class="columna4">
                          <h2>${data.empresa}</h2>
                        </li>
                        <li class="columna5">
                          <button class="modificar">Modificar</button>
                          <button class="eliminar">Eliminar</button>
                        </li>
                        
                    </ul>
                </div> 
                    `
                });
                $(".form2").html(template);
            }
        });
    }


    function reiniciarregistroservicio(){
        $(".generarticket").addClass("registrarpagos")
        $(".generarticket").removeClass("generarticket")
        $(".registrarpagos").text("Registrar Pagos");
        $(".cantidaddepagos").show();
        $("div.cantidaddepagos #pagos").val("");
        $("#servicio").val("");
        $(".consultadepagoscontenedor").hide();
        $(".derecho h2").text("Cliente");
        $(".descripcionesdepago #descripciomservicios").text("");
        $(".pagorestantenumero h2").text("0");
        if(resolucion<700){
          $(".registrodeservicio").show();
          $(".descripciondepago").hide();
      }
    }

    function llenartablagastos(){
      $.ajax({
        type: "GET",
        url: "php/traergastos.php",
        success: function (response) {
          let gatos=JSON.parse(response);
          let template='';
          var sumadesalidas=0;
          gatos.forEach(data => {

              template +=`
              <tr>
              <td>${data.fecha}</td>+
              <td>${data.concepto}</td>+
              <td>${data.monto}</td>
              </tr>
              `
              sumadesalidas=sumadesalidas+parseInt(data.monto);
          })
          $("#bodysalidas").html(template);
          $(".totalpagosalida").text("$"+sumadesalidas);
        }
      });
    }

    
});