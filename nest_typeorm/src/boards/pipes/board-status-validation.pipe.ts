import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();

    if (!this.isValidValue(value))
      throw new BadRequestException('잘못된 형식입니다.');

    return value;
  }

  private isValidValue(value: any) {
    const index = this.StatusOptions.indexOf(value);
    return index !== -1;
  }
}
