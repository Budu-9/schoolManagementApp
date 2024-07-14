module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
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
        },
        guardianId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Guardians',
                key: 'id'
            },
            allowNull: false
        }
    })

    Student.associate = function(models) {
        Student.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
        Student.belongsTo(models.Guardian, { foreignKey: 'guardianId', as: 'guardian'})
    }

    return Student
}