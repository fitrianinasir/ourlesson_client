import React from 'react';
import NavbarStudent from '../NavbarStudent/NavbarStudent'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next'
import axios from 'axios'
import './Jadwal.css'

const { SearchBar } = Search;
const headers = {
  'Authorization' : `Bearer ${localStorage.getItem('studentToken')}`,
  'Content-Type' : 'application/json'
}
class JadwalStudent extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        students:[],
        bioproducts:[],
        biocolumns:[
          {
            dataField: 'class',
            text: 'Kelas'
          },
          {
            dataField: 'tutor',
            text: 'Nama Tutor'
          },
          
          {
            dataField: 'subject',
            text: 'Mata Pelajaran'
          },
          {
            dataField: 'date',
            text: 'Tanggal'
          },
          {
            dataField: 'time',
            text: 'Waktu'
          },  
        ]
        
      }
    }

  async componentDidMount(){
    let getSchedules = await axios.get('http://127.0.0.1:8000/api/classes', {headers})
    this.setState({
      bioproducts : getSchedules.data
    })
  }
  render(){
    return(
      <div className="admin-body">
        <NavbarStudent pagetitle="Schedule"/>
        <ToolkitProvider
          keyField="id"
          data={ this.state.bioproducts }
          columns={ this.state.biocolumns }
          search
        >
          {
            props => (
              <div className="table-body">
                <h1 className="student-page-title">DAFTAR JADWAL</h1>
                <SearchBar { ...props.searchProps } />
                <BootstrapTable
                  { ...props.baseProps }
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>
    );
  }
}

export default JadwalStudent;