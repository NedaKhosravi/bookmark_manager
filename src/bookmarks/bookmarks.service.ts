import { Injectable } from '@nestjs/common';
import { IBookmark } from './bookmark.model';
import { v4 as uuid } from 'uuid';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetBookmarkDto } from './dto/get-bookmark.dto';

@Injectable()
export class BookmarksService {
  private bookmarks: IBookmark[] = [];

  findAll(): IBookmark[] {
    return this.bookmarks;
  }

  find(getBookmarkDto: GetBookmarkDto): IBookmark[] {
    let bookmarks = this.findAll();
    const { url, description } = getBookmarkDto;

    if (url) {
      bookmarks = bookmarks.filter((bookmark) =>
        bookmark.url.toLocaleLowerCase().includes(url),
      );
    }

    if (description) {
      bookmarks = bookmarks.filter((bookmark) =>
        bookmark.description.toLocaleLowerCase().includes(description),
      );
    }

    return bookmarks;
  }

  findById(id: string): IBookmark {
    return this.bookmarks.find((bookmark) => bookmark.id === id);
  }

  createBookmark(createBookmarkDto: CreateBookmarkDto): IBookmark {
    const { url, description } = createBookmarkDto;
    const bookmark = {
      id: uuid(),
      url,
      description,
    };
    this.bookmarks.push(bookmark);

    return bookmark;
  }

  deleteBookmark(id: string): void {
    this.bookmarks = this.bookmarks.filter((bookmark) => bookmark.id !== id);
  }

  updateBookmarkDescription(id: string, description: string): IBookmark {
    const bookmark = this.findById(id);
    bookmark.description = description;
    return bookmark;
  }
}
