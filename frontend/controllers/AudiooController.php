<?php

namespace frontend\controllers;

use frontend\models\Audioo;
use frontend\models\Cook;
use frontend\models\Uvst;
use simple_html_dom;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * AudiooController implements the CRUD actions for Audioo model.
 */
class AudiooController extends Controller
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
                        'actions' => ['logout', 'index','view','create','delete'],
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

    /**
     * Lists all Audioo models.
     *
     * @return string
     */
    public function actionIndex()
    {

        $list = Uvst::findOne(['iduser'=>Yii::$app->user->identity->id]);
        $my_array1 = explode(",", $list->idtruyen);
        foreach ($my_array1 as $va){
            $model[] = Audioo::findOne(['id' => $va]);
        }
        return $this->render('index', [
            'model' => $model,
        ]);
    }

    /**
     * Displays a single Audioo model.
     * @param int $id ID
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
//                $this->layout = false;
        if ($this->request->isGet) {

            $timidu = Uvst::findOne(['iduser' => Yii::$app->user->identity->id]);

            $my_array1 = explode(",", $timidu->idtruyen);
            if (in_array($id, $my_array1)){
                $name = Audioo::findOne(['id'=>$id]);
                $treuy = Cook::findOne(['id'=>$id, 'userid'=>Yii::$app->user->identity->id]);

                return $this->render('view', [
                    'model' => $treuy, 'namee' => $name
                ]);
            }
            return "không tồn tại";
        }
    }

    /**
     * Creates a new Audioo model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {

        $model = new Audioo();
        if ($this->request->isPost) {
            $str = $_POST["Audioo"]["namecode"];
            $pos = strpos($str, "audiotruyenfull.com");
            if ($pos) {
                $text_02 = substr(($str), $pos + 20);
                $text_02 = rtrim($text_02, "/");
            }
            $timid = Audioo::findOne(['namecode' => $text_02]);
            if ($timid != null){
                $model = $timid;
            }
            $model->infor['link'] = $_POST["Audioo"]["namecode"];
            $model->infor['text_02'] = $text_02;
            $model->save();

            return $this->redirect(['/audioo']);
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }


    /**
     * Deletes an existing Audioo model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id ID
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {

        $xoa = Uvst::findOne(['iduser'=>Yii::$app->user->identity->id]);
        $my_array1 = explode(",", $xoa->idtruyen);
        if(($key = array_search($id, $my_array1)) !== false) {
            unset($my_array1[$key]);
            $xoa->idtruyen =implode(',',array_unique($my_array1));
            $xoa->save();
        }
        return $this->redirect(['index']);
    }
    protected function findModel($id)
    {
        if (($model = Audioo::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }

}
