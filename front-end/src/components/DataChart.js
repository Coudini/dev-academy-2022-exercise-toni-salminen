import React, {useState,useEffect} from 'react';
import { AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const DataChart = ({data,multipleMetrics,labels}) => {

    const colorCodes = {yellow: '#ffc658', green: '#82ca9d', blue: '#8884d8'};
    let colorCode = '';
    if (!multipleMetrics) {
        console.log('DataChart labels', labels)
        switch (labels) {
            case 'rainFall':
                colorCode = colorCodes.blue;
                break;
            case 'pH':
                colorCode = colorCodes.green;
                break;
            case 'temperature':
                colorCode = colorCodes.yellow;
        }
    }

    return (
        multipleMetrics ? 
            <div>
                <p>title:{data[0].farmname}</p>
                <p>labels:{labels[0]}{labels[1]}{labels[2]}</p>

                    <AreaChart width={500} height={500} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis/>
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="rainFall" stroke={colorCodes.blue} fill={colorCodes.blue} />
                        <Area type="monotone" dataKey="pH" stroke={colorCodes.green} fill={colorCodes.green} />
                        <Area type="monotone" dataKey="temperature" stroke={colorCodes.yellow} fill={colorCodes.yellow} />
                    </AreaChart>

            </div>
        :
            <div>
                <p>title:{data[0].farmname}</p>
                <p>labels:{labels}</p>

                
                    <AreaChart width={500} height={500} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="metricvalue" stroke={colorCode} fill={colorCode} />
                    </AreaChart>
                

            </div>
    )
}

export default DataChart;