<?php
    include('conexion.php');

    $representante=$_POST['representante'];
    
    $query="SELECT * FROM clientes where representante='$representante'";
    $result= mysqli_query($coneccion, $query);
    if(!$result){
        die('El  registro no se ha podido completar');
      }
      $json=array();
    while($row=mysqli_fetch_array($result)){
        $json[]=array(
            'id'=> $row['id'],
        );
    }
    $jsonstring= json_encode($json);
    echo $jsonstring;
?>