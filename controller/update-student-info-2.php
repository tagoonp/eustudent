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

$pid = mysqli_real_escape_string($conn, $_POST['pid']);
$pid_issue = mysqli_real_escape_string($conn, $_POST['pid_issue']);
$pid_exp = mysqli_real_escape_string($conn, $_POST['pid_exp']);

$visa = mysqli_real_escape_string($conn, $_POST['visa']);
$visa_issue = mysqli_real_escape_string($conn, $_POST['visa_issue']);
$visa_exp = mysqli_real_escape_string($conn, $_POST['visa_exp']);

$passport = mysqli_real_escape_string($conn, $_POST['passport']);
$passport_issue = mysqli_real_escape_string($conn, $_POST['passport_issue']);
$passport_exp = mysqli_real_escape_string($conn, $_POST['passport_exp']);

$tb1 = $dbprefix."migrated_info";

$strSQL = "UPDATE $tb1 SET em_use_status = '0' WHERE em_uid = '$student_uid'";
          update($conn, $strSQL);

$strSQL = "INSERT INTO $tb1 (em_pid, em_pid_issue, em_pid_expire, em_visa, em_visa_issue, em_visa_expire,
          em_passport, em_passport_issue, em_passport_expire, em_udate, em_use_status, em_uid) VALUES
          ('$pid', '$pid_issue', '$pid_exp', '$visa', '$visa_issue', '$visa_exp',
          '$passport', '$passport_issue', '$passport_exp', '$sys_datetime', '1', '$student_uid')
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
