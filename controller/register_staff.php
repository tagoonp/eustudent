<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['prefix'])){
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

if(!isset($_POST['phone'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['role'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['exp'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['interest'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$prefix = mysqli_real_escape_string($conn, $_POST['prefix']);
$fname = mysqli_real_escape_string($conn, $_POST['fname']);
$lname = mysqli_real_escape_string($conn, $_POST['lname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$role = mysqli_real_escape_string($conn, $_POST['role']);
$exp = mysqli_real_escape_string($conn, $_POST['exp']);
$interest = mysqli_real_escape_string($conn, $_POST['interest']);


$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";

$strSQL = "SELECT * FROM $tb1 WHERE email = '$email' AND use_status = '1' AND delete_status = '0' ";
$result = select($conn, $strSQL);
if($result){
  echo "D";
  disconnect($conn);
  die();
}

$new_uid = base64_encode($email.generateRandomString(10));
$new_password = base64_encode(generateRandomString(8));

$strSQL = "INSERT INTO $tb1 (uid, username, password, email, role, create_date)
           VALUES ('$new_uid', '$email', '$new_password', '$email', '$role', '$sys_datetime')
          ";
$result = insert($conn, $strSQL, false);
if($result){
  echo "Y";

  $strSQL = "INSERT INTO $tb2 (prefix, fname, lname, expertise, interest, info_uid)
             VALUES ('$prefix', '$fname', '$lname', '$exp', '$interest', '$new_uid')
            ";
  $result = insert($conn, $strSQL, false);
  disconnect($conn);
  die();
}else{

  echo $strSQL;
  echo "N";
  disconnect($conn);
  die();
}
?>
