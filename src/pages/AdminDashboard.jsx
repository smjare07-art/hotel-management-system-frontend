import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../css/AdminDashboard.css"

import {
Chart as ChartJS,
BarElement,
ArcElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
} from "chart.js"

import { Bar, Doughnut } from "react-chartjs-2"

ChartJS.register(
BarElement,
ArcElement,
CategoryScale,
LinearScale,
Tooltip,
Legend
)

// ✅ ADD THIS
const API = "https://hotel-management-system-wwsg.onrender.com"

function AdminDashboard(){

const navigate = useNavigate()

const [students,setStudents] = useState([])
const [search,setSearch] = useState("")
const [analytics,setAnalytics] = useState({})
const [stats,setStats] = useState({})

const [showModal,setShowModal] = useState(false)
const [editData,setEditData] = useState({})

// LOAD
const loadStudents = async()=>{
const res = await axios.get(`${API}/students/all`)
setStudents(res.data)
}

const loadAnalytics = async()=>{
const res = await axios.get(`${API}/payment/analytics`)
setAnalytics(res.data)
}

const loadStats = async()=>{
const res = await axios.get(`${API}/students/stats`)
setStats(res.data)
}

useEffect(()=>{
loadStudents()
loadAnalytics()
loadStats()
},[])

// DELETE
const deleteStudent = async(id)=>{
await axios.delete(`${API}/students/${id}`)
loadStudents()
}

// EDIT
const handleEdit = (s)=>{
setEditData(s)
setShowModal(true)
}

const updateStudent = async()=>{
await axios.put(`${API}/students/${editData._id}`,editData)
setShowModal(false)
loadStudents()
}

// FILTER
const filteredStudents = students.filter(s =>
s.fullName?.toLowerCase().includes(search.toLowerCase())
)

// CHARTS
const feeChart = {
labels:["Collected","Pending"],
datasets:[{
data:[analytics.totalCollected || 0, analytics.pendingFees || 0],
backgroundColor:["#22c55e","#ef4444"]
}]
}

const hostelChart = {
labels:["Inside","Outside"],
datasets:[{
data:[stats.inside || 0, stats.outside || 0],
backgroundColor:["#3b82f6","#f59e0b"]
}]
}

return(

<div className="dashboard">

{/* SIDEBAR */}
<div className="sidebar">
<h2>Admin</h2>

<p className="menu" onClick={()=>navigate("/create-student")}>Create Student</p>
<p className="menu" onClick={()=>navigate("/admin-gatepass")}>Gate Pass</p>
<p className="menu" onClick={()=>navigate("/create-security")}>Add Guard</p>
<p className="menu" onClick={()=>navigate("/view-feedback")}>Feedback</p>
<p className="menu" onClick={()=>navigate("/rooms")}>Rooms</p>

{/* ✅ FIXED */}
<p className="menu" onClick={()=>window.open(`${API}/payment/pending-fee-report`)}>Download Report</p>

<p className="menu" onClick={()=>navigate("/create-mess")}>Mess Admin</p>
<p className="menu" onClick={()=>navigate("/manage-staff")}>Manage Staff</p>

</div>

{/* MAIN */}
<div className="main">

<h1>Dashboard</h1>

{/* CARDS */}
<div className="card-container">
<div className="card green">Total Students<br/>{analytics.totalStudents}</div>
<div className="card blue">Total Fee<br/>₹{analytics.totalCollected}</div>
<div className="card red">Pending<br/>₹{analytics.pendingFees}</div>
</div>

{/* CHARTS */}
<div className="chart-container">
<div className="chartBox">
<Doughnut data={feeChart}/>
</div>
<div className="chartBox">
<Bar data={hostelChart}/>
</div>
</div>

{/* SEARCH */}
<input
className="search"
placeholder="Search Student"
onChange={(e)=>setSearch(e.target.value)}
/>

{/* TABLE */}
<div className="table-container">
<table className="table">

<thead>
<tr>
<th>Photo</th>
<th>Name</th>
<th>Father</th>
<th>Mobile</th>
<th>Email</th>
<th>College</th>
<th>Branch</th>
<th>Room</th>
<th>Bed</th>
<th>Parent</th>
<th>Login</th>
<th>Fee</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>
{filteredStudents.map((s)=>(
<tr key={s._id}>

<td>
{/* ✅ FIXED */}
<img src={`${API}/uploads/${s.photo}`} width="40" />
</td>

<td>{s.fullName}</td>
<td>{s.fatherName}</td>
<td>{s.mobile}</td>
<td>{s.email}</td>
<td>{s.collegeName}</td>
<td>{s.branch}</td>
<td>{s.roomNumber}</td>
<td>{s.bedNumber}</td>
<td>{s.parentName}</td>
<td>{s.username}</td>
<td>₹{s.feePaid}</td>

<td className={s.feeStatus==="Paid" ? "paid" : "pending"}>
{s.feeStatus}
</td>

<td>
<button className="editBtn" onClick={()=>handleEdit(s)}>Edit</button>
<button className="deleteBtn" onClick={()=>deleteStudent(s._id)}>Delete</button>
</td>

</tr>
))}
</tbody>

</table>
</div>

{/* MODAL */}
{showModal && (
<div className="modalOverlay">
<div className="modalBox">

<h3>Edit Student</h3>

<input value={editData.fullName || ""} onChange={e=>setEditData({...editData,fullName:e.target.value})}/>
<input value={editData.fatherName || ""} onChange={e=>setEditData({...editData,fatherName:e.target.value})}/>
<input value={editData.mobile || ""} onChange={e=>setEditData({...editData,mobile:e.target.value})}/>
<input value={editData.email || ""} onChange={e=>setEditData({...editData,email:e.target.value})}/>
<input value={editData.collegeName || ""} onChange={e=>setEditData({...editData,collegeName:e.target.value})}/>
<input value={editData.branch || ""} onChange={e=>setEditData({...editData,branch:e.target.value})}/>
<input value={editData.roomNumber || ""} onChange={e=>setEditData({...editData,roomNumber:e.target.value})}/>
<input value={editData.bedNumber || ""} onChange={e=>setEditData({...editData,bedNumber:e.target.value})}/>
<input value={editData.parentName || ""} onChange={e=>setEditData({...editData,parentName:e.target.value})}/>
<input value={editData.username || ""} onChange={e=>setEditData({...editData,username:e.target.value})}/>

<div className="modalBtns">
<button className="saveBtn" onClick={updateStudent}>Save</button>
<button className="cancelBtn" onClick={()=>setShowModal(false)}>Cancel</button>
</div>

</div>
</div>
)}

<div className="footer">
<p>© 2026 Hostel Management System</p>
<p>Developed by Shubham </p>
</div>

</div>
</div>
)
}

export default AdminDashboard