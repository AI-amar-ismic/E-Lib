package com.codecta.Services;

import com.codecta.Repository.BookRepo;

import com.codecta.Repository.entities.Book;
import com.codecta.Services.models.BookDto;
import org.modelmapper.ModelMapper;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
@Transactional
public class ServiceImplementation implements ELibService{

    @Inject
    BookRepo bookRepo;



    @Override
    public BookDto addNewBook(BookDto book) {
        ModelMapper modelMapper = new ModelMapper();
        Book nBook = modelMapper.map(book, Book.class);
        nBook = bookRepo.add(nBook);
        return modelMapper.map(nBook,BookDto.class);
    }

    @Override
    public BookDto updateBook(BookDto book, Integer id) {
        ModelMapper modelMapper = new ModelMapper();
        Book nBook = bookRepo.findById(id);
        if(nBook != null){
            nBook.setBookName(book.getBookName());
            nBook.setCoverImgUrl(book.getCoverImgUrl());
            nBook.setGenre(book.getGenre());
            nBook.setReleaseYear(book.getReleaseYear());
            nBook.setWriter(book.getWriter());
            nBook = bookRepo.save(nBook);
            return modelMapper.map(nBook,BookDto.class);
        }
        return null;

    }

    @Override
    public BookDto deleteBook(Integer id) {
        Book dBook = bookRepo.delete(id);
        ModelMapper modelMapper = new ModelMapper();
        if (dBook != null){
            return modelMapper.map(dBook,BookDto.class);
        }
        return null;

    }

    @Override
    public BookDto getBookById(Integer id) {
        Book nBook = bookRepo.findById(id);
        ModelMapper modelMapper = new ModelMapper();
        if(nBook!=null){
            return modelMapper.map(nBook,BookDto.class);
        }
        return null;
    }

    @Override
    public List<BookDto> getAllBooks() {
        List<Book> books = bookRepo.findAll();
        ModelMapper modelMapper = new ModelMapper();
        if (books!=null){
            List<BookDto> bookDtos = new ArrayList<>();
            for (Book book:books){
                BookDto tempBook = modelMapper.map(book, BookDto.class);
                bookDtos.add(tempBook);
            }
            return bookDtos;
        }
        return null;
    }
}
