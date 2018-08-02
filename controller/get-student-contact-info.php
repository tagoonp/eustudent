<?php
include "config.class.php";
include "database.fnc.php";

$pid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$tb1 = $dbprefix."contact_info";

$strSQL = "SELECT * FROM $tb1
           WHERE
            eci_uid = '$pid'
            AND eci_use_status = '1'
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
