const {
  CardType,
  CardStatType,
  RoleDependency,
  CardEffectType,
  AffectedType,
  CardInformation,
  Effects,
} = require("./models");

module.exports.runMigrations = ()  => {
  CardInformation.belongsTo(CardType, { foreignKey: "TypeId" });
  CardInformation.belongsTo(CardStatType, { foreignKey: "StatTypeId1" });
  CardInformation.belongsTo(CardStatType, { foreignKey: "StatTypeId2" });

  Effects.belongsTo(CardEffectType, { foreignKey: "EffectTypeId" });
  Effects.belongsTo(AffectedType, { foreignKey: "AffectedId" });
  Effects.belongsTo(RoleDependency);

  Promise.all(
    [CardType.sync(),
    CardEffectType.sync(),
    RoleDependency.sync(),
    AffectedType.sync(),
    CardInformation.sync(),
    Effects.sync(),
    CardStatType.sync(),
  ]).then( () => 
    { // Static values
        CardType.bulkCreate([
            {type: 'Plum'},         //411 (Gamepress)
            {type: 'Orchid'},       //276 (Gamepress)
            {type: 'Chrysanthemum'},//321 (Gamepress)
            {type: 'Bamboo'}        //216 (Gamepress)
        ]),
        CardStatType.bulkCreate([
            {statType: 'HP'}, 
            {statType: 'Agility'},
            {statType: 'Yang Attack'}, 
            {statType: 'Yang Defense'}, 
            {statType: 'Yin Attack'}, 
            {statType: 'Yin Defense'}, 
        ]),
        RoleDependency.bulkCreate([
            {roleType: 'None'},             
            {roleType: 'Attack (ATK)'},     //1851 (Gamepress)
            {roleType: 'Debuff (DBF)'},     //1946 (Gamepress)
            {roleType: 'Defense	(DEF)'},    //1811 (Gamepress)
            {roleType: 'Destroy	(DEST)'},   //1956 (Gamepress)
            {roleType: 'Healing	(HEAL)'},   //1931 (Gamepress)
            {roleType: 'Speed (SPD)'},      //1881 (Gamepress)
            {roleType: 'Support	(SUPP)'},   //1966 (Gamepress)
            {roleType: 'Technical (TECH)'}, //1911 (Gamepress)
        ]),
        CardEffectType.bulkCreate([
            {effectType: 'Increase'},
            {effectType: 'Decrease'},
            {effectType: 'Damage Reduction'},
        ]),
        AffectedType.bulkCreate([
            // Attributes
            {affected: 'Accuracy', unit: 'Level'},
            {affected: 'Agility', unit: 'Level'},
            {affected: 'Critical Accuracy', unit: 'Level'},
            {affected: 'Critical Attack', unit: 'Level'},
            {affected: 'Critical Defense', unit: 'Level'},
            {affected: 'Evasion', unit: 'Level'},
            {affected: 'Focus', unit: 'Level'},
            {affected: 'Yang Defense', unit: 'Level'},
            {affected: 'Yang Attack', unit: 'Level'},
            {affected: 'Yin Defense', unit: 'Level'},
            {affected: 'Yin Attack', unit: 'Level'},
            {affected: 'Poison', unit: 'Percentage'},
            // Bullet types
            {affected: 'Ofuda', unit: 'Percentage'},
            {affected: 'Normal', unit: 'Percentage'},
            {affected: 'Energy', unit: 'Percentage'},
            {affected: 'Body', unit: 'Percentage'},
            {affected: 'Liquid', unit: 'Percentage'},
            {affected: 'Light', unit: 'Percentage'},
            {affected: 'Laser', unit: 'Percentage'},
            {affected: 'Sharp', unit: 'Percentage'},
            {affected: 'Heavy', unit: 'Percentage'},
            {affected: 'Missile', unit: 'Percentage'},
            {affected: 'Slash', unit: 'Percentage'},
            // Elements
            {affected: 'No_Element', unit: 'Percentage'},   //176 (Gamepress)
            {affected: 'Sun', unit: 'Percentage'},           //191 (Gamepress)
            {affected: 'Moon', unit: 'Percentage'},         //1521 (Gamepress)
            {affected: 'Fire', unit: 'Percentage'},         //1511 (Gamepress)
            {affected: 'Water', unit: 'Percentage'},        //1531 (Gamepress)
            {affected: 'Wood', unit: 'Percentage'},         //181 (Gamepress)
            {affected: 'Metal', unit: 'Percentage'},        //1516 (Gamepress)
            {affected: 'Earth', unit: 'Percentage'},        //1526 (Gamepress)
            {affected: 'Star', unit: 'Percentage'},         //186 (Gamepress)
            //Consumibles
            {affected: 'Barrier', unit: 'Level'},
            {affected: 'Spirit', unit: 'Quantity'},
            {affected: 'Spirit Collection', unit: 'Percentage'},
            //Character Traits will be added dynamically from this point.
        ])
    })
};