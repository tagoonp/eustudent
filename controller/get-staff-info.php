<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);

$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";
$tb3 = $dbprefix."prefix";

$strSQL = "SELECT * FROM $tb1 a INNER JOIN $tb2 b ON a.uid = b.info_uid
           LEFT JOIN $tb3 c ON b.prefix = c.prefix_id
           WHERE
            a.delete_status = '0' AND a.role != 'student' AND uid = '$uid'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}

disconnect($conn);
die();
?>
