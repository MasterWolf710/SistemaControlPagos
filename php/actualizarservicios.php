<?php
    include('conexion.php');
    $idServicio=$_POST['idServicio'];



    $query="UPDATE servicios SET estado='Inactivo' WHERE idServicio='$idServicio'";

    $result=mysqli_query($coneccion,$query);

    if(!$result){
        die('El  registro no se ha podido completar');
      }
      echo "HECHO";
    

?>