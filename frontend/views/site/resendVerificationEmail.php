<?php

/** @var yii\web\View$this  */
/** @var yii\bootstrap5\ActiveForm $form */
/** @var \frontend\models\ResetPasswordForm $model */

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;

$this->title = 'Gửi lại email xác minh';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-resend-verification-email">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Vui lòng điền email của bạn. Một email xác minh sẽ được gửi đến đó.</p>

    <div class="row">
        <div class="">
            <?php $form = ActiveForm::begin(['id' => 'resend-verification-email-form']); ?>

            <?= $form->field($model, 'email')->textInput(['autofocus' => true]) ?>
            <div class="my-1 mx-0" style="color:#999;">
                Nếu bạn có tài khoản? <?= Html::a('Đăng nhập', ['site/login']) ?>.
            </div>
            <div class="form-group">
                <?= Html::submitButton('Gửi', ['class' => 'btn btn-primary']) ?>
            </div>

            <?php ActiveForm::end(); ?>
        </div>
    </div>
</div>
