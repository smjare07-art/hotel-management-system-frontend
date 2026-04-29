import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import "../css/CreateStudent.css"   // same CSS reuse करू शकतो

function CreateSecurity(){

const [form,setForm] = useState({})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const submit = async () => {

const confirm = await Swal.fire({
  title: "Are you sure?",
  text: "Do you want to add security guard?",
  icon: "question",
  showCancelButton: true,
  confirmButtonText: "Yes",
})

if(!confirm.isConfirmed) return

try{

Swal.fire({
  title: "Please wait...",
  text: "Creating security...",
  allowOutsideClick: false,
  didOpen: () => {
    Swal.showLoading()
  }
})

await axios.post("http://localhost:5000/security/create",form)

Swal.fire({
  title: "Success 🎉",
  text: "Security Guard Added Successfully",
  icon: "success",
})

}catch(err){

console.error(err)

Swal.fire({
  title: "Error ❌",
  text: "Failed to add security guard",
  icon: "error",
})

}

}

return(

<div className="container">

<div className="card">

<h2 className="title">🛡️ Add Security Guard</h2>

<div className="grid">

<input name="securityId" placeholder="Security ID" onChange={handleChange} className="input"/>

<input name="name" placeholder="Name" onChange={handleChange} className="input"/>

<input name="phone" placeholder="Phone" onChange={handleChange} className="input"/>

<input name="email" placeholder="Email" onChange={handleChange} className="input"/>

<input type="password" name="password" placeholder="Password" onChange={handleChange} className="input"/>

<input name="gate" placeholder="Gate" onChange={handleChange} className="input"/>

<select name="shift" onChange={handleChange} className="input">
<option>Morning</option>
<option>Evening</option>
<option>Night</option>
</select>

<select name="status" onChange={handleChange} className="input">
<option>Active</option>
<option>Inactive</option>
</select>

</div>

<button onClick={submit} className="button">
Create Security
</button>

</div>

</div>

)

}

export default CreateSecurity