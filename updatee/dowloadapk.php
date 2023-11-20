<?php

$files = scandir("uploadd");
$images = glob("uploadd/*.zip");
$ret = str_replace( 'uploadd/', '', $images[0] );
$ret = str_replace( '.zip', '', $ret );

$nam = $ret.".apk";
$filename = 'uploadd/'.$ret.'.zip';

header('Content-Description: File Transfer');
header('Content-Type: application/octet-stream');
header("Cache-Control: no-cache, must-revalidate");
header("Expires: 0");
header('Content-Disposition: attachment; filename="'.basename($nam).'"');
header('Content-Length: ' . filesize($filename));
header('Pragma: public');

// Xóa bộ đệm đầu ra hệ thống ();
flush();

// đọc kích thước của filereadfile ($ fileName);
readfile($filename);

// chấm dứt từ scriptdie ();} other {echo "tệp không tồn tại.";}} Use
die();
