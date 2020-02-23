import React from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faChalkboardTeacher, faEye} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Navbar from '../../Navbar/Navbar';
import './Tutor.css'

const { SearchBar } = Search;
function bioFormatter(cell, row, rowIndex, formatExtraData) { 
  console.log(row)
  return ( 
    <div>
      <Link to={`show-tutor/${row.id}`}>
        <button onClick={()=>{console.log(row.id)}} className="student-button btn btn-info">
        <FontAwesomeIcon icon={faEye} className="left-icon" /> 
        </button>
      </Link>
      <Link to={`/edit-tutor/${row.id}`}>
        <button onClick={()=>{console.log(row.id)}} className="edit-button btn btn-warning">
        <FontAwesomeIcon icon={faEdit}/> 
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
              await axios.delete(`http://127.0.0.1:8000/api/remove-tutor/${row.id}`, {headers}).then(res=>console.log(res)).catch(err=>console.log(err))     
              window.location.href = '/tutors'
            } else {
            return
            }
          }); 
        }} className="survei-button btn btn-danger">
            <FontAwesomeIcon icon={faTrash}/> 
        </button> 
    </div>
); } 

class Tutor extends React.Component{

    constructor(props){
      super(props)
      this.state = {
        bioproducts:[],
        biocolumns:[
          {
            dataField: 'tutor_name',
            text: 'Nama Tutor'
          },
          {
            dataField: 'tutor_subject',
            text: 'Mata Pelajaran',
          },
          {
            dataField: 'background',
            text: 'Latar Belakang Pendidikan'
          },
          {
            dataField: 'email',
            text: 'Email',
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
      const headers = {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : 'application/json'
      }
        let getTutors = await axios.get('http://127.0.0.1:8000/api/daftar-tutor', {headers})
        await this.setState({
          bioproducts:getTutors.data
        })
    }
    render(){
    return (
        <div className="admin-body">
        <Navbar pagetitle="Tutor List"/>
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
                <h1 className="admin-page-title">DAFTAR TUTOR</h1>
                <SearchBar { ...props.searchProps } />
                <BootstrapTable
                  { ...props.baseProps }
                />
                <div style={{marginLeft:'78rem'}}>
                    <Link to="/add-tutor" >
                        <button className="btn btn-primary" >
                          <FontAwesomeIcon icon={faChalkboardTeacher} style={{marginRight:'1rem'}}/>
                         Tambah Tutor
                        </button>
                    </Link>
                    </div>
              </div>
            </div>
          )
        }
      </ToolkitProvider>
    </div>
)
}
}
export default Tutor;
