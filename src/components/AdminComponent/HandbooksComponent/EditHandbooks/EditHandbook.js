import React, {Component} from 'react'
import { ValidationForm, TextInput} from "react-bootstrap4-form-validation";
import axios from 'axios'
import swal from 'sweetalert';
import './EditHandbook.css'

const headers = {
    'Authorization' : `Bearer ${localStorage.getItem('token')}`,
    'Content-Type' : 'application/json'
  }

class EditHandbook extends Component{
  constructor(props){
    super(props)
    this.formRef = React.createRef();
    this.state = {
      immediate:true,
      setFocusOnError:true,
      clearInputOnReset:false,
      id:null,
      title:'',
      file:'',
      fileName:'',
      coba:''
    }
  }

  async componentDidMount(){
    const headers = {
      'Authorization' : `Bearer ${localStorage.getItem('token')}`,
      'Content-Type' : 'application/json'
    }
      let handbookId = this.props.match.params.value
      let getHandbook = await axios.get(`http://127.0.0.1:8000/api/handbook/${handbookId}`, {headers})
      await this.setState({
        id : getHandbook.data[0].id,
        title: getHandbook.data[0].Title,
        file: getHandbook.data[0].file,
      })
      await this.setState({
        coba: `http://localhost/ourlesson_api/storage/app/public/file/${this.state.file}`
      })
      console.log(this.state.coba)
  }

  titleHandler = async(e) =>{
      await this.setState({
        title : e.target.value
      })
      console.log(this.state.title)
  }

  titleFileHandler = async(e) =>{
    switch (e.target.name) {
        // Updated this
        case 'selectedFile':
          console.log(this.state.fileName )
          if(e.target.files.length > 0) {
              // Accessed .name from file 
              if(this.state.file !== ''){
                await this.setState({ 
                  fileName : `http://localhost/ourlesson_api/storage/app/public/file/${this.state.file}`
                });
                console.log(this.state.fileName)
              }
          }
        break;
        default:
          await this.setState({ 
            file : e.target.files[0],
            fileName: e.target.files[0].name
          });
          console.log(this.state.fileName)
          console.log(this.state.file)
       }
  }
  

  updateHandbook = async(e) =>{
    e.preventDefault();

    // console.log(`http://localhost/ourlesson_api/storage/app/public/file/${this.state.file}`)
    const fileInput = document.querySelector('#fileupload') ;
    let form_data = new FormData()
    form_data.append('_method', 'PUT');
    form_data.append('title', this.state.title);
    form_data.append('file', fileInput.files[0]);
    axios.post(`http://127.0.0.1:8000/api/handbook/${this.state.id}`, form_data, {headers}).then(res=>{
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
        icon: "warning",
        button: "ok",
      });
    })
  }

  render(){
      let {title} = this.state
    return(
      <div className="edit-handbook-body">
        <h1 className="form-title text-left">EDIT HANDBOOK</h1>
        <ValidationForm 
          onSubmit={this.updateHandbook} 
          ref={this.formRef}
          immediate={this.state.immediate}
          setFocusOnError={this.state.setFocusOnError}>
           <div className="form-group text-left">
            <label>Title</label>
            <TextInput 
              type="text" 
              className="form-control col-lg-6 input-style" 
              name="title"
              value = {title}
              onChange = {this.titleHandler}
              successMessage="Looks good!"
              errorMessage="Please enter something"
              required/>
          </div>
          <div className="form-group text-left">
            <label for="student_name">Handbook</label> <br/>
            <input type="file"  
                    id="fileupload" 
                    name="file" 
                    // value={``}
                    // onChange={ (e) => this.titleFileHandler(e) }
                    // style={{color:'transparent', width:'100px'}}
                    />
            {/* <label htmlFor="">{file}</label> */}
          </div>
          
          <button type="submit" class="btn btn-warning cancel-button" onClick={()=> this.props.history.push('/handbooks')}>Kembali</button>
          <button type="submit" class="btn btn-primary submit-button">Submit</button>
          </ValidationForm>
      </div>
    )
  }
}

export default EditHandbook