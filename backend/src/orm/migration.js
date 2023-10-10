const {
  CardType,
  CardStatType,
  RoleDependency,
  CardEffectType,
  AffectedType,
  CardInformation,
  GamepressEffects,
  ExtendedEffects,
  CardsEffects,
} = require("./models");

module.exports.runMigrations = ()  => {
  CardInformation.belongsTo(CardType, { foreignKey: "typeId" });
  //Relates CardInformation to CardStats' statType to define its two stat types
  CardInformation.belongsTo(CardStatType, { foreignKey: "statTypeId1" });
  CardInformation.belongsTo(CardStatType, { foreignKey: "statTypeId2" });

  //gets basic information out of gamepress' listed effects
  GamepressEffects.belongsTo(CardEffectType, { foreignKey: "effectTypeId" });
  GamepressEffects.belongsTo(AffectedType, { foreignKey: "affectedId" });
  GamepressEffects.belongsTo(RoleDependency, { foreignKey: "requiresRole" });
  
  //CardsEffects is used as the joint table, with every Card's Extended Effect
  CardInformation.belongsToMany(ExtendedEffects, { through: CardsEffects, foreignKey: "cardId" });
  ExtendedEffects.belongsToMany(CardInformation, { through: CardsEffects, foreignKey: "hasEffectId"  });

  Promise.all(
    [CardType.sync(),
    CardEffectType.sync(),
    RoleDependency.sync(),
    AffectedType.sync(),
    CardInformation.sync(),
    GamepressEffects.sync(),
    ExtendedEffects.sync(),
    CardStatType.sync(),
    CardsEffects.sync(),
  ]).then( () => 
    { // Static values
        CardType.bulkCreate([
            //Gamepress' values for each type of card
            {typeId: '411', type: 'Plum'},
            {typeId: '276', type: 'Orchid'},
            {typeId: '321', type: 'Chrysanthemum'},
            {typeId: '216', type: 'Bamboo'}
        ]),
        CardStatType.bulkCreate([
            //Gamepress' naming for every stat
            {statType: 'data-hp'}, 
            {statType: 'data-agi'},
            {statType: 'data-yang-atk'}, 
            {statType: 'data-yang-def'}, 
            {statType: 'data-yin-atk'}, 
            {statType: 'data-yin-def'}, 
        ]),
        RoleDependency.bulkCreate([
            //Gamepress' values for each role, 
            {roleId: '0001', roleType: 'None'}, //No role dependency; own invented ID since it's irrelevant in their taxonomy definitions nor anywhere else      
            {roleId: '1851', roleType: 'ATK'},  //Attack (ATK)
            {roleId: '1946', roleType: 'DBF'},  //Debuff (DBF)
            {roleId: '1811', roleType: 'DEF'},  //Defense (DEF)
            {roleId: '1956', roleType: 'DEST'}, //Destroy	(DEST)
            {roleId: '1931', roleType: 'HEAL'}, //Healing	(HEAL)
            {roleId: '1881', roleType: 'SPD'},  //Speed (SPD)
            {roleId: '1966', roleType: 'SUPP'}, //Support	(SUPP)
            {roleId: '1911', roleType: 'TECH'}, //Technical (TECH)
        ]),
        CardEffectType.bulkCreate([
            //The regex will divide every effect into any of these three categories
            {effectType: 'Increase'},
            {effectType: 'Decrease'},
            {effectType: 'Damage Reduction'},
        ]),
        AffectedType.bulkCreate([
            // Attributes
            {affected: 'Accuracy', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Agility', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Critical Accuracy', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Critical Attack', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Critical Defense', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Evasion', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Focus', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Yang Defense', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Yang Attack', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Yin Defense', unit: 'Level', affectedType: 'Attribute'},
            {affected: 'Yin Attack', unit: 'Level', affectedType: 'Attribute'},
            //Not often used, this effect was released at the start once and never again
            {affected: 'Poison', unit: 'Percentage', affectedType: 'Poison'},
            // Bullet types
            {affected: 'Ofuda', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Normal', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Energy', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Body', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Liquid', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Light', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Laser', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Sharp', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Heavy', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Missile', unit: 'Percentage', affectedType: 'Bullet'},
            {affected: 'Slash', unit: 'Percentage', affectedType: 'Bullet'},
            // Elements, which unlike the others in this list do have an ID in gamepress
            {affectedId: '176', affected: 'No Element', unit: 'Percentage', affectedType: 'Element'},
            {affectedId: '191', affected: 'Sun', unit: 'Percentage', affectedType: 'Element'},
            {affectedId: '1521', affected: 'Moon', unit: 'Percentage', affectedType: 'Element'},
            {affectedId: '1511', affected: 'Fire', unit: 'Percentage', affectedType: 'Element'},
            {affectedId: '1531', affected: 'Water', unit: 'Percentage', affectedType: 'Element'},
            {affectedId: '181', affected: 'Wood', unit: 'Percentage', affectedType: 'Element'},
            {affectedId: '1516', affected: 'Metal', unit: 'Percentage', affectedType: 'Element'},
            {affectedId: '1526', affected: 'Earth', unit: 'Percentage', affectedType: 'Element'},
            {affectedId: '186', affected: 'Star', unit: 'Percentage', affectedType: 'Element'},
            //Consumibles
            {affected: 'Barrier', unit: 'Level', affectedType: 'Barrier'},
            {affected: 'Spirit', unit: 'Quantity', affectedType: 'Spirit Power'},
            {affected: 'Spirit Collection', unit: 'Percentage', affectedType: 'Spirit Power'},
            //Character Traits will be added dynamically from this point.
            {affected: 'Test_Trait'}
        ])
    })
};