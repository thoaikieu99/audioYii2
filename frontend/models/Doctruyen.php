<?php

namespace frontend\models;

use Yii;

/**
 * This is the model class for table "doctruyen".
 *
 * @property int $id
 * @property int $id_user
 * @property string|null $namecode
 * @property string|null $name
 * @property int|null $tile
 * @property string|null $link
 */
class Doctruyen extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     *
     */
    public $infor;
    public static function tableName()
    {
        return 'doctruyen';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_user'], 'required'],
            [['id_user', 'tile'], 'integer'],
            [['link'], 'string'],
            [['namecode'], 'string', 'max' => 255],
            [['name'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'id_user' => 'Id User',
            'namecode' => 'Namecode',
            'name' => 'Tên audio',
            'tile' => 'Tile',
            'link' => 'Văn bản',
        ];
    }
    public function save($runValidation = true, $attributeNames = null)
    {
        $cookie_name = "uplod";
        $cookie_isva = "isva";

        if ($this->infor["check"] == "creat"){
            $kytu = array('*','/','&','#','@','`','~','+','\\','|','/');
            $str = $this->infor["link"];
            foreach ($kytu as $vv) {
                $str = str_replace( $vv, ' ', $str );
            }
            $str = str_replace( '!', '.', $str );
            $str = str_replace( '?', '.', $str );
            $str = str_replace( '–', '.', $str );
            $str = str_replace( '  ', ' ', $str );
            $str = str_replace( '..', '', $str );

            $fp = @fopen('recs/doctruyen/'.Yii::$app->user->identity->id.'.txt', "w+");
            fwrite($fp, $str);
            fclose($fp);
            $batdau = 0;
        }



        if ($this->isNewRecord){
            $this->id_user =Yii::$app->user->identity->id;
        }


        if ($this->infor['check'] == 'update'){
            $fp = @fopen('recs/doctruyen/' . Yii::$app->user->identity->id . '.txt', "r");
            $data = fread($fp, filesize('recs/doctruyen/' . Yii::$app->user->identity->id . '.txt'));
            fclose($fp);

            $sav = explode('09011', $_COOKIE[$cookie_isva]);
            $tileodd = $_COOKIE[$cookie_name];
            $sav[0] = (int)$sav[0];
            $batdau = $sav[0]+1;
            $str = $data;
        }

        $texii = explode('.', $str);
        $ch = [];
        foreach ($texii as $v) {
            if (strlen($v) > 130) {
                $va = explode(',', $v);

                foreach ($va as $vv) {
                    if (strlen($vv)>130){
                        $d = strlen($vv);
                        $dem = strpos($vv, ' ', $d/2);
                        $ch[] = substr($vv,0,$dem);
                        $ch[] = substr($vv,$dem+1,$d);
                    }else{
                        $ch[] = $vv;
                    }

                }
            } else {
                $ch[] = $v;
            }
        }

        $dem =0;
        for ($i = $batdau; $i < count($ch); $i++) {

            if ($ch[$i] == null){
                $ch[$i] =',';
            }

            $aa = htmlspecialchars($ch[$i]);
            $lang = urldecode("vi");
            $aa = rawurlencode($aa);
            if ($i == 0){
                file_put_contents('recs/mp3/'.Yii::$app->user->identity->id.'.mp3',file_get_contents('https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&q='.$aa.'&tl='.$lang) );
            }else{
                file_put_contents('recs/mp3/' . Yii::$app->user->identity->id . '.mp3', file_get_contents('https://translate.google.com/translate_tts?ie=UTF-8&client=gtx&q=' . $aa . '&tl=' . $lang), FILE_APPEND);
            }

            $tele = floor(($i + 1) / count($ch) * 100);
            $savee = $i . "09011" . $v;
            setcookie($cookie_isva, $savee, time() + (86400 * 30), "/"); // 86400 = 1 day
            setcookie($cookie_name, $tele, time() + (86400 * 30), "/"); // 86400 = 1 day
            $this->tile = $tele;
            if (isset($tileodd)){
                if($tele > $tileodd){
                    break;
                }
            }
            if ($this->infor["check"] == "creat"){
                break;
            }

            if ($dem == 50){
                break;
            }
            $dem = $dem+1;

        }

        return parent::save($runValidation, $attributeNames); // TODO: Change the autogenerated stub
    }
    public function afterSave($insert, $changedAttributes)
    {
        if ($this->infor['check'] == 'update'){
            echo $this->tile;
            exit();
        }

        parent::afterSave($insert, $changedAttributes); // TODO: Change the autogenerated stub
    }
}