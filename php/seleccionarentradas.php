<?php

    include('conexion.php');

    $query="SELECT pagos.montodepago, pagos.Fecha, servicios.tiposervicio FROM pagos
    INNER JOIN servicios ON pagos.idServicio=servicios.idServicio where pagos.estado='Saldado'";

    $result=mysqli_query($coneccion,$query);

    if(!$result){
        die('No se ha obtenido los registros');
    }
    $json=array();
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'Fecha'=> $row['Fecha'],
            'montodepago'=> $row['montodepago'],
            'tiposervicio'=> $row['tiposervicio'],
        );
    }
    $jsonstring= json_encode($json);
    echo $jsonstring;
?>