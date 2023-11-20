<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */
/** @var \frontend\models\SignupForm $model */

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;

$this->title = 'Đăng ký';
$this->params['breadcrumbs'][] = $this->title;
?>

<div class="site-signup">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Vui lòng điền vào ô sau để đăng ký tài khoản mới:</p>

    <div class="row">
        <div class="">
            <?php $form = ActiveForm::begin(['id' => 'form-signup']); ?>

                <?= $form->field($model, 'username')->textInput(['autofocus' => false]) ?>

                <?= $form->field($model, 'email') ?>

                <?= $form->field($model, 'password')->passwordInput() ?>
            <div class="my-1 mx-0" style="color:#999;">
                Nếu bạn có tài khoản? <?= Html::a('Đăng nhập', ['site/login']) ?>.
            </div>

                <div class="form-group">
                    <?= Html::submitButton('Đăng ký', ['class' => 'btn btn-primary', 'name' => 'signup-button']) ?>
                </div>

            <?php ActiveForm::end(); ?>
        </div>
    </div>
</div>
