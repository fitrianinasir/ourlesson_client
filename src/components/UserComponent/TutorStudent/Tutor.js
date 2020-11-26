import React from 'react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next'
import NavbarStudent from '../NavbarStudent/NavbarStudent'
import axios from 'axios'
import './Tutor.css';

const { SearchBar } = Search;
const headers = {
  'Authorization' : `Bearer ${localStorage.getItem('studentToken')}`,
  'Content-Type' : 'application/json'
}

class TutorStudent extends React.Component{
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
            text: 'Mata Pelajaran'
          },
          {
            dataField: 'background',
            text: 'Latar  Belakang'
          },
          {
            dataField: 'email',
            text: 'Email'
          },
          {
            dataField: 'phone_number',
            text: 'No. HP'
          },
  
        ]
        
      }
    }
  async componentDidMount(){    
    let getTutors = await axios.get('http://127.0.0.1:8000/api/tutors', {headers})
    this.setState({
      bioproducts : getTutors.data
    })
  }
  render(){
  return (
      <div className="admin-body">
      <NavbarStudent pagetitle="Tutor List"/>
      <ToolkitProvider
          keyField="id"
          data={ this.state.bioproducts }
          columns={ this.state.biocolumns }
          search
        >
          {
            props => (
              <div className="table-body">
                <h1 className="student-page-title">DAFTAR TUTOR</h1>
                <SearchBar { ...props.searchProps } />
                <BootstrapTable
                  { ...props.baseProps }
                />
              </div>
            )
          }
        </ToolkitProvider>
  </div>
)
}
}
export default TutorStudent;
