import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  user_id: string;

  @Column()
  @ApiProperty()
  nickname: string;

  @Column({ nullable: true })
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  win: number;

  @Column()
  @ApiProperty()
  lose: number;

  @Column()
  @ApiProperty()
  status: number;
}
