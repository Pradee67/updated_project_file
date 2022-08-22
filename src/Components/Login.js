import axios from 'axios';
import React, { useState } from 'react' ;
import styles from '../StylesRoute/login.module.css' ;
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import './Style.css';
import profile from "../login.png";
import emailimg from "../email.webp";
import passwordimg from "../password.png";

const Login = () => {
    const navigate=useNavigate()
    const [email, setEmail] = useState('')             
    const [password, setPassword] = useState('')
    const [errmsg,setErrmsg] = useState('')               
    const [erremail,setErremail] = useState('')
    const [errpass,setErrpass] = useState('')             
    const auth=useAuth()


    const handleSubmit = (e) =>{
       e.preventDefault()
       if(email.trim() == '') {
        setErremail('Please enter a valid username')
       }
       else if (password == ''){
        setErrpass('please enter a valid password')
       }
       else{
        axios.post('https://localhost:44362/api/Login/login' ,{
          "email":email ,
          "password":password

        })
        .then((res) =>{ localStorage.setItem('token' , res.data.token)
        auth.login(email)
        navigate('/')
      })
        .catch(setErrmsg('Bad Credentials'))
       }
    }
     
    const changeemail= (e) =>{
      setEmail(e.target.value)
      setErremail('')
      setErrmsg('')
    }

    const changepassword= (e) =>{
      setPassword(e.target.value)
      setErrpass('')
      setErrmsg('')
    }

  return (
    <div className="main">
    <div className="sub-main">
    <div>
         <div className="imgs">
           <div className="container-image">
             <img src={profile} alt="profile" className="profile"/>

           </div>


         </div>
    
      <form  onSubmit={handleSubmit}>
        <p className="error"> {errmsg} </p>
        <h2>Login</h2>
    <div>
    <img src={emailimg} alt="email" className="email"/>
      
     <input  type="text"   placeholder="Email" onChange={changeemail} className="name"></input>
     <p  className="error">{erremail}</p>
    </div>

    <div  className="second-input">
    <img src={passwordimg} alt="pass" className="email"/>
     
    <input type="password"  placeholder="Password" onChange={changepassword} className="name" ></input>
    <p  className="error">{errpass}</p>
    </div>
    <button type='submit'   onClick={() =>{ navigate('/products')}}> Login</button>
    
    <div>Haven't register yet? <a href='#' onClick={() =>{ navigate('/register')}}>  Regiser </a> 

      </div>
    </form>
    </div>
    </div>
    </div>
    
  )
}

export default Login;