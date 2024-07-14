module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define('Teacher', {
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

    Teacher.associate = function(models) {
        Teacher.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }

    return Teacher
}