<?php
include "config.class.php";
include "database.fnc.php";

$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);
$progress_id = mysqli_real_escape_string($conn, $_POST['progress_id']);

$tb_p1 = $dbprefix."account";
$tb_p2 = $dbprefix."userinfo";
$tb_p3 = $dbprefix."prefix";
$tb_p4 = $dbprefix."student_info";
$tb_p5 = $dbprefix."degree";
$tb_p6 = $dbprefix."degree";
$tb_p7 = $dbprefix."progress_english";

if($progress_id == 7){
  $strSQL = "SELECT * FROM $tb_p7 WHERE ep7_student_uid = '$student_uid' AND ep7_use_status = '1'";
  $result = select($conn, $strSQL);

  if($result){
    echo json_encode($result);
  }
}
disconnect($conn);
die();
?>
