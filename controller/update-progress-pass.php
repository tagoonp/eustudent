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

if(!isset($_POST['progress_id'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);
$progress_id = mysqli_real_escape_string($conn, $_POST['progress_id']);

$tb_pall = $dbprefix."progress_all";
$tb_p1 = $dbprefix."progress_proposal";
$tb_p2 = $dbprefix."progress_ec";
$tb_p3 = $dbprefix."progress_qualification";
$tb_p4 = $dbprefix."progress_thesis";
$tb_p5 = $dbprefix."progress_complehensive";
$tb_p6 = $dbprefix."progress_publication";
$tb_p7 = $dbprefix."progress_english";

$strSQL = "SELECT * FROM $tb_pall WHERE epa_student_uid = '$student_uid' AND epa_use_status = '1'";
$result = select($conn, $strSQL);

// if($progress_id == 7){
//   if($result){
//     if(sizeof($result) > 0){
//       $strSQL = "UPDATE $tb_pall SET epa_p7_eng = '1', epa_p7_udate = '$sys_datetime' WHERE epa_student_uid = '$student_uid' AND epa_use_status = '1'";
//       $result_insert = update($conn, $strSQL);
//       if($result_insert){
//         echo "Y";
//       }else{
//         echo "N";
//       }
//     }else{
//       $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p7_eng, epa_p7_udate) VALUES ('$student_uid', '1', '$sys_datetime')";
//       $result_insert = insert($conn, $strSQL, false);
//       if($result_insert){
//         echo "Y";
//       }else{
//         echo "N";
//       }
//     }
//   }else{
//     $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p7_eng, epa_p7_udate) VALUES ('$student_uid', '1', '$sys_datetime')";
//     $result_insert = insert($conn, $strSQL, false);
//     if($result_insert){
//       echo "Y";
//     }else{
//       echo "N";
//     }
//   }
// }

disconnect($conn);
die();
?>
