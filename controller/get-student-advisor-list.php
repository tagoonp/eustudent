<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['student_uid'])){
  disconnect($conn);
  die();
}

$tb0 = $dbprefix."advisor";
$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";
$tb3 = $dbprefix."prefix";

$student_uid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$strSQL = "SELECT * FROM $tb0 z INNER JOIN $tb1 a ON z.adv_uid = a.uid
           INNER JOIN $tb2 b ON a.uid = b.info_uid
           LEFT JOIN $tb3 c ON b.prefix = c.prefix_id
           WHERE
            a.delete_status = '0'
            AND z.adv_use_status = '1'
            AND z.adv_std_id = '$student_uid'
            AND a.role != 'student'
            AND a.use_status = '1'
            AND b.info_use_status = '1'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}

disconnect($conn);
die();
?>
