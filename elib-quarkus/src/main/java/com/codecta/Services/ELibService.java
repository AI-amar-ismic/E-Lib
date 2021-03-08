package com.codecta.Services;

import com.codecta.Services.models.BookDto;

import java.util.List;

public interface ELibService {

    public BookDto addNewBook(BookDto book);
    public BookDto updateBook(BookDto book, Integer id);
    public BookDto deleteBook(Integer id);
    public BookDto getBookById (Integer id);
    public List<BookDto> getAllBooks();

}
