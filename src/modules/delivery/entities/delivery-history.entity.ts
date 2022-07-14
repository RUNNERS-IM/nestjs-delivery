// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

// Third party
import { IsInt, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';

// Constants
// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { DeliveryEntity } from './delivery.entity';
import { sampleUuid } from '../../../constants/sample';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import * as timeago from 'timeago.js';

// Main section
@Entity({ name: 'deliveryHistories' })
@Unique(['deliveryId', 'order'])
export class DeliveryHistoryEntity extends AbstractEntity {
  // ManyToOne fields
  @ApiModelProperty({ type: () => DeliveryEntity })
  @Type(() => DeliveryEntity)
  @ValidateNested()
  @ManyToOne(() => DeliveryEntity, (delivery) => delivery.deliveryHistories)
  delivery: DeliveryEntity;

  @Type()
  @ApiProperty({ type: 'string', description: 'delivery의 id', default: sampleUuid })
  @Exclude({ toPlainOnly: true })
  @IsUUID()
  @Column({ nullable: true })
  deliveryId: Uuid;

  // Basic fields
  @ApiProperty({ type: 'string', description: '카테고리' })
  @IsString()
  @Column({ nullable: true })
  category: string;

  @ApiProperty({ type: 'number', description: '배송단계(1~6단계), -99 배송 스캔 오류' })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(6)
  @Column({ nullable: true })
  level: number;

  @ApiProperty({ type: 'string', description: '진행시간' })
  @Column({ nullable: true })
  time: Date;

  @ApiProperty({ type: 'number', description: '배송순서' })
  @IsInt()
  @IsPositive()
  @Column({ nullable: true })
  order: number;

  @Expose()
  get timeAgo(): string {
    if (!this.time) return null;
    return timeago.format(this.time, 'ko');
  }

  // Office
  @ApiProperty({ type: 'string', description: '진행위치(지점)전화번호' })
  @IsString()
  @Column({ nullable: true })
  callOffice: string;

  @ApiProperty({ type: 'string', description: '진행위치지점' })
  @IsString()
  @Column({ nullable: true })
  addressOffice: string;

  // Driver
  @ApiProperty({ type: 'string', description: '배송기사 이름' })
  @IsString()
  @Column({ nullable: true })
  nameDriver: string;

  @ApiProperty({ type: 'string', description: '배송기사 사진' })
  @IsString()
  @Column({ nullable: true })
  pictureDriver: string;

  @ApiProperty({ type: 'string', description: '배송기사 전화번호' })
  @IsString()
  @Column({ nullable: true })
  callDriver: string;
}
