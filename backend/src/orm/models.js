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
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
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
  "Affects",
  {
    affectedId: {
      primaryKey: true,
      //Auto generate UUIDs if none exist
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
    },
    affected: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      //Measure by which the increase/decrease shall be referenced (Percentage/Level/Quantity)
      type: DataTypes.STRING,
      defaultValue: 'Percentage', //After manual values, Traits (measured in Percentage) will be added with RegEx
      allowNull: false,
    },
    affectedType: {
      type: DataTypes.STRING,
      defaultValue: 'Trait', //After manual values, Traits (measured in Percentage) will be added with RegEx
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  },
); //timestamps might prove useful to keep track of release of new types of enemies

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

const GamepressEffects = sequelize.define(
  "GamepressEffects",
  //Basic Effect information extracted from Gamepress' Effect List
  {
    gpEffectId: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    enemy: {
      //true = target is enemy, false = target is own party
      type: DataTypes.BOOLEAN,
    },
    singleTarget: {
      //true = single-target, false = multi-target
      type: DataTypes.BOOLEAN,
    },
  },
  {
    updatedAt: false,
  },
); //creation records might prove useful to keep track of powercreep

const ExtendedEffects = sequelize.define(
  "ExtendedEffects",
  //These attributes are not reflected in gamepress' effects and share the same gpEffectId
  {
    exEffectId: {
      primaryKey: true,
      //Auto generate UUIDs
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    turns: {
      //0 for instant type cards (HP/Barrier Restoration)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      //Units enhanced (measurement defined with affectedType)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    updatedAt: false,
  },
); //creation records might prove useful to keep track of powercreep


//Joint table for the Many-to-Many relationship between Effects and Cards
const CardsEffects = sequelize.define('CardsEffects', {}, { updatedAt: false });


module.exports = {
  CardType,
  CardStatType,
  RoleDependency,
  CardEffectType,
  AffectedType,
  CardInformation,
  GamepressEffects,
  ExtendedEffects,
  CardsEffects,
};
