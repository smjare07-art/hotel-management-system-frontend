import { useEffect, useState } from "react"
import axios from "axios"

function ManageStaff(){

const [guards,setGuards] = useState([])
const [mess,setMess] = useState([])

const [showModal,setShowModal] = useState(false)
const [editData,setEditData] = useState(null)
const [type,setType] = useState("") // security / mess

const [confirmBox,setConfirmBox] = useState(false)
const [deleteId,setDeleteId] = useState(null)

// Load data
useEffect(()=>{
loadSecurity()
loadMess()
},[])

const loadSecurity = async()=>{
const res = await axios.get("http://localhost:5000/security/all")
setGuards(res.data)
}

const loadMess = async()=>{
const res = await axios.get("http://localhost:5000/mess/all")
setMess(res.data)
}

// ------------------ EDIT ------------------

const openEdit = (data,t)=>{
setEditData(data)
setType(t)
setShowModal(true)
}

const handleUpdate = async()=>{
try{

if(type === "security"){
await axios.put(`http://localhost:5000/security/${editData._id}`,editData)
loadSecurity()
}else{
await axios.put(`http://localhost:5000/mess/${editData._id}`,editData)
loadMess()
}

setShowModal(false)

}catch(err){
console.log(err)
}
}

// ------------------ DELETE ------------------

const openDelete = (id,t)=>{
setDeleteId({id,t})
setConfirmBox(true)
}

const confirmDelete = async()=>{

if(deleteId.t === "security"){
await axios.delete(`http://localhost:5000/security/${deleteId.id}`)
loadSecurity()
}else{
await axios.delete(`http://localhost:5000/mess/${deleteId.id}`)
loadMess()
}

setConfirmBox(false)
}

// ------------------ UI ------------------

return(

<div style={styles.container}>

<h1>Manage Staff</h1>

{/* Security */}
<h2>Security Guards</h2>
<table style={styles.table}>
<tbody>
{guards.map(g=>(
<tr key={g._id}>
<td>{g.name}</td>
<td>{g.email}</td>
<td>
<button onClick={()=>openEdit(g,"security")}>Edit</button>
<button onClick={()=>openDelete(g._id,"security")}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>

{/* Mess */}
<h2>Mess Admin</h2>
<table style={styles.table}>
<tbody>
{mess.map(m=>(
<tr key={m._id}>
<td>{m.name}</td>
<td>{m.email}</td>
<td>
<button onClick={()=>openEdit(m,"mess")}>Edit</button>
<button onClick={()=>openDelete(m._id,"mess")}>Delete</button>
</td>
</tr>
))}
</tbody>
</table>

{/* ---------- EDIT MODAL ---------- */}

{showModal && (

<div style={styles.modalOverlay}>

<div style={styles.modal}>

<h3>Edit {type}</h3>

<input
type="text"
value={editData.name}
onChange={(e)=>setEditData({...editData,name:e.target.value})}
/>

<input
type="email"
value={editData.email}
onChange={(e)=>setEditData({...editData,email:e.target.value})}
/>

<div>
<button onClick={handleUpdate}>Update</button>
<button onClick={()=>setShowModal(false)}>Cancel</button>
</div>

</div>

</div>

)}

{/* ---------- DELETE CONFIRM ---------- */}

{confirmBox && (

<div style={styles.modalOverlay}>

<div style={styles.modal}>

<h3>Are you sure?</h3>

<p>This action cannot be undone</p>

<button onClick={confirmDelete}>Yes Delete</button>
<button onClick={()=>setConfirmBox(false)}>Cancel</button>

</div>

</div>

)}

</div>

)
}

// Styles
const styles = {

container:{
padding:"20px"
},

table:{
width:"100%",
marginBottom:"30px"
},

modalOverlay:{
position:"fixed",
top:0,
left:0,
width:"100%",
height:"100%",
background:"rgba(0,0,0,0.5)",
display:"flex",
justifyContent:"center",
alignItems:"center"
},

modal:{
background:"#fff",
padding:"20px",
borderRadius:"10px",
display:"flex",
flexDirection:"column",
gap:"10px",
minWidth:"300px"
}

}

export default ManageStaff