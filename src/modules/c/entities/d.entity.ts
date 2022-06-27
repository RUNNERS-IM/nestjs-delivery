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
import { CEntity } from './c.entity';

// Main section
@Entity({ name: 'ds' })
export class DEntity extends AbstractEntity {
  // OneToOne fields
  @Type(() => CEntity)
  @ValidateNested()
  @OneToOne(() => CEntity, (c) => c.ds)
  @JoinColumn({ name: 'userId' })
  c: CEntity;

  @Type()
  @ApiProperty({ type: 'string', description: 'c의 id', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  cId: Uuid;

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
  @Max(10)
  @Column({ nullable: false })
  number: number;
}
