import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './components/Login/Login'
import LandingPage from './components/LandingPage/LandingPage'
import Navbar from './components/AdminComponent/Navbar/Navbar';
import AdminDashboard from './components/AdminComponent/AdminDashboard/AdminDashboard';
import Sidebar from './components/AdminComponent/Sidebar/Sidebar';
import Siswa from './components/AdminComponent/SiswaComponent/Siswa/Siswa';
import Tutor from './components/AdminComponent/TutorComponent/Tutor/Tutor';
import Handbooks from './components/AdminComponent/HandbooksComponent/Handbooks/Handbooks';
import Jadwal from './components/AdminComponent/JadwalComponent/Jadwal/Jadwal';
import StudentProfile from './components/UserComponent/StudentProfile/Profile'
import StudentLogin from './components/UserComponent/StudentLogin/SignIin'
import AdminLogin from './components/AdminComponent/AdminLogin/AdminLogin'
import TambahSiswa from './components/AdminComponent/SiswaComponent/TambahSiswa/TambahSiswa'
import EditSiswa from './components/AdminComponent/SiswaComponent/EditSiswa/EditSiswa'
import TambahTutor from './components/AdminComponent/TutorComponent/TambahTutor/TambahTutor'
import EditTutor from './components/AdminComponent/TutorComponent/EditTutor/EditTutor'
import TambahJadwal from './components/AdminComponent/JadwalComponent/TambahJadwal/TambahJadwal'
import EditJadwal from './components/AdminComponent/JadwalComponent/EditJadwal/EditJadwal'
import TampilkanSiswa from './components/AdminComponent/SiswaComponent/TampilkanSiswa/TampilkanSiswa'
import TampilkanTutor from './components/AdminComponent/TutorComponent/TampilkanTutor/TampilkanTutor'
// STUDENT ACTION
import SiswaStudent from './components/UserComponent/SiswaStudent/Siswa'
import TutorStudent from './components/UserComponent/TutorStudent/Tutor'
import JadwalStudent from './components/UserComponent/JadwalStudent/Jadwal'

// HANDBOOK COMPONENT
import HandbooksStudent from './components/UserComponent/HandbooksStudent/Handbooks'
import TambahHandbook from './components/AdminComponent/HandbooksComponent/TambahHandbook/TambahHandbook'
import EditHandbook from './components/AdminComponent/HandbooksComponent/EditHandbooks/EditHandbook'
class App extends Component {
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/home" component={LandingPage} />
          <Route path="/login" component={Login } />
          <Route path="/Navbar" component={Navbar} />
          <Route path="/Sidebar" component={Sidebar} />

          {/* ADMIN */}
          <Route path="/admin-login" component={AdminLogin}/>
          <Route path="/admin-dashboard" component={AdminDashboard} />

          {/* TUTOR */}
          <Route path="/tutors" component={Tutor} />
          <Route path="/add-tutor" component={TambahTutor}/>
          <Route path="/edit-tutor/:value" component={EditTutor}/>
          <Route path="/show-tutor/:value" component={TampilkanTutor}/>

          {/* STUDENT */}
          <Route path="/students" component={Siswa} />
          <Route path="/add-student" component={TambahSiswa}/>
          <Route path="/edit-student/:value" component={EditSiswa}/>
          <Route path="/show-student/:value" component={TampilkanSiswa}/>


          {/* SCHEDULE */}
          <Route path="/schedules" component={Jadwal}/>
          <Route path="/add-schedule" component={TambahJadwal}/>
          <Route path="/edit-schedule/:value" component={EditJadwal}/>

          {/* HANDBOOK */}
          <Route path="/handbooks" component={Handbooks}/>
          <Route path="/add-handbook" component={TambahHandbook}/>
          <Route path="/edit-handbook/:value" component={EditHandbook}/>

          {/* STUDENT ACTION */}
          <Route path="/student-login" component={StudentLogin}/>
          <Route path="/student-profile/:value" component={StudentProfile}/>

          {/* STUDENT ACCESS */}
          <Route path="/students-list" component={SiswaStudent}/>
          <Route path="/tutors-list" component={TutorStudent}/>
          <Route path="/schedules-list" component={JadwalStudent}/>
          <Route path="/handbooks-list" component={HandbooksStudent}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
