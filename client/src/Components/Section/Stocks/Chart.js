import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './Stocks.css'
const CandlestickChart = (props) => {
    const [data, setdata] = useState([]);
    const func = async () => {
        // console.log(props.name);
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${props.name}&interval=5min&outputsize=full&apikey=RQM049WV6AUVS8M1`;
        // const url="https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=inr&days=max";
        const response = await fetch(url);
        const parseData = await response.json();
        console.log((parseData));
        // TIME_SERIES_INTRADAY
        // TIME_SERIES_MONTHLY_ADJUSTED
        // Monthly Adjusted Time Series
        // setdata(parseData["Time Series (5min)"]);
        // console.log(parseData);
        const ndata = parseData["Monthly Adjusted Time Series"];
        // console.log(typeof (parseData["Monthly Adjusted Time Series"]));
        let dates = Object.keys(ndata);
        // console.log(dates);
        let finaldata = [];
        dates.forEach((key) => {
            // console.log(key);
            let odata = Object.values(ndata[key]);
            let obj = [odata[0], odata[1], odata[2], odata[3]];
            // console.log(obj, date);
            finaldata.push({ x: key, y: obj });
        });
        setdata(finaldata);
        // console.log(finaldata);
        // console.log(ndata);
        // console.log(JSON.stringify(parseData["Time Series (5min)"]));
    }
    useEffect(() => {
        func();
        // console.log(data);
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