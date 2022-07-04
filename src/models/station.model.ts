
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelizeConnection } from '../utils/database'

interface Bike {
  dockNumber: number | null,
  isElectric: boolean,
  isAvailable: boolean,
  battery: number | null
}

interface StationAttributes {
  stationId: string;
  id?: number;
  name?: string;
  coordinates?:number [];
  totalDocks?: number | null;
  docksAvailable?: number | null;
  bikesAvailable?: number | null;
  classicBikesAvailable?: number | null;
  smartBikesAvailable?: number | null;
  electricBikesAvailable?: number | null;
  rewardBikesAvailable?: number | null;
  rewardDocksAvailable?: number | null;
  kioskStatus?: string | null;
  kioskPublicStatus?: string | null;
  kioskConnectionStatus?: string | null;
  kioskType?: number | null;
  addressStreet?: string | null;
  addressCity?: string | null;
  addressState?: string | null;
  addressZipCode?: string | null;
  bikes: Bike[];
  isVirtual?: boolean; 
  isEventBased?: boolean; 
  closeTime?: string | null;
  eventEnd?: string | null;
  eventStart?: string | null;
  notes?: string | null;
  openTime?: string | null;
  publicText?: string | null;
  timeZone?: string | null;
  kioskId?: number | null;
  trikesAvailable?: number | null;
  latitude?: number;
  longitude?: number;
  batchId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
export interface StationInput extends Optional<StationAttributes, 'stationId'> {}
export interface StationOuput extends Required<StationAttributes> {}


export class Station extends Model<StationAttributes, StationInput> 
        implements StationAttributes{

  public stationId!: string
  public id!: number
  public name!: string

  public coordinates!:[number];
  public totalDocks!: number;
  public docksAvailable!: number;
  public bikesAvailable!: number;
  public classicBikesAvailable!: number;
  public smartBikesAvailable!: number;
  public electricBikesAvailable!: number;
  public rewardBikesAvailable!: number;
  public rewardDocksAvailable!: number;
  public kioskStatus!: string;
  public kioskPublicStatus!: string;
  public kioskConnectionStatus!: string;
  public kioskType!: number;
  public addressStreet!: string;
  public addressCity!: string;
  public addressState!: string;
  public addressZipCode!: string;
  public bikes!: [any]
  public isVirtual!: boolean; 
  public isEventBased!: boolean; 
  public closeTime!: string;
  public eventEnd!: string;
  public eventStart!: string;
  public notes!: string;
  public openTime!: string;
  public publicText!: string;
  public timeZone!: string;
  public kioskId!: number;
  public trikesAvailable!: number;
  public latitude!: number;
  public longitude!: number;
  public batchId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}


Station.init(
  {
    stationId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    coordinates: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true
    },  
    totalDocks: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    docksAvailable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bikesAvailable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },            
    classicBikesAvailable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    smartBikesAvailable: {
      type: DataTypes.INTEGER,
      allowNull: true
    }, 
    electricBikesAvailable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rewardBikesAvailable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rewardDocksAvailable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    kioskStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kioskPublicStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },            
    kioskConnectionStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kioskType: {
      type: DataTypes.INTEGER,
      allowNull: true
    },    
    addressStreet: {
      type: DataTypes.STRING,
      allowNull: true
    },
    addressCity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    addressState: {
      type: DataTypes.STRING,
      allowNull: true
    },
    addressZipCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bikes: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },
    isVirtual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isEventBased: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    closeTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventEnd: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventStart: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    openTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publicText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kioskId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    trikesAvailable: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    latitude: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    longitude: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize: sequelizeConnection,
    timestamps: true,
    tableName: 'Station',
  }
);



