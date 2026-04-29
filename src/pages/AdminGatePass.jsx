import {useEffect,useState} from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import "../css/AdminGatePass.css"

function AdminGatePass(){

const [passes,setPasses] = useState([])
const navigate = useNavigate()

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

// 🔔 notification sound
const playSound = () => {
  const audio = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3")
  audio.play()
}

const loadPasses = async()=>{
const res = await axios.get(`${BASE_URL}/gatepass/all`)

// latest first
const sorted = res.data.reverse()

// 🔔 check new request
if(passes.length && sorted.length > passes.length){
  playSound()
  alert("🚨 New Gate Pass Request Received!")
}

setPasses(sorted)
}

useEffect(()=>{
loadPasses()

// auto refresh every 5 sec
const interval = setInterval(loadPasses,5000)

return ()=>clearInterval(interval)

},[])

// APPROVE
const approve = async(id)=>{
await axios.put(`${BASE_URL}/gatepass/approve/${id}`)
loadPasses()
}

// ❌ REJECT
const reject = async(id)=>{
await axios.put(`${BASE_URL}/gatepass/reject/${id}`)
loadPasses()
}

// stats
const total = passes.length
const approved = passes.filter(p=>p.status==="Approved").length
const pending = passes.filter(p=>p.status==="Pending").length

return(

<div className="gatepass-container">

<h1>🚪 Gate Pass Requests</h1>

{/* CARDS */}
<div className="gp-cards">
<div className="gp-card total">Total<br/>{total}</div>
<div className="gp-card approved">Approved<br/>{approved}</div>
<div className="gp-card pending">Pending<br/>{pending}</div>
</div>

{/* TABLE */}
<div className="gp-table-container">

<table className="gp-table">

<thead>
<tr>
<th>Name</th>
<th>Room</th>
<th>Reason</th>
<th>Location</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>
{passes.map((p,index)=>(

<tr 
key={p._id} 
className={index === 0 ? "newRow" : p.status==="Pending" ? "highlight" : ""}
>

<td>{p.studentId?.fullName}</td>
<td>{p.studentId?.roomNumber}</td>
<td>{p.reason}</td>
<td>{p.location}</td>

<td>
<span className={p.status==="Approved" ? "badge approved" : p.status==="Rejected" ? "badge rejected" : "badge pending"}>
{p.status}
</span>
</td>

<td>

<button
className="approveBtn"
onClick={()=>approve(p._id)}
>
Approve
</button>

<button
className="historyBtn"
onClick={()=>navigate(`/gatepass-history/${p.studentId?._id}`)}
>
History
</button>

</td>

</tr>

))}
</tbody>

</table>

</div>

</div>
)
}

export default AdminGatePass