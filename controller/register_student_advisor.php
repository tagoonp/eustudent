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

if(!isset($_POST['advisor_uid'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['advisor_status'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);
$advisor_uid = mysqli_real_escape_string($conn, $_POST['advisor_uid']);
$advisor_status = mysqli_real_escape_string($conn, $_POST['advisor_status']);

$tb1 = $dbprefix."advisor";
$strSQL = "INSERT INTO $tb1 (adv_uid, adv_std_id, adv_status, adv_udate, adv_uby)
           VALUES ('$advisor_uid', '$student_uid', '$advisor_status', '$sys_datetime', '$uid')
          ";
$result = insert($conn, $strSQL, false);

if($result){
  echo "Y";
  disconnect($conn);
  die();
}else{
  echo $strSQL;
  echo "N";
  disconnect($conn);
  die();
}

?>
