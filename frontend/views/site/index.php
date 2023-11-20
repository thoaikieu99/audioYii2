<?php

use frontend\assets\AppAsset;
use yii\bootstrap5\Html;

?>
<h1> Xin chào bạn đến với tôi</h1>

<div>
    <p>Bạn muốn nghe truyện ở audiotruyen <?= Html::a('Audio Truyện',['/audioo'],[])?></p>
    <p>Bạn có Ebook nhưng lại muốn nghe <?= Html::a('Đọc truyện',['/doctruyen'],[])?></p>
</div>
