// Typeorm
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Nestjs
import { ApiProperty } from '@nestjs/swagger';

// Third Party
import { Allow, IsUUID } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import * as timeago from 'timeago.js';
import { ko } from 'timeago.js/lib/lang';

// Constants
import { LanguageCode } from '../constants';
import { sampleUuid } from '../constants/sample';

// Types
import type { Constructor } from '../types';

// Dto
import type { AbstractDto, AbstractTranslationDto } from './dto/abstract.dto';

timeago.register('ko', ko);

// Third Party

/**
 * Abstract Entity
 * @author Narek Hakobyan <narek.hakobyan.07@gmail.com>
 *
 * @description This class is an abstract class for all entities.
 * It's experimental and recommended using it only in microservice architecture,
 * otherwise just delete and use your own entity.
 */
export interface IAbstractEntity<DTO extends AbstractDto, O = never> {
  id: Uuid;
  createdAt: Date;
  updatedAt: Date;
  toDto(options?: O): DTO;
}
export abstract class AbstractEntity<DTO extends AbstractDto = AbstractDto, O = never>
  extends BaseEntity
  implements IAbstractEntity<DTO, O>
{
  @Type()
  @ApiProperty({ type: 'string', default: sampleUuid })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @Expose()
  get createdAgo(): string {
    return timeago.format(this.createdAt, 'ko');
  }

  @Type()
  @Allow()
  translations?: AbstractTranslationEntity[];
  private dtoClass: Constructor<DTO, [AbstractEntity, O?]>;
  toDto(options?: O): DTO {
    const dtoClass = this.dtoClass;
    if (!dtoClass) {
      throw new Error(
        `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
      );
    }
    return new this.dtoClass(this, options);
  }
}
export class AbstractTranslationEntity<
  DTO extends AbstractTranslationDto = AbstractTranslationDto,
  O = never,
> extends AbstractEntity<DTO, O> {
  @Column({ type: 'enum', enum: LanguageCode })
  languageCode: LanguageCode;
}
