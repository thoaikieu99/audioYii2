<?php

use frontend\models\Audioo;
use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var frontend\models\Audioo $model */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Menu';
?>
<div class="audioo-index">
        <?= Html::a('Tìm truyện', ['create'], ['class' => 'btn btn-success']) ?>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <div style="padding-top: 40px">


        <?php foreach ($model as $va){
            if ($va != null){
            ?>
                <div class="row">
                    <div class="col-10">
                        <?= Html::a($va->tent, ['view', 'id' => $va->id], [

                            'data' => [
                                'method' => 'get',
                            ]
                        ]) ?>
                    </div>
                    <div class="col-2"">
                        <?= Html::a('<span style=" " class="glyphicon glyphicon-trash"></span>', ['delete', 'id' => $va->id], [
                            'class' => 'btn btn-danger',
                            'style'=>'font-size: 10px;',
                            'data' => [
                                'confirm' => 'Are you sure you want to delete this item?',
                                'method' => 'post',
                            ]
                        ]) ?>
                    </div>
                </div>
                <div>



                </div>

            <?php
        }}?>


    </div>

</div>
