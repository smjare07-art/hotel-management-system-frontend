import {useState} from "react"
import axios from "axios"

function CreateMess(){

const [form,setForm] = useState({})

const handleChange=(e)=>{

setForm({...form,[e.target.name]:e.target.value})

}

const submit=async()=>{

await axios.post(
"http://localhost:5000/mess/create",
form
)

alert("Mess Admin Added")

}

return(

<div>

<h2>Create Mess Admin</h2>

<input name="name" placeholder="Name" onChange={handleChange}/>

<input name="phone" placeholder="Phone" onChange={handleChange}/>

<input name="email" placeholder="Email" onChange={handleChange}/>

<input name="password" placeholder="Password" onChange={handleChange}/>

<input name="messName" placeholder="Mess Name" onChange={handleChange}/>

<button onClick={submit}>

Create Mess

</button>

</div>

)

}

export default CreateMess