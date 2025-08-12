import yfinance as yf
import pandas as pd

def fetch_stock_data(stock_symbol):
    stock = yf.Ticker(stock_symbol)
    
    # Fetch historical data with auto_adjust set to False
    history = stock.history(period="1d", auto_adjust=False)
    
    # Convert to DataFrame and reset index
    history_df = history.reset_index()
    history_df['Symbol'] = stock_symbol  # Add stock symbol column
    history_df = history_df[['Symbol', 'Date', 'Open', 'High', 'Low', 'Close', 'Volume']]  # Reorder columns
    return history_df

def main():
    stocks = ["AAPL", "MSFT", "TSLA", "ETH-USD", "SOL-USD", "XRP-USD"]
    stock_data_list = []
    
    for stock in stocks:
        try:
            stock_data = fetch_stock_data(stock)
            stock_data_list.append(stock_data)
        except Exception as e:
            print(f"Error fetching data for {stock}: {e}")

    # Concatenate all stock data into a single DataFrame
    all_stock_data = pd.concat(stock_data_list, ignore_index=True)
    
    # Save to CSV
    all_stock_data.to_csv('stock_data.csv', index=False)
    print("Stock data saved to stock_data.csv")

if __name__ == "__main__":
    main()
    