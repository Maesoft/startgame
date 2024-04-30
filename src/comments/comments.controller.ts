import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  
  @Post()
  @UseGuards(AuthGuard)
  newComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.newComment(createCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id);
  }
  @Get('username')
  findAllCommentsByUser(username:string){
    return this.commentsService.findAllCommentsByUser(username)
  }
}
