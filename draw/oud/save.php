<?
extract($_POST);
extract($_GET);

if (!isset($data)) die("fail");

$filename = "drawings/".date('Y-m-d_h.i.s').".svg";
$filename = str_replace(" ","_",$filename);
$template = file_get_contents("template.svg");
$output = str_replace("{PATH}",$data,$template);
file_put_contents($filename,$output);
die("ok");
?>