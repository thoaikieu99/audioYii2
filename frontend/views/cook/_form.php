<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var frontend\models\Cook $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="cook-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'idtruyen')->textInput() ?>

    <?= $form->field($model, 'userid')->textInput() ?>

    <?= $form->field($model, 'recaudio')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'rectile')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'startspeed')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'startime')->textInput() ?>

    <?= $form->field($model, 'timetao')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
