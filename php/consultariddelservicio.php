<?php
    include('conexion.php');
    $idCliente=$_GET['idCliente'];
    $tiposervicio=$_GET['tiposervicio'];
    $estado=$_GET['estado'];

    $query="SELECT * FROM servicios WHERE
    idCliente='$idCliente' and tiposervicio LIKE '%$tiposervicio%'
    and estado='$estado'";

    $result=mysqli_query($coneccion,$query);

    if(!$result){
        die('No se ha obtenido los registros');
    }
    
    $json=array();
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'idServicio' => $row['idServicio'],
        );
    }
    $jsonstring= json_encode($json);
    echo $jsonstring;
    

?>