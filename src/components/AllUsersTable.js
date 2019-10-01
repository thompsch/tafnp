import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import ErrorBoundary from "react-error-boundary";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { usersCollection } from "./../stitch";
import { GoTrashcan } from "react-icons/go";
import DeleteUserModal from "./DeleteUserModal"

AllUsersTable.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func
};

export default function AllUsersTable() {
  
    const [userToDelete, setUserToDelete] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const columns = [{
        dataField: 'name',
         text: 'Name'
       }, {
         dataField: 'email',
         text: 'Email'
       },{
        dataField: 'phone',
        text: 'Phone'
      },{
        dataField: '',
        text: 'Delete User',
        events:{onClick: (e, column, columnIndex, row, rowIndex) => {deleteUser(row)}},
        formatter: (cellContent, row) => {return (<GoTrashcan color='red'/>)}
      }];

    if (allUsers.length===0) {
        usersCollection.find().toArray().then(users=>{
        setAllUsers(users);
        })
    }

  return (
    <ErrorBoundary>
      <BootstrapTable keyField='_id' data={ allUsers } columns={ columns } cellEdit={ cellEditFactory({ mode: 'dbclick' })} striped hover condensed/>
        <DeleteUserModal close={()=>setUserToDelete(null)} show={userToDelete != null} user={userToDelete} />
    </ErrorBoundary>
  ); 


function deleteUser(user){
    //console.log('user?', user)
    setUserToDelete(user);
    //console.log(userToDelete)
    
    //move user to new collection for soft delete? or mark as deleted?
    //console.log("You're about to make someone sad...", user.name, user.email);
    //softDeleteUser(user)
}
}

const List = styled.ul`
  padding: 0;
  margin-top: 10px;
  width: 450px;
`;
