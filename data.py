import requests
from bs4 import BeautifulSoup
import pandas as pd
import time

stocks = ["AAPL", "MSFT", "TSLA"]
cryptos = ["ethereum", "solana", "ripple"]

def fetch_stock_data(stock_symbol):
    url = f"https://stockanalysis.com/stocks/{stock_symbol}/history/"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"}

    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    
    stock_data = {
        'symbol': stock_symbol,
        'date': soup.find('tbody').find_all('tr')[0].find_all('td')[0].text,
        'open': soup.find('tbody').find_all('tr')[0].find_all('td')[1].text,
        'high': soup.find('tbody').find_all('tr')[0].find_all('td')[2].text,
        'low': soup.find('tbody').find_all('tr')[0].find_all('td')[3].text,
        'close': soup.find('tbody').find_all('tr')[0].find_all('td')[4].text,
        'adj_close': soup.find('tbody').find_all('tr')[0].find_all('td')[5].text,
        'volume': soup.find('tbody').find_all('tr')[0].find_all('td')[7].text,
    }

    return stock_data


def fetch_crypto_data(crypto_symbol):
    url = f"https://www.coinlore.com/coin/{crypto_symbol}/historical-data"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"}

    r = requests.get(url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    
    crypto_data = {
        'symbol': crypto_symbol,
        'date': soup.find('table', {'class': 'table', 'id': 'ohlc'}).find('tbody').find_all('tr')[0].find_all('td')[0].text,
        'open': soup.find('table', {'class': 'table', 'id': 'ohlc'}).find('tbody').find_all('tr')[0].find_all('td')[1].text,
        'high': soup.find('table', {'class': 'table', 'id': 'ohlc'}).find('tbody').find_all('tr')[0].find_all('td')[2].text,
        'low': soup.find('table', {'class': 'table', 'id': 'ohlc'}).find('tbody').find_all('tr')[0].find_all('td')[3].text,
        'close': soup.find('table', {'class': 'table', 'id': 'ohlc'}).find('tbody').find_all('tr')[0].find_all('td')[4].text,
        'volume': soup.find('table', {'class': 'table', 'id': 'ohlc'}).find('tbody').find_all('tr')[0].find_all('td')[6].text,
    }
    
    return crypto_data

def main():
    stock_data_list = []
    for stock in stocks:
        try:
            stock_data = fetch_stock_data(stock)
            stock_data_list.append(stock_data)
        except Exception as e:
            print(f"Error fetching data for {stock}: {e}")
        time.sleep(2)
    for crypto in cryptos:
        try:
            crypto_data = fetch_crypto_data(crypto)
            stock_data_list.append(crypto_data)
        except Exception as e:
            print(f"Error fetching data for {crypto}: {e}")
        time.sleep(2)

    df = pd.DataFrame(stock_data_list)

    df.to_csv('stockprediction/stock_data.csv', index=False)
    print("Stock data saved to stock_data.csv")


if __name__ == "__main__":
    main()
