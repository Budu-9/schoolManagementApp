module.exports = (sequelize, DataTypes) => {
    const Guardian = sequelize.define('Guardian', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            },
            allowNull: false
        }
    })

    Guardian.associate = function(models) {
        Guardian.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
        Guardian.hasOne(models.Student, { foreignKey: 'guardianId', as: 'student'})
    }

    return Guardian
}