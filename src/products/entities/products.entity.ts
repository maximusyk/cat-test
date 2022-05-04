import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

import { User } from '../../users/entities/users.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Table({
    tableName: 'products',
})
export class Product extends Model<Product, CreateProductDto> {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: number;

    @ForeignKey(() => User)
    userAddress: User;
}
