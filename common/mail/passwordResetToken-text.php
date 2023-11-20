<?php

/** @var yii\web\View $this */
/** @var common\models\User $user */

$resetLink = Yii::$app->urlManager->createAbsoluteUrl(['site/reset-password', 'token' => $user->password_reset_token]);
?>
Hello <?= $user->username ?>,

Hãy truy cập liên kết bên dưới để xác minh email của bạn:

<?= $resetLink ?>
