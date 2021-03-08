import axios from 'axios';

export default function editBook(book) {
    const url = 'http://localhost:8080/book/' + book.id;
    return axios(url, {
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST, PUT",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3001/",
        },
        method: 'PUT',
        responseType: 'json',
        data: {
            bookName: book.bookName,
            coverImgUrl: book.coverImgUrl,
            releaseYear: book.releaseYear,
            genre: book.genre,
            writer: book.writer
        }
    })
}