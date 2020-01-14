/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atualiza_colaborador', {
		registro: {
			type: DataTypes.STRING(16),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		lista_funcao: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		foto: {
			type: DataTypes.BLOB,
			allowNull: false,
			get() {
				return this.getDataValue('foto').toString('base64');
			  },
		}
	}, {
		tableName: 'atualiza_colaborador',
		timestamps: false
	});
};