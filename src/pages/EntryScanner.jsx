import { useEffect } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import axios from "axios"

function EntryScanner(){

useEffect(()=>{

const scanner = new Html5QrcodeScanner(
"reader",
{
fps:10,
qrbox:250
},
false
)

scanner.render(

async(decodedText)=>{

try{

const res = await axios.post(
"http://localhost:5000/gatepass/scan",
{
gatepassId:decodedText,
type:"entry"
}
)

alert(res.data.message)

}catch(err){

alert("Invalid Gate Pass")

}

},

(error)=>{}

)

},[])

return(

<div style={{textAlign:"center"}}>

<h1>Entry Scanner</h1>

<div id="reader" style={{width:"400px",margin:"auto"}}></div>

</div>

)

}

export default EntryScanner