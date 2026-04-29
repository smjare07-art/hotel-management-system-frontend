import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../css/StudentDashboard.css"

function StudentDashboard(){

const navigate = useNavigate()
const [student,setStudent] = useState(null)

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

useEffect(()=>{

const id = localStorage.getItem("studentId")

axios
.get(`${BASE_URL}/students/profile/${id}`)
.then(res=>setStudent(res.data))
.catch(err => console.log("Error loading profile"))

},[])

if(!student){
return <h2 className="loading">Loading...</h2>
}

const totalFee = student.hostelFeeTotal || 25000
const paid = student.feePaid || 0
const pending = totalFee - paid

return(

<div className="layout">

{/* SIDEBAR */}
<div className="sidebar">
<h2>🎓 Student</h2>

<button onClick={()=>navigate("/apply-gatepass")}>🚪 Gate Pass</button>
<button onClick={()=>navigate("/approved-pass")}>✅ Approved</button>
<button onClick={()=>navigate("/entry-history")}>📜 Entry</button>
<button onClick={()=>navigate("/feedback")}>💬 Feedback</button>
<button onClick={()=>navigate("/pay-fee")}>💳 Pay Fee</button>
<button onClick={()=>navigate("/payment-history")}>📊 Payments</button>
<button onClick={()=>navigate("/student-mess")}>🍽️ Mess</button>
</div>

{/* MAIN CONTENT */}
<div className="mainContent">

<div className="profileContainer">

{/* PROFILE TOP */}
<div className="profileTop">

<img
src={`${BASE_URL}/uploads/${student.photo}`}
alt="student"
/>

<h2>{student.fullName}</h2>
<p>{student.collegeName} • {student.branch}</p>

</div>

{/* DETAILS GRID */}
<div className="detailsGrid">

<div><strong>Father:</strong> {student.fatherName}</div>
<div><strong>Mobile:</strong> {student.mobile}</div>
<div><strong>Email:</strong> {student.email}</div>
<div><strong>Room:</strong> {student.roomNumber}</div>
<div><strong>Bed:</strong> {student.bedNumber}</div>
<div><strong>Parent:</strong> {student.parentMobile}</div>
<div><strong>Login:</strong> {student.username}</div>

<div>
<strong>Fee:</strong> ₹{totalFee}
</div>

<div>
<strong>Status:</strong>
<span className={pending === 0 ? "paid" : "pending"}>
{pending === 0 ? " Paid" : ` Pending ₹${pending}`}
</span>
</div>

</div>

{/* ACTION */}
<div className="actionBox">
<button onClick={()=>navigate("/pay-fee")}>
💳 Pay Fee
</button>
</div>

</div>

</div>

</div>

)
}

export default StudentDashboard