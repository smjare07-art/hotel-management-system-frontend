import {PieChart,Pie,Cell,Tooltip} from "recharts"

function DashboardCharts({inside,outside}){

const data=[
{name:"Inside",value:inside},
{name:"Outside",value:outside}
]

const COLORS=["#4caf50","#ff5722"]

return(

<PieChart width={300} height={250}>

<Pie
data={data}
dataKey="value"
outerRadius={90}
label
>

{data.map((entry,index)=>(
<Cell key={index} fill={COLORS[index]} />
))}

</Pie>

<Tooltip/>

</PieChart>

)

}

export default DashboardCharts