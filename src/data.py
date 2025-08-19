import requests
import yfinance as yf
from bs4 import BeautifulSoup
import pandas as pd
import time
from datetime import datetime, timedelta
import os

# Stock symbols
stocks = ["AAPL", "MSFT", "TSLA"]
# Crypto symbols
cryptos = ["ETH", "SOL", "XRP"]

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


def fetch_chart_data(symbol, is_crypto=False, days=30):
    ticker = f"{symbol}-USD" if is_crypto else symbol
    data = yf.Ticker(ticker).history(period=f"{days}d")
    data = data.reset_index()
    return data

def save_chart_data(symbol, data, is_crypto=False):
    """Save data to appropriate CSV file"""
    folder = 'chart_data/crypto' if is_crypto else 'chart_data/stocks'
    os.makedirs(folder, exist_ok=True)
    filepath = f"{folder}/{symbol}.csv"

    data.to_csv(filepath, index=False)
    print(f"Data saved to {filepath}")

def main():
    # Stock symbols
    stocks = ["AAPL", "MSFT", "TSLA"]
    # Crypto symbols
    cryptos = ["ETH", "SOL", "XRP"]
    
    # Only fetch 30-day data for all symbols
    for symbol in stocks:
        data_30d = fetch_chart_data(symbol, is_crypto=False, days=30)
        save_chart_data(symbol, data_30d, is_crypto=False)
    
    for symbol in cryptos:
        data_30d = fetch_chart_data(symbol, is_crypto=True, days=30)
        save_chart_data(symbol, data_30d, is_crypto=True)

if __name__ == "__main__":
    main()