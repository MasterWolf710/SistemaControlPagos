<?php
    include('conexion.php');

    $representante=$_POST['representante'];

    $query="SELECT * FROM clientes WHERE
    representante LIKE '$representante%'";

    $result=mysqli_query($coneccion,$query);

    if(!$result){
        die('No se ha obtenido los registros');
    }
    $json=array();
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'id'=> $row['id'],
            'empresa'=> $row['empresa'],
            'representante'=> $row['representante'],
            'numero'=> $row['numero'],
            'correo'=> $row['correo'],
        );
    }
    $jsonstring= json_encode($json);
    echo $jsonstring;
?>