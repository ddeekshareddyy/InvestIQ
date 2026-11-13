import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [stocks, setStocks] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState('')

useEffect(() => {
  fetch('http://127.0.0.1:5000/api/stocks')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch stock data')
      }
      return response.json()
    })
    .then((data) => {
      setStocks(data)
      setLoading(false)
    })
    .catch((err) => {
      setError(err.message)
      setLoading(false)
    })
}, [])

  const menu = [
    { name: 'Dashboard', icon: '⌂' },
    { name: 'Stock Analysis', icon: '▥' },
    { name: 'AI Insights', icon: '✧' },
    { name: 'Risk Assessment', icon: '◈' },
    { name: 'Watchlist', icon: '☆' },
  ]

  
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">I</div>
          <span>Invest<span className="brand-highlight">IQ</span></span>
        </div>

        <p className="menu-label">MENU</p>

        <nav>
          {menu.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
            >
              <span>{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile">
            <div className="avatar">P</div>
            <div>
              <strong>My Account</strong>
              <small>Investor</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="greeting">WELCOME BACK</p>
            <h1>{activeTab}</h1>
          </div>
          <div className="topbar-right">
            <span className="market-status"><span className="status-dot"></span> Market Open</span>
            <button className="notification">♧</button>
            <div className="avatar">P</div>
          </div>
        </header>

        {activeTab === 'Dashboard' ? (
          <>
            <section className="welcome">
              <div>
                <p className="welcome-label">YOUR FINANCIAL OVERVIEW</p>
                <h2>Make smarter investment decisions.</h2>
                <p>Track markets, understand risks, and explore AI-powered insights.</p>
              </div>
              <div className="welcome-icon">✧</div>
            </section>

            <section className="stats-grid">
              <div className="stat-card">
                <p>Total Portfolio Value</p>
                <h2>$24,580.50</h2>
                <span className="positive">↗️ 8.24% this month</span>
              </div>
              <div className="stat-card">
                <p>Total Investment</p>
                <h2>$20,000.00</h2>
                <span className="muted">Initial investment</span>
              </div>
              <div className="stat-card">
                <p>Total Returns</p>
                <h2 className="green">$4,580.50</h2>
                <span className="positive">↗️ 22.90% overall</span>
              </div>
            </section>

            <section className="content-grid">
              <div className="panel portfolio-panel">
                <div className="panel-heading">
                  <div>
                    <h3>Portfolio Performance</h3>
                    <p>Track your investment growth</p>
                  </div>
                  <select defaultValue="7D">
                    <option>7D</option>
                    <option>1M</option>
                    <option>6M</option>
                    <option>1Y</option>
                  </select>
                </div>

                <div className="chart-value">$24,580.50</div>
                <span className="positive">↗️ 8.24% (+$1,870.20)</span>

                <div className="chart">
                  <div className="chart-lines">
                    <span>$25k</span>
                    <span>$20k</span>
                    <span>$15k</span>
                    <span>$10k</span>
                  </div>
                  <svg viewBox="0 0 600 190" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#36d399" stopOpacity=".3" />
                        <stop offset="100%" stopColor="#36d399" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 150 L55 130 L110 142 L165 95 L220 112 L275 70 L330 88 L385 45 L440 62 L495 25 L550 40 L600 8 L600 190 L0 190 Z"
                      fill="url(#area)"
                    />
                    <path
                      d="M0 150 L55 130 L110 142 L165 95 L220 112 L275 70 L330 88 L385 45 L440 62 L495 25 L550 40 L600 8"
                      fill="none"
                      stroke="#36d399"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="chart-labels">
                  <span>Mon</span><span>Tue</span><span>Wed</span>
                  <span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>

              <div className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>AI Market Insight</h3>
                    <p>Intelligent market overview</p>
                  </div>
                  <span className="ai-icon">✧</span>
                </div>
                <div className="insight">
                  <span className="insight-tag">MARKET SUMMARY</span>
                  <h3>Market sentiment is positive</h3>
                  <p>Technology stocks are showing positive momentum. Monitor market volatility before making investment decisions.</p>
                </div>
                <button className="primary-button" onClick={() => setActiveTab('AI Insights')}>
                  Explore AI Insights →
                </button>
              </div>
            </section>

            <section className="panel stocks-panel">
              <div className="panel-heading">
                <div>
                  <h3>Popular Stocks</h3>
                  <p>Market snapshot</p>
                </div>
                <button className="text-button" onClick={() => setActiveTab('Stock Analysis')}>
                  View all →
                </button>
              </div>
              <div className="stock-list">
                {stocks.map((stock) => (
                  <div className="stock-list">
  {loading && <p>Loading stocks...</p>}

  {error && <p className="negative">{error}</p>}

  {!loading && !error && stocks.map((stock) => (
    <div className="stock-row" key={stock.symbol}>
      <div className="stock-symbol">{stock.symbol.slice(0, 1)}</div>

      <div className="stock-name">
        <strong>{stock.name}</strong>
        <small>{stock.symbol}</small>
      </div>

      <strong>${stock.price.toFixed(2)}</strong>

      <span className={stock.change >= 0 ? 'positive' : 'negative'}>
        {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
      </span>
    </div>
  ))}
</div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <section className="panel coming-soon">
            <div className="ai-icon">✧</div>
            <h2>{activeTab}</h2>
            <p>This module is part of the InvestIQ platform. We'll build its functionality next.</p>
            <button className="primary-button" onClick={() => setActiveTab('Dashboard')}>
              Back to Dashboard
            </button>
          </section>
        )}

        <footer>©️ 2026 InvestIQ. Built for smarter investing.</footer>
      </main>
    </div>
  )
}

export default App