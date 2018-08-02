<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['start'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['lpp'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

$start = mysqli_real_escape_string($conn, $_POST['start']);
$lpp = mysqli_real_escape_string($conn, $_POST['lpp']);
$uid = mysqli_real_escape_string($conn, $_POST['uid']);


$tb1 = $dbprefix."complaint";
$tb2 = $dbprefix."complaint_read";

$strSQL = "SELECT * FROM $tb1 a
           WHERE 1
           ORDER BY ecm_udate DESC
           LIMIT $start, $lpp
          ";
$result = select($conn, $strSQL);

$return = '';
if($result){
  $c = 0;
  foreach ($result as $row) {
    $strSQL = "SELECT * FROM $tb2 WHERE ecpr_uid = '$uid' AND ecpr_cid = '".$row['ecm_id']."'";
    $result2 = select($conn, $strSQL);
    if($result2){
      $result[$c]['read_status'] = 'Y';
    }else{
      $result[$c]['read_status'] = 'N';
    }
    $c++;
  }
  echo json_encode($result);
}else{
  echo $strSQL;
}

disconnect($conn);
die();
?>
