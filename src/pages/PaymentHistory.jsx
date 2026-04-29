import {useEffect,useState} from "react"
import axios from "axios"

function PaymentHistory(){

const [payments,setPayments] = useState([])

useEffect(()=>{

const id = localStorage.getItem("studentId")

axios
.get(`http://localhost:5000/payment/history/${id}`)
.then(res=>setPayments(res.data))

},[])

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
href={`http://localhost:5000/payment/receipt/${p._id}`}
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