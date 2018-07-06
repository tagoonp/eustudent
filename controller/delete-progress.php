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

if(!isset($_POST['record'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['progress_id'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);
$record_id = mysqli_real_escape_string($conn, $_POST['record']);
$progress_id = mysqli_real_escape_string($conn, $_POST['progress_id']);


$tb_p1 = $dbprefix."progress_proposal";
$tb_p2 = $dbprefix."progress_ec";
$tb_p3 = $dbprefix."progress_qualification";
$tb_p4 = $dbprefix."progress_thesis";
$tb_p5 = $dbprefix."progress_complehensive";
$tb_p6 = $dbprefix."progress_publication";
$tb_p7 = $dbprefix."progress_english";

if($progress_id == 7){
  $strSQL = "UPDATE $tb_p7 SET ep7_use_status = '0', ep7_uby = '$uid' WHERE ep7_student_uid = '$student_uid' AND ep7_id = '$record_id'";
  $result = update($conn, $strSQL);

  if($result){
    echo "Y";
  }else{
    echo "N";
  }
}




disconnect($conn);
die();
?>
