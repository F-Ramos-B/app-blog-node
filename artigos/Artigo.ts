import { Categoria } from './../categorias/Categoria';
import { DataTypes, Sequelize } from 'sequelize';

import { BaseEntity } from '../src/models/base-entity';

export class Artigo extends BaseEntity<Artigo> {
  declare titulo: string;
  declare slug: string;
  declare corpo: string;
  declare idCategoria: string;

  public static readonly JOIN_CATEGORIA = 'categoria';
}

const sequelize: Sequelize = require('../../config/db/db-config');

Artigo.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'CD_ARTIGO',
      defaultValue: DataTypes.UUIDV4,
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'NO_ARTIGO',
    },
    slug: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'NO_SLUG',
    },
    corpo: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'DS_ARTIGO',
    },
    idCategoria: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'CD_CATEGORIA',
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
    tableName: 'TB_ARTIGO',
    createdAt: 'DT_CRIACAO',
    updatedAt: 'DT_ALTERACAO',
  }
);

Artigo.belongsTo(Categoria, {
  foreignKey: { allowNull: false, name: 'CD_CATEGORIA' },
  foreignKeyConstraint: true,
  as: Artigo.JOIN_CATEGORIA
});

Categoria.hasMany(Artigo, {
  foreignKey: { allowNull: false, name: 'CD_CATEGORIA' },
  foreignKeyConstraint: true,
  onDelete: 'CASCADE',
  as: 'artigos'
});

Artigo.sync({ force: false }).then(async () => {
  const total: number = await Artigo.count();
  console.log(`Tabela Categoria sincronizada. Total registros: ${total}`);
});
