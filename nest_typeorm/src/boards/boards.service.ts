import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    const result = await this.boardRepository.find();
    return result;
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board = await this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.boardRepository.save(board);

    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) throw new NotFoundException('아이디를 찾을 수 없습니다.');

    return found;
  }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('Not Found Row');
  }

  async updateBoardById(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.boardRepository.save(board);

    return board;
  }
}
