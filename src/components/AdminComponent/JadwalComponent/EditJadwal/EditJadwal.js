import React, {Component} from 'react'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import axios from 'axios'
import Navbar from '../../Navbar/Navbar'
import swal from 'sweetalert';
import './EditJadwal.css'
class EditJadwal extends Component{
  constructor(props){
    super(props)
    this.formRef = React.createRef();
    this.state = {
      immediate:true,
      setFocusOnError:true,
      clearInputOnReset:false,
      class:'',
      tutor:'',
      subject:'',
      date:'',
      time:''
    }
  }

  async componentDidMount(){
    let id = this.props.match.params.value
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
    let getScheduleData = await axios.get(`http://127.0.0.1:8000/api/class/${id}`, {headers})
    this.setState({
      id : getScheduleData.data[0].data.class_id,
      class : getScheduleData.data[0].data.class,
      tutor : getScheduleData.data[0].data.tutor,
      subject : getScheduleData.data[0].data.subject,
      date : getScheduleData.data[0].data.date,
      time : getScheduleData.data[0].data.time,
    })
  }

  classHandler = async(e) =>{
    await this.setState({
      class : e.target.value
    })
    console.log(this.state.class)
  }

  tutorHandler = async(e) =>{
    await this.setState({
      tutor : e.target.value
    })
    console.log(this.state.tutor)
  }

  subjectHandler = async(e) =>{
    await this.setState({
      subject : e.target.value
    })
    console.log(this.state.subject)
  }

  dateHandler = async(e) =>{
    await this.setState({
      date : e.target.value
    })
    console.log(this.state.date)
  }

  timeHandler = async(e) =>{
    await this.setState({
      time : e.target.value
    })
    console.log(this.state.time)
  }


  updateScheduleData = async(e) =>{
    e.preventDefault();
    const jadwal = {
        
        class : this.state.class,
        subject : this.state.subject,
        tutor : this.state.tutor,
        time : this.state.time,
        date : this.state.date,

    }
    const headers = {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type' : 'application/json'
    }
    axios.put(`http://127.0.0.1:8000/api/class/${this.state.id}`, jadwal, {headers}).then(res=>{
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
    this.props.history.push("/schedules")
  }

  render(){
    return(
      <div className="add-admin-body">
        <Navbar pagetitle="Edit Jadwal"/>
        <div className="add-form-body">
        <h1 className="form-title">TAMBAH JADWAL</h1>
        <ValidationForm 
          onSubmit={this.updateScheduleData} 
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
              value={this.state.class}
              onChange={this.classHandler}
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
              value={this.state.subject}
              onChange={this.subjectHandler}
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
              value={this.state.tutor}
              onChange={this.tutorHandler}
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
              value={this.state.date}
              onChange={this.dateHandler}
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
              value={this.state.time}
              onChange={this.timeHandler}
              successMessage="Looks good!" 
              errorMessage="Please enter something" 
              required/>
          </div>          
            <button type="submit" class="btn btn-warning cancel-button" onClick={()=> this.props.history.push('/schedules')}>Kembali</button>
            <button type="submit" className="btn btn-primary submit-button">Kirim</button>
          </ValidationForm>
          </div>
      </div>
    )
  }
}

export default EditJadwal