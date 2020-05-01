  import React from 'react';
import axios from 'axios'
import swal from 'sweetalert';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faDownload, faBook} from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../Navbar/Navbar'
import './Handbooks.css'

const headers = {
  'Authorization' : `Bearer ${localStorage.getItem('token')}`,
  'Content-Type' : 'application/json'
}
const { SearchBar } = Search;
function bioFormatter(cell, row, rowIndex, formatExtraData) { 
  console.log(row)
  return ( 
    <div>
      <Button className="btn btn-primary btn-download"
               href={`http://localhost/ourlesson_api/storage/app/public/file/${row.file}`}
                
                target="_blank"
                onClick={(e)=>console.log(e)}
                >
        <FontAwesomeIcon icon={faDownload}/>  </Button>
      <Link to={`/edit-handbook/${row.id}`}>
        <button onClick={()=>{console.log(row.id)}} className="student-button btn btn-warning">
        <FontAwesomeIcon icon={faEdit}/> 
        </button> 
      </Link>

        <button onClick={async(e) => {
          swal({
            title: "Apakah Anda Yakin?",
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
              await axios.delete(`http://127.0.0.1:8000/api/handbook/${row.id}`, {headers}).then(res=>console.log(res)).catch(err=>console.log(err))     
              window.location.href = '/handbooks'
            } else {
            return
            }
          }); 
        }} className="survei-button btn btn-danger"><FontAwesomeIcon icon={faTrash}/> </button> 
    </div>
); } 
class Handbooks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      students:[],
      bioproducts:[],
      biocolumns:[
        {
          dataField: 'Title',
          text: ' Mata Pelajaran',
        },
        {
          dataField: 'file',
          text: 'Judul Handbook',
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
    let getFiles = await axios.get('http://127.0.0.1:8000/api/handbooks', {headers})
    this.setState({
      bioproducts : getFiles.data
    })
    console.log(this.state.bioproducts)
  }
  render(){
    return(
        <div className="admin-body">
            <Navbar pagetitle="Handbooks"/>
            <ToolkitProvider
              keyField="id"
              data={ this.state.bioproducts }
              columns={ this.state.biocolumns }
              search
            >
              {
                props => (
                  <div className="table-body">
                    <h1 className="admin-page-title">DAFTAR HANDBOOK</h1>
                    <SearchBar { ...props.searchProps } />
                    <BootstrapTable
                      { ...props.baseProps }
                    />

                    <div style={{marginLeft:'75rem'}}>
                    <Link to="/add-handbook" >
                        <button className="btn btn-primary" >
                          <FontAwesomeIcon icon={faBook} style={{marginRight:'1rem'}}/>
                         Tambah Handbook
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

export default Handbooks;