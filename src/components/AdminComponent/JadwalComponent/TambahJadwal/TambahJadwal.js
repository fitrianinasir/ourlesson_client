import React, {Component} from 'react'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import Navbar from '../../Navbar/Navbar'
import axios from 'axios'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';
import './TambahJadwal.css'

class TambahJadwal extends Component{
  constructor(props){
    super(props)
    this.formRef = React.createRef();
    this.state = {
      immediate:true,
      setFocusOnError:true,
      clearInputOnReset:false,
    }
  }

  getScheduleData = async(e) =>{
    e.preventDefault();
    const jadwal = {
        class : e.target.elements.class.value,
        subject : e.target.elements.subject.value,
        tutor : e.target.elements.tutor.value,
        time : e.target.elements.time.value,
        date : e.target.elements.date.value,

    }
    const headers = {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : 'application/json'
      }
    axios.post(`http://127.0.0.1:8000/api/class`, jadwal, {headers}).then(res=>{
      swal({
        title: "Sukses!",
        text: "Data Anda Telah Berhasil Disimpan!",
        icon: "success",
        button: "ok",
      });
      this.props.history.push("/schedules")
    }).catch(err=>{
      swal({
        title: "Gagal!",
        text: "Silakan Cek Ulang Data Anda",
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
        <h1 className="form-title">TAMBAH JADWAL</h1>
        <ValidationForm 
          onSubmit={this.getScheduleData} 
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}>
          <div className="form-group text-left">
            <label htmlFor="class">Kelas</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="class" 
              name="class"
              placeholder="Kelas" 
              successMessage="Looks good!"
              errorMessage="Please enter something"
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="subject">Mata Pelajaran</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="subject" 
              name="subject"
              placeholder="Mata Pelajaran" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="tutor">Nama Tutor</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="tutor" 
              name="tutor"
              placeholder="Nama Tutor" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>
          <div className="form-group text-left">
            <label htmlFor="date">Tanggal</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="date" 
              name="date"
              placeholder="Tanggal" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div> 
          <div className="form-group text-left">
            <label htmlFor="time">Waktu</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-12 input-style" 
              id="time" 
              name="time"
              placeholder="Waktu" 
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>          
          <Link to="/Jadwal">
            <button type="button" className="btn btn-warning cancel-button">Kembali</button>
          </Link>
            <button type="submit" className="btn btn-primary submit-button">Kirim</button>
          </ValidationForm>
          </div>
      </div>
    )
  }
}

export default TambahJadwal