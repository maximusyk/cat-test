import { Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

import { Asset } from '../../assets/entities/assets.entity';
import { Product } from '../../products/entities/products.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Table({
    tableName: 'users',
})
export class User extends Model<User, CreateUserDto> {
    @Column({ type: DataType.STRING, primaryKey: true, allowNull: false })
    address: string;

    @Column({ type: DataType.FLOAT })
    cash1: number;

    @Column({ type: DataType.FLOAT })
    cash2: number;

    @Column({ type: DataType.FLOAT })
    cash3: number;

    @HasMany(() => Asset)
    assets: Asset[];

    @HasMany(() => Product)
    products: Product[];
}
