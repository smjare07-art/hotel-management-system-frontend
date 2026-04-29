import {useEffect,useState} from "react"
import axios from "axios"

function ApprovedGatePass(){

const [pass,setPass] = useState(null)

useEffect(()=>{

const id = localStorage.getItem("studentId")

axios
.get(`http://localhost:5000/gatepass/approved/${id}`)
.then(res=>setPass(res.data))

},[])

if(!pass){
return <h2>No Approved Gate Pass</h2>
}

return(

<div style={{textAlign:"center"}}>

<h1>Approved Gate Pass</h1>

<p>Reason: {pass.reason}</p>

<p>Location: {pass.location}</p>

<p>Date: {pass.outDate}</p>

<p>Out Time: {pass.outTime}</p>

<p>Return Time: {pass.returnTime}</p>

<br/>

<img
src={pass.qrCode}
width="250"
alt="QR Code"
/>

</div>

)

}

export default ApprovedGatePass