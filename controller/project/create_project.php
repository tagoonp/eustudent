<?php
include "../config.class.php";
include "../database.fnc.php";

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['title'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['description'])){
  disconnect($conn);
  die();
}

if(!isset($_POST['datasource'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);
$title = mysqli_real_escape_string($conn, $_POST['title']);
$description = mysqli_real_escape_string($conn, $_POST['description']);
$datasource = mysqli_real_escape_string($conn, $_POST['datasource']);

$tb1 = $dbprefix."project";

$strSQL = "SELECT * FROM $tb1 WHERE project_title = '$title' AND project_use_status = '1' AND project_owner = '$uid' AND project_delete_status = '0'";
$result = select($conn, $strSQL);
if($result){
  // echo "D";
  echo json_encode("D");
  disconnect($conn);
  die();
}

$project_key = base64_encode(generateRandomString(6).$sys_datetime);

$strSQL = "INSERT INTO $tb1 (project_key, project_title, project_desc, project_source_type, project_create_datetime, project_owner)
           VALUES ('$project_key', '$title', '$description', '$datasource', '$sys_datetime', '$uid')
          ";
$result = insert($conn, $strSQL, true);

if($result){
  echo "Y";
}else{
  echo "N";
}

disconnect($conn);
die();
?>
