<?php

/* @var $this \yii\web\View */
/* @var $content string */

use common\widgets\Alert;
use frontend\assets\AppAsset;
use yii\helpers\Html;
$this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'href' => '/favi.ico']);
AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <?php $this->registerCsrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <style>
        img[src="https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png"] {
            display: none;
        }
        @media only screen and (min-width: 390px){
            .mobei{
                min-width: 350px;
            }
        }

    </style>
</head>
<body class="d-flex flex-column h-100">
<?php $this->beginBody() ?>

<main role="main" >
    <div id="iii" class="mobei" style="
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
">
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</main>
<script>
    var k = document.documentElement.scrollWidth;
    if (k<390){
    var a = k-40;
        console.log(a);
        var element = document.getElementById("iii");
        element.style.minWidth = a+"px";
    }else {

    }

</script>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage();
