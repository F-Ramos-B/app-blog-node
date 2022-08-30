import { DataTypes, Sequelize } from 'sequelize';

import { BaseEntity } from './../src/models/base-entity';

export class Categoria extends BaseEntity<Categoria> {
  declare titulo: string;
  declare descricao: string;
  declare slug: string;
}

const sequelize: Sequelize = require('../../config/db/db-config');

Categoria.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'CD_CATEGORIA',
      defaultValue: DataTypes.UUIDV4,
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'NO_CATEGORIA',
    },
    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'NO_SLUG',
    },
    descricao: {
      type: DataTypes.STRING(250),
      allowNull: false,
      field: 'DS_CATEGORIA',
    },
    dataAlteracao: { type: DataTypes.DATE, field: 'DT_ALTERACAO' },
    dataCriacao: {
      type: DataTypes.DATE,
      field: 'DT_CRIACAO',
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'TB_CATEGORIA',
    createdAt: 'DT_CRIACAO',
    updatedAt: 'DT_ALTERACAO',
  }
);

Categoria.sync({ force: false }).then(async () => {
  const total: number = await Categoria.count();
  console.log(`Tabela Categoria sincronizada. Total registros: ${total}`);
});
