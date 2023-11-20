<?php

/** @var yii\web\View $this */
/** @var common\models\User $user */

$verifyLink = Yii::$app->urlManager->createAbsoluteUrl(['site/verify-email', 'token' => $user->verification_token]);
?>
Hello <?= $user->username ?>,

Hãy truy cập liên kết bên dưới để xác minh email của bạn:

<?= $verifyLink ?>
