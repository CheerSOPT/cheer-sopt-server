
# 🍻 취얼솝트
솝트 뒷풀이에 중독된 당신, 환상의 술 비율을 찾고 싶다면?

<br/><br/>

## 📝 API 명세서

[api 링크](https://github.com/CheerSOPT/cheer-sopt-server/wiki)

<br/><br/>

## 📈 sequelize Model

```javascript
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DRINKS_TB = require('./drinks')(sequelize, Sequelize);
db.RECIPE_TB = require('./recipe')(sequelize, Sequelize);
db.RATIO_TB = require('./ratio')(sequelize, Sequelize);

/** 1: N */
db.DRINKS_TB.hasMany(db.RATIO_TB, {
  onDelete: 'cascade',
  foreignKey: {
    name: 'drinks_idx',
  },
});
db.RATIO_TB.belongsTo(db.DRINKS_TB);

db.RECIPE_TB.hasMany(db.RATIO_TB, {
  onDelete: 'cascade',
  foreignKey: {
    name: 'recipe_idx',
  },
});
db.RATIO_TB.belongsTo(db.RECIPE_TB);
```

<br/><br/>

## 📬 ERD

![ERD](https://user-images.githubusercontent.com/37169252/99885986-6828c000-2c7c-11eb-954d-568bf707ddef.png)


<br/><br/>

## 🔫 역할 분담

|  <center>기능</center> | <center> 담당 </center> |
|:--------:|:--------:|
|<center> 랜덤 레시피 제조 </center> |<center> 찬기 </center>|
|<center> 주종 리스트 조회 </center> |<center> 찬기 </center>|
|<center> 레시피 리스트 조회 </center> |<center> 현주 </center>|
|<center> 레시피 등록 </center> |<center> 현주 </center>|
