import React, { Component } from "react";
import Chart from "react-apexcharts";
import Papa from "papaparse";
import "./Candlestick.css"; // Import your CSS for styling
import "../Sidebar/Sidebar.jsx";
import "apexcharts/dist/apexcharts.css"; // Import ApexCharts styles

class CandlestickChart extends Component {
  constructor(props) {
    super(props);

    // Available assets (add or modify these as needed)
    this.availableAssets = {
      stocks: ["AAPL", "MSFT", "TSLA"],
      crypto: ["XRP", "ETH", "SOL"],
    };

    this.state = {
      options: {
        chart: {
          id: "candlestick-chart",
          type: "candlestick",
          background: "#222",
        },
        theme: {
          mode: "dark",
        },
        xaxis: {
          type: "category",
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        tooltip: {
          style: {
            fontFamily: "Roboto, Arial, sans-serif",
            fontSize: "16px",
          },
        },
      },
      series: [
        {
          data: [],
        },
      ],
      showLast7Days: true,
      fullData: [],
      currentAsset: "AAPL", // Default asset
      activeCategory: "stocks", // Default category
    };
  }

  componentDidMount() {
    this.fetchAssetData(this.props.stockSelection);
  }

  componentDidUpdate(prevProps) {
    // If timePeriod or stockSelection prop changes, update chart data
    if (
      prevProps.timePeriod !== this.props.timePeriod ||
      prevProps.stockSelection !== this.props.stockSelection
    ) {
      // If stockSelection changed, fetch new data
      if (prevProps.stockSelection !== this.props.stockSelection) {
        this.fetchAssetData(this.props.stockSelection);
      } else {
        // Only timePeriod changed, update displayed data
        const period = parseInt(this.props.timePeriod, 10);
        this.setState({
          series: [{ data: this.state.fullData.slice(0, period) }],
        });
      }
    }
  }

  fetchAssetData = (assetSymbol) => {
    console.log(`Fetching CSV for ${assetSymbol} from: /${assetSymbol}.csv`);

    fetch(`./chart_data/${assetSymbol}.csv`)
      .then((response) => {
        console.log("Fetch response status:", response.status);
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          delimiter: ",", // Explicitly set delimiter
          dynamicTyping: true, // Automatically convert numeric values
          transformHeader: (header) => header.trim(), // Clean up header names
          complete: (results) => {
            console.log("Raw data:", results.data[0]); // Log first row to check structure

            // Process all rows with valid data
            const chartData = results.data
              .filter((row) => {
                // Check if row has the necessary data
                return (
                  row.Date &&
                  !isNaN(row.Open) &&
                  !isNaN(row.High) &&
                  !isNaN(row.Low) &&
                  !isNaN(row.Close || row["Close/Last"])
                );
              })
              .map((row) => ({
                x: row.Date,
                y: [
                  Math.round(parseFloat(row.Open) * 100) / 100,
                  Math.round(parseFloat(row.High) * 100) / 100,
                  Math.round(parseFloat(row.Low) * 100) / 100,
                  Math.round(parseFloat(row.Close) * 100) / 100,
                ],
              }));

            console.log("Processed chart data:", chartData);

            const period = parseInt(this.props.timePeriod, 10);
            // Display based on current view setting
            const displayData = chartData.slice(0, period);

            // Update the chart title with the current asset
            const updatedOptions = {
              ...this.state.options,
              title: {
                text: assetSymbol + " Chart",
                align: "center",
                style: {
                  fontSize: "20px",
                  color: "#fff",
                },
              },
            };

            this.setState({
              fullData: chartData,
              series: [{ data: displayData }],
              currentAsset: assetSymbol,
              options: updatedOptions,
            });
          },
          error: (error) => {
            console.error("Papa Parse error:", error);
          },
        });
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Toggle between 7-day and 30-day views
  toggleView = () => {
    this.setState((prevState) => {
      const showLast7Days = !prevState.showLast7Days;
      const displayData = showLast7Days
        ? prevState.fullData.slice(0, 7)
        : prevState.fullData.slice(0, 30);

      return {
        showLast7Days,
        series: [{ data: displayData }],
      };
    });
  };

  render() {
    return (
      <div className="app">
        <div className="chart-container">
          {/* Chart */}
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="candlestick"
              width="1100"
              height="300"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CandlestickChart;
