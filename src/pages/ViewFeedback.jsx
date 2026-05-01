import {useEffect,useState} from "react"
import axios from "axios"
import "../css/ViewFeedback.css"

function ViewFeedback(){

const [feedbacks,setFeedbacks] = useState([])

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

useEffect(()=>{

axios
.get(`${BASE_URL}/feedback/all`)
.then(res=>setFeedbacks(res.data))
.catch(err => console.log("Error loading feedback"))

},[])

return(

<div className="feedback-container">

<h2> Student Feedback ({feedbacks.length})</h2>

{feedbacks.length === 0 ? (
<p className="empty">No feedback available</p>
) : (

<div className="feedback-grid">

{feedbacks.map((f)=>(

<div key={f._id} className="feedback-card">

<h4>{f.studentId?.name}</h4>

<p className="message">{f.message}</p>

<p className="rating">
{"⭐".repeat(f.rating)} ({f.rating})
</p>

{f.image && (
<img
src={`${BASE_URL}/uploads/${f.image}`}
alt="feedback"
className="feedback-img"
/>
)}

</div>

))}

</div>

)}

</div>

)

}

export default ViewFeedback