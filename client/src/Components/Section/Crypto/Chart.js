import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
const CandlestickChart = (props) => {
    const [data, setdata] = useState([]);
    const func = async () => {
        const url=`https://api.coingecko.com/api/v3/coins/${props.name}/ohlc?vs_currency=usd&days=365`;
        const response = await fetch(url);
        const parseData = await response.json();
        // console.log((parseData));
        const finData=Object.values(parseData);
        // console.log(finData);
        setdata(finData);
    }
    
    useEffect(() => {
        func();
    }, [])
    
    const options = {
        chart: {
            type: 'candlestick',
            height: 350,
        },
        series: [
            {
                data:data,
            },
        ],
        xaxis: {
            type: 'datetime',
        },
    };

    return (
        <div className="candlestick-chart">
            <Chart options={options} series={options.series} type="candlestick" height={350} />
        </div>
    );
};

export default CandlestickChart;