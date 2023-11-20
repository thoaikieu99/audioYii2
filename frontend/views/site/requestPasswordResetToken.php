<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */
/** @var \frontend\models\PasswordResetRequestForm $model */

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;

$this->title = 'Yêu cầu đặt lại mật khẩu';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-request-password-reset">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Vui lòng điền email của bạn. Một liên kết để đặt lại mật khẩu sẽ được gửi ở đó.</p>

    <div class="row">
        <div class="">
            <?php $form = ActiveForm::begin(['id' => 'request-password-reset-form']); ?>

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
