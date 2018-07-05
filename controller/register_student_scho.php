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

if(!isset($_POST['scholarship'])){
  disconnect($conn);
  die();
}

$ess_id = '';
$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$scholarship = mysqli_real_escape_string($conn, $_POST['scholarship']);
$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);
$ess_id = mysqli_real_escape_string($conn, $_POST['ess_id']);

$tb1 = $dbprefix."student_scholarchip";

if($ess_id != ''){
  $strSQL = "UPDATE $tb1 SET ess_use_status = '0' WHERE ess_id = '$ess_id'";
  update($conn, $strSQL);
}

$strSQL = "INSERT INTO $tb1 (ess_scholarship_name, ess_student_uid, ess_use_status, ess_udate, ess_uby)
           VALUES ('$scholarship', '$student_uid', '1', '$sys_datetime', '$uid')
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
