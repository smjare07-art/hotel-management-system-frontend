import { useEffect,useState } from "react"
import axios from "axios"

function RoomDashboard(){

const [boys,setBoys] = useState({})
const [girls,setGirls] = useState({})

const [selectedRoom,setSelectedRoom] = useState("")
const [hostelType,setHostelType] = useState("")
const [roomStudents,setRoomStudents] = useState([])

const [shiftStudent,setShiftStudent] = useState(null)
const [newRoom,setNewRoom] = useState("")
const [newBed,setNewBed] = useState("")

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

useEffect(()=>{
loadRooms()
},[])

const loadRooms = async()=>{
try{
const res = await axios.get(`${BASE_URL}/students/rooms/status`)
setBoys(res.data.boysRooms)
setGirls(res.data.girlsRooms)
}catch(err){
console.log("Error loading rooms")
}
}

const getColor = (count)=>{
if(count === 0) return "#e5e7eb"
if(count === 1) return "#22c55e"
if(count === 2) return "#facc15"
if(count === 3) return "#ef4444"
}

const openRoom = async(type,room)=>{
try{
setSelectedRoom(room)
setHostelType(type)

const res = await axios.get(
`${BASE_URL}/students/room/${type}/${room}`
)

setRoomStudents(res.data)
}catch(err){
console.log("Error loading room")
}
}

const openShift = (student)=>{
setShiftStudent(student)
}

const shiftRoom = async()=>{
try{

await axios.put(
`${BASE_URL}/students/shift/${shiftStudent._id}`,
{
roomNumber:newRoom,
bedNumber:newBed,
hostelType:shiftStudent.hostelType
}
)

alert("Student shifted")

setShiftStudent(null)

loadRooms()
openRoom(hostelType,selectedRoom)

}catch(err){
console.log("Shift failed")
}
}

return(

<div style={{padding:"20px"}}>

<h1>Hostel Room Status</h1>

<div style={{marginBottom:"20px"}}>
<b>Legend:</b>
<div>⚪ Empty Room</div>
<div>🟢 1 Student</div>
<div>🟡 2 Students</div>
<div>🔴 Full Room</div>
</div>

<h2>Boys Hostel</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(10,100px)",
gap:"10px"
}}>

{Object.keys(boys).map(room=>{
const count = boys[room]

return(
<div
key={room}
onClick={()=>openRoom("Boys",room)}
style={{
background:getColor(count),
padding:"15px",
borderRadius:"10px",
textAlign:"center",
cursor:"pointer"
}}
>
Room {room} <br/>
{count}/3
</div>
)
})}

</div>

<h2 style={{marginTop:"40px"}}>Girls Hostel</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(10,100px)",
gap:"10px"
}}>

{Object.keys(girls).map(room=>{
const count = girls[room]

return(
<div
key={room}
onClick={()=>openRoom("Girls",room)}
style={{
background:getColor(count),
padding:"15px",
borderRadius:"10px",
textAlign:"center",
cursor:"pointer"
}}
>
Room {room} <br/>
{count}/3
</div>
)
})}

</div>

<h2 style={{marginTop:"40px"}}>Available Rooms</h2>

<div>
<b>Boys Empty Rooms:</b>
{Object.keys(boys).filter(r=>boys[r] < 3).join(", ")}
</div>

<br/>

<div>
<b>Girls Empty Rooms:</b>
{Object.keys(girls).filter(r=>girls[r] < 3).join(", ")}
</div>

{selectedRoom && (

<div style={{
marginTop:"40px",
border:"1px solid",
padding:"20px"
}}>

<h2>{hostelType} Hostel - Room {selectedRoom}</h2>

<table border="1" cellPadding="10">

<thead>
<tr>
<th>Name</th>
<th>College</th>
<th>Branch</th>
<th>Mobile</th>
<th>Action</th>
</tr>
</thead>

<tbody>
{roomStudents.map(s=>(
<tr key={s._id}>
<td>{s.fullName}</td>
<td>{s.collegeName}</td>
<td>{s.branch}</td>
<td>{s.mobile}</td>
<td>
<button onClick={()=>openShift(s)}>
Shift Room
</button>
</td>
</tr>
))}
</tbody>

</table>

</div>

)}

{shiftStudent && (

<div style={{
marginTop:"20px",
border:"1px solid",
padding:"20px"
}}>

<h3>Shift Student</h3>

<p>{shiftStudent.fullName}</p>

<input
placeholder="New Room Number"
onChange={(e)=>setNewRoom(e.target.value)}
/>

<input
placeholder="New Bed Number"
onChange={(e)=>setNewBed(e.target.value)}
/>

<br/><br/>

<button onClick={shiftRoom}>
Confirm Shift
</button>

<button onClick={()=>setShiftStudent(null)}>
Cancel
</button>

</div>

)}

</div>

)

}

export default RoomDashboard