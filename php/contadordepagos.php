<?php
    include('conexion.php');
    $idServicio=$_GET['idServicio'];
    $estado=$_GET['estado'];


    $query= "SELECT * FROM pagos WHERE idServicio='$idServicio' AND estado='$estado'";

    $result=mysqli_query($coneccion,$query);

    if(!$result){
        die('0');
    }

    $rows=mysqli_num_rows($result);
    if($rows==0){
        echo 0;
    }else{
        
      echo 1;
    }
?>
