import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e)=>{
        setFormData((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      try{
        const response = await axios.post("http://127.0.0.1:8000/api/auth/login", formData)
        localStorage.setItem('access_token', response.data?.access_token)
        if (response.data.access_token){
          console.log(response.data)
          if (response.data.user.role == 'farmer'){
            navigate('/farmer')
          }else{
            navigate('/dealer')
          }
        }
      }catch(err){
        alert("Invalid credentials!")
      }
    } 

  return (
    <div className="login d-flex justify-content-center m-5">
      <form className="mt-5">
        <h1 className="h1 text-success text-center">Login</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
          value={formData.email}
          onChange={handleChange}
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
          name="password"
          onChange={handleChange}
          value={formData.password}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <div className="d-grid my-4">
        <button onClick={(e)=>handleSubmit(e)} className="btn btn-success btn-block">
          Submit
        </button>
        <center className="mt-5">Dont have an account ? <Link to="/register">Register</Link></center>
        </div>
      </form>
    </div>
  );
};

export default Login;
