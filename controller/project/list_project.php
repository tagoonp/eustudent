<?php
include "../config.class.php";
include "../database.fnc.php";

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);

$tb1 = $dbprefix."project";

$strSQL = "SELECT * FROM $tb1 WHERE project_owner = '$uid' AND project_delete_status = '0'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}


disconnect($conn);
die();
?>
