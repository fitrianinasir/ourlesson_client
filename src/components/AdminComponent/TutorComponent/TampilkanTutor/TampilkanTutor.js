import React,{Component} from 'react'
import axios from 'axios'
import Navbar from '../../Navbar/Navbar'
import './TampilkanTutor.css'

class TampilkanSiswa extends Component{
  constructor(props){
    super(props)
    this.state = {
      tutor_name:'',
      tutor_subject:'',
      background:'',
      email:'',
      phone_number:''

    }
  }
  async componentDidMount(){
    let tutorId = this.props.match.params.value
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
    let getTutor = await axios.get(`http://127.0.0.1:8000/api/tutor/${tutorId}`, {headers})
    await this.setState({
      tutor_name: getTutor.data[0].data.tutor_name,
      tutor_subject: getTutor.data[0].data.tutor_subject,
      background: getTutor.data[0].data.background,
      email: getTutor.data[0].data.email,
      phone_number: getTutor.data[0].data.phone_number,
    })
    console.log(getTutor.data)
  }
  render(){
    let {tutor_name, tutor_subject, background, email, phone_number} = this.state
    return(
      <div className="add-admin-body">
        <Navbar pagetitle="Show Student"/>
        <div className="add-form-body">
        <h3 className="student-name">Profil Tutor</h3>
          <table cellPadding="15">
            <tr>
              <td>Nama</td>
              <td>: {tutor_name}</td>
            </tr>
            <tr>
              <td>Mata Pelajaran</td>
              <td>: {tutor_subject}</td>
            </tr>
            <tr>
              <td>Latar Belakang</td>
              <td>: {background}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>: {email}</td>
            </tr>
            <tr>
              <td>No. HP</td>
              <td>: {phone_number}</td>
            </tr>
          </table>
          <button type="submit" class="btn btn-warning cancel-button" onClick={()=> this.props.history.push('/tutors')}>Kembali</button>
        </div>
      </div>
    )
  }
}

export default TampilkanSiswa