import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { User } from '../../users/entities/users.entity';
import { CreateAssetDto } from '../dto/create-asset.dto';

@Table({
    tableName: 'assets',
})
export class Asset extends Model<Asset, CreateAssetDto> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: string;

    @Column({
        type: DataType.INTEGER,
        validate: {
            min: 1,
            max: 3,
        },
    })
    type: number;

    @Column({
        type: DataType.INTEGER,
        validate: {
            min: 1,
            max: 10,
        },
    })
    level: number;

    @ForeignKey(() => User)
    userAddress: User['address'];
}
