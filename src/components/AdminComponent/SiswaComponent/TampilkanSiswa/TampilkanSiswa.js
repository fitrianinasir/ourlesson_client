import React,{Component} from 'react'
import axios from 'axios'
import Navbar from '../../Navbar/Navbar'
import './TampilkanSiswa.css'

class TampilkanSiswa extends Component{
  constructor(props){
    super(props)
    this.state = {
      img:'',
      name:'',
      nis:'',
      birthplace:'',
      birthdate:null,
      address:'',
      religion:'',
      gender:'',
      student_class:'',
      school:'',
      year:null,
      email:'',
      phone_number:null

    }
  }
  async componentDidMount(){
    let studentId = this.props.match.params.value
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
    let getStudent = await axios.get(`http://127.0.0.1:8000/api/detail/${studentId}`, {headers})
    await this.setState({
      img: getStudent.data[0].image,
      nis: getStudent.data[0].nis,
      name: getStudent.data[0].student_name,
      birthplace: getStudent.data[0].birthplace,
      birthdate: getStudent.data[0].birthdate,
      address: getStudent.data[0].address,
      religion: getStudent.data[0].religion,
      gender: getStudent.data[0].gender,
      student_class: getStudent.data[0].student_class,
      school: getStudent.data[0].schools,
      year: getStudent.data[0].year,
      email: getStudent.data[0].email,
      phone_number: getStudent.data[0].phone_number,
    })
    console.log(getStudent.data)
  }
  render(){
    let {img,name, nis, birthdate, birthplace, address, religion, gender, student_class, school, year, email, phone_number} = this.state
    return(
      <div className="add-admin-body">
        <Navbar pagetitle="Show Student"/>
        <div className="add-form-body">
          <center><img src={`http://localhost/ourlesson_api/storage/app/public/uploads/${img}`} alt="" className="student-img"/></center>
          <h3 className="student-name">{name}</h3>
          <table cellPadding="15">
            <tr>
              <td>NIS</td>
              <td>: {nis}</td>
            </tr>
            <tr>
              <td>Tempat Lahir</td>
              <td>: {birthplace}</td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td>: {birthdate}</td>
            </tr>
            <tr>
              <td>Alamat</td>
              <td>: {address}</td>
            </tr>
            <tr>
              <td>Agama</td>
              <td>: {religion}</td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>: {gender}</td>
            </tr>
            <tr>
              <td>Kelas Les</td>
              <td>: {student_class}</td>
            </tr>
            <tr>
              <td>Asal Sekolah</td>
              <td>: {school}</td>
            </tr>
            <tr>
              <td>Angkatan</td>
              <td>: {year}</td>
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
          <button type="submit" class="btn btn-warning cancel-button" onClick={()=> this.props.history.push('/students')}>Kembali</button>
        </div>
      </div>
    )
  }
}

export default TampilkanSiswa