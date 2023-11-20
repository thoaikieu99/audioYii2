<?php

use frontend\models\Cook;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/** @var yii\web\View $this */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Cooks';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="cook-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Cook', ['create'], ['class' => 'btn btn-success']) ?>
    </p>


    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'idtruyen',
            'userid',
            'recaudio',
            'rectile',
            //'startspeed',
            //'startime:datetime',
            //'timetao:datetime',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Cook $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
