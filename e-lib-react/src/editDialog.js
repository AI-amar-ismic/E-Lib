import React, { useState, useEffect } from 'react'

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import "./addDialog.css"
import editBook from './editApi.js'

export default function AddDialog({ handleClose, open, bookToEdit, handleCloseAndSave }) {
    const [book, setBook] = useState({
        id: '',
        bookName: '',
        coverImgUrl: '',
        releaseYear: '',
        genre: '',
        writer: ''
    });

    useEffect(() => {
        setBook({
            id: bookToEdit.id,
            bookName: bookToEdit.bookName,
            coverImgUrl: bookToEdit.coverImgUrl,
            releaseYear: bookToEdit.releaseYear,
            genre: bookToEdit.genre,
            writer: bookToEdit.writer
        })
    }, [bookToEdit])

    const handleChange = (event) => {
        setBook({ ...book, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        editBook(book).then(res => {
            handleCloseAndSave();
        });


    }
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle id="dialogTitle">Edit book</DialogTitle>
            <DialogContent className="addDialogContent">
                <div className="addDialogEntries">
                    <TextField className="addDialogEntry" id="name" label="Book name" name="bookName" variant="outlined" value={book.bookName} onChange={handleChange} />
                    <TextField className="addDialogEntry" label="Image" name="coverImgUrl" variant="outlined" value={book.coverImgUrl} onChange={handleChange} />
                    <TextField className="addDialogEntry" label="Release year" name="releaseYear" variant="outlined" value={book.releaseYear} onChange={handleChange} />
                    <TextField className="addDialogEntry" label="Genre" name="genre" variant="outlined" value={book.genre} onChange={handleChange} />
                    <TextField className="addDialogEntry" label="Writer" name="writer" variant="outlined" value={book.writer} onChange={handleChange} />

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
                <Button onClick={handleSubmit} color="primary">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}