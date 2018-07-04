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
$pid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$tb1 = $dbprefix."account";

$strSQL = "UPDATE $tb1 SET delete_status = '1' WHERE uid = '$pid' ";
$result = update($conn, $strSQL);

if($result){
  echo "Y";
}else{
  echo "N";
}


disconnect($conn);
die();
?>
