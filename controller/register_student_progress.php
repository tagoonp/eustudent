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

if(!isset($_POST['progress_id'])){
  disconnect($conn);
  die();
}

$record_id = '';
$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);
$progress_id = mysqli_real_escape_string($conn, $_POST['progress_id']);

$tb_p1 = $dbprefix."progress_proposal";
$tb_p2 = $dbprefix."progress_ec";
$tb_p3 = $dbprefix."progress_qualification";
$tb_p4 = $dbprefix."progress_thesis";
$tb_p5 = $dbprefix."progress_complehensive";
$tb_p6 = $dbprefix."progress_publication";
$tb_p7 = $dbprefix."progress_english";

if($progress_id == 7){

  $record_id = mysqli_real_escape_string($conn, $_POST['e7_id']);
  $score = mysqli_real_escape_string($conn, $_POST['score']);
  $testname = mysqli_real_escape_string($conn, $_POST['testname']);
  $desc = mysqli_real_escape_string($conn, $_POST['desc']);

  if($record_id != ''){
    $strSQL = "UPDATE $tb_p7 SET ep7_use_status = '0'
               WHERE ep7_id = '$record_id' AND ep7_student_uid = '$student_uid'";
               update($conn, $strSQL);
  }
  $strSQL = "INSERT INTO $tb_p7 (ep7_score, ep7_test_name, ep7_info, ep7_student_uid, ep7_udate, ep7_uby)
             VALUES ('$score', '$testname', '$desc', '$student_uid', '$sys_datetime', '$uid')
            ";
  $result = insert($conn, $strSQL, false);
  if($result){
    echo "Y";
  }
  disconnect($conn);
  die();
}
//
// if($ess_id != ''){
//   $strSQL = "UPDATE $tb1 SET ess_use_status = '0' WHERE ess_id = '$ess_id'";
//   update($conn, $strSQL);
// }
//
// $strSQL = "INSERT INTO $tb1 (ess_scholarship_name, ess_student_uid, ess_use_status, ess_udate, ess_uby)
//            VALUES ('$scholarship', '$student_uid', '1', '$sys_datetime', '$uid')
//           ";
// $result = insert($conn, $strSQL, false);
//
// if($result){
//   echo "Y";
//   disconnect($conn);
//   die();
// }else{
//   echo $strSQL;
//   echo "N";
//   disconnect($conn);
//   die();
// }

?>
