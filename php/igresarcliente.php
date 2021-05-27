<?php

  include('conexion.php');
  
  $empresa=$_POST['empresa'];
  $representante=$_POST['representante'];
  $numero=$_POST['numero'];
  $correo=$_POST['correo'];


if(isset($representante)){
  $query="INSERT into clientes(empresa,representante,numero,correo) VALUES('$empresa','$representante',
  '$numero', '$correo')";
  $result= mysqli_query($coneccion, $query);

  if(!$result){
    die('El  registro no se ha podido completar');
  }
  echo 'Registro Completo';
}

  

?>