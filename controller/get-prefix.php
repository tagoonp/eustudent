<?php
include "config.class.php";
include "database.fnc.php";


$tb1 = $dbprefix."prefix";

$strSQL = "SELECT * FROM $tb1
           WHERE
            prefix_status = '1'";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}

disconnect($conn);
die();
?>
