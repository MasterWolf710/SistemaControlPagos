<?php
    include('conexion.php');
    $id=$_POST['id'];
    $empresa=$_POST['empresa'];
    $representante=$_POST['representante'];
    $numero=$_POST['numero'];
    $correo=$_POST['correo'];

    if(isset($representante)){
        $query="UPDATE clientes SET empresa='$empresa',representante='$representante',
        numero='$numero',correo='$correo' WHERE id=$id";
        $result= mysqli_query($coneccion, $query);
      
        if(!$result){
          die('El  registro no se ha podido completar');
        }
        echo $representante;
      }
      
?>