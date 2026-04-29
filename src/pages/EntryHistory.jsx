import {useEffect,useState} from "react"
import axios from "axios"

function EntryHistory(){

const [logs,setLogs] = useState([])

useEffect(()=>{

const id = localStorage.getItem("studentId")

axios
.get(`http://localhost:5000/gatepass/logs/${id}`)
.then(res=>setLogs(res.data))

},[])

return(

<div>

<h2>Entry / Exit History</h2>

<table border="1">

<tr>
<th>Type</th>
<th>Date</th>
<th>Time</th>
</tr>

{logs.map(l=>(
<tr key={l._id}>

<td>{l.type}</td>
<td>{l.date}</td>
<td>{l.time}</td>

</tr>
))}

</table>

</div>

)

}

export default EntryHistory