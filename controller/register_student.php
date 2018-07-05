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

if(!isset($_POST['degree'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$studentid = mysqli_real_escape_string($conn, $_POST['studentid']);
$prefix = mysqli_real_escape_string($conn, $_POST['prefix']);
$fname = mysqli_real_escape_string($conn, $_POST['fname']);
$lname = mysqli_real_escape_string($conn, $_POST['lname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$degree = mysqli_real_escape_string($conn, $_POST['degree']);
$startyear = mysqli_real_escape_string($conn, $_POST['startyear']);

$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";
$tb3 = $dbprefix."student_info";


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
           VALUES ('$new_uid', '$studentid', '$new_password', '$email', 'student', '$sys_datetime')
          ";
$result = insert($conn, $strSQL, false);
if($result){


  $strSQL = "INSERT INTO $tb2 (prefix, fname, lname, phone, expertise, interest, info_uid)
             VALUES ('$prefix', '$fname', '$lname', '$phone', '', '', '$new_uid')
            ";
  $result = insert($conn, $strSQL, false);

  $strSQL = "INSERT INTO $tb3 (s_student_id, s_start_year, s_degree, s_status, s_udate, s_use_status, s_uid)
             VALUES ('$studentid', '$startyear', '$degree', 'Studying', '$sys_datetime', '1', '$new_uid')
            ";
  $result = insert($conn, $strSQL, false);

  if($result){
    echo "Y";
  }else{
    echo $strSQL;
  }

  disconnect($conn);
  die();

}else{

  echo $strSQL;
  echo "N";
  disconnect($conn);
  die();
}
?>
