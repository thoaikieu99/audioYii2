<?php

namespace frontend\controllers;

use frontend\models\Doctruyen;
use Yii;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * DoctruyenController implements the CRUD actions for Doctruyen model.
 */
class DoctruyenController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [
                'verbs' => [
                    'class' => VerbFilter::className(),
                    'actions' => [
                        'delete' => ['POST'],
                    ],
                ],
            ]
        );
    }

    /**
     * Lists all Doctruyen models.
     *
     * @return string
     */
    public function actionIndex()
    {

        $timids = Doctruyen::findOne(['id_user' => Yii::$app->user->identity->id]);
        if ($timids){
            if ($timids->link != null || ($timids->tile > 0 && $timids->namecode != null)){
                return $this->render('index', [
                    'model' => $timids,
                    'yes'=>'jj',
                ]);
            }
        }

        return $this->render('index', [
        ]);
    }

    /**
     * Displays a single Doctruyen model.
     * @param int $id ID
     * @return string
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Doctruyen model.
     * If creation is successful, the browser will be redirected to the 'view' page.
     * @return string|\yii\web\Response
     */
    public function actionCreate()
    {
        $model = new Doctruyen();
        $timids = Doctruyen::findOne(['id_user' => Yii::$app->user->identity->id]);

        $cookie_name = "uplod";
        $cookie_isva = "isva";

        if ($timids && !$this->request->isPost){
            if(isset($_COOKIE[$cookie_name]) && $_COOKIE['_csrf-frontend'] == $timids->namecode ) {
                if ((int)$_COOKIE[$cookie_name] < 100){
                    return $this->render('create', [
                        'model' => $model,
                        'updatee'=>$_COOKIE[$cookie_name],
                    ]);
                }
            }
        }


        if ($this->request->isPost) {
            if ($model->load($this->request->post())) {
                $timids = Doctruyen::findOne(['id_user' => Yii::$app->user->identity->id]);
                if ($timids == null){
                }else{
                    $model = $timids;
                }
                $str = $_POST["Doctruyen"]["link"];
                $model->infor = $_POST["Doctruyen"];
                $model->infor["check"] = "creat";
                $model->name = $_POST["Doctruyen"]["name"];
                $model->namecode = $_COOKIE['_csrf-frontend'];

                if ($model->save()){
                    $model= new Doctruyen();
                    return $this->render('create', [
                        'model' => $model,
                        'updatee'=>$_COOKIE[$cookie_name],
                        'load'=>'yes',
                    ]);

                }else {
                    $model->loadDefaultValues();
                }
            }
        } else {
            $model->loadDefaultValues();
        }

        return $this->render('create', [
            'model' => $model,
        ]);

    }

    /**
     * Updates an existing Doctruyen model.
     * If update is successful, the browser will be redirected to the 'view' page.
     * @param int $id ID
     * @return string|\yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionUpdate()
    {

        $timids = Doctruyen::findOne(['id_user' => Yii::$app->user->identity->id]);
        if ($timids) {
            $cookie_name = "uplod";
            $cookie_isva = "isva";
            if(isset($_COOKIE[$cookie_name]) && $_COOKIE['_csrf-frontend'] == $timids->namecode ) {
                if ($_COOKIE[$cookie_name] < 100) {
                    $timids->infor['check'] = 'update';
                    $timids->namecode = $_COOKIE['_csrf-frontend'];
                    return $timids->save();

                }else{
                    return $this->redirect(['/doctruyen']);
                }

            }

        }
    }

    /**
     * Deletes an existing Doctruyen model.
     * If deletion is successful, the browser will be redirected to the 'index' page.
     * @param int $id ID
     * @return \yii\web\Response
     * @throws NotFoundHttpException if the model cannot be found
     */
    public function actionDelete($id)
    {
        $this->findModel($id)->delete();

        return $this->redirect(['index']);
    }

    /**
     * Finds the Doctruyen model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @param int $id ID
     * @return Doctruyen the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Doctruyen::findOne(['id' => $id])) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}
