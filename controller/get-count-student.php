<?php
include "config.class.php";
include "database.fnc.php";

$dg = mysqli_real_escape_string($conn, $_POST['dg']);
$id = mysqli_real_escape_string($conn, $_POST['id']);
$st = mysqli_real_escape_string($conn, $_POST['st']);
$key = mysqli_real_escape_string($conn, $_POST['key']);

if($id != ''){
  $con1 = " AND c.s_student_id LIKE '$id%' ";
}

if($dg != ''){
  $con2 = " AND c.s_degree = '$dg' ";
}

if($st != ''){
  $con3 = " AND c.s_status = '$st' ";
}

if($key != ''){
  $con4 = " AND (b.fname LIKE '$key%' OR b.lname LIKE '$key%') ";
}


$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";
$tb3 = $dbprefix."prefix";
$tb4 = $dbprefix."student_info";
$tb5 = $dbprefix."degree";

$strSQL = "SELECT * FROM $tb1 a INNER JOIN $tb2 b ON a.uid = b.info_uid
           INNER JOIN $tb4 c ON a.uid = c.s_uid
           LEFT JOIN $tb3 d ON b.prefix = d.prefix_id
           INNER JOIN $tb5 e ON c.s_degree = e.degree_id
           WHERE
            a.delete_status = '0' AND a.role = 'student' $con1 $con2 $con3 $con4
          ";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}

disconnect($conn);
die();
?>
