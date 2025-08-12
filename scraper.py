import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

stocks = ["AAPL", "MSFT", "TSLA"]
crypto = ["ETH-USD", "SOL-USD", "XRP-USD"]
def fetch_stock_data(stock_symbol):
    url = f"https://finance.yahoo.com/quote/{stock_symbol}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"}

    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    
    stock_data = {
        'symbol': stock_symbol,
        'price': soup.find('span', {'data-testid': 'qsp-price'}).text,
        'change': soup.find('span', {'data-testid': 'qsp-price-change'}).text,
        'change_percent': soup.find('span', {'data-testid': 'qsp-price-change-percent'}).text
    }

    return stock_data


def main():
    stock_data_list = []
    for stock in stocks:
        try:
            stock_data = fetch_stock_data(stock)
            stock_data_list.append(stock_data)
        except Exception as e:
            print(f"Error fetching data for {stock}: {e}")

        time.sleep(2)


    df = pd.DataFrame(stock_data_list)

    df.to_csv('stock_data.csv', index=False)
    print("Stock data saved to stock_data.csv")


if __name__ == "__main__":
    main()
