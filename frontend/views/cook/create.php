<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var frontend\models\Cook $model */

$this->title = 'Create Cook';
$this->params['breadcrumbs'][] = ['label' => 'Cooks', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="cook-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
