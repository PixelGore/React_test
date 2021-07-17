import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts"


export const Chart = () => {

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "am": 1900
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "am": 2000

        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "am": 2400

        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "am": 2900
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "am": 3200
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "am": 4000
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "am": 3800
        }
    ]

    return (
        <div  style={{marginRight:150}} >
            <BarChart width={530} height={350} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                <Bar dataKey="am" fill="#FF0000" />
            </BarChart>
        </div >
    )
}