import { BacktestResults, BacktestSettings, ExecutionLog, ExecutionOrder, ExecutionSettings, PositionSizing, Signal, SignalStrategy, SizedPosition } from "./QuantEngine";

  
  // Sample Signal Strategies
  export const sampleSignalStrategies: SignalStrategy[] = [
    {
      id: "sg-001",
      name: "RSI Rebound",
      description: "Buy when RSI oversold, sell when overbought",
      source: "rule-based",
      timeFrame: "daily",
      indicators: ["RSI", "SMA"],
      rules: [
        {
          id: "rule-1",
          indicator: "RSI",
          comparator: "<",
          value: 30,
          conjunction: "AND"
        },
        {
          id: "rule-2",
          indicator: "SMA",
          comparator: ">",
          value: 50
        }
      ],
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-04-15"),
    },
    {
      id: "sg-002",
      name: "MACD Crossover",
      description: "Buy on MACD line crossing signal line from below",
      source: "rule-based",
      timeFrame: "daily",
      indicators: ["MACD"],
      rules: [
        {
          id: "rule-1",
          indicator: "MACD",
          comparator: ">",
          value: 0
        }
      ],
      createdAt: new Date("2024-02-05"),
      updatedAt: new Date("2024-04-10"),
    },
    {
      id: "sg-003",
      name: "ML Trend Predictor",
      description: "Uses machine learning to predict trend direction",
      source: "ml",
      timeFrame: "daily",
      indicators: ["RSI", "MACD", "ATR", "SMA"],
      mlModel: "trend-classification",
      rules: [],
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-04-02"),
    }
  ];
  
  // Sample Position Sizing Strategies
  export const samplePositionSizing: PositionSizing[] = [
    {
      id: "ps-001",
      name: "Kelly Criterion",
      method: "Kelly",
      initialCapital: 1000000,
      rules: [
        {
          id: "srule-1",
          type: "max-per-trade",
          value: 100000
        },
        {
          id: "srule-2",
          type: "max-per-sector",
          value: 25
        }
      ],
      createdAt: new Date("2024-03-15"),
      updatedAt: new Date("2024-04-10"),
    },
    {
      id: "ps-002",
      name: "Fixed Percentage",
      method: "Fixed",
      initialCapital: 500000,
      rules: [
        {
          id: "srule-1",
          type: "max-per-trade",
          value: 5
        }
      ],
      createdAt: new Date("2024-02-10"),
      updatedAt: new Date("2024-03-20"),
    },
    {
      id: "ps-003",
      name: "Volatility-Based",
      method: "Volatility",
      initialCapital: 2000000,
      rules: [
        {
          id: "srule-1",
          type: "max-drawdown",
          value: 15
        },
        {
          id: "srule-2",
          type: "min-trade",
          value: 10000
        }
      ],
      createdAt: new Date("2024-01-05"),
      updatedAt: new Date("2024-04-15"),
    }
  ];
  
  // Sample Backtest Settings
  export const sampleBacktestSettings: BacktestSettings[] = [
    {
      id: "bt-001",
      name: "RSI Rebound Backtest",
      signalStrategyId: "sg-001",
      positionSizingId: "ps-001",
      startDate: new Date("2019-01-01"),
      endDate: new Date("2024-03-31"),
      assetUniverse: ["TCS", "INFY", "RELIANCE", "HDFCBANK", "ICICIBANK"],
      optimizationParameters: [
        {
          parameter: "RSI",
          min: 25,
          max: 35,
          step: 1
        },
        {
          parameter: "SMA",
          min: 40,
          max: 60,
          step: 5
        }
      ]
    },
    {
      id: "bt-002",
      name: "MACD Crossover Test",
      signalStrategyId: "sg-002",
      positionSizingId: "ps-002",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2023-12-31"),
      assetUniverse: ["NIFTY", "BANKNIFTY"]
    }
  ];
  
  // Sample Backtest Results
  export const sampleBacktestResults: BacktestResults[] = [
    {
      id: "btr-001",
      settingsId: "bt-001",
      metrics: {
        cagr: 14.2,
        sharpe: 1.1,
        sortino: 1.3,
        maxDrawdown: 18,
        winRate: 62,
        averageGain: 3.2,
        averageLoss: 1.8
      },
      equityCurve: Array.from({ length: 60 }, (_, i) => ({
        date: new Date(2019, i, 1),
        value: 1000000 * (1 + (0.01 * i) + (Math.random() * 0.02 - 0.01))
      })),
      drawdownCurve: Array.from({ length: 60 }, (_, i) => ({
        date: new Date(2019, i, 1),
        value: Math.random() * 18
      })),
      trades: Array.from({ length: 50 }, (_, i) => ({
        id: `trade-${i + 1}`,
        entryDate: new Date(2019 + Math.floor(i / 12), i % 12, Math.floor(Math.random() * 28) + 1),
        entryPrice: 100 + Math.random() * 900,
        exitDate: new Date(2019 + Math.floor((i + 1) / 12), (i + 1) % 12, Math.floor(Math.random() * 28) + 1),
        exitPrice: 100 + Math.random() * 900,
        symbol: ["TCS", "INFY", "RELIANCE", "HDFCBANK", "ICICIBANK"][Math.floor(Math.random() * 5)],
        action: Math.random() > 0.3 ? "BUY" : "SELL",
        quantity: Math.floor(Math.random() * 100) + 10,
        pnl: (Math.random() * 10000) - 3000,
        returnPercentage: (Math.random() * 20) - 5
      })),
      optimizationResults: [
        { parameter: "RSI", value: 28, sharpe: 1.25, cagr: 16.2 },
        { parameter: "RSI", value: 29, sharpe: 1.2, cagr: 15.8 },
        { parameter: "RSI", value: 30, sharpe: 1.1, cagr: 14.2 },
        { parameter: "RSI", value: 31, sharpe: 1.05, cagr: 13.9 }
      ]
    }
  ];
  
  // Sample Execution Settings
  export const sampleExecutionSettings: ExecutionSettings[] = [
    {
      id: "es-001",
      name: "RSI Rebound Live",
      strategyId: "sg-001",
      positionSizingId: "ps-001",
      mode: "Semi-Auto",
      broker: "Zerodha",
      orderType: "Limit",
      isPaperTrading: true,
      maxRetries: 3,
      createdAt: new Date("2024-04-01"),
      updatedAt: new Date("2024-04-15")
    },
    {
      id: "es-002",
      name: "ML Trend Auto Execute",
      strategyId: "sg-003",
      positionSizingId: "ps-003",
      mode: "Full-Auto",
      broker: "IIFL",
      orderType: "Market",
      isPaperTrading: true,
      maxRetries: 2,
      createdAt: new Date("2024-03-15"),
      updatedAt: new Date("2024-04-10")
    }
  ];
  
  // Sample Signals
  export const sampleSignals: Signal[] = [
    {
      id: "signal-001",
      timestamp: new Date("2024-04-15T09:30:00"),
      symbol: "TCS",
      action: "BUY",
      price: 3540.25,
      rules: [
        {
          id: "rule-1",
          indicator: "RSI",
          comparator: "<",
          value: 30,
          conjunction: "AND"
        },
        {
          id: "rule-2",
          indicator: "SMA",
          comparator: ">",
          value: 50
        }
      ]
    },
    {
      id: "signal-002",
      timestamp: new Date("2024-04-15T10:15:00"),
      symbol: "INFY",
      action: "BUY",
      price: 1420.80,
      rules: [
        {
          id: "rule-1",
          indicator: "RSI",
          comparator: "<",
          value: 30,
          conjunction: "AND"
        },
        {
          id: "rule-2",
          indicator: "SMA",
          comparator: ">",
          value: 50
        }
      ]
    },
    {
      id: "signal-003",
      timestamp: new Date("2024-04-15T11:00:00"),
      symbol: "RELIANCE",
      action: "SELL",
      price: 2450.30,
      rules: [
        {
          id: "rule-1",
          indicator: "RSI",
          comparator: ">",
          value: 70
        }
      ]
    },
    {
      id: "signal-004",
      timestamp: new Date("2024-04-15T11:45:00"),
      symbol: "HDFCBANK",
      action: "BUY",
      price: 1680.50,
      confidence: 0.82,
      rules: []
    },
    {
      id: "signal-005",
      timestamp: new Date("2024-04-15T13:30:00"),
      symbol: "ICICIBANK",
      action: "SHORT",
      price: 990.75,
      confidence: 0.75,
      rules: []
    }
  ];
  
  // Sample Sized Positions
  export const sampleSizedPositions: SizedPosition[] = [
    {
      signalId: "signal-001",
      symbol: "TCS",
      action: "BUY",
      amount: 95000,
      percentage: 9.5,
      shares: 27
    },
    {
      signalId: "signal-002",
      symbol: "INFY",
      action: "BUY",
      amount: 85000,
      percentage: 8.5,
      shares: 60
    },
    {
      signalId: "signal-003",
      symbol: "RELIANCE",
      action: "SELL",
      amount: 110000,
      percentage: 11.0,
      shares: 45
    },
    {
      signalId: "signal-004",
      symbol: "HDFCBANK",
      action: "BUY",
      amount: 75000,
      percentage: 7.5,
      shares: 45
    },
    {
      signalId: "signal-005",
      symbol: "ICICIBANK",
      action: "SHORT",
      amount: 55000,
      percentage: 5.5,
      shares: 55
    }
  ];
  
  // Sample Execution Orders
  export const sampleExecutionOrders: ExecutionOrder[] = [
    {
      id: "order-001",
      symbol: "TCS",
      quantity: 27,
      price: 3540.25,
      type: "Limit",
      action: "BUY",
      status: "Filled",
      brokerOrderId: "ZO123456",
      timestamp: new Date("2024-04-15T09:31:00"),
      fills: [
        {
          price: 3540.25,
          quantity: 27,
          timestamp: new Date("2024-04-15T09:32:15")
        }
      ]
    },
    {
      id: "order-002",
      symbol: "INFY",
      quantity: 60,
      price: 1420.80,
      type: "Limit",
      action: "BUY",
      status: "Filled",
      brokerOrderId: "ZO123457",
      timestamp: new Date("2024-04-15T10:16:00"),
      fills: [
        {
          price: 1421.00,
          quantity: 45,
          timestamp: new Date("2024-04-15T10:17:05")
        },
        {
          price: 1420.50,
          quantity: 15,
          timestamp: new Date("2024-04-15T10:18:30")
        }
      ]
    },
    {
      id: "order-003",
      symbol: "RELIANCE",
      quantity: 45,
      price: 2450.30,
      type: "Limit",
      action: "SELL",
      status: "Pending",
      timestamp: new Date("2024-04-15T11:01:00")
    },
    {
      id: "order-004",
      symbol: "HDFCBANK",
      quantity: 45,
      price: 1680.50,
      type: "Market",
      action: "BUY",
      status: "Failed",
      timestamp: new Date("2024-04-15T11:46:00"),
      remarks: "Insufficient funds"
    }
  ];
  
  // Sample Execution Logs
  export const sampleExecutionLogs: ExecutionLog[] = [
    {
      id: "log-001",
      timestamp: new Date("2024-04-15T09:30:05"),
      executionSettingsId: "es-001",
      type: "INFO",
      message: "Signal received for TCS",
      details: { signalId: "signal-001" }
    },
    {
      id: "log-002",
      timestamp: new Date("2024-04-15T09:31:00"),
      executionSettingsId: "es-001",
      type: "INFO",
      message: "Order placed for TCS",
      details: { orderId: "order-001" }
    },
    {
      id: "log-003",
      timestamp: new Date("2024-04-15T09:32:15"),
      executionSettingsId: "es-001",
      type: "SUCCESS",
      message: "Order filled for TCS",
      details: { orderId: "order-001" }
    },
    {
      id: "log-004",
      timestamp: new Date("2024-04-15T10:15:05"),
      executionSettingsId: "es-001",
      type: "INFO",
      message: "Signal received for INFY",
      details: { signalId: "signal-002" }
    },
    {
      id: "log-005",
      timestamp: new Date("2024-04-15T10:16:00"),
      executionSettingsId: "es-001",
      type: "INFO",
      message: "Order placed for INFY",
      details: { orderId: "order-002" }
    },
    {
      id: "log-006",
      timestamp: new Date("2024-04-15T10:18:30"),
      executionSettingsId: "es-001",
      type: "SUCCESS",
      message: "Order filled for INFY",
      details: { orderId: "order-002" }
    },
    {
      id: "log-007",
      timestamp: new Date("2024-04-15T11:00:05"),
      executionSettingsId: "es-001",
      type: "INFO",
      message: "Signal received for RELIANCE",
      details: { signalId: "signal-003" }
    },
    {
      id: "log-008",
      timestamp: new Date("2024-04-15T11:01:00"),
      executionSettingsId: "es-001",
      type: "INFO",
      message: "Order placed for RELIANCE",
      details: { orderId: "order-003" }
    },
    {
      id: "log-009",
      timestamp: new Date("2024-04-15T11:45:05"),
      executionSettingsId: "es-001",
      type: "INFO",
      message: "Signal received for HDFCBANK",
      details: { signalId: "signal-004" }
    },
    {
      id: "log-010",
      timestamp: new Date("2024-04-15T11:46:00"),
      executionSettingsId: "es-001",
      type: "ERROR",
      message: "Order failed for HDFCBANK: Insufficient funds",
      details: { orderId: "order-004" }
    }
  ];
  