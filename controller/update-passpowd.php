<?php
include "config.class.php";
include "database.fnc.php";


$tb1 = $dbprefix."account";

$strSQL = "SELECT * FROM $tb1
           WHERE
            username LIKE '61%'";
$result = select($conn, $strSQL);

if($result){
  foreach ($result as $row) {
    $n_password = base64_encode($row['username']);

    $strSQL = "UPDATE $tb1 SET password = '$n_password' WHERE username = '".$row['username']."'";
    update($conn, $strSQL);
  }
}

disconnect($conn);
die();
?>
