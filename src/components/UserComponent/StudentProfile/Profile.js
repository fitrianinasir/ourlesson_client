import React,{Component} from 'react'
import Navbar from '../NavbarStudent/NavbarStudent'
import axios from 'axios'
import './Profile.css'


const headers = {
  'Authorization' : `Bearer ${localStorage.getItem('studentToken')}`,
  'Content-Type' : 'application/json'
}
class Profile extends Component{
  constructor(props){
    super(props)
    this.state = {
      studentName:'',
      studentClass:'',
      studentAcademy:'',
      studentStatus:'',
      student:[],
      nis:undefined,
      img_profile:''
    }
  }
  async componentDidMount(){
    let getStudents = await axios.get('http://127.0.0.1:8000/api/student-details', {headers})
    let getNis = this.props.match.params.value
    let studentFilter = getStudents.data.filter(student => student.nis === getNis)
    await this.setState({
      student : studentFilter[0],
      nis : studentFilter[0].nis,
      img_profile : studentFilter[0].image
    })    
    localStorage.setItem('nis', this.state.nis)
  }
    render(){
      let {student} = this.state
        return(
          <div className="profile-container">
          <Navbar pagetitle="Student Profile"/>
            <div className="profile-part">
              <div className="profile-picture">
                <img src={`http://localhost/ourlesson_api/storage/app/public/uploads/${this.state.img_profile}`} alt="" className="picture-style"/>
              </div>
              <h1 className="profile-name">{student.student_name}</h1>
              <h3 className="profile-description">KELAS {student.student_class}</h3>
            </div>
            <div className="description-part">
              <div className="description-head">
                <h6 className="year">Tahun Angkatan {student.year}</h6>
              </div>
              <hr/>
                <p>Birthplace    : {student.birthplace}</p>
                <p>Birthdate     : {student.birthdate}</p>
                <p>Address       : {student.address}</p>
                <p>Religion      : {student.religion}</p>
                <p>Gender        : {student.gender}</p>
                <p>School        : {student.schools}</p>
                <p>Email         : {student.email}</p>
              
            </div>
          </div>
        )
        
  }
}

export default Profile