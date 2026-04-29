import { useState } from "react"
import axios from "axios"

function Feedback(){

const [message,setMessage] = useState("")
const [rating,setRating] = useState(5)
const [image,setImage] = useState(null)

const BASE_URL = "https://hotel-management-system-wwsg.onrender.com"

const submitFeedback = async(e)=>{

e.preventDefault()

try{

const studentId = localStorage.getItem("studentId")

const formData = new FormData()

formData.append("studentId",studentId)
formData.append("message",message)
formData.append("rating",rating)

if(image){
formData.append("image",image)
}

await axios.post(
`${BASE_URL}/feedback/add`,
formData
)

alert("Feedback Submitted Successfully")

setMessage("")
setRating(5)
setImage(null)

}catch(err){
console.log(err)
alert("Error submitting feedback")
}

}

return(

<div style={{padding:"30px"}}>

<h2>Give Feedback</h2>

<form onSubmit={submitFeedback}>

<textarea
placeholder="Write your feedback..."
value={message}
onChange={(e)=>setMessage(e.target.value)}
style={{width:"300px",height:"120px"}}
/>

<br/><br/>

<label>Upload Image (Optional)</label>

<br/>

<input
type="file"
accept="image/*"
onChange={(e)=>setImage(e.target.files[0])}
/>

<br/><br/>

<label>Rating</label>

<br/>

<select
value={rating}
onChange={(e)=>setRating(e.target.value)}
>
<option value="5">⭐⭐⭐⭐⭐</option>
<option value="4">⭐⭐⭐⭐</option>
<option value="3">⭐⭐⭐</option>
<option value="2">⭐⭐</option>
<option value="1">⭐</option>
</select>

<br/><br/>

<button type="submit">
Submit Feedback
</button>

</form>

</div>

)

}

export default Feedback