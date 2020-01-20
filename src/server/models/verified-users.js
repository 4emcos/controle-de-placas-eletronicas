module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users_system', {
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
		},
		is_verified: {
			type: DataTypes.STRING(5),
			allowNull:false
		},
		is_super: {
			type: DataTypes.STRING(10),
			allowNull:false
		}
	}, {
		tableName: 'users_system',
		timestamps: false
	});
};