from flask import Flask, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("FINNHUB_API_KEY")


@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to InvestIQ API!",
        "status": "Backend is running successfully"
    })


@app.route("/api/stocks")
def stocks():

    if not API_KEY:
        return jsonify({
            "error": "Finnhub API key not found. Check your .env file."
        }), 500

    symbols = ["AAPL", "NVDA", "TSLA"]
    stock_data = []

    for symbol in symbols:

        url = "https://finnhub.io/api/v1/quote"

        params = {
            "symbol": symbol,
            "token": API_KEY
        }

        try:
            response = requests.get(
                url,
                params=params,
                timeout=15
            )

            if response.status_code != 200:
                print("Finnhub Status:", response.status_code)
                print("Finnhub Error:", response.text)

                return jsonify({
                    "error": f"Could not fetch data for {symbol}",
                    "status_code": response.status_code,
                    "details": response.text
                }), 502

            data = response.json()

            # Finnhub returns zero if no quote is available
            if data.get("c", 0) == 0:
                return jsonify({
                    "error": f"No quote available for {symbol}",
                    "details": data
                }), 404

            stock_data.append({
                "name": symbol,
                "symbol": symbol,
                "price": data["c"],
                "change": data["dp"]
            })

        except requests.exceptions.RequestException as error:
            print("Request Error:", str(error))

            return jsonify({
                "error": "Could not connect to Finnhub",
                "details": str(error)
            }), 503

    return jsonify(stock_data)


if __name__ == "__main__":
    app.run(debug=True, port=5000)