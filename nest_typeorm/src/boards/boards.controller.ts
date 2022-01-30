import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoard(@GetUser() user: User): Promise<Board[]> {
    return this.boardService.getAllBoards(user);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardService.createBoard(createBoardDto, user);
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Delete('/:id')
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.boardService.deleteBoardById(id, user);
  }

  @Patch('/:id/status')
  updateBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardService.updateBoardById(id, status);
  }
}
