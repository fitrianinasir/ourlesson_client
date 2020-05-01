import React, {Component} from 'react'
import Image from '../../asset/profile-ex.jpg'
import {Link} from 'react-router-dom'
import './LandingPage.css'

class LandingPage extends Component{
  render(){
    return(
      <div>
        <div class="headbar cf">
            <h1 class="ourlesson">Our<span>Lesson</span></h1>
            <div className="headbar-list">
              <a href="#main">Home</a>
              <a href="#about">About Us</a>
              <a href="#classes">Classes and Lessons</a>
              <a href="#contact">Contact Us</a>
              <a href="/login">Login</a>
            </div>
        </div>
        <div class="page cf">
            <div class="container1 cf" id="main">
                <div className="container1-sub" id="home">
                <h3 className="sub-title">BIMBINGAN BELAJAR TERBAIK SEINDONESIA</h3>
                <div className="sub-title2">
                    <p >Bergabung Bersama Kami</p>
                </div>
                </div>
            </div>
            
            <div id="about" class="container2">
                <div >
                  <h2>About Us</h2>
                </div>
                <p>OurLesson merupakan website pendidikan bertujuan untuk memberikan pendidikan terbaik kepada siswa siswi di Indonesia. Kami akan membantu kalian untuk mendapat tutor yang berkualitas.
                Pendirian OurLesson dilatarbelakangi karena mendambakan terwujudnya pendidikan yang berkualitas di Indonesia yang bukan hanya menghasilkan mutu lulusan yang berprestasi tinggi dalam akademis namun mereka juga mempunyai budi pekerti dan akhlak terpuji. Di sisi lain, kebutuhan akan bimbingan belajar siswa saat ini sangat tinggi. Oleh karena itu OurLesson ingin mengambil peranan aktif dan turut berkontribusi dalam bidang pendidikan.
                </p>
                <p>OurLesson memiliki visi "Menjadi lembaga bimbel terkemuka di indonesia yang mewujudkan generasi berbudi pekerti serta akhlak terpuji dan Berilmu pengetahuan". OurLesson memberikan layanan belajar berbasis teknologi, termasuk layanan kelas, serta materi-materi pendidikan yang bisa diakses melalu website.</p>
            </div>
            <div className="container6">
                <p className="container6-sub">Belajar dengan Mudah dan Menyenangkan Bersama</p>
                <div className="container6-sub2">
                    <p>OUR<span>LESSON</span></p>
                </div>
            </div>
            <div id="classes" class="container3 cf">
                <h2> Kelas dan Pelajaran</h2>
                <div class="landing-page-table">
                    <table>
                        <tr>
                            <th>SD</th>
                            <th>SMP</th>
                            <th>SMA</th>
                            <th>Ujian Nasional</th>
                            <th>UTBK</th>
                        </tr>
                        <tr>
                            <td>IPA</td>
                            <td>IPA</td>
                            <td>IPA</td>
                            <td>IPA</td>
                            <td>IPA</td>
                        </tr>
                        <tr>
                            <td>Matematika</td>
                            <td>Matematika</td>
                            <td>Matematika</td>
                            <td>Matematika</td>
                            <td>Matematika</td>
                        </tr>
                        <tr>
                            <td>IPS</td>
                            <td>IPS</td>
                            <td>IPS</td>
                            <td>IPS</td>
                            <td>IPS</td>
                        </tr>
                        <tr>
                            <td>Bahasa Indonesia</td>
                            <td>Bahasa Indonesia</td>
                            <td>Bahasa Indonesia</td>
                            <td>Bahasa Indonesia</td>
                            <td>Bahasa Indonesia</td>
                        </tr>
                        <tr>
                            <td>English</td>
                            <td>English</td>
                            <td>English</td>
                            <td>English</td>
                            <td>English</td>
                        </tr>
                    </table>
                </div>              
            
          </div>
          <div class="container4 cf">
                <h2 class="bait">Sudahkah kamu bergabung dengan OurLesson?</h2>
                <div class="here">
                    <h2>Akses Dashboardmu Disini!</h2>
                    <Link to="/login">
                        <button className="login-button" id="login">LOGIN</button>
                    </Link>
                </div>
          </div>
          <div class="container5">
                <h2 id="contact">Contact Us!</h2>
                <div class="contactbox">
                    <div class="socmed">
                        <div><h3>Instagram <p><a href="instagram.com">ourlesson</a></p></h3></div> <br/>
                        <div><h3>Whatsapp <p><a href="whatsapp">08xx123xx</a></p></h3></div>
                    </div>
                    <div class="notsocmed">
                        <div><h2>Email us</h2></div>
                        <div><a href="mail.google.com//">our@lesson.com</a></div> <br/>
                        <div><h2>Our Location</h2></div>
                        <div><a href="maps.google.com////">Jl. Wahidin Sudirohusodo no.13</a></div>
                    </div>
                </div>
            </div>
      </div>
      <div class="footer">
            <p>copyrights 2019 OurLesson all rights reserved</p>
        </div>
    </div>
    )
  }
}

export default LandingPage