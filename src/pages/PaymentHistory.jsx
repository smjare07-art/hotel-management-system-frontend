import {useEffect,useState} from "react"
import axios from "axios"

function PaymentHistory(){

const [payments,setPayments] = useState([])

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

useEffect(()=>{

const id = localStorage.getItem("studentId")

axios
.get(`${BASE_URL}/payment/history/${id}`)
.then(res=>setPayments(res.data))
.catch(err => console.log("Error loading payments"))

},[])

if(payments.length === 0){
return <h3>No Payment History</h3>
}

return(

<div>

<h2>Payment History</h2>

<table border="1" cellPadding="10">

<thead>
<tr>
<th>Amount</th>
<th>Payment ID</th>
<th>Date</th>
<th>Receipt</th>
</tr>
</thead>

<tbody>

{payments.map(p=>(
<tr key={p._id}>

<td>₹{p.amount}</td>

<td>{p.paymentId}</td>

<td>{new Date(p.date).toLocaleDateString()}</td>

<td>

<a
href={`${BASE_URL}/payment/receipt/${p._id}`}
target="_blank"
rel="noreferrer"
>
Download
</a>

</td>

</tr>
))}

</tbody>

</table>

</div>

)

}

export default PaymentHistory