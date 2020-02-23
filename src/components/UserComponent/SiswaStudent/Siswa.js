import React from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next'
import axios from 'axios'
import NavbarStudent from '../NavbarStudent/NavbarStudent'
import './Siswa.css';

const { SearchBar } = Search;
const headers = {
  'Authorization' : `Bearer ${localStorage.getItem('studentToken')}`,
  'Content-Type' : 'application/json'
}
class SiswaStudent extends React.Component {
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
          text: 'Nama Siswa'
        },
        
        {
          dataField: 'student_class',
          text: 'Kelas'
        },
        {
          dataField: 'year',
          text: 'Tahun Angkatan'
        },
        {
          dataField: 'schools',
          text: 'Asal Sekolah'
        },
        {
          dataField: 'email',
          text: 'Email'
        },

      ]
      
    }
  }
  async componentDidMount(){
    
    let getStudents = await axios.get('http://127.0.0.1:8000/api/student-details', {headers})
    this.setState({
      bioproducts : getStudents.data
    })
  }
    render(){
    return (
      <div className="admin-body">
        <NavbarStudent pagetitle="Student List"/>
        <ToolkitProvider
          keyField="id"
          data={ this.state.bioproducts }
          columns={ this.state.biocolumns }
          search
        >
          {
            props => (
              <div className="table-body">
                <h1 className="student-page-title">DAFTAR SISWA</h1>
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
    };
    
}
export default SiswaStudent;
