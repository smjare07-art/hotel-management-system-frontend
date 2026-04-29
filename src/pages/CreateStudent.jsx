import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import "../css/CreateStudent.css"

function CreateStudent(){

const [form,setForm] = useState({})

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleFile = (e)=>{
setForm({...form,photo:e.target.files[0]})
}

const submit = async () => {

const confirm = await Swal.fire({
  title: "Are you sure?",
  text: "Do you want to create student?",
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "Yes",
})

if(!confirm.isConfirmed) return

try{

Swal.fire({
  title: "Please wait...",
  text: "Creating student...",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading()
  }
})

const data = new FormData()

for(let key in form){
data.append(key,form[key])
}

await axios.post(`${BASE_URL}/students/create`,data)

Swal.fire({
  title: "Success 🎉",
  text: "Student Created Successfully",
  icon: "success",
  confirmButtonText: "OK"
})

}catch(err){

console.error(err)

Swal.fire({
  title: "Error ❌",
  text: "Failed to create student",
  icon: "error",
  confirmButtonText: "Try Again"
})

}

}

return(

<div className="container">

<div className="card">

<h2 className="title">🎓 Create Student</h2>

{/* Personal Info */}
<h3 className="section">Personal Info</h3>

<div className="grid">
<input name="fullName" placeholder="Full Name" onChange={handleChange} className="input"/>
<input name="fatherName" placeholder="Father Name" onChange={handleChange} className="input"/>
<input name="mobile" placeholder="Mobile" onChange={handleChange} className="input"/>
<input name="email" placeholder="Email" onChange={handleChange} className="input"/>
</div>

{/* College Info */}
<h3 className="section">College Info</h3>

<div className="grid">
<select name="collegeName" onChange={handleChange} className="input">
<option>Diploma</option>
<option>B.Tech</option>
<option>B.Pharm</option>
<option>D.Pharm</option>
<option>ITI</option>
</select>

<input name="branch" placeholder="Branch" onChange={handleChange} className="input"/>
</div>

{/* Hostel Info */}
<h3 className="section">Hostel Info</h3>

<div className="grid">
<select name="hostelType" onChange={handleChange} className="input">
<option value="">Select Hostel</option>
<option value="Boys">Boys Hostel</option>
<option value="Girls">Girls Hostel</option>
</select>

<input name="roomNumber" placeholder="Room Number" onChange={handleChange} className="input"/>
<input name="bedNumber" placeholder="Bed Number (1-3)" onChange={handleChange} className="input"/>
</div>

{/* Parent Info */}
<h3 className="section">Parent Info</h3>

<div className="grid">
<input name="parentName" placeholder="Parent Name" onChange={handleChange} className="input"/>
<input name="parentMobile" placeholder="Parent Mobile" onChange={handleChange} className="input"/>
</div>

{/* Login Info */}
<h3 className="section">Login Info</h3>

<div className="grid">
<input name="username" placeholder="Username" onChange={handleChange} className="input"/>
<input type="password" name="password" placeholder="Password" onChange={handleChange} className="input"/>
</div>

{/* Photo */}
<h3 className="section">Photo</h3>

<input type="file" onChange={handleFile} className="file"/>

<button onClick={submit} className="button">
Create Student
</button>

</div>

</div>

)
}

export default CreateStudent