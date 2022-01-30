import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board = await this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);

    return board;
  }
}
