<?php
include "config.class.php";
include "database.fnc.php";

$pid = mysqli_real_escape_string($conn, $_POST['student_uid']);

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
            a.delete_status = '0'
            AND a.role = 'student'
            AND a.uid = '$pid'
            AND a.use_status = '1'
            AND b.info_use_status = '1'
            AND c.s_use_status = '1'
            ";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}else{
  echo $strSQL;
}

disconnect($conn);
die();
?>
