
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lista_funcao', {
		id_funcao: {
			type: DataTypes.STRING(16),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nome_funcao: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		id_permissao: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
	}, {
		tableName: 'lista_funcao',
		timestamps: false
	});
};