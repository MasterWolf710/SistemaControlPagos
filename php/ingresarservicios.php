<?php
    include('conexion.php');

    $idCliente=$_POST['idCliente'];
    $Fecha=$_POST['Fecha'];
    $tiposervicio=$_POST['tiposervicio'];
    $estado=$_POST['estado'];
    echo $idCliente;
    if(isset($idCliente)){
        $query="INSERT INTO servicios(idCliente, Fecha, tiposervicio, estado) VALUES ('$idCliente','$Fecha','$tiposervicio',
        '$estado')";
        $result= mysqli_query($coneccion, $query);
      
        if(!$result){
          die('El  registro no se ha podido completar');
        }
       
      }

?>