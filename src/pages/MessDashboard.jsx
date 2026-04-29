import { useEffect, useState } from "react"
import axios from "axios"

function MessDashboard(){

const [mess,setMess] = useState(null)
const [students,setStudents] = useState([])
const [requests,setRequests] = useState([])
const [studentName,setStudentName] = useState("")

useEffect(()=>{

const id = localStorage.getItem("messId")

axios
.get(`http://localhost:5000/mess/${id}`)
.then(res=>setMess(res.data))
.catch(err=>console.log(err))

loadStudents()
loadRequests()

},[])

// -------- LOAD STUDENTS --------

const loadStudents = async()=>{

try{

const messId = localStorage.getItem("messId")

const res = await axios.get(
`http://localhost:5000/mess/dashboard/${messId}`
)

setStudents(res.data)

}catch(err){
console.log(err)
}

}

// -------- LOAD REQUESTS --------

const loadRequests = async()=>{

try{

const messId = localStorage.getItem("messId")

const res = await axios.get(
`http://localhost:5000/mess/requests/${messId}`
)

setRequests(res.data)

}catch(err){
console.log(err)
}

}

// -------- ACCEPT REQUEST --------

const acceptRequest = async(id)=>{

try{

await axios.put(`http://localhost:5000/students/mess-accept/${id}`)

alert("Student Joined Mess")

loadStudents()
loadRequests()

}catch(err){
console.log(err)
}

}

// -------- REJECT REQUEST --------

const rejectRequest = async(id)=>{

try{

await axios.put(`http://localhost:5000/students/mess-reject/${id}`)

loadRequests()

}catch(err){
console.log(err)
}

}

// -------- SEND REQUEST --------

const addStudent = async()=>{

if(!studentName){
alert("Enter Student Name")
return
}

try{

await axios.post(
"http://localhost:5000/mess/send-request",
{
name:studentName,
messId:localStorage.getItem("messId")
}
)

alert("Mess Request Sent")

setStudentName("")

loadRequests()

}catch(err){

console.log(err)
alert("Error sending request")

}

}

// -------- DELETE STUDENT --------

const deleteStudent = async(id)=>{

try{

await axios.delete(`http://localhost:5000/mess/student/${id}`)

loadStudents()

}catch(err){
console.log(err)
}

}

// -------- TOTAL COLLECTION --------

const totalCollection = students.reduce(
(sum,s)=>sum + (s.amount || 0),
0
)

if(!mess){
return <h2>Loading...</h2>
}

return(

<div style={{padding:"20px"}}>

<h1>Mess Dashboard</h1>

<h2>{mess.messName}</h2>

<p>Mess Admin: {mess.name}</p>

<p>Phone: {mess.phone}</p>

<hr/>

<h2>Student Join Requests</h2>

{requests.length === 0 && <p>No Pending Requests</p>}

{requests.map((r)=>(

<div key={r._id} style={{border:"1px solid gray",padding:"10px",marginBottom:"10px"}}>

<p><b>Student:</b> {r.studentName}</p>

<button onClick={()=>acceptRequest(r._id)} style={{marginRight:"10px"}}>
Accept </button>

<button onClick={()=>rejectRequest(r._id)}>
Reject </button>

</div>

))}

<hr/>

<h3>Add Student to Mess</h3>

<input
placeholder="Student Name"
value={studentName}
onChange={(e)=>setStudentName(e.target.value)}
/>

<button onClick={addStudent} style={{marginLeft:"10px"}}>
Send Request </button>

<hr/>

<div style={{display:"flex",gap:"20px"}}>

<div style={{padding:"20px",border:"1px solid black"}}>
<h2>📊 Students</h2>
<h1>{students.length}</h1>
</div>

<div style={{padding:"20px",border:"1px solid black"}}>
<h2>💰 Collection</h2>
<h1>₹{totalCollection}</h1>
</div>

</div>

<hr/>

<h3>Mess Students</h3>

<table border="1" cellPadding="10">

<thead>
<tr>
<th>Name</th>
<th>Room</th>
<th>Days</th>
<th>Amount</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{students.map((s)=>(
<tr key={s._id}>

<td>{s.name || "N/A"}</td>
<td>{s.room || "-"}</td>
<td>{s.days || 0}</td>
<td>₹{s.amount || 0}</td>

<td>
<button onClick={()=>deleteStudent(s._id)}>
Delete
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default MessDashboard
