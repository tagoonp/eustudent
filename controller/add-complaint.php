<?php
include "config.class.php";
include "database.fnc.php";

if(!isset($_POST['title'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['content'])){
  disconnect($conn);
  die();
}

$title = mysqli_real_escape_string($conn, $_POST['title']);
$content = mysqli_real_escape_string($conn, $_POST['content']);


$tb1 = $dbprefix."complaint";

$strSQL = "INSERT INTO $tb1 (ecm_title, ecm_content, ecm_udate)
           VALUES ('$title', '$content', '$sys_datetime')
          ";
$result = insert($conn, $strSQL, false);
if($result){
  echo "Y";
}else{
  echo "N";
}

disconnect($conn);
die();

?>
