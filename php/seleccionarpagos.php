<?php
    include('conexion.php');

    $idServicio=$_GET['idServicio'];
    $estado=$_GET['estado'];
    
    $query="SELECT * FROM pagos where idServicio='$idServicio' and estado='$estado' order by Fecha asc";

    $result=mysqli_query($coneccion,$query);

    if(!$result){
        die('No se ha obtenido los registros');
    }
    
    $json=array();
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'Fecha' => $row['Fecha'],
            'montodepago' => $row['montodepago'],
        );
    }
    $jsonstring= json_encode($json);
    echo $jsonstring;
    
?>
