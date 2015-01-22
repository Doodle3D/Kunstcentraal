<?php
if (isset($_GET["del"])) {
  $filename = $_GET["del"];

  if (file_exists($filename)) {
    $info = pathinfo($filename);
    if ($info["extension"] == "svg") {
      unlink($filename);
    }
  }
}

?>
<html>
<head>
<meta name="robots" content="none" />
</head>
<body>
<style>
h1 {
  font-size: 16px;
}
img {
  border: 1px solid black;
}
</style>
<font face="Abel,Arial">
<?php

if ($handle = opendir('.')) {
    while (false !== ($entry = readdir($handle))) {
      if (strpos($entry,".svg")!==FALSE) {
        echo "<h1>$entry <a href='#' onclick='if (confirm(\"Sure?\")) location.href=\"?del=$entry\"'>[x]</a></h1><a href='$entry'><img border=1 width=320 src='$entry'></a>";
      }
    }
    closedir($handle);
}
?>
</font>
</body>
</html>
