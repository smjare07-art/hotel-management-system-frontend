import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../css/Login.css"

function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [showPassword,setShowPassword] = useState(false)

const navigate = useNavigate()

const handleLogin = async () => {

// ADMIN LOGIN
if(email === "admin@gmail.com" && password === "123"){
navigate("/admin")
return
}

// STUDENT LOGIN
try{

const studentRes = await axios.post(
"http://localhost:5000/students/login",
{
username: email,
password: password
}
)

if(studentRes.data.status === "success"){

localStorage.setItem(
"studentId",
studentRes.data.student._id
)

navigate("/student")
return

}

}catch(err){
console.log("Student login failed")
}

// SECURITY LOGIN
try{

const secRes = await axios.post(
"http://localhost:5000/security/login",
{
email: email,
password: password
}
)

if(secRes.data.status === "success"){

localStorage.setItem(
"securityId",
secRes.data.guard._id
)

navigate("/security")
return

}

}catch(err){
console.log("Security login failed")
}

// MESS LOGIN
try{

const messRes = await axios.post(
"http://localhost:5000/mess/login",
{
email: email,
password: password
}
)

if(messRes.data.status === "success"){

localStorage.setItem(
"messId",
messRes.data.mess._id
)

navigate("/mess")
return

}

}catch(err){
console.log("Mess login failed")
}

alert("Invalid Login")

}

return(

<div className="login-container">

  {/* LEFT SIDE */}
  <div className="left">
    <div className="overlay">
      <h1>AITRC Hostel</h1>
      <p>Your Home Away From Home 🏠</p>

      <ul>
        <li>✔ 24x7 Security</li>
        <li>✔ WiFi + Study</li>
        <li>✔ Mess Facility</li>
        <li>✔ Safe Environment</li>
      </ul>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="right">

    <div className="login-box">

      <h2>Login</h2>

      <input
        placeholder="Email / Username"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <div className="password-box">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e)=>setPassword(e.target.value)}
  />

  <span onClick={()=>setShowPassword(!showPassword)}>
    {showPassword ? "🙈" : "👁️"}
  </span>
</div>

      <button onClick={handleLogin}>
        Login
      </button>
<p className="forgot" onClick={()=>navigate("/forgot-password")}>
  Forgot Password?
</p>
    </div>

  </div>

</div>

)

}

export default Login