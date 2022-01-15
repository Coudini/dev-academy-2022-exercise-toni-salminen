import React, {useState,useEffect} from 'react';
import { AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';

const DataChart = ({data,multipleMetrics,labels}) => {

    return (
        multipleMetrics ? 
            <div>
                <p>title:{data[0].farmname}</p>
                <p>labels:{labels[0]}{labels[1]}{labels[2]}</p>

                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart width={500} height={500} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="datevalue" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey=""/>
                    </AreaChart>
                </ResponsiveContainer>

            </div>
        :
            <div>
                <p>title:{data[0].farmname}</p>
                <p>labels:{labels}</p>

                
                    <AreaChart width={500} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="metricvalue" stroke="#8884d8" />
                    </AreaChart>
                

            </div>
            /* 
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart width={500} height={250} data={data}>
            </AreaChart>
            </ResponsiveContainer>


            <ResponsiveContainer width="100%" height="100%">
            </ResponsiveContainer>
            */
    )
}

export default DataChart;