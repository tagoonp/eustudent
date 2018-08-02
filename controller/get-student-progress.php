<?php
include "config.class.php";
include "database.fnc.php";

$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);
$progress_id = mysqli_real_escape_string($conn, $_POST['progress_id']);

$tb_p1 = $dbprefix."progress_proposal";
$tb_p2 = $dbprefix."progress_ec";
$tb_p3 = $dbprefix."progress_qualification";
$tb_p4 = $dbprefix."progress_thesis";
$tb_p5 = $dbprefix."progress_complehensive";
$tb_p6 = $dbprefix."progress_publication";
$tb_p7 = $dbprefix."progress_english";

if($progress_id == 1){
  $strSQL = "SELECT * FROM $tb_p1 WHERE pg1_std_id = '$student_uid' AND pg1_delete = '0' AND pg1_status = '1' ORDER BY pg1_examdate";
  $result = select($conn, $strSQL);

  if($result){
    echo json_encode($result);
  }else{
    echo $strSQL;
  }
}

if($progress_id == 2){
  $strSQL = "SELECT * FROM $tb_p2 WHERE pg2_std_id = '$student_uid' AND pg2_delete = '0' AND pg2_status = '1' ORDER BY pg2_approvaldate";
  $result = select($conn, $strSQL);

  if($result){
    echo json_encode($result);
  }else{
    echo $strSQL;
  }
}

if($progress_id == 3){
  $strSQL = "SELECT * FROM $tb_p3 WHERE pg3_std_id = '$student_uid' AND pg3_delete = '0' AND pg3_status = '1' ORDER BY pg3_examdate";
  $result = select($conn, $strSQL);

  if($result){
    echo json_encode($result);
  }else{
    echo $strSQL;
  }
}

if($progress_id == 4){
  $strSQL = "SELECT * FROM $tb_p4 WHERE pg4_std_id = '$student_uid' AND pg4_delete = '0' AND pg4_status = '1' ORDER BY pg4_examdate";
  $result = select($conn, $strSQL);

  if($result){
    echo json_encode($result);
  }else{
    echo $strSQL;
  }
}

if($progress_id == 5){
  $strSQL = "SELECT * FROM $tb_p5 WHERE pg5_std_id = '$student_uid' AND pg5_delete = '0' AND pg5_status = '1' ORDER BY pg5_examdate";
  $result = select($conn, $strSQL);

  if($result){
    echo json_encode($result);
  }else{
    echo $strSQL;
  }
}

if($progress_id == 6){
  $strSQL = "SELECT * FROM $tb_p6 WHERE pg6_std_id = '$student_uid' AND pg6_delete = '0' AND pg6_status = '1' ORDER BY pg6_acceptdate";
  $result = select($conn, $strSQL);

  if($result){
    echo json_encode($result);
  }else{
    echo $strSQL;
  }
}

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
