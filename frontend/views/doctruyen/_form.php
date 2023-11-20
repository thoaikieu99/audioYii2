<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var frontend\models\Doctruyen $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="doctruyen-form">

    <?php $form = ActiveForm::begin(); ?>



    <?= $form->field($model, 'link')->textArea(['rows' => 3]) ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true,'options' => ['autocomplete' => 'on']]) ?>


    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
