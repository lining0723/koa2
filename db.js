//数据库规范
const Sequelize = require('sequelize');

const uuid = require('node-uuid');

const config = require('./config');

console.log('init sequelize...');

function generateId() {
    return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    dialectOptions: {
        dateStrings: true,
        typeCast: true
    },
    timezone: '+08:00' //改为标准时区
});

const ID_TYPE = Sequelize.BIGINT(8);
// const ID_TYPE2 = Sequelize.INT(8);
function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false,

            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true,
        autoIncrement: true,
    };
    // attrs.createdAt = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.updatedAt = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.version = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };

    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    console.log('will create entity...' + obj);
                    // if (!obj.id) {
                    //     obj.id = generateId();
                    // }
                    obj.updatedAt = now;
                    obj.version = 0;
                } else {
                    console.log('will update entity...');
                    obj.updatedAt = now;
                    obj.version++;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'DATE','INT', 'DOUBLE', 'DATEONLY', 'BOOLEAN','DECIMAL'];

var exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
