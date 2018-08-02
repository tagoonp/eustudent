<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['student_uid'])){
  disconnect($conn);
  die();
}


$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$email = mysqli_real_escape_string($conn, $_POST['email']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$home_addr = mysqli_real_escape_string($conn, $_POST['home_addr']);
$home_country = mysqli_real_escape_string($conn, $_POST['home_country']);
$home_phone = mysqli_real_escape_string($conn, $_POST['home_phone']);
$wp_name = mysqli_real_escape_string($conn, $_POST['wp_name']);
$wp_addr = mysqli_real_escape_string($conn, $_POST['wp_addr']);
$wp_phone = mysqli_real_escape_string($conn, $_POST['wp_phone']);

$tb1 = $dbprefix."contact_info";
$tb2 = $dbprefix."account";
$tb3 = $dbprefix."userinfo";

$strSQL = "SELECT * FROM $tb2 WHERE email = '$email' AND delete_status = '0' AND use_status = '1' AND uid != '$student_uid'";
$resultCheck = select($conn, $strSQL);

if($resultCheck){
  echo "D";
  disconnect($conn);
}
// if(sizeof($resultCheck) > 0){
//   // echo $strSQL;
//   // echo "D";
//   echo $resultCheck;
//   disconnect($conn);
//   die();
// }

$strSQL = "UPDATE $tb2 SET email = '$email' WHERE uid = '$student_uid'";
          update($conn, $strSQL);

$strSQL = "UPDATE $tb3 SET phone = '$phone' WHERE info_uid = '$student_uid' AND info_use_status = '1'";
          update($conn, $strSQL);

$strSQL = "UPDATE $tb1 SET eci_use_status = '0' WHERE eci_uid = '$student_uid'";
          update($conn, $strSQL);

$strSQL = "INSERT INTO $tb1 (eci_home_addr, eci_home_country, eci_home_phone, eci_wp_name, eci_wp_addr,
          eci_wp_phone, eci_udate, eci_uid) VALUES
          ('$home_addr', '$home_country', '$home_phone', '$wp_name', '$wp_addr', '$wp_phone',
          '$sys_datetime', '$student_uid')
          ";
$result_insert = insert($conn, $strSQL, false);

if($result_insert){
  echo "Y";
}else{
  echo $strSQL;
}

disconnect($conn);
die();

?>
