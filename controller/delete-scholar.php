<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['ess_id'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['student_uid'])){
  disconnect($conn);
  die();
}

$ess_id = '';
$ess_id = mysqli_real_escape_string($conn, $_POST['ess_id']);
$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$tb1 = $dbprefix."student_scholarchip";

$strSQL = "UPDATE $tb1 SET ess_use_status = '0' WHERE ess_id = '$ess_id'";
$result = update($conn, $strSQL);

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
