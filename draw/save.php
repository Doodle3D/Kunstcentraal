<?php
$filename = "drawings/".$_POST["prefix"].date('Y-m-d_h.i.s').".svg";
$filename = str_replace(" ","_",$filename);
$path = $_POST["data"];
$template = file_get_contents("template.svg");
$output = str_replace("{PATH}",$path,$template);
file_put_contents($filename,$output); //,FILE_APPEND);
echo $filename. "\n\n\n\n" . $output;
?>
