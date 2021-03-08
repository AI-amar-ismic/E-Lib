import React, { useEffect, useState, useContext } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import getAllBooks from "./api.js";
import "./home.css"
import TextField from '@material-ui/core/TextField'
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import Card from '@material-ui/core/Card';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import createBook from './createBookApi.js'
import AddDialog from './addDialog.js'
import { UserContext } from "./App.js";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import deleteBook from './deleteBookApi.js'
import AdminPanel from './adminPanel.js'
import Checkbox from '@material-ui/core/Checkbox';
import getByID from './getById.js'
import EditDialog from './editDialog.js'


export default function HomeScreen() {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([])
    const [searchParam, setSearchParam] = useState('')
    const [gridView, setGridView] = useState(false)
    const [selectedGenre, setSelectedGenre] = useState('');
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const loggedUsername = useContext(UserContext)
    const [checkedBooks, setCheckedBooks] = useState([])
    const user1 = {
        id: 1,
        name: 'amar',
        books: []
    };
    const user2 = {
        id: 2,
        name: 'meho',
        books: []
    };
    const user3 = {
        id: 3,
        name: 'nino',
        books: []
    };
    const [usersList, setUsersList] = useState([])
    const [selectedUser, setSelectedUser] = useState(user1)
    const [bookToEdit, setBookToEdit] = useState({
        id: '',
        bookName: '',
        coverImgUrl: '',
        releaseYear: '',
        genre: '',
        writer: ''
    });
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    useEffect(() => {
        refreshBooks();
        if (loggedUsername !== 'admin') {
            usersList.forEach(element => {

                if (element.name == loggedUsername) {
                    setSelectedUser(element)
                } else {
                    setSelectedUser({
                        id: 5,
                        name: loggedUsername,
                        books: []
                    })
                }
            });
            setFilteredBooks([]);
            const tempFilter = [];
            selectedUser.books.forEach(element => {
                getByID(element).then(result => {
                    const newBook = result.data;
                    tempFilter.push(newBook);
                })
            });
            setFilteredBooks(tempFilter);
        }
        const tempArray = [];
        tempArray.push(user1);
        tempArray.push(user2);
        tempArray.push(user3);
        setUsersList(tempArray);
        setBookToEdit({
            bookName: '',
            coverImgUrl: '',
            releaseYear: '',
            genre: '',
            writer: ''
        })
    }, [])

    const refreshBooks = () => {
        getAllBooks().then(result => {
            const booksResult = result.data;

            setBooks(booksResult);
            setFilteredBooks(booksResult);
        })
    }

    const handleChange = (event) => {
        setSearchParam(event.target.value)
    }

    useEffect(() => {
        if (books.length > 0) {
            const filteredBooks = books.filter((x) => x.bookName.includes(searchParam) || x.writer.includes(searchParam));
            setFilteredBooks(filteredBooks);
        }
    }, [searchParam]);

    useEffect(() => {
        if (books.length > 0) {
            const filteredBooks = books.filter((x) => x.genre.includes(selectedGenre));
            setFilteredBooks(filteredBooks);
        }
    }, [selectedGenre]);

    const enableGridView = () => {
        setGridView(true);
    }

    const enableListView = () => {
        setGridView(false);
    }

    const handleChangeGenre = (event) => {
        setSelectedGenre(event.target.value);
    }

    const openAddDialog = () => {
        setIsAddDialogOpen(true);
    }

    const handleCloseAddDialog = () => {
        setIsAddDialogOpen(false);
    }

    const handleCloseAndSaveAdd = (passedBook) => {
        createBook(passedBook).then(res => {
            refreshBooks();

        });
        setIsAddDialogOpen(false);

    }

    const handleCSEdit = () => {
        refreshBooks();
        setEditDialogOpen(false);
    }



    const handleDeleteBook = (value) => (event) => {
        event.stopPropagation();
        deleteBook(value).then(res => { refreshBooks() });
    }



    const handleCheckedChange = (value) => (event) => {
        checkedBooks.push(value);
    }

    const assignUserBook = (userID) => {
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].id === userID) {
                usersList[i].books = checkedBooks;
                setCheckedBooks([]);
            }
        }
        console.log(usersList)//console.log all users, assigned books are under user.books[]
    }

    const openEditDialog = (value) => (event) => {
        setBookToEdit(value);
        setEditDialogOpen(true);
    }

    const handleCloseEdit = () => {
        setEditDialogOpen(false);
    }

    return (
        <div className='homeScreenSuper'>
            <div className='homeScreenContent'>
                <div className="searchAndViewSection">
                    <TextField label="Search books" variant="outlined" value={searchParam} onChange={handleChange} />
                    <FormControl className='genreSelector' variant="outlined">
                        <InputLabel id="genreLabel">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="genreSelector"
                            value={selectedGenre}
                            onChange={handleChangeGenre}
                        >
                            <MenuItem value="" >None</MenuItem>
                            <MenuItem value="Children" >Children</MenuItem>
                            <MenuItem value="Romance">Romance</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="viewControls">
                        <ListIcon onClick={enableListView} className="controlIcon" />
                        <AppsIcon onClick={enableGridView} className="controlIcon" />
                    </div>
                    {loggedUsername === 'admin' && <Button
                        color="default"
                        className="addButton"
                        startIcon={<LibraryAddIcon />}
                        onClick={openAddDialog}
                    >
                        Add book
                </Button>}
                </div>
                {gridView ? (
                    <div className="gridViewContainer">
                        {filteredBooks.map((row, index) => (
                            <Card className="gridView" key={index} raised={true}>
                                <div className="imageContainer">
                                    <img src={row.coverImgUrl} alt='bookImage'/>
                                </div>
                                <div className="contentContainer">
                                    <p>Name: {row.bookName}</p>
                                    <p>Writer: {row.writer}</p>
                                    <p>Release Year: {row.releaseYear}</p>
                                    <p>Genre: {row.genre}</p>
                                </div>
                                {loggedUsername === 'admin' && <div className='actionsContainer'>
                                    <EditIcon className="editBookIcon" onClick={openEditDialog(row)} />
                                    <DeleteForeverIcon className="deleteBookIcon" onClick={handleDeleteBook(row.id)} />
                                </div>}
                            </Card>
                        ))}
                    </div>
                ) : (
                    <TableContainer className="listView">
                        <TableHead>
                            <TableRow>
                                {loggedUsername === 'admin' && <TableCell></TableCell>}
                                <TableCell>Cover</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Writer</TableCell>
                                <TableCell>Release Year</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredBooks.map((row, index) => (
                                <TableRow key={index} >
                                    {loggedUsername === 'admin' && <TableCell><Checkbox
                                        onChange={handleCheckedChange(row.id)}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    /></TableCell>}
                                    <TableCell><img src={row.coverImgUrl} className="listImage" alt='bookImage'></img></TableCell>
                                    <TableCell>{row.bookName}</TableCell>
                                    <TableCell>{row.writer}</TableCell>
                                    <TableCell>{row.releaseYear}</TableCell>
                                    <TableCell>{row.genre}</TableCell>
                                    {loggedUsername === 'admin' && <TableCell><EditIcon className="editBookIcon" onClick={openEditDialog(row)} /><DeleteForeverIcon className="deleteBookIcon" onClick={handleDeleteBook(row.id)} /></TableCell>}
                                </TableRow>
                            ))}
                        </TableBody>
                    </TableContainer>
                )}
                <AddDialog handleClose={handleCloseAddDialog} open={isAddDialogOpen} handleCloseAndSave={handleCloseAndSaveAdd} />
                <EditDialog handleClose={handleCloseEdit} open={editDialogOpen} bookToEdit={bookToEdit} handleCloseAndSave={handleCSEdit} />
            </div>
            {loggedUsername === 'admin' && <div className='adminControlsContainer'>
                <AdminPanel assignUserBook={assignUserBook} />
            </div>}
        </div>
    );
}