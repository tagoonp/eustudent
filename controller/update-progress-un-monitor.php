<?php
include "config.class.php";
include "database.fnc.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

if((!isset($_POST['uid'])) || (!isset($_POST['student_uid'])) || (!isset($_POST['progress_id']))){
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

if($result){
  if($progress_id == 1){
    $strSQL = "UPDATE $tb_pall SET epa_p1_pe = 'un-monitor', epa_use_status = '1', epa_udatetime = '$sys_datetime' WHERE epa_student_uid = '$student_uid'";
              update($conn, $strSQL);
              echo "Y";
              $strSQL = "UPDATE $tb_p1 SET pg1_status = '0', pg1_delete = '1' WHERE pg1_std_id = '$student_uid'";
              $result = update($conn, $strSQL);
  }

  if($progress_id == 2){
    $strSQL = "UPDATE $tb_pall SET epa_p2_ec = 'un-monitor', epa_use_status = '1', epa_udatetime = '$sys_datetime' WHERE epa_student_uid = '$student_uid'";
              update($conn, $strSQL);
              echo "Y";
              $strSQL = "UPDATE $tb_p2 SET pg2_status = '0', pg2_delete = '1' WHERE pg2_std_id = '$student_uid'";
              $result = update($conn, $strSQL);
  }

  if($progress_id == 3){
    $strSQL = "UPDATE $tb_pall SET epa_p3_qe = 'un-monitor', epa_use_status = '1', epa_udatetime = '$sys_datetime' WHERE epa_student_uid = '$student_uid'";
              update($conn, $strSQL);
              echo "Y";
              $strSQL = "UPDATE $tb_p3 SET pg3_status = '0', pg3_delete = '1' WHERE pg3_std_id = '$student_uid'";
              $result = update($conn, $strSQL);
  }

  if($progress_id == 4){
    $strSQL = "UPDATE $tb_pall SET epa_p4_te = 'un-monitor', epa_use_status = '1', epa_udatetime = '$sys_datetime' WHERE epa_student_uid = '$student_uid'";
              update($conn, $strSQL);
              echo "Y";
              $strSQL = "UPDATE $tb_p4 SET pg4_status = '0', pg4_delete = '1' WHERE pg4_std_id = '$student_uid'";
              $result = update($conn, $strSQL);
  }

  if($progress_id == 5){
    $strSQL = "UPDATE $tb_pall SET epa_p5_com = 'un-monitor', epa_use_status = '1', epa_udatetime = '$sys_datetime' WHERE epa_student_uid = '$student_uid'";
              update($conn, $strSQL);
              echo "Y";
              $strSQL = "UPDATE $tb_p5 SET pg5_status = '0', pg5_delete = '1' WHERE pg5_std_id = '$student_uid'";
              $result = update($conn, $strSQL);
  }

  if($progress_id == 6){
    $strSQL = "UPDATE $tb_pall SET epa_p6_pub = 'un-monitor', epa_use_status = '1', epa_udatetime = '$sys_datetime' WHERE epa_student_uid = '$student_uid'";
              update($conn, $strSQL);
              echo "Y";
              $strSQL = "UPDATE $tb_p6 SET pg6_status = '0', pg6_delete = '1' WHERE pg6_std_id = '$student_uid'";
              $result = update($conn, $strSQL);
  }

  if($progress_id == 7){
    $strSQL = "UPDATE $tb_pall SET epa_p7_eng = 'un-monitor', epa_use_status = '1', epa_udatetime = '$sys_datetime' WHERE epa_student_uid = '$student_uid'";
              update($conn, $strSQL);
              echo "Y";
              $strSQL = "UPDATE $tb_p7 SET ep7_use_status = '0', ep7_uby = '$uid' WHERE ep7_student_uid = '$student_uid'";
              $result = update($conn, $strSQL);
  }
}else{
  if($progress_id == 1){
    $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p1_pe, epa_use_status, epa_udatetime)
                VALUES ('$student_uid', 'un-monitor', '1', '$sys_datetime')
              ";
    $result = insert($conn, $strSQL, false);
    if($result){
      echo "Y";
      $strSQL = "UPDATE $tb_p1 SET pg1_status = '0', pg1_delete = '1' WHERE pg1_std_id = '$student_uid'";
      $result = update($conn, $strSQL);
    }else{
      echo "N";
    }
  }

  if($progress_id == 2){
    $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p2_ec, epa_use_status, epa_udatetime)
                VALUES ('$student_uid', 'un-monitor', '1', '$sys_datetime')
              ";
    $result = insert($conn, $strSQL, false);
    if($result){
      echo "Y";
      $strSQL = "UPDATE $tb_p2 SET pg2_status = '0', pg2_delete = '1' WHERE pg2_std_id = '$student_uid'";
      $result = update($conn, $strSQL);
    }else{
      echo "N";
    }
  }

  if($progress_id == 3){
    $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p3_qe, epa_use_status, epa_udatetime)
                VALUES ('$student_uid', 'un-monitor', '1', '$sys_datetime')
              ";
    $result = insert($conn, $strSQL, false);
    if($result){
      echo "Y";
      $strSQL = "UPDATE $tb_p3 SET pg3_status = '0', pg3_delete = '1' WHERE pg3_std_id = '$student_uid'";
      $result = update($conn, $strSQL);
    }else{
      echo "N";
    }
  }

  if($progress_id == 4){
    $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p4_te, epa_use_status, epa_udatetime)
                VALUES ('$student_uid', 'un-monitor', '1', '$sys_datetime')
              ";
    $result = insert($conn, $strSQL, false);
    if($result){
      echo "Y";
      $strSQL = "UPDATE $tb_p4 SET pg4_status = '0', pg4_delete = '1' WHERE pg4_std_id = '$student_uid'";
      $result = update($conn, $strSQL);
    }else{
      echo "N";
    }
  }

  if($progress_id == 5){
    $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p5_com, epa_use_status, epa_udatetime)
                VALUES ('$student_uid', 'un-monitor', '1', '$sys_datetime')
              ";
    $result = insert($conn, $strSQL, false);
    if($result){
      echo "Y";
      $strSQL = "UPDATE $tb_p5 SET pg5_status = '0', pg5_delete = '1' WHERE pg5_std_id = '$student_uid'";
      $result = update($conn, $strSQL);
    }else{
      echo $strSQL;
    }
  }

  if($progress_id == 6){
    $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p6_pub, epa_use_status, epa_udatetime)
                VALUES ('$student_uid', 'un-monitor', '1', '$sys_datetime')
              ";
    $result = insert($conn, $strSQL, false);
    if($result){
      echo "Y";
      $strSQL = "UPDATE $tb_p6 SET pg6_status = '0', pg6_delete = '1' WHERE pg6_std_id = '$student_uid'";
      $result = update($conn, $strSQL);
    }else{
      echo "N";
    }
  }

  if($progress_id == 7){
    $strSQL = "INSERT INTO $tb_pall (epa_student_uid, epa_p7_eng, epa_use_status, epa_udatetime)
                VALUES ('$student_uid', 'un-monitor', '1', '$sys_datetime')
              ";
    $result = insert($conn, $strSQL, false);
    if($result){
      echo "Y";
      $strSQL = "UPDATE $tb_p7 SET ep7_use_status = '0', ep7_uby = '$uid' WHERE ep7_student_uid = '$student_uid'";
      $result = update($conn, $strSQL);
    }else{
      echo "N";
    }
  }
}

disconnect($conn);
die();
?>
