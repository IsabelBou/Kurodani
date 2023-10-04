const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/lostword_cards.sqlite'
});
module.exports.runMigrations = () => {
    const CardType = sequelize.define('CardTypes', {
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
    });

    const CardStatType = sequelize.define('CardStats', {
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
    });

    const CardInformation = sequelize.define('CardInformation', {
        id: {
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
            //3, 4 or 5
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

    });

    CardInformation.belongsTo(CardType, {foreignKey: 'TypeId'});
    CardInformation.belongsTo(CardStatType, {foreignKey: 'StatTypeId1'});
    CardInformation.belongsTo(CardStatType, {foreignKey: 'StatTypeId2'});

    const CardEffectType = sequelize.define('EffectTypes', {
        EffectTypeId: {
            primaryKey: true,
            //Auto generate UUIDs
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

        },
        EffectType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    const RoleDependency = sequelize.define('RoleDependency', {
        RoleId: {
            primaryKey: true,
            //Auto generate UUIDs
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

        },
        RoleType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });




    CardInformation.sync();
    CardType.sync();
    CardEffectType.sync();
    RoleDependency.sync();

}

