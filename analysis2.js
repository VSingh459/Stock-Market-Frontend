const chartDiv = document.getElementById('chartDiv'); // Target chart container by ID

let chartData; // Global variable to store the fetched data
let currentCompany = 'AAPL'; // Default company
let currentTimePeriod = '1y'; // Default time period


// Fetching stock data from the API
fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata')
    .then(response => response.json())
    .then(data => {
        chartData = data;
        plotStockChart(currentCompany, currentTimePeriod);

    });

function plotStockChart(company, timePeriod) {
    let stockData;

    // Extract the relevant data 
    if (timePeriod === '1mo') {
        stockData = chartData.stocksData[0][company]['1mo'];
    } else if (timePeriod === '3mo') {
        stockData = chartData.stocksData[0][company]['3mo'];
    } else if (timePeriod === '1y') {
        stockData = chartData.stocksData[0][company]['1y'];
    } else if (timePeriod === '5y') {
        stockData = chartData.stocksData[0][company]['5y'];
    }

    const values = stockData.value;
    const timestamps = stockData.timeStamp.map(ts => new Date(ts * 1000)); // Convert UNIX timestamps to JS Date objects

    // Define the trace for Plotly
    const trace = {
        x: timestamps,
        y: values,
        type: 'scatter',
        mode: 'lines',
        line: { color: '#2dcb1d' },
        name: company
    };

    const layout = {
        paper_bgcolor: '#010145',  // Background color of the chart
        plot_bgcolor: '#010145',   // Background color of the plotting area
        xaxis: {
            showgrid: false,
            showticklabels: false, // Hide x-axis labels
        },
        yaxis: {
            showgrid: false,
            showticklabels: false, // Hide y-axis labels
        },
        margin: { t: 0, b: 40 }, // Adjust top and bottom margins
        dragmode: 'pan',         // Allow panning
        hovermode: 'x unified',  // Show hover info aligned along x-axis
        shapes: []               // Initialize empty shapes for vertical line
    };

    // Plot the chart using Plotly
    Plotly.newPlot(chartDiv, [trace], layout);
}

// Event listeners for the time period buttons
document.getElementById('1mo').addEventListener('click', () => plotStockChart(currentCompany, '1mo'));
document.getElementById('3mo').addEventListener('click', () => plotStockChart(currentCompany, '3mo'));
document.getElementById('1y').addEventListener('click', () => plotStockChart(currentCompany, '1y'));
document.getElementById('5y').addEventListener('click', () => plotStockChart(currentCompany, '5y'));

// Event listeners for the company buttons
document.getElementById('a').addEventListener('click', () => {
    currentCompany = 'AAPL';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'AAPL';
    p1.textContent = '0.24493%';
    p2.textContent = '$3.953';

    updateSummary('AAPL');

});
document.getElementById('b').addEventListener('click', () => {
    currentCompany = 'MSFT';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'MSFT';
    p1.textContent = '0.33248%';
    p2.textContent = '$26.178';

    updateSummary('MSFT');
    
});
document.getElementById('c').addEventListener('click', () => {
    currentCompany = 'GOOGL';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'GOOGL';
    p1.textContent = '0.20584999%';
    p2.textContent = '$20.507';

    updateSummary('GOOGL');
});
document.getElementById('d').addEventListener('click', () => {
    currentCompany = 'AMZN';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'AMZN';
    p1.textContent = '0.00818%';
    p2.textContent = '$15.064';
    updateSummary('AMZN');
});
document.getElementById('e').addEventListener('click', () => {
    currentCompany = 'PYPL';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'PYPL';
    p1.textContent = '0.09635%';
    p2.textContent = '$17.699';

    updateSummary('PYPL');
});
document.getElementById('f').addEventListener('click', () => {
    currentCompany = 'TSLA';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'TSLA';
    p1.textContent = '0 %';
    p2.textContent = '$14.129';

    updateSummary('TSLA');
});
document.getElementById('g').addEventListener('click', () => {
    currentCompany = 'JPM';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'JPM';
    p1.textContent = '0.34686002%';
    p2.textContent = '$98.108';

    updateSummary('JPM');
});
document.getElementById('h').addEventListener('click', () => {
    currentCompany = 'NVDA';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'NVDA';
    p1.textContent = '0.18521%';
    p2.textContent = '$9.915';

    updateSummary('NVDA');
});
document.getElementById('i').addEventListener('click', () => {
    currentCompany = 'NFLX';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'NFLX';
    p1.textContent = '0 %';
    p2.textContent = '$46.654';

    updateSummary('NFLX');
});
document.getElementById('l').addEventListener('click', () => {
    currentCompany = 'DIS';
    plotStockChart(currentCompany, currentTimePeriod);
    p.textContent = 'DIS';
    p1.textContent = '0.04738%';
    p2.textContent = '$53.563';

    updateSummary('DIS');
});

// Detail Section Detail Section

const p = document.getElementById('d1');
const p1 = document.getElementById('d2');
const p2 = document.getElementById('d3');

const sumElement = document.getElementById('sum'); // Target summary container
let companySummaries = {}; // Global variable to store company summaries

// Fetch the JSON data containing the company summaries
fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata')
    .then(response => response.json())
    .then(data => {
        companySummaries = data.stocksProfileData[0]; // Storing the summaries
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to update the summary
function updateSummary(company) {
    if (companySummaries[company]) {
        sumElement.textContent = companySummaries[company].summary;
    } else {
        sumElement.textContent = 'Summary not available';
    }
}






   
