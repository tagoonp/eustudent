<?php
include "config.class.php";
include "database.fnc.php";

if((!isset($_POST['uid'])) || (!isset($_POST['opwd'])) || (!isset($_POST['npwd']))){
  disconnect($conn);
  die();
}

$tb1 = $dbprefix."account";

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$opwd = mysqli_real_escape_string($conn, $_POST['opwd']);
$npwd = mysqli_real_escape_string($conn, $_POST['npwd']);

$encode_pwd = base64_encode($opwd);
$encode_npwd = base64_encode($npwd );

$strSQL = "SELECT * FROM $tb1
           WHERE
            uid = '$uid'
            AND password = '$encode_pwd'
            AND active_status = '1'
            AND allow_status = '1'
            AND delete_status = '0'
            AND use_status = '1'";
$result = select($conn, $strSQL);

if($result){
  $strSQL = "UPDATE $tb1 SET password = '$encode_npwd'
             WHERE uid = '$uid'
             AND password = '$encode_pwd'
             AND active_status = '1'
             AND allow_status = '1'
             AND delete_status = '0'
             AND use_status = '1'";
  update($conn, $strSQL);
  echo "Y";
}else{
  echo "N1";
}

disconnect($conn);
die();
?>
