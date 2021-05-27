<?php

  include('conexion.php');
  
  $fecha=$_POST['fecha'];
  $concepto=$_POST['concepto'];
  $monto=$_POST['monto'];


if(isset($fecha)){
  $query="INSERT into gastos(fecha,concepto,monto) VALUES('$fecha','$concepto',
  '$monto')";
  $result= mysqli_query($coneccion, $query);

  if(!$result){
    die('El  registro no se ha podido completar');
  }
  echo 'Registro Completo';
}

  

?>