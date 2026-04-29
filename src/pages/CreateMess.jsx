import {useState} from "react"
import axios from "axios"

function CreateMess(){

const [form,setForm] = useState({})

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const submit=async()=>{
try{

await axios.post(
`${BASE_URL}/mess/create`,
form
)

alert("Mess Admin Added")

}catch(err){
console.log(err)
alert("Error creating mess admin")
}
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