import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function GatePassForm(){

const [reason,setReason] = useState("")
const [outDate,setOutDate] = useState("")
const [outTime,setOutTime] = useState("")
const [returnTime,setReturnTime] = useState("")
const [location,setLocation] = useState("")

const navigate = useNavigate()

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

const applyGatePass = async ()=>{

try{

const id = localStorage.getItem("studentId")

await axios.post(`${BASE_URL}/gatepass/apply`,{

studentId:id,
reason,
outDate,
outTime,
returnTime,
location

})

alert("Gate Pass Applied")

navigate("/student")

}catch(err){

console.log(err)
alert("Error applying gate pass")

}

}

return(

<div style={{textAlign:"center",marginTop:"50px"}}>

<h2>Apply Gate Pass</h2>

<input
placeholder="Reason"
onChange={(e)=>setReason(e.target.value)}
/>

<br/><br/>

<label>Outgoing Date</label>

<br/>

<input
type="date"
onChange={(e)=>setOutDate(e.target.value)}
/>

<br/><br/>

<label>Out Time</label>

<br/>

<input
type="time"
onChange={(e)=>setOutTime(e.target.value)}
/>

<br/><br/>

<label>Return Time</label>

<br/>

<input
type="time"
onChange={(e)=>setReturnTime(e.target.value)}
/>

<br/><br/>

<input
placeholder="Location (Where going)"
onChange={(e)=>setLocation(e.target.value)}
/>

<br/><br/>

<button onClick={applyGatePass}>
Submit Gate Pass
</button>

</div>

)

}

export default GatePassForm