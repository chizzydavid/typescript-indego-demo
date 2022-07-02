
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelizeConnection } from '../utils/database'
import { Station } from './station.model';


interface BatchAttributes {
  batchId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface BatchInput extends Optional<BatchAttributes, 'batchId'> {}
export interface BatchOuput extends Required<BatchAttributes> {}


export class Batch extends Model<BatchAttributes, BatchInput> 
         implements BatchAttributes{

  public batchId!: string

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

}

Batch.init(
  {
    batchId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true,
    tableName: 'Batch',
  }
);


Batch.hasMany(Station, {
  foreignKey: 'batchId'
});

Station.belongsTo(Batch, {
  foreignKey: 'batchId'
});

