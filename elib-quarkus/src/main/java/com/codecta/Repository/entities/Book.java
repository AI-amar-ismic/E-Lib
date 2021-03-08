package com.codecta.Repository.entities;

import javax.persistence.*;
@Entity
@Table(schema = "elib", name = "Books")
public class Book extends ModelObject {


    @SequenceGenerator(
            name = "bookSeq",
            sequenceName = "BOOK_SEQ",
            schema = "elib",
            allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookSeq")
    @Id
    @Column(name = "ID", nullable = false)
    private Integer id;
    private String bookName;
    private String coverImgUrl;
    private Integer releaseYear;
    private String genre;
    private String writer;

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getCoverImgUrl() {
        return coverImgUrl;
    }

    public void setCoverImgUrl(String coverImgUrl) {
        this.coverImgUrl = coverImgUrl;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    @Override
    public Integer getId() {
        return id;
    }
}
