import { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

export class BaseEntity<T extends BaseEntity<T>> extends Model<
  InferAttributes<T>,
  InferCreationAttributes<T>
> {
  declare id: CreationOptional<string>;
  declare dataCriacao: CreationOptional<Date>;
  declare dataAlteracao: CreationOptional<Date>;
}
