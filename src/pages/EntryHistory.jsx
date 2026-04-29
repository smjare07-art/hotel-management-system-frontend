import {useEffect,useState} from "react"
import axios from "axios"

function EntryHistory(){

const [logs,setLogs] = useState([])

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

useEffect(()=>{

const id = localStorage.getItem("studentId")

axios
.get(`${BASE_URL}/gatepass/logs/${id}`)
.then(res=>setLogs(res.data))
.catch(err => console.log("Error fetching logs"))

},[])

return(

<div>

<h2>Entry / Exit History</h2>

<table border="1">

<thead>
<tr>
<th>Type</th>
<th>Date</th>
<th>Time</th>
</tr>
</thead>

<tbody>
{logs.map(l=>(
<tr key={l._id}>

<td>{l.type}</td>
<td>{l.date}</td>
<td>{l.time}</td>

</tr>
))}
</tbody>

</table>

</div>

)

}

export default EntryHistory