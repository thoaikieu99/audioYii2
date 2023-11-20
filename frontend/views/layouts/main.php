<?php

/** @var \yii\web\View $this */
/** @var string $content */


use common\widgets\Alert;
use frontend\assets\AppAsset;
use yii\bootstrap5\Html;
use yii\helpers\Url;

$this->registerLinkTag(['rel' => 'icon', 'type' => 'image/png', 'href' => '/updatee/favi.ico']);
AppAsset::register($this);
?>
<?php $this->beginPage() ?>
    <!DOCTYPE html>
    <html lang="<?= Yii::$app->language ?>" class="h-100">
    <head>
        <meta charset="<?= Yii::$app->charset ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <?php $this->registerCsrfMetaTags() ?>
        <script src="/tai/364/jquery.min.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
        <title><?= Html::encode($this->title) ?></title>
        <?php $this->head() ?>
    <style>
        @media only screen and (min-width: 500px){
            .mobei{
                min-width: 400px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

            }
        }
    </style>
    </head>
    <body class="d-flex flex-column h-100" style="margin: 0; height: 100%; overflow: hidden">
    <div id="hh" style="height: 0px;display: none;position: relative;bottom: 40px;left: 50px;width: 50%;">

        <div id="loading" style="position: relative;transform: translate(50%, 50%);">
            <div id="value-show">START</div>
            <span id="22" style="position: absolute;  left: 0px;  top: 0px;  z-index: 4;"
            ><svg style="background: whitesmoke;" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"></path>
</svg></span>
        </div>
    </div>
    <div id="blo" style="height: 100%;
    width: 100%;">
    <div class="navbar1" style="padding: 0px 10px 0px 5px; font-family: Arial!important; ">
        <?= Html::a('Menu',['/'],['style'=>'float: left;
            height: 50px;
            padding: 15px 15px;
            font-size: 18px;
            line-height: 20px;'])?>


        <a href="#" style=" position: absolute;right: 100px; display: none;" id = "1233"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                <path id="nottti" d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" ></path>
            </svg></a>
        <a href="#" style=" position: absolute;right: 100px;" id = "111" class="dison"> Save</a>
        <a href="#" style="position: absolute;right: 160px;" id = "222" class="dison"> Load</a>
        <!--<a href="file:///android_asset/mmpp.html" style="" id = "" > tesst</a>-->

        <a href="<?=Url::to(['/site/logout']) ?>" style="position: absolute;right:  10px;" data-method="post"> Đăng xuất</a>

    </div>

    <?php $this->beginBody() ?>

    <header>

    </header>

    <main role="main" class="flex-shrink-0" style="padding-top: 60px">
        <div class="container" id="mains">
            <?= Alert::widget() ?>
            <?= $content ?>
        </div>
    </main>
    <script>


    </script>
    </div>
    <?php $this->endBody() ?>
    </body>
    </html>
<?php $this->endPage();