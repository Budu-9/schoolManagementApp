module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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
        }
    })

    User.associate = function(models) {
        User.hasMany(models.School, {foreignKey: 'userId'})
        User.hasMany(models.Teacher, {foreignKey: 'userId'})
        User.hasMany(models.Student, {foreignKey: 'userId'})
        User.hasMany(models.Guardian, {foreignKey: 'userId'})
    }

    return User
}