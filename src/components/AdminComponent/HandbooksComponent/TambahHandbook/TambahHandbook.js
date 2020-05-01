import React, {Component} from 'react'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import Navbar from '../../Navbar/Navbar'
import axios from 'axios'
import swal from 'sweetalert';
import {Link} from 'react-router-dom'
import './TambahHandbook.css'

const headers = {
    'Authorization' : `Bearer ${localStorage.getItem('token')}`,
    'Content-Type' : 'application/json'
}

class TambahHandbook extends Component{
  constructor(props){
    super(props)
    this.formRef = React.createRef();
    this.state = {
      immediate:true,
      setFocusOnError:true,
      clearInputOnReset:false,
    }
  }

  getHandbookData = async(e) =>{
    e.preventDefault();
    const fileInput = document.querySelector('#fileupload') ;
    let form_data = new FormData();
    form_data.append('file', fileInput.files[0]);
    form_data.append('title', e.target.elements.title.value);
    
    axios.post(`http://127.0.0.1:8000/api/handbook`, form_data, {headers}).then(res=>{
      swal({
        title: "Success!",
        text: "Your Data Has Been Saved!",
        icon: "success",
        button: "ok",
      });
      this.props.history.push("/handbooks")
    }).catch(err=>{
      swal({
        title: "Failed!",
        text: "Re-check Your Data!",
        icon: "warning",
        button: "ok",
      });
    })
  }

  render(){
    return(
      <div className="add-admin-body">
      <Navbar pagetitle="Schedule"/>
      <div className="add-form-body">
        <h1 className="form-title">TAMBAH HANDBOOK</h1>
        <ValidationForm 
          onSubmit={this.getHandbookData} 
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}>
          <div className="form-group text-left">
            <label htmlFor="class">Mata Pelajaran</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="title" 
              name="title"
              placeholder="Mata Pelajaran" 
              successMessage="Looks good!"
              errorMessage="Please enter something"
              required/>
          </div>
          <div className="form-group text-left"> <br/>
            <label htmlFor="year">Handbook File</label><br/>
            <input type="file"  id="fileupload" name="file" />
          </div>
          <Link to="/handbooks">
            <button type="button" className="btn btn-warning cancel-button">Cancel</button>
          </Link>
            <button type="submit" className="btn btn-primary submit-button">Submit</button>
          </ValidationForm>
          </div>
      </div>
    )
  }
}

export default TambahHandbook