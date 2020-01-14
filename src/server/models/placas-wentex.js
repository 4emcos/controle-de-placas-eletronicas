
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('placas_wentex', {
		idPlaca: {
			type: DataTypes.MEDIUMINT(8),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		nomePlaca: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		quantidade: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		situacao: {
			type: DataTypes.STRING(256),
			allowNull: false
		},

		qtdParaSituacaoBaixa: {
			type: DataTypes.INTEGER,
			allowNull: false
		},

		qtdParaSituacaoOk: {
			type: DataTypes.INTEGER,
			allowNull: false
		},

		dataUltimaEdicao: {
			type: 'TIMESTAMP',
			defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		},

		local: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		
		regUltimaEdicao:{
			type: DataTypes.STRING(256),
			allowNull: false
		},

		fotoUltimoUser: {
			type: DataTypes.BLOB,
			allowNull: false,
			get() {
				return this.getDataValue('fotoUltimoUser').toString('utf8');
			  },
		}
	}, {
		tableName: 'placas_wentex',
		timestamps: false
	});
};
