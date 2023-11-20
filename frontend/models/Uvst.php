<?php

namespace frontend\models;

use common\models\User;
use Yii;

/**
 * This is the model class for table "uvst".
 *
 * @property int $id
 * @property int $iduser
 * @property string|null $idtruyen
 *
 * @property User $iduser0
 */
class Uvst extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'uvst';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['iduser'], 'required'],
            [['iduser'], 'integer'],
            [['idtruyen'], 'string', 'max' => 255],
            [['iduser'], 'unique'],
            [['iduser'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['iduser' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'iduser' => 'Iduser',
            'idtruyen' => 'Idtruyen',
        ];
    }

    /**
     * Gets query for [[Iduser0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getIduser0()
    {
        return $this->hasOne(User::class, ['id' => 'iduser']);
    }
}
