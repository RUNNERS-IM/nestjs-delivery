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
import { TestSubEntity } from './testSub.entity';

// Main section
@Entity({ name: 'tests' })
export class TestEntity extends AbstractEntity {
  // ManyToOne fields
  @Type(() => UserEntity)
  @ValidateNested()
  @ManyToOne(() => UserEntity, (user) => user.tests)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  @Type()
  @ApiProperty({ type: 'string', description: '유저의 uuid', default: sampleUuid })
  @IsUUID()
  @Column({ nullable: false })
  userId: Uuid;

  // OneToMany fields
  @Type(() => TestSubEntity)
  @ValidateNested({ each: true })
  @OneToMany(() => TestSubEntity, (testsub) => testsub.test)
  testsubs: TestSubEntity[];

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
