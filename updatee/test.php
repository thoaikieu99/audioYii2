<?php
   $files = scandir("uploadd");
$images = glob("uploadd/*.zip");
$ret = str_replace( 'uploadd/', '', $images[0] );
$ret = str_replace( '.zip', '', $ret );
echo $ret;
   
?> 