package com.codecta.Repository;
import com.codecta.Repository.entities.Book;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

@ApplicationScoped
@Transactional(Transactional.TxType.MANDATORY)
public class BookRepo extends Repository<Book, Integer> {

    public BookRepo(){
        super(Book.class);
    }
}
