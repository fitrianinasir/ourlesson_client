import React from 'react';
import Navbar from '../../Navbar/Navbar'
import {Link} from 'react-router-dom'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import BootstrapTable from 'react-bootstrap-table-next'
import swal from 'sweetalert';
import './Jadwal.css'

import axios from 'axios'

const { SearchBar } = Search;

function bioFormatter(cell, row, rowIndex, formatExtraData) { 
  // console.log(row.id)
  return ( 
    <div>
      <Link to={`/edit-schedule/${row.class_id}`}>
        <button onClick={()=>{console.log(row.id)}} className="btn btn-warning survei-button">
        <FontAwesomeIcon icon={faEdit}/> 
        </button> 
      </Link>
        <button onClick={async(e) => {
           swal({
            title: "Apakah Anda Yakin ?",
            icon: "warning",
            buttons:["Batal", "Hapus"],
            dangerMode: true,
          }).then(async(move)=>{
            if(move){
              const headers = {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json'
              }
            await axios.delete(`http://127.0.0.1:8000/api/class/${row.class_id}`, {headers}).then(res=>console.log(res)).catch(err=>console.log(err))     
            window.location.href = '/schedules'
            }else{
              return
            }
          })
        }} className="btn btn-danger">
          <FontAwesomeIcon icon={faTrash}/> 
        </button> 
    </div>
); } 

class Jadwal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      bioproducts:[],
      biocolumns:[
        {
          dataField: 'class',
          text: 'Kelas'
        },
        {
          dataField: 'subject',
          text: 'Mata Pelajaran',
        },
        {
          dataField: 'tutor',
          text: 'Tutor Pengampu'
        },
        {
          dataField: 'date',
          text: 'Tanggal',
        },
        {
          dataField: 'time',
          text: 'Waktu',
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
    let getSchedules = await axios.get('http://127.0.0.1:8000/api/admin-classes', {headers})
    this.setState({
      bioproducts : getSchedules.data
    })
    console.log(getSchedules)
  }
    render(){
        return(
            <div className="admin-body">
                <Navbar pagetitle="Schedule"/>
                <ToolkitProvider
                  keyField="id"
                  data={ this.state.bioproducts }
                  columns={ this.state.biocolumns }
                  search
                >
                  {
                    props => (
                      <div className="table-body">
                        <h1 className="admin-page-title">DAFTAR JADWAL</h1>
                        <SearchBar { ...props.searchProps } />
                        <BootstrapTable
                          { ...props.baseProps }
                        />
                        <div style={{marginLeft:'78rem'}}>
                    <Link to="/add-schedule" >
                        <button className="btn btn-primary" >
                          <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight:'1rem'}}/>
                         Tambah Jadwal
                        </button>
                    </Link>
                    </div>
                      </div>
                    )
                  }
                </ToolkitProvider>
            </div>
        );
      }
    }

export default Jadwal;