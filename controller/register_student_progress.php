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

if($progress_id == 1){
  $record_id = mysqli_real_escape_string($conn, $_POST['e1_id']);
  $title_en = mysqli_real_escape_string($conn, $_POST['title_en']);
  $title_th = mysqli_real_escape_string($conn, $_POST['title_th']);
  $title_desc = mysqli_real_escape_string($conn, $_POST['desc']);
  $title_examdate = mysqli_real_escape_string($conn, $_POST['exam_date']);

  if($record_id != ''){
    $strSQL = "UPDATE $tb_p1 SET pg1_status = '0' WHERE pg1_std_id = '$student_uid' AND pg1_id = '$record_id'";
               update($conn, $strSQL);
    $strSQL = "INSERT INTO $tb_p1 (pg1_title_en, pg1_title_th, pg1_remark, pg1_examdate, pg1_std_id, pg1_udate, pg1_uby)
               VALUES ('$title_en', '$title_th', '$title_desc', '$title_examdate', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }else{
    $strSQL = "INSERT INTO $tb_p1 (pg1_title_en, pg1_title_th, pg1_remark, pg1_examdate, pg1_std_id, pg1_udate, pg1_uby)
               VALUES ('$title_en', '$title_th', '$title_desc', '$title_examdate', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }
}

if($progress_id == 2){
  $record_id = mysqli_real_escape_string($conn, $_POST['eid']);
  $title = mysqli_real_escape_string($conn, $_POST['title']);
  $rec = mysqli_real_escape_string($conn, $_POST['rec']);
  $type = mysqli_real_escape_string($conn, $_POST['type']);

  $desc = mysqli_real_escape_string($conn, $_POST['desc']);
  $examdate = mysqli_real_escape_string($conn, $_POST['exam_date']);

  if($record_id != ''){
    $strSQL = "UPDATE $tb_p2 SET pg2_status = '0' WHERE pg2_std_id = '$student_uid' AND pg2_id = '$record_id'";
               update($conn, $strSQL);
    $strSQL = "INSERT INTO $tb_p2 (pg2_rec, pg2_type, pg2_title, pg2_remark, pg2_approvaldate, pg2_std_id, pg2_udate, pg2_uby)
              VALUES
              ('$rec', '$type', '$title', '$desc', '$examdate', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }else{
    $strSQL = "INSERT INTO $tb_p2 (pg2_rec, pg2_type, pg2_title, pg2_remark, pg2_approvaldate, pg2_std_id, pg2_udate, pg2_uby)
               VALUES
               ('$rec', '$type', '$title', '$desc', '$examdate', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }
}

if($progress_id == 3){

  $record_id = mysqli_real_escape_string($conn, $_POST['e1_id']);
  $title = mysqli_real_escape_string($conn, $_POST['title']);
  $exam_date = mysqli_real_escape_string($conn, $_POST['exam_date']);
  $desc = mysqli_real_escape_string($conn, $_POST['desc']);

  if($record_id != ''){
    $strSQL = "UPDATE $tb_p3 SET pg3_status = '0' WHERE pg3_std_id = '$student_uid' AND pg3_id = '$record_id'";
               update($conn, $strSQL);
               $strSQL = "INSERT INTO $tb_p3 (pg3_title, pg3_remark, pg3_examdate, pg3_std_id, pg3_udate, pg3_uby)
                          VALUES ('$title', '$desc', '$exam_date', '$student_uid', '$sys_datetime', '$uid')";
               $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }else{
    $strSQL = "INSERT INTO $tb_p3 (pg3_title, pg3_remark, pg3_examdate, pg3_std_id, pg3_udate, pg3_uby)
               VALUES ('$title', '$desc', '$exam_date', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }
}

if($progress_id == 4){
  $record_id = mysqli_real_escape_string($conn, $_POST['e1_id']);
  $title_en = mysqli_real_escape_string($conn, $_POST['title_en']);
  $title_th = mysqli_real_escape_string($conn, $_POST['title_th']);
  $title_desc = mysqli_real_escape_string($conn, $_POST['desc']);
  $title_examdate = mysqli_real_escape_string($conn, $_POST['exam_date']);

  if($record_id != ''){
    $strSQL = "UPDATE $tb_p4 SET pg4_status = '0' WHERE pg4_std_id = '$student_uid' AND pg4_id = '$record_id'";
               update($conn, $strSQL);
    $strSQL = "INSERT INTO $tb_p4 (pg4_title_en, pg4_title_th, pg4_remark, pg4_examdate, pg4_std_id, pg4_udate, pg4_uby)
               VALUES ('$title_en', '$title_th', '$title_desc', '$title_examdate', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }else{
    $strSQL = "INSERT INTO $tb_p4 (pg4_title_en, pg4_title_th, pg4_remark, pg4_examdate, pg4_std_id, pg4_udate, pg4_uby)
               VALUES ('$title_en', '$title_th', '$title_desc', '$title_examdate', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }
}

if($progress_id == 5){
  $record_id = mysqli_real_escape_string($conn, $_POST['eid']);
  $desc = mysqli_real_escape_string($conn, $_POST['desc']);
  $examdate = mysqli_real_escape_string($conn, $_POST['exam_date']);

  if($record_id != ''){
    $strSQL = "UPDATE $tb_p5 SET pg5_status = '0' WHERE pg5_std_id = '$student_uid' AND pg5_id = '$record_id'";
               update($conn, $strSQL);
    $strSQL = "INSERT INTO $tb_p5 (pg5_remark, pg5_examdate, pg5_std_id, pg5_udate, pg5_uby)
              VALUES ('$desc', '$examdate', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }else{
    $strSQL = "INSERT INTO $tb_p5 (pg5_remark, pg5_examdate, pg5_std_id, pg5_udate, pg5_uby)
               VALUES ('$desc', '$examdate', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }
}

if($progress_id == 6){
  $record_id = mysqli_real_escape_string($conn, $_POST['eid']);
  $title = mysqli_real_escape_string($conn, $_POST['title']);
  $publishername = mysqli_real_escape_string($conn, $_POST['publishername']);
  $desc = mysqli_real_escape_string($conn, $_POST['desc']);
  $exam_date = mysqli_real_escape_string($conn, $_POST['exam_date']);

  if($record_id != ''){
    $strSQL = "UPDATE $tb_p6 SET pg6_status = '0' WHERE pg6_std_id = '$student_uid' AND pg6_id = '$record_id'";
               update($conn, $strSQL);
    $strSQL = "INSERT INTO $tb_p6 (pg6_title, pg6_publisher, pg6_remark, pg6_acceptdate, pg6_std_id, pg6_udate, pg6_uby)
              VALUES ('$title', '$publishername', '$desc', '$exam_date', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }else{
    $strSQL = "INSERT INTO $tb_p6 (pg6_title, pg6_publisher, pg6_remark, pg6_acceptdate, pg6_std_id, pg6_udate, pg6_uby)
               VALUES ('$title', '$publishername', '$desc', '$exam_date', '$student_uid', '$sys_datetime', '$uid')";
    $result = insert($conn, $strSQL, false);
    if($result){
     echo "Y";
    }
    disconnect($conn);
    die();
  }
}

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
