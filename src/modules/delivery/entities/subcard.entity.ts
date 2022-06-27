// Nestjs
import { ApiProperty } from '@nestjs/swagger';
// Typeorm
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
// Third party
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';
// Constants
import { sampleUuid } from '../../../constants/sample';
// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { CardEntity } from './card.entity';

// Main section
@Entity({ name: 'subcards' })
export class SubCardEntity extends AbstractEntity {
  // OneToOne fields
  @Type(() => CardEntity)
  @ValidateNested()
  @OneToOne(() => CardEntity, (card) => card.subcards)
  @JoinColumn({ name: 'userId' })
  card: CardEntity;
  @Type()
  @ApiProperty({ type: 'string', description: '유저의 uuid', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  cardId: Uuid;

  // Basic fields
  @ApiProperty({ type: 'string', description: '제목' })
  @IsString()
  @Column({ nullable: true })
  title: string;
  @ApiProperty({ type: 'number', description: '숫자', default: 0 })
  @Exclude({ toPlainOnly: true })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(12)
  @Column({ nullable: false })
  count: number;
}
