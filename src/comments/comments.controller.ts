import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  //@UseGuards(AuthGuard)
  newComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.newComment(createCommentDto);
  }

  @Delete(':id')
  //@UseGuards(AuthGuard)
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
  @Get('users/:id')
  //@UseGuards(AuthGuard)
  findAllCommentsByUser(@Param('id') id: number) {
    return this.commentsService.findAllCommentsByUser(id)
  }
  @Get('games/:id')
  //@UseGuards(AuthGuard)
  findAllCommentsByGame(@Param('id') id: number) {
    return this.commentsService.findAllCommentsByGame(id)
  }
}
