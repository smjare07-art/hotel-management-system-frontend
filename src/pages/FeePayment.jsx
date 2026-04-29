import { useEffect, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import "../css/FeePayment.css"

function FeePayment(){

const [student,setStudent] = useState(null)

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

useEffect(()=>{

const id = localStorage.getItem("studentId")

axios
.get(`${BASE_URL}/students/profile/${id}`)
.then(res=>setStudent(res.data))
.catch(err => console.log("Error loading student"))

},[])

const payFee = async ()=>{

try{

const res = await axios.post(
`${BASE_URL}/payment/create-order`
)

const options = {

key:"rzp_test_SGtadFAcSDWJxt", // ⚠️ production मध्ये live key वापर
amount:res.data.amount,
currency:"INR",
name:"Hostel Fee Payment",
description:"Hostel Installment",
order_id:res.data.id,

handler: async function(){

await axios.post(
`${BASE_URL}/payment/success`,
{
studentId:student._id,
amount:12500
})

Swal.fire({
title:"Success 🎉",
text:"Payment Done Successfully",
icon:"success"
})

window.location.reload()

}

}

const rzp = new window.Razorpay(options)
rzp.open()

}catch(err){

console.error(err)

Swal.fire({
title:"Error ❌",
text:"Payment Failed",
icon:"error"
})

}

}

if(!student){
return <h2 className="loading">Loading...</h2>
}

const total = 25000
const paid = student.feePaid || 0
const remaining = total - paid
const percent = (paid/total)*100

return(

<div className="feeContainer">

<h1>💳 Hostel Fee Payment</h1>

{/* SUMMARY */}
<div className="summaryCard">
<p>Total Fee: ₹{total}</p>
<p>Paid: ₹{paid}</p>
<p>Remaining: ₹{remaining}</p>
</div>

{/* PROGRESS BAR */}
<div className="progressBox">
<div
className="progressFill"
style={{width: `${percent}%`}}
></div>
</div>

{/* PAYMENT BUTTON */}
{remaining > 0 ? (

<button onClick={payFee} className="payBtn">
Pay ₹12500
</button>

) : (

<h2 className="paidText">✅ Fee Fully Paid</h2>

)}

</div>

)
}

export default FeePayment