import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { IBookmark } from './bookmark.model';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private bookmarkService: BookmarksService) {}

  @Get()
  find(@Query() getBookmarkDto: GetBookmarkDto): IBookmark[] {
    if (Object.keys(getBookmarkDto).length) {
      return this.bookmarkService.find(getBookmarkDto);
    }
    return this.bookmarkService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: string): IBookmark {
    return this.bookmarkService.findById(id);
  }
  @Post()
  // createBookmark(@Body() body: IBookmark): IBookmark {
  //   return this.bookmarkService.createBookmark(body.url, body.description);
  // }
  createBookmark(@Body() createBookmarkDto: CreateBookmarkDto): IBookmark {
    return this.bookmarkService.createBookmark(createBookmarkDto);
  }

  @Delete('/:id')
  deleteBookmark(@Param('id') id: string): void {
    return this.bookmarkService.deleteBookmark(id);
  }

  @Patch('/:id/description')
  updateBookmarkDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ): IBookmark {
    return this.bookmarkService.updateBookmarkDescription(id, description);
  }
}
