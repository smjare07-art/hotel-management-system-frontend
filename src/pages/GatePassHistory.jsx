import {useEffect,useState} from "react"
import axios from "axios"
import {useParams} from "react-router-dom"

function GatePassHistory(){

const {id} = useParams()

const [passes,setPasses] = useState([])

useEffect(()=>{

axios
.get(`http://localhost:5000/gatepass/student/${id}`)
.then(res=>setPasses(res.data))

},[id])

return(

<div>

<h2>Student Gate Pass History</h2>

<table border="1">

<tr>

<th>Reason</th>
<th>Location</th>
<th>Date</th>
<th>Status</th>

</tr>

{passes.map(p=>(
<tr key={p._id}>

<td>{p.reason}</td>
<td>{p.location}</td>
<td>{p.outDate}</td>
<td>{p.status}</td>

</tr>
))}

</table>

</div>

)

}

export default GatePassHistory