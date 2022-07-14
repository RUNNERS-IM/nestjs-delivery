// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Typeorm
import { Column, Entity } from 'typeorm';

// Third party
import { IsString } from 'class-validator';

// Constants
// Entity
import { AbstractEntity } from '../../../common/abstract.entity';

// Main section
@Entity({ name: 'companies' })
export class CompanyEntity extends AbstractEntity {
  // Basic fields
  @ApiProperty({ type: 'string', description: '택배 회사 이름' })
  @IsString()
  @Column({ nullable: false })
  title: string;

  @ApiProperty({ type: 'number', description: '택배 회사 코드' })
  @IsString()
  @Column({ nullable: false, unique: true })
  code: number;

  @ApiProperty({ type: 'number', description: '국제 택배 지원 여부' })
  @IsString()
  @Column({ nullable: false })
  international: number;
}
