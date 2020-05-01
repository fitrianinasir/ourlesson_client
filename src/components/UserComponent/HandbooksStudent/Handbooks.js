import React from 'react';
import NavbarStudent from '../NavbarStudent/NavbarStudent'
import {Button} from 'react-bootstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Handbooks.css'


const { SearchBar } = Search;
const headers = {
  'Authorization' : `Bearer ${localStorage.getItem('studentToken')}`,
  'Content-Type' : 'application/json'
}
function bioFormatter(cell, row, rowIndex, formatExtraData) { 
  console.log(row)
  return ( 
    <div>
      <Button className="btn btn-primary btn-download"
              href={`http://localhost/ourlesson_api/storage/app/public/file/${row.file}`}
              
              target="_blank"
              onClick={(e)=>console.log(e)}
              >
        <FontAwesomeIcon icon={faDownload} className="left-icon" /> 
        {/* <FontAwesomeIcon icon="download" style={{fontSize:'3rem'}}/> */}
        </Button>
    </div>
); } 
class HandbooksStudent extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        students:[],
        bioproducts:[],
        biocolumns:[
          {
            dataField: 'Title',
            text: 'Mata Pelajaran'
          },
          {
            dataField: 'file',
            text: 'Judul Handbook'
          },
          {
            dataField: 'Aksi',
            text: 'Aksi',
            formatter:bioFormatter
          }
        ]
      }
    }
    async componentDidMount(){
      let getHandbooks = await axios.get('http://127.0.0.1:8000/api/handbooks-student', {headers})
      this.setState({
        bioproducts: getHandbooks.data
      })
      console.log(this.state.bioproducts)
    }
    render(){
        return(
          <div className="admin-body">
            <NavbarStudent pagetitle="Handbooks"/>
            <ToolkitProvider
              keyField="id"
              data={ this.state.bioproducts }
              columns={ this.state.biocolumns }
              search
            >
              {
                props => (
                  <div className="table-body">
                    <h1 className="student-page-title">DAFTAR HANDBOOKS</h1>
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

export default HandbooksStudent;