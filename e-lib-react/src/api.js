import axios from 'axios';

export default function getAllBooks() {
    return axios('http://localhost:8080/book', {
        headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS, POST, PUT",
            "Access-Control-Allow-Origin": "http://127.0.0.1:3001/",
        },
        method: 'GET',
        responseType: 'json'
    })
}