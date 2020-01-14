module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users_verificados', {
		registro: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
		},
		senha: {
			type: DataTypes.STRING(50),
			allowNull: false
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
	}, {
		tableName: 'users_verificados',
		timestamps: false
	});
};