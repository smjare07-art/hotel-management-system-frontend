import { useEffect, useState } from "react"
import axios from "axios"

function StudentMess(){

const [requests,setRequests] = useState([])
const [mess,setMess] = useState(null)
const [allMess,setAllMess] = useState([])

const studentId = localStorage.getItem("studentId")

useEffect(()=>{

if(studentId){

loadRequests()
loadMessDetails()
loadAllMess()

}

// auto refresh every 2 seconds
const interval = setInterval(()=>{

loadMessDetails()
loadRequests()

},2000)

return ()=>clearInterval(interval)

},[])


// -------- LOAD ALL MESS --------

const loadAllMess = async()=>{

try{

const res = await axios.get(
"http://localhost:5000/mess/all"
)

setAllMess(res.data)

}catch(err){
console.log(err)
}

}


// -------- SEND REQUEST --------

const sendRequest = async(messId)=>{

try{

await axios.post(
"http://localhost:5000/mess/send-request",
{
studentId,
messId
}
)

alert("Request Sent Successfully")

loadRequests()

}catch(err){
console.log(err)
}

}


// -------- LOAD REQUESTS --------

const loadRequests = async()=>{

try{

const res = await axios.get(
`http://localhost:5000/students/mess-request/${studentId}`
)

setRequests(res.data)

}catch(err){
console.log("No requests")
}

}


// -------- LOAD MESS DETAILS --------

const loadMessDetails = async()=>{

try{

const res = await axios.get(
`http://localhost:5000/students/mess-details/${studentId}`
)

setMess(res.data)

}catch(err){
console.log("Mess not joined")
}

}


// -------- ACCEPT --------

const accept = async(id)=>{

try{

await axios.put(
`http://localhost:5000/students/mess-accept/${id}`
)

alert("Mess Joined Successfully")

setRequests([])

loadMessDetails()

}catch(err){
console.log(err)
}

}


// -------- REJECT --------

const reject = async(id)=>{

try{

await axios.put(
`http://localhost:5000/students/mess-reject/${id}`
)

loadRequests()

}catch(err){
console.log(err)
}

}


return(

<div style={{padding:"20px"}}>

<h1>Mess Section</h1>


{/* -------- AVAILABLE MESS -------- */}

<h2>Available Mess</h2>

{allMess.map((m)=>(

<div
key={m._id}
style={{
border:"1px solid gray",
padding:"10px",
marginBottom:"10px"
}}
>

<p><b>Mess Name:</b> {m.messName}</p>
<p><b>Owner:</b> {m.name}</p>
<p><b>Phone:</b> {m.phone}</p>

<button onClick={()=>sendRequest(m._id)}>
Send Request
</button>

</div>

))}


{/* -------- REQUEST STATUS -------- */}

{requests.length > 0 && (

<div style={{marginTop:"20px"}}>

<h3>Pending Requests</h3>

{requests.map((r)=>(

<div key={r._id} style={{marginBottom:"10px"}}>

<p>Request Sent to Mess</p>

<button
onClick={()=>accept(r._id)}
style={{marginRight:"10px"}}
>
Accept
</button>

<button onClick={()=>reject(r._id)}>
Reject
</button>

</div>

))}

</div>

)}


{/* -------- MESS DETAILS -------- */}

{mess?.days && (

<div
style={{
border:"2px solid green",
padding:"20px",
marginTop:"30px",
background:"#f0fff0"
}}
>

<h2>Your Mess Details</h2>

<p><b>Name:</b> {mess.name}</p>
<p><b>Room:</b> {mess.room}</p>
<p><b>Days in Mess:</b> {mess.days}</p>
<p><b>Total Amount:</b> ₹{mess.amount}</p>

</div>

)}

</div>

)

}

export default StudentMess