import { Column, DataType, Model, Table } from 'sequelize-typescript';

import { CreateCatalogDto } from '../dto/create-catalog.dto';

@Table({
    tableName: 'catalogs',
})
export class Catalog extends Model<Catalog, CreateCatalogDto> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: string;

    @Column({ type: DataType.STRING })
    name: string;

    @Column({ type: DataType.STRING })
    description: string;

    @Column({ type: DataType.STRING })
    url: string;

    @Column({ type: DataType.INTEGER })
    cost1: number;

    @Column({ type: DataType.INTEGER })
    cost2: number;

    @Column({ type: DataType.INTEGER })
    cost3: number;

    @Column({ type: DataType.INTEGER })
    req1: number;

    @Column({ type: DataType.INTEGER })
    req2: number;

    @Column({ type: DataType.INTEGER })
    req3: number;

    @Column({ type: DataType.INTEGER })
    category: number;
}
