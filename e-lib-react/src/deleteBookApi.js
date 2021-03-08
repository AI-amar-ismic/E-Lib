import axios from 'axios';

export default function deleteBook(id) {
    const conUrl = 'http://localhost:8080/book/' + id;
    console.log(conUrl);
    return axios.delete(conUrl);
}