import React, { useState } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import "./adminPanel.css"

export default function AdminPanel(props) {

    const [selectedUser, setSelectedUser] = useState('None');

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

    const handleChange = (event) => {
        setSelectedUser(event.target.value)
    }

    const handleSubmit = () => {
        props.assignUserBook(selectedUser);
    }

    return (
        <div className='panelContainer'>
            <h4 id="titleOnPanel">Admin Panel</h4>
            <p id="labelOnPanel">Select user:</p>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                className="userSelector"
                label="Select user"
                value={selectedUser}
                onChange={handleChange}
            >
                <MenuItem value=''>None</MenuItem>
                <MenuItem value={1}>{user1.name}</MenuItem>
                <MenuItem value={2}>{user2.name}</MenuItem>
                <MenuItem value={3}>{user3.name}</MenuItem>
            </Select>
            <Button variant="contained" onClick={handleSubmit} className="assignButton">
                Assign
            </Button>
        </div>
    )
}