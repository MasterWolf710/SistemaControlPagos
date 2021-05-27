<?php
    include('conexion.php');

    $id=$_POST['id'];
    if(isset($_POST['id'])){
        $query="DELETE FROM clientes WHERE id=$id";
        $result=mysqli_query($coneccion,$query);

        if(!$result){
            die("No se ha podido eliminar");
        }
        echo "Cliente eliminado";
    }
?>