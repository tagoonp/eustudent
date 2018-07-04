<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['fname'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['lname'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['email'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['password'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$password = mysqli_real_escape_string($conn, base64_encode($_POST['password']));
$fname = mysqli_real_escape_string($conn, $_POST['fname']);
$lname = mysqli_real_escape_string($conn, $_POST['lname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);

$tb1 = $dbprefix."useraccount";

$strSQL = "SELECT * FROM $tb1 WHERE email = '$email' AND use_status = '1'";
$result = select($conn, $strSQL);
if($result){
  echo "D";
  disconnect($conn);
  die();
}

$strSQL = "INSERT INTO $tb1 (uid, email, password, fname, lname, reg_date)
           VALUES ('$uid', '$email', '$password', '$fname', '$lname', '$sys_datetime')
          ";
$result = insert($conn, $strSQL, false);
if($result){
  echo "Y";
  disconnect($conn);
  die();
}else{
  echo "N";
  disconnect($conn);
  die();
}
?>
