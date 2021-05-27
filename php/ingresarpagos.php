<?php
    include('conexion.php');

    $idServicio=$_POST['idServiciocliente'];
    $fecha=$_POST['fecha'];
    $montodepago=$_POST['cantidad'];
    $estado=$_POST['estado'];

    echo $idServicio . $fecha . $montodepago . $estado;  
        
    if(isset($idservicio) || isset($estado)){
        $query="INSERT INTO pagos(idServicio, Fecha, montodepago, estado)
        VALUES ('$idServicio','$fecha','$montodepago','$estado')";

        $result=mysqli_query($coneccion,$query);

        if(!$result){
            die('El  registro no se ha podido completar');
          }
    }else
    {
        echo "Vacio";
    }

?>