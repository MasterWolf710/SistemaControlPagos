<?php
    include('conexion.php');
    $idServicio=$_POST['idServicio'];
    $Fecha=$_POST['Fecha'];
    if(isset($idServicio)){
        $query="UPDATE pagos SET estado='Saldado' WHERE idServicio='$idServicio' and Fecha='$Fecha'";
        $result= mysqli_query($coneccion, $query);
      
        if(!$result){
          die('El  registro no se ha podido completar');
        }
        echo "HECHO";
      }
      
?>