<?php
include "config.class.php";
include "database.fnc.php";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['role'])){
  disconnect($conn);
  die();
}


$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$role = mysqli_real_escape_string($conn, $_POST['role']);

$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";

$strSQL = "SELECT * FROM $tb1 a INNER JOIN $tb2 b ON a.uid = b.info_uid
           WHERE
            a.uid = '$uid'
            AND a.use_status = '1'
            AND a.active_status = '1'
            AND a.allow_status = '1'
            AND a.delete_status = '0'
            AND b.info_use_status = '1'";

if($role == 'student'){

}




$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}else{
  echo $strSQL;
}

disconnect($conn);
die();
?>
