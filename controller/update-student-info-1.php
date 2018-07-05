<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['prefix'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['fname'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['lname'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['degree'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['student_uid'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$studentid = mysqli_real_escape_string($conn, $_POST['studentid']);
$prefix = mysqli_real_escape_string($conn, $_POST['prefix']);
$fname = mysqli_real_escape_string($conn, $_POST['fname']);
$lname = mysqli_real_escape_string($conn, $_POST['lname']);
$degree = mysqli_real_escape_string($conn, $_POST['degree']);
$startyear = mysqli_real_escape_string($conn, $_POST['startyear']);
$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";
$tb3 = $dbprefix."student_info";

$strSQL = "SELECT * FROM $tb2 WHERE info_uid = '$student_uid' AND info_use_status = '1'";
$result_select = select($conn, $strSQL);
$previous_phone = '';
foreach ($result_select as $row) {
  $previous_phone = $row['phone'];
}



$strSQL = "UPDATE $tb2 SET info_use_status = '0'
           WHERE info_uid = '$student_uid'
          ";
          update($conn, $strSQL);


$strSQL = "INSERT INTO $tb2 (prefix, fname, lname, phone, expertise, interest, info_uid)
            VALUES ('$prefix', '$fname', '$lname', '$previous_phone', '', '', '$student_uid')
          ";
$result = insert($conn, $strSQL, false);

$strSQL = "UPDATE $tb3 SET s_use_status = '0'
           WHERE s_uid = '$student_uid'
          ";
          update($conn, $strSQL);

$strSQL = "INSERT INTO $tb3 (s_student_id, s_start_year, s_degree, s_status, s_udate, s_use_status, s_uid)
           VALUES ('$studentid', '$startyear', '$degree', 'Studying', '$sys_datetime', '1', '$student_uid')
          ";
$result = insert($conn, $strSQL, false);

if($result){
  echo "Y";
}else{
  echo $strSQL;
}

disconnect($conn);
die();

?>
