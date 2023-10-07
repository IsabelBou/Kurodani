const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database/lostword_cards.sqlite",
});

const CardType = sequelize.define(
  "CardTypes",
  {
    typeId: {
      primaryKey: true,
      //Auto generate UUIDs
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }, // Will never be updated, fixed at 4 values
);

const CardStatType = sequelize.define(
  "CardStats",
  {
    statId: {
      primaryKey: true,
      //Auto generate UUIDs
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    statType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }, // Will never be updated, fixed at 6 values
);

const RoleDependency = sequelize.define(
  "RoleDependency",
  {
    roleId: {
      primaryKey: true,
      //Auto generate UUIDs
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    roleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }, // Will never be updated, fixed at 9 values
);

const CardEffectType = sequelize.define(
  "EffectTypes",
  {
    effectTypeId: {
      primaryKey: true,
      //Auto generate UUIDs
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    effectType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  },
); //timestamps might prove useful to keep track of powercreep

const AffectedType = sequelize.define(
  "AffectedTypes",
  {
    affectedId: {
      primaryKey: true,
      //Auto generate UUIDs
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    affected: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      //Measure by which the increase/decrease shall be referenced (Percentage/Level/Quantity)
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  },
); //timestamps might prove useful to keep track of new types of enemies

const CardInformation = sequelize.define(
  "CardInformation",
  {
    cardId: {
      primaryKey: true,
      //Auto generate UUIDs
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rarity: {
      //3 (gp: 156), 4 (gp: 161) or 5 (gp: 166)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stat1: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stat2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  },
); //timestamps might prove useful to keep track of card releases

const Effects = sequelize.define(
  "Effect",
  {
    effectId: {
      primaryKey: true,
      //Auto generate UUIDs
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    enemy: {
      //true = target is enemy, false = target is own party
      type: DataTypes.BOOLEAN,
    },
    singleTarget: {
      //true = single-target, false = multi-target
      type: DataTypes.BOOLEAN,
    },
    turns: {
      //0 for instant type cards (HP/Barrier Restoration)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      //Measure Unit defined with Type
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  },
); //timestamps might prove useful to keep track of powercreep

module.exports = {
  CardType,
  CardStatType,
  RoleDependency,
  CardEffectType,
  AffectedType,
  CardInformation,
  Effects,
};
