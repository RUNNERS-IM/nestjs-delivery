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
import { TestEntity } from './test.entity';

// Main section
@Entity({ name: 'testsubs' })
export class TestSubEntity extends AbstractEntity {
  // OneToOne fields
  @Type(() => TestEntity)
  @ValidateNested()
  @OneToOne(() => TestEntity, (test) => test.testsubs)
  @JoinColumn({ name: 'userId' })
  test: TestEntity;
  @Type()
  @ApiProperty({ type: 'string', description: 'test의 id', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  testId: Uuid;

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
