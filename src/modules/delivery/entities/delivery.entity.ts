// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

// Third party
import { IsInt, IsPositive, IsString, IsUUID, Max, Min, ValidateNested } from 'class-validator';

// Constants
// Entity
import { AbstractEntity } from '../../../common/abstract.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { DeliveryHistoryEntity } from './delivery-history.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { sampleUuid } from '../../../constants/sample';
import { Exclude, Expose, Type } from 'class-transformer';
import * as timeago from 'timeago.js';

// Main section
@Entity({ name: 'deliveries' })
export class DeliveryEntity extends AbstractEntity {
  // ManyToOne fields
  @ApiModelProperty({ type: () => UserEntity })
  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (user) => user.deliveries)
  user: UserEntity;

  @Type()
  @ApiProperty({ type: 'string', description: '유저의 uuid', default: sampleUuid })
  @Exclude({ toPlainOnly: true })
  @IsUUID()
  @Column({ nullable: true })
  userId: Uuid;

  // OneToMany fields
  // @ApiModelProperty({ type: () => DeliveryHistoryEntity, isArray: true })
  // @Type(() => DeliveryHistoryEntity)
  // @ValidateNested({ each: true })
  @OneToMany(() => DeliveryHistoryEntity, (deliveryHistory) => deliveryHistory.delivery)
  deliveryHistories: DeliveryHistoryEntity[];

  // Basic fields
  @ApiProperty({ type: 'string', description: '제목', example: '상품명' })
  @IsString()
  @Column({ nullable: true })
  title: string;

  @ApiProperty({ type: 'string', description: '코드', default: '08' })
  @IsString()
  @Column({ nullable: true })
  code: string;

  @ApiProperty({ type: 'string', description: '식별값' })
  @IsString()
  @Column({ nullable: true })
  fid: string;

  @ApiProperty({ type: 'string', description: '운송장번호', default: '243636855173' })
  @IsString()
  @Column({ nullable: true })
  invoice: string;

  @ApiProperty({ type: 'number', description: '배송단계(1~6단계), -99 배송 스캔 오류' })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(6)
  @Column({ nullable: true })
  level: number;

  @ApiProperty({ type: 'string', description: '배송 예정 시간', default: '' })
  @IsString()
  @Column({ nullable: true })
  estimate: string;

  @ApiProperty({ type: 'string', description: '택배사 처리시간' })
  @Column({ nullable: true })
  time: Date;

  @Expose()
  get timeAgo(): string {
    if (!this.time) return null;
    return timeago.format(this.time, 'ko');
  }

  @ApiProperty({ type: 'boolean', description: '배송 완료 여부' })
  @IsString()
  @Column({ nullable: true, default: false })
  isComplete: boolean;

  // Sender
  @ApiProperty({ type: 'string', description: '발신인 이름' })
  @IsString()
  @Column({ nullable: true })
  nameSender: string;

  // Office
  @ApiProperty({
    type: 'string',
    description: '사업소 전화번호',
  })
  @IsString()
  @Column({ nullable: true })
  callOffice: string;

  // Driver
  @ApiProperty({
    type: 'string',
    description: '배송기사 전화번호',
  })
  @IsString()
  @Column({ nullable: true })
  callDriver: string;

  @ApiProperty({
    type: 'string',
    description: '배송기사 이름',
  })
  @IsString()
  @Column({ nullable: true })
  nameDriver: string;

  // Receiver
  @ApiProperty({ type: 'string', description: '수취인 주소' })
  @IsString()
  @Column({ nullable: true })
  addressReceiver: string;

  @ApiProperty({ type: 'string', description: '수취인 이름' })
  @IsString()
  @Column({ nullable: true })
  nameReceiver: string;

  // Sweettracker
  @ApiProperty({ type: 'boolean', description: '추적 등록 여부' })
  @IsString()
  @Column({ nullable: true, default: false })
  isTrackingRegistered: boolean;
}
