<?php
    include('conexion.php');


    
    $query="SELECT * FROM gastos";

    $result=mysqli_query($coneccion,$query);

    if(!$result){
        die('No se ha obtenido los registros');
    }
    
    $json=array();
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'fecha' => $row['fecha'],
            'concepto' => $row['concepto'],
            'monto' => $row['monto'],
        );
    }
    $jsonstring= json_encode($json);
    echo $jsonstring;
    
?>