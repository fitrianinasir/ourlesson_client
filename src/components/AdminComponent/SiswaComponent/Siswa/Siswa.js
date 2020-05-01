import React from 'react';
import swal from 'sweetalert';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faUserFriends, faEye} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Navbar from '../../Navbar/Navbar';
import './Siswa.css';

const { SearchBar } = Search;
function bioFormatter(cell, row, rowIndex, formatExtraData) { 
  console.log(row)
  return ( 
    <div>
      <Link to={`show-student/${row.id}`}>
        <button onClick={()=>{console.log(row.id)}} className="student-button btn btn-info">
        <FontAwesomeIcon icon={faEye} className="left-icon" /> 
        </button>
      </Link>
      <Link to={`/edit-student/${row.id}`}>
        <button onClick={()=>{console.log(row.id)}} className="student-button btn btn-warning">
        <FontAwesomeIcon icon={faEdit} className="left-icon" /> 
        </button> 
      </Link>
        <button onClick={async(e) => {
          swal({
            title: "Apakah Anda Yakin ?",
            icon: "warning",
            buttons:["Batal", "Hapus"],
            dangerMode: true,
          })
          .then(async(move) => {
            if(move) {
              const headers = {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json'
              }
              await axios.delete(`http://127.0.0.1:8000/api/remove/${row.id}`, {headers}).then(res=>console.log(res)).catch(err=>console.log(err))     
              window.location.href = '/students'
            } else {
            return
            }
          }); 
        }} className="survei-button btn btn-danger">
          <FontAwesomeIcon icon={faTrash} className="left-icon" /> 
        </button> 
    </div>
); } 
const headers = {
  'Authorization' : `Bearer ${localStorage.getItem('token')}`,
  'Content-Type' : 'application/json'
}
class Siswa extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      students:[],
      bioproducts:[],
      biocolumns:[
        {
          dataField: 'nis',
          text: 'NIS'
        },
        {
          dataField: 'student_name',
          text: 'Nama Siswa',
        },
        {
          dataField: 'Aksi',
          text: 'Aksi',
          formatter:bioFormatter
        }
    ],
    }
  }
  
    async componentDidMount(){
      let getStudents = await axios.get('http://127.0.0.1:8000/api/details', {headers})
      this.setState({
      bioproducts : getStudents.data
    })
    console.log(this.state.bioproducts)
  }
  
  render(){
    
    return (
      <div className="admin-body">
      <Navbar pagetitle="Student List"/>
      
      <ToolkitProvider
        keyField="id"
        data={ this.state.bioproducts }
        columns={ this.state.biocolumns }
        search
      >
        {
          props => (
            <div>
              <div className="table-body">
              <h1 className="admin-page-title">DAFTAR SISWA</h1>
                <SearchBar { ...props.searchProps } />
                <BootstrapTable
                  { ...props.baseProps }
                />
                <div style={{marginLeft:'78rem'}}>
                    <Link to="/add-student" >
                        <button className="btn btn-primary" >
                          <FontAwesomeIcon icon={faUserFriends} style={{marginRight:'1rem'}}/>
                         Tambah Siswa
                        </button>
                    </Link>
                    </div>
              </div>
            </div>
          )
        }
      </ToolkitProvider>
      
  </div>
      );
    };
}


export default Siswa;
