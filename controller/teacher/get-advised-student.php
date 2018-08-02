<?php
include "../config.class.php";
include "../database.fnc.php";

if(!isset($_POST['uid'])){
  disconnect($conn);
  die();
}

$uid = mysqli_real_escape_string($conn, $_POST['uid']);


$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";
$tb3 = $dbprefix."prefix";
$tb4 = $dbprefix."student_info";
$tb5 = $dbprefix."degree";
$tb6 = $dbprefix."advisor";
$tb7 = $dbprefix."progress_all";

$strSQL = "SELECT * FROM $tb1 a INNER JOIN $tb2 b ON a.uid = b.info_uid
           INNER JOIN $tb4 c ON a.uid = c.s_uid
           LEFT JOIN $tb3 d ON b.prefix = d.prefix_id
           INNER JOIN $tb5 e ON c.s_degree = e.degree_id
           INNER JOIN $tb6 f ON a.uid = f.adv_std_id
           INNER JOIN $tb7 g ON a.uid = g.epa_student_uid
           WHERE
            a.delete_status = '0' AND a.role = 'student' AND f.adv_uid = '$uid'
          ";
$result = select($conn, $strSQL);

if($result){
  echo json_encode($result);
}else{
  echo $strSQL;
}

disconnect($conn);
die();
?>
