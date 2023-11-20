<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var frontend\models\Doctruyen $model */

use yii\helpers\Url;
$this->title = 'Tạo audio';

?>
<style>

    .title h3{
        opacity: .5;
    }
    #loading{
        width:300px;
        height:300px;
        background-color: #996DAA;
        margin:auto;
        border-radius: 50%;
        border:1px solid #bb92a866;
        box-shadow: 0 0 50px #00000078;
        position: relative;
        cursor: pointer;
        --loading-value: 0%;
    }
    #loading::after{
        position: absolute;
        top:20px;
        left:20px;
        width:calc(100% - 40px);
        height:calc(100% - 40px);
        content:'';
        border-radius: 50%;
        background-image: conic-gradient(
                #CCF2F4, #72F4F2 var(--loading-value),
                transparent var(--loading-value)
        );
        z-index: 1;
    }
    #loading::before{
        position: absolute;
        top:-80px;
        left:-80px;
        width:calc(100% + 160px);
        height:calc(100% + 160px);
        content:'';
        border-radius: 50%;
        background-image: conic-gradient(
                #C77CA3, #ff3def var(--loading-value),
                transparent var(--loading-value)
        );
        z-index: 1;
        opacity: .5;
        filter: blur(60px);
    }
    #value-show{
        position: absolute;
        top:40px;
        left:40px;
        width:calc(100% - 80px);
        height:calc(100% - 80px);
        border-radius: 50%;
        background-image: radial-gradient(#9679B6, #845b97);
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
        color:#D6F2F3;
    }
    .disabledbutton {
        pointer-events: none;
    }

</style>
<div class="doctruyen-create">
    <?php
    if (isset($updatee)){
        ?>
        <div>
            <p style="font-size: 24px;"><span id="err" > Bạn chưa upload thành công chỉ được <span id="91"><?= $updatee?></span>%  bạn có muốn upload tiếp  </span><a href="#" name="<?=Yii::$app->request->getCsrfToken()?>" id = "123aa" > Tiếp tục</a></p>
        </div>
        <?php

    }
    ?>
    <?php
    if (isset($load) && $load = 'yes'){

        ?>
    <script>
        window.onload = function()
        {
            myFunction122();
            kk = 0;
            var hh = document.getElementById('hh');
            var hhs = document.getElementById('blo');
            hh.style.display = 'block';
            hhs.classList.add("disabledbutton");
        };
    </script>
        <?php

    }
    ?>



    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
<script>
    var kk = 0;

    jQuery('#22').click(function() {
        var hh = document.getElementById('hh');
        var hhs = document.getElementById('blo');
        hh.style.display = 'none';
        hhs.classList.remove("disabledbutton");
        kk = 1;

    });
    jQuery.ajaxSetup({
        data: <?= \yii\helpers\Json::encode([
            \yii::$app->request->csrfParam => \yii::$app->request->csrfToken,
        ]) ?>
    });
    let valueShow = document.getElementById('value-show');
    let loading = document.getElementById('loading');
    let val = document.getElementById('123aa');

    let url = '<?=Url::to(['/doctruyen/update']) ?>';
    let csr = val.name;
    function myFunction122() {

        if (kk==1){
            location.reload();
        }

        jQuery.ajax({
            type: "POST",
            url: url,
            data: { _csrf : csr }
        }).done(function( msg ) {
            valueShow.innerHTML = msg + '%';
            loading.style.setProperty("--loading-value", msg + '%');
            var val = document.getElementById('91');
            val.innerHTML = msg;
            myFunction122();
        }).fail(function (jqXHR, exception) {
            var val = document.getElementById('err');
            var valueSshow = document.getElementById('value-show');
            valueSshow.innerHTML = "Lỗi";
            myFunction122();
        });
        return true;
    }

    jQuery('#123aa').click(function() {
        myFunction122();
        kk = 0;
        var hh = document.getElementById('hh');
        var hhs = document.getElementById('blo');
        hh.style.display = 'block';
        hhs.classList.add("disabledbutton");


    });




</script>