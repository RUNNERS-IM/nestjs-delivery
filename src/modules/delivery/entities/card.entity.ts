// Nestjs
import { ApiProperty } from '@nestjs/swagger';
// Typeorm
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
// Third party
import { Exclude, Type } from 'class-transformer';
import { IsInt, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';
// Constants
import { sampleUuid } from '../../../constants/sample';
// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { SubCardEntity } from './subcard.entity';

// Main section
@Entity({ name: 'cards' })
export class CardEntity extends AbstractEntity {
  // OneToOne fields
  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (user) => user.cards)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @Type()
  @ApiProperty({ type: 'string', description: '유저의 uuid', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  userId: Uuid;

  // OneToMany fields
  @Type(() => SubCardEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => SubCardEntity, (subcard) => subcard.card)
  subcards: SubCardEntity[];

  // Basic fields
  @ApiProperty({ type: 'string', description: '제목' })
  @IsString()
  @Column({ nullable: true })
  title: string;
  @ApiProperty({
    type: 'number',
    description: '카드 유효기간 월(MM)',
    default: new Date().getMonth() + 1,
  })
  @Exclude({ toPlainOnly: true })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(12)
  @Column({ nullable: false })
  expiryMonth: number;
}
