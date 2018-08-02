<?php
include "config.class.php";
include "database.fnc.php";

$pid = mysqli_real_escape_string($conn, $_POST['student_uid']);

$tb1 = $dbprefix."account";
$tb2 = $dbprefix."userinfo";
$tb3 = $dbprefix."prefix";
$tb4 = $dbprefix."student_info";
$tb5 = $dbprefix."degree";
$tb6 = $dbprefix."progress_all";
$tb7 = $dbprefix."year_edication";

$strSQL = "SELECT * FROM $tb1 a INNER JOIN $tb2 b ON a.uid = b.info_uid
           INNER JOIN $tb4 c ON a.uid = c.s_uid
           LEFT JOIN $tb3 d ON b.prefix = d.prefix_id
           INNER JOIN $tb5 e ON c.s_degree = e.degree_id
           LEFT JOIN $tb6 f ON a.uid = f.epa_student_uid
           INNER JOIN $tb7 g ON c.s_start_year = g.eye_year
           WHERE
            a.delete_status = '0'
            AND a.role = 'student'
            AND a.uid = '$pid'
            AND a.use_status = '1'
            AND b.info_use_status = '1'
            AND c.s_use_status = '1'
            ";
$result = select($conn, $strSQL);

$return = '';

if($result){
  // echo json_encode($result);
  if(sizeof($result) > 0){

    foreach ($result as $row) {
        $buffer = '';
        foreach ($row as $key => $value) {
          if(!is_int($key)){
            if($key == 'epa_p1_pe'){
              if(($value != '0') && ($value != 'un-monitor') && ($value != null)){
                $buffer['p1_date'] = '-';
              }else{
                $strSQL = "SELECT * FROM eusis_progress_proposal WHERE pg1_std_id = '$pid' AND pg1_delete = '0' AND pg1_status = '1' ORDER BY pg1_udate DESC LIMIT 1";
                $result2 = select($conn, $strSQL);
                if($result2){
                  $buffer['p1_date'] = $result2[0]['pg1_examdate'];
                }else{
                  $buffer['p1_date'] = '-';
                }
              }
            }
          }
        }
    }
  }
}else{
  echo $strSQL;
}

disconnect($conn);
die();
?>
