import {useEffect,useState} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"

function GatePassHistory(){

const {id} = useParams()

const [passes,setPasses] = useState([])

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

useEffect(()=>{

axios
.get(`${BASE_URL}/gatepass/student/${id}`)
.then(res=>setPasses(res.data))
.catch(err => console.log("Error fetching history"))

},[id])

if(passes.length === 0){
return <h3>No Gate Pass History</h3>
}

return(

<div>

<h2>Student Gate Pass History</h2>

<table border="1">

<thead>
<tr>
<th>Reason</th>
<th>Location</th>
<th>Date</th>
<th>Status</th>
</tr>
</thead>

<tbody>
{passes.map(p=>(
<tr key={p._id}>

<td>{p.reason}</td>
<td>{p.location}</td>
<td>{p.outDate}</td>
<td>{p.status}</td>

</tr>
))}
</tbody>

</table>

</div>

)

}

export default GatePassHistory