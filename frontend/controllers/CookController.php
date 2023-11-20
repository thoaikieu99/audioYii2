<?php

namespace frontend\controllers;

use frontend\models\Cook;
use frontend\models\Doctruyen;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * CookController implements the CRUD actions for Cook model.
 */
class CookController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'denyCallback' => function ($rule, $action) {
                    echo "Bạn hãy đăng nhập";
                },
                'rules' => [

                    [
                        'actions' => ['save', 'load'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],

                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }



    public function actionSave()
    {
        if (Yii::$app->request->isAjax){
            $data = Yii::$app->request->post();
            $idtruyen = $data['id'];
            $tim = Cook::findOne(['idtruyen'=>$idtruyen, 'userid'=>Yii::$app->user->identity->id]);
            if ($tim == null){
                $model = new Cook();
            }else{
                $model = $tim;
            }
            $model->infor = $data;
            $model->save();

            return 'Đã Lưu thành công';
        }


        return false;
    }
    public function actionLoad()
    {
        if (Yii::$app->request->isAjax) {
            $data = Yii::$app->request->post();
            $tim = Cook::findOne(['idtruyen' => $data['id'], 'userid' => Yii::$app->user->identity->id]);

            if ($tim != null) {
                foreach ($tim as $k => $v) {
                    $a[$k] = $v;
                }
                $myJSON = json_encode($a);
                echo $myJSON;
                exit();
            }
        }
        return false;
    }


}
