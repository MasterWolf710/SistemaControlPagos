<?php
    include('conexion.php');

    $usuario=$_POST["usuario"];
    $password=$_POST["password"];

    $query="SELECT * FROM usuarios WHERE usuario='$usuario' and password='$password'";

    $result= mysqli_query($coneccion, $query);

    if(!$result){
        die("No se encontraron registros");
    }

    $rows=mysqli_num_rows($result);
    if($rows==0){
        echo 0;
    }else{
        $json=array();
      while($row=mysqli_fetch_array($result)){
          $json[]=array(
            'id'=> $row['id'],
            'usuario'=> $row['usuario'],
            'password'=> $row['password'],
          );
      }
      $jsonstring= json_encode($json);
      echo $jsonstring;
    }
?> 