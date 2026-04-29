import { BrowserRouter,Routes,Route } from "react-router-dom"

import Login from "./pages/Login"
import AdminDashboard from "./pages/AdminDashboard"
import StudentDashboard from "./pages/StudentDashboard"
import SecurityDashboard from "./pages/SecurityDashboard"
import CreateStudent from "./pages/CreateStudent"
import GatePassForm from "./pages/GatePassForm"
import AdminGatePass from "./pages/AdminGatePass"
import ApprovedGatePass from "./pages/ApprovedGatePass"
import CreateSecurity from "./pages/CreateSecurity"

import EntryHistory from "./pages/EntryHistory"
import Feedback from "./pages/Feedback"
import ViewFeedback from "./pages/ViewFeedback"
import FeePayment from "./pages/FeePayment"
import PaymentHistory from "./pages/PaymentHistory"
import CreateMess from "./pages/CreateMess"
import MessDashboard from "./pages/MessDashboard"
import ExitScanner from "./pages/ExitScanner"
import EntryScanner from "./pages/EntryScanner"
import ManageStaff from "./pages/ManageStaff"
import RoomDashboard from "./pages/RoomDashboard"
import StudentMessDashboard from "./pages/StudentMessDashboard"
function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>} />
<Route path="/approved-pass" element={<ApprovedGatePass/>}/>
<Route path="/admin" element={<AdminDashboard/>} />

<Route path="/student" element={<StudentDashboard/>} />

<Route path="/security" element={<SecurityDashboard/>} />

<Route path="/create-student" element={<CreateStudent/>} />
<Route path="/apply-gatepass" element={<GatePassForm/>} />

<Route path="/admin-gatepass" element={<AdminGatePass/>} />
<Route path="/create-security" element={<CreateSecurity/>} />

<Route path="/entry-history" element={<EntryHistory/>}/>
<Route path="/feedback" element={<Feedback/>}/>
<Route path="/view-feedback" element={<ViewFeedback/>}/>
<Route path="/pay-fee" element={<FeePayment/>}/>
<Route path="/payment-history" element={<PaymentHistory/>}/>
<Route path="/create-mess" element={<CreateMess/>}/>
<Route path="/mess" element={<MessDashboard/>}/>
<Route path="/exit-scanner" element={<ExitScanner/>}/>
<Route path="/entry-scanner" element={<EntryScanner/>}/>
<Route path="/manage-staff" element={<ManageStaff/>} />
<Route path="/rooms" element={<RoomDashboard/>}/>
<Route path="/student-mess" element={<StudentMessDashboard/>}/>
</Routes>

</BrowserRouter>

)

}

export default App