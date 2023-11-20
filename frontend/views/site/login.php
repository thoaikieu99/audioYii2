<?php

/** @var yii\web\View $this */
/** @var yii\bootstrap5\ActiveForm $form */
/** @var \common\models\LoginForm $model */

use yii\bootstrap5\Html;
use yii\bootstrap5\ActiveForm;

$this->title = 'Đăng nhập';
$this->params['breadcrumbs'][] = $this->title;
?>
<div  >
    <h1><?= Html::encode($this->title) ?></h1>


    <div class="row">
        <div class="">
            <?php $form = ActiveForm::begin(['id' => 'login-form']); ?>

                <?= $form->field($model, 'username')->textInput(['autofocus' => true]) ?>

                <?= $form->field($model, 'password')->passwordInput() ?>

                <?= $form->field($model, 'rememberMe')->checkbox() ?>

                <div class="my-1 mx-0" style="color:#999;">
                    Nếu bạn quên mật khẩu? <?php echo Html::a('Quên mật khẩu', ['site/request-password-reset']) ?>
                    <br>
                    Cần Gửi lại mã xác minh <?php echo Html::a('Xác minh', ['site/resend-verification-email']) ?>
                    <br>
                    Nếu bạn chưa có tài khoản? <?= Html::a('Tạo tài khoản', ['site/signup']) ?>
                </div>

                <div class="form-group">
                    <?= Html::submitButton('Đăng nhập', ['class' => 'btn btn-primary', 'name' => 'login-button']) ?>
                </div>

            <?php ActiveForm::end(); ?>
        </div>
    </div>
</div>
