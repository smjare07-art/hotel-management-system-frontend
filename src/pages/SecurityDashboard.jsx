import { useNavigate } from "react-router-dom"
function SecurityDashboard(){
const navigate = useNavigate()

return(

<div>

<h1>Security Dashboard</h1>

<p>QR Scan System</p>

<button onClick={()=>navigate("/exit-scanner")}>
Scan Exit
</button>
<button onClick={()=>navigate("/entry-scanner")}>
Scan Entry
</button>
</div>

)

}

export default SecurityDashboard