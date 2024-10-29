import 'reflect-metadata';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  IsOptional,
} from 'class-validator';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  @IsNotEmpty({ message: 'Поле name не должно быть пустым' })
  @IsString()
  name!: string;

  @Column({ length: 50, unique: true })
  article!: string;

  @Column({ length: 500 })
  @IsNotEmpty({ message: 'Поле description не должно быть пустым' })
  @IsString()
  description!: string;

  @Column('decimal')
  @IsNotEmpty({ message: 'Поле price не должно быть пустым' })
  @IsNumber()
  price!: number;

  @Column('simple-array')
  @IsArray()
  images!: string[];

  @Column({ length: 50 })
  @IsOptional()
  @IsString()
  fastener!: string; // Застежка

  @Column({ length: 50 })
  @IsOptional()
  @IsString()
  sleeveLength!: string; // Длина рукавов

  @Column({ length: 50 })
  @IsOptional()
  @IsString()
  dressLength!: string; // Длина платья

  @Column({ length: 50 })
  @IsOptional()
  @IsString()
  color!: string; // Цвет

  @Column({ length: 100 })
  @IsOptional()
  @IsString()
  composition!: string; // Состав

  @Column({ length: 50, default: 'Россия' })
  @IsOptional()
  @IsString()
  country!: string; // Страна

  @BeforeInsert()
  generateArticle() {
    this.article = `MP${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }
}
