import React, { useState } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "react-error-boundary";
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { usersCollection } from "./../stitch";
import { GoTrashcan } from "react-icons/go";
import DeleteUserModal from "./DeleteUserModal"
import { GoCheck, GoChevronUp, GoChevronDown, GoCircleSlash } from "react-icons/go";

AllUsersTable.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func
};

export default function AllUsersTable() {
  const sortCaret = (order)=>{
    if (!order) return (<span className='pull-right'><GoChevronUp color="#ababab"/><GoChevronDown color="#ababab"/></span>);
    else if (order === 'asc') return (<span className='pull-right'><GoChevronUp color="#ababab"/><GoChevronDown/></span>);
    else if (order === 'desc') return (<span className='pull-right'><GoChevronUp/><GoChevronDown color="#ababab"/></span>);
    return null;
  }
    const [userToDelete, setUserToDelete] = useState(null);
    const [userToUpdate, setUserToUpdate] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    const columns = [{
        dataField: 'name',
         text: 'Name',
         sort:true,
         sortCaret: sortCaret
       }, {
         dataField: 'email',
         text: 'Email',
         sort: true,
         sortCaret: sortCaret
       },{
        dataField: 'phone',
        text: 'Phone',
        sort: true,
        sortCaret: sortCaret
      },{
        dataField: 'confirmed',
        text: 'Conf?',
        sort: true,
        sortCaret: sortCaret,
        align: 'center',
        headerStyle: { fontSize: '10px' },
        formatter: (t)=>{return (t ? <GoCheck color="#ababab"/> : <GoCircleSlash color="#ababab"/>)}
      },{
        dataField: '',
        text: 'Delete User',
        align: 'center',
        events:{onClick: (e, column, columnIndex, row, rowIndex) => {setUserToDelete(row)}},
        formatter: () => {return (<GoTrashcan color='red'/>)}
      }];

      const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
      }];


    if (allUsers.length === 0) {
        usersCollection.find().toArray().then(users=>{
        setAllUsers(users);
        });
    }

  return (
    <ErrorBoundary>
      <BootstrapTable 
          bootstrap4 
          keyField='_id' 
          data={ allUsers } 
          columns={ columns } 
          cellEdit={ cellEditFactory(
            { mode: 'dbclick',
              afterSaveCell: (oldValue, newValue, row, column) => setUserToUpdate({user:row, field:column.dataField, newValue: newValue, oldValue:oldValue})
            })}
          striped hover condensed
          defaultSorted={ defaultSorted } 
          />
        <DeleteUserModal close={()=>setUserToDelete(null)} type="delete"  show={userToDelete != null} {...userToDelete} />
        <DeleteUserModal close={()=>setUserToUpdate(null)} type="update" show={userToUpdate != null}  {...userToUpdate} />
    </ErrorBoundary>
  ); 
}