<?php

use yii\widgets\ActiveForm;
use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var frontend\models\Audioo $model */

$this->title = 'Tìm Truyện';
$this->params['breadcrumbs'][] = ['label' => 'Audioos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="audioo-create">
    <div class="row">

        <h1><?= Html::encode($this->title) ?></h1>
        <div class="row">
            <div class="col-lg-5">
                <?php $form = ActiveForm::begin(); ?>

                <?= $form->field($model, 'namecode')->textInput(['autofocus' => true]) ?>

                <div class="form-group" style="margin-top: 10px">
                    <?= Html::submitButton('Gửi', ['id' => "kkk",'class' => 'btn btn-success']) ?>
                </div>

                <?php ActiveForm::end(); ?>
            </div>
        </div>
    </div>
</div>
