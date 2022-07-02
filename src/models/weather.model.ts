
import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import { sequelizeConnection } from '../utils/database'


interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherAttributes {
  weatherId: string;
  id: number;
  main?: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  };
  visibility?: number;
  wind?: {
    speed: number,
    deg: number
  };
  clouds?: {
    all: number
  };
  dt?: number;
  sys?: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number    
  };
  timezone?: number;
  name?: string;
  cod?: number;
  base?: string;
  coord?: {
    lon: number,
    lat: number
  };
  weather: [WeatherItem];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface WeatherInput extends Optional<WeatherAttributes, 'weatherId'> {}
export interface WeatherOuput extends Required<WeatherAttributes> {}


export class Weather extends Model<WeatherAttributes, WeatherInput> 
        implements WeatherAttributes{

  public weatherId!: string
  public id!: number
  public name!: string
  public weather!: [any]

  public main!: any
  public visibility!: number
  public wind!: any
  public clouds!: any
  public dt!: number
  public sys!: any
  public cod!: number
  public base!: string
  public coord!: any
  public timezone!: number

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Weather.init(
  {
    weatherId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    coord: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    weather: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    base: {
      type: DataTypes.STRING,
      allowNull: true
    },
    main: {
      type: DataTypes.JSON,
      allowNull: true
    },
    visibility: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wind: {
      type: DataTypes.JSON,
      allowNull: true
    },
    clouds: {
      type: DataTypes.JSON,
      allowNull: true
    },
    dt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sys: {
      type: DataTypes.JSON,
      allowNull: true
    },
    timezone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cod: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true,
    tableName: 'Weather',
  }
);

