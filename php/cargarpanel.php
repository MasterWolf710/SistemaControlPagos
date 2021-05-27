<?php

    include('conexion.php');

    $query="SELECT clientes.id, clientes.empresa, servicios.idServicio, servicios.tiposervicio, servicios.estado FROM servicios
    INNER JOIN clientes ON servicios.idCliente=clientes.id where servicios.estado='Activo'";

    $result=mysqli_query($coneccion,$query);

    if(!$result){
        die('No se ha obtenido los registros');
    }
    $json=array();
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'id'=> $row['id'],
            'idServicio'=> $row['idServicio'],
            'empresa'=> $row['empresa'],
            'tiposervicio'=> $row['tiposervicio'],
            'estado'=> $row['estado'],
        );
    }
    $jsonstring= json_encode($json);
    echo $jsonstring;
?>