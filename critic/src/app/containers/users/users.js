/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, TextField, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { CriticDispatchers, CriticStore } from 'app/store/store';
import UserCard from 'app/components/user.card';
import { apiService } from 'app/services/apiService';
import ConfirmDialog from 'app/components/confirm.dialog';
import UserEditable from 'app/components/user.editable';

const StyledUsersContainer = styled.div`
  h4{
    margin: 32px 0;
  }
  .crt-users-filter{
      display: flex;
      margin: 32px 0;

      .crt-textfield{
        flex-grow: 1;
      }
  }
`;

function UsersContainer() {
    const [userFilter, setUserFilter] = useState("")
    const [editingUser, setEditingUser] = useState(null)
    const [deletingUser, setDeletingUser] = useState(null)
    const [fetchFlag, setFetchFlag] = useState(null)
    const {state, dispatch} = useContext(CriticStore)
    const {users} = state

    useEffect( () => {
        apiService.getUsers(userFilter)
                  .then( (users) => dispatch(CriticDispatchers.setUsers(users)) )
    }, [userFilter, fetchFlag])
    
    const filterUsersByText = (event) => setUserFilter(event.target.value) 
    const clearTextFilter = () => setUserFilter("") 

    // Edit methods
    const editUser = (user) => setEditingUser(user)
    const cancelEditingUser = () => setEditingUser(null)
    const performEditUser = (user) => {
       apiService.editUser(user)
                 .then(() => {
                     setEditingUser(null)
                     setFetchFlag(fetchFlag + 1)
                 })
    }

    // Delete methods
    const deleteUser = (user) => setDeletingUser(user)
    const cancelDeletingUser  = () => setDeletingUser(null)
    const performDeleteUser = () => {
        apiService.deleteUser(deletingUser.id)
                  .then(() => {
                    setDeletingUser(null)
                      setFetchFlag(fetchFlag + 1)
                  })
     }
    return (
        <StyledUsersContainer>
            {editingUser && 
                <UserEditable user={editingUser} onCancel={cancelEditingUser} onEdit={performEditUser} />
            }
            {deletingUser && 
                <ConfirmDialog title="Delete User" message="Are you sure you want to delete this user?" 
                                onCancel={cancelDeletingUser} onConfirm={() => performDeleteUser()} />
            }
            <Typography variant="h4" align="left" color="primary">Users</Typography>
            <div className="crt-users-filter">
                <IconButton  onClick={filterUsersByText}><SearchIcon/></IconButton>
                <TextField  className="crt-textfield" value={userFilter}
                            label="Type some text to filter out users" onChange={filterUsersByText} />
                <IconButton color="primary" aria-label="clear" onClick={clearTextFilter}><ClearIcon /></IconButton>
            </div>
            <div id="crt-users-content">
                {users.map( (user) => (
                    <UserCard key={user.id} user={user} onEdit={editUser} onDelete={deleteUser}/>
                ))}
            </div>
        </StyledUsersContainer>
    );
}

export default UsersContainer;