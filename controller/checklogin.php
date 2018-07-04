<?php
include "config.class.php";
include "database.fnc.php";


if(!isset($_POST['email'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['password'])){
  disconnect($conn);
  die();
}

$password = mysqli_real_escape_string($conn, base64_encode($_POST['password']));
$email = mysqli_real_escape_string($conn, $_POST['email']);

$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";

$strSQL = "SELECT * FROM $tb1 a INNER JOIN $tb2 b ON a.uid = b.info_uid
           WHERE
            ((a.email = '$email' AND a.password = '$password')
            OR (a.username = '$email' AND a.password = '$password'))
            AND a.use_status = '1'
            AND a.active_status = '1'
            AND a.allow_status = '1'
            AND a.delete_status = '0'
            AND b.info_use_status = '1'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}

disconnect($conn);
die();
?>
