<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['ecm_id'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

$ecm_id = mysqli_real_escape_string($conn, $_POST['ecm_id']);
$uid = mysqli_real_escape_string($conn, $_POST['uid']);

$tb2 = $dbprefix."complaint_read";

$strSQL = "INSERT INTO $tb2 (ecpr_uid, ecpr_datetime, ecpr_cid) VALUES ('$uid', '$sys_datetime', '$ecm_id')";
$result = insert($conn, $strSQL, false);
if($result){
  echo "Y";
}else{
  echo $strSQL;
}
disconnect($conn);
die();
?>
