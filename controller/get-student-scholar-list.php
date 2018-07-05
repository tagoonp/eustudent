<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['student_uid'])){
  disconnect($conn);
  die();
}

$tb0 = $dbprefix."student_scholarchip";

$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$strSQL = "SELECT * FROM $tb0 z
           WHERE
            z.ess_use_status = '1'
            AND z.ess_student_uid = '$student_uid'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}

disconnect($conn);
die();
?>
