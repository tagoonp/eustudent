<?php
include "config.class.php";
include "database.fnc.php";

$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$tb_pall = $dbprefix."progress_all";

$strSQL = "SELECT * FROM $tb_pall WHERE epa_student_uid = '$student_uid' AND epa_use_status = '1'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}
disconnect($conn);
die();
?>
