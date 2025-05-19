import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AlertCircle,
  CheckCircle,
  CreditCard,
  Settings,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data
const brokers = [
  { id: "zerodha", name: "Zerodha", logo: "zerodha.png" },
  { id: "upstox", name: "Upstox", logo: "upstox.png" },
  { id: "iifl", name: "IIFL", logo: "iifl.png" },
  { id: "interactive", name: "Interactive Brokers", logo: "interactive.png" },
  { id: "dhan", name: "Dhan", logo: "dhan.png" },
];

const strategies = [
  { id: 1, name: "RSI Rebound + Kelly", type: "Mean Reversion" },
  { id: 2, name: "Golden Cross + Volatility Sizing", type: "Trend Following" },
  { id: 3, name: "Bollinger Breakout", type: "Breakout" },
  { id: 4, name: "MACD Signal", type: "Momentum" },
];

const orders = [
  {
    id: "ORD123",
    timestamp: "2023-05-02 10:15:32",
    symbol: "RELIANCE",
    side: "BUY",
    qty: 15,
    price: 2450,
    status: "FILLED",
    slippage: 0.2,
  },
  {
    id: "ORD124",
    timestamp: "2023-05-02 10:20:45",
    symbol: "HDFCBANK",
    side: "BUY",
    qty: 20,
    price: 1640,
    status: "FILLED",
    slippage: 0.1,
  },
  {
    id: "ORD125",
    timestamp: "2023-05-02 11:05:18",
    symbol: "INFY",
    side: "SELL",
    qty: 25,
    price: 1460,
    status: "REJECTED",
    slippage: null,
  },
  {
    id: "ORD126",
    timestamp: "2023-05-02 11:15:22",
    symbol: "TCS",
    side: "BUY",
    qty: 10,
    price: 3505,
    status: "PENDING",
    slippage: null,
  },
  {
    id: "ORD127",
    timestamp: "2023-05-02 13:45:09",
    symbol: "SBIN",
    side: "BUY",
    qty: 100,
    price: 520,
    status: "FILLED",
    slippage: 0.4,
  },
  {
    id: "ORD128",
    timestamp: "2023-05-02 14:10:33",
    symbol: "AXISBANK",
    side: "SELL",
    qty: 30,
    price: 950,
    status: "FILLED",
    slippage: 0.1,
  },
  {
    id: "ORD129",
    timestamp: "2023-05-02 15:20:21",
    symbol: "ICICIBANK",
    side: "BUY",
    qty: 40,
    price: 980,
    status: "FILLED",
    slippage: 0.3,
  },
  {
    id: "ORD130",
    timestamp: "2023-05-02 15:42:12",
    symbol: "KOTAKBANK",
    side: "SELL",
    qty: 15,
    price: 1810,
    status: "PENDING",
    slippage: null,
  },
];

const executionLogs = [
  {
    time: "10:15:30",
    type: "INFO",
    message: "Signal detected for RELIANCE, preparing to place buy order",
  },
  { time: "10:15:31", type: "API", message: "Sending API request to broker" },
  {
    time: "10:15:32",
    type: "SUCCESS",
    message: "Order ORD123 for RELIANCE placed successfully",
  },
  {
    time: "10:20:44",
    type: "INFO",
    message: "Signal detected for HDFCBANK, preparing to place buy order",
  },
  { time: "10:20:45", type: "API", message: "Sending API request to broker" },
  {
    time: "10:20:46",
    type: "SUCCESS",
    message: "Order ORD124 for HDFCBANK placed successfully",
  },
  {
    time: "11:05:17",
    type: "INFO",
    message: "Signal detected for INFY, preparing to place sell order",
  },
  { time: "11:05:18", type: "API", message: "Sending API request to broker" },
  {
    time: "11:05:19",
    type: "ERROR",
    message: "Order rejected: Insufficient funds",
  },
  {
    time: "11:15:21",
    type: "INFO",
    message: "Signal detected for TCS, preparing to place buy order",
  },
  { time: "11:15:22", type: "API", message: "Sending API request to broker" },
  {
    time: "11:15:23",
    type: "WARNING",
    message: "Order pending, awaiting confirmation",
  },
  {
    time: "13:45:07",
    type: "INFO",
    message: "Signal detected for SBIN, preparing to place buy order",
  },
  { time: "13:45:08", type: "API", message: "Sending API request to broker" },
  {
    time: "13:45:09",
    type: "SUCCESS",
    message: "Order ORD127 for SBIN placed successfully",
  },
  {
    time: "14:10:31",
    type: "INFO",
    message: "Signal detected for AXISBANK, preparing to place sell order",
  },
  { time: "14:10:32", type: "API", message: "Sending API request to broker" },
  {
    time: "14:10:33",
    type: "SUCCESS",
    message: "Order ORD128 for AXISBANK placed successfully",
  },
];

const pnlChartData = [
  { date: "2023-05-01", pnl: 0 },
  { date: "2023-05-02", pnl: 12500 },
  { date: "2023-05-03", pnl: 18200 },
  { date: "2023-05-04", pnl: 15700 },
  { date: "2023-05-05", pnl: 22400 },
  { date: "2023-05-06", pnl: 19800 },
  { date: "2023-05-07", pnl: 25600 },
  { date: "2023-05-08", pnl: 32100 },
  { date: "2023-05-09", pnl: 27800 },
  { date: "2023-05-10", pnl: 33400 },
];

const alertHistory = [
  {
    id: 1,
    time: "10:45:12",
    level: "warning",
    title: "High Slippage",
    message: "SBIN order executed with 0.4% slippage, above threshold of 0.3%",
  },
  {
    id: 2,
    time: "11:05:19",
    level: "error",
    title: "Order Rejected",
    message: "INFY sell order rejected due to insufficient funds",
  },
  {
    id: 3,
    time: "15:30:22",
    level: "warning",
    title: "API Latency",
    message: "Broker API response time > 2 seconds, monitoring situation",
  },
  {
    id: 4,
    time: "16:45:18",
    level: "info",
    title: "Daily Summary",
    message:
      "8 orders placed, 6 filled, 1 pending, 1 rejected. Net P&L: +₹14,200",
  },
];

const AlgorithmExecution = () => {
  const [selectedBroker, setSelectedBroker] = useState("");
  const [selectedStrategy, setSelectedStrategy] = useState("");
  const [executionMode, setExecutionMode] = useState("paper");
  const [isConnected, setIsConnected] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Order parameters
  const [orderType, setOrderType] = useState("market");
  const [slippageThreshold, setSlippageThreshold] = useState("0.3");
  const [retryAttempts, setRetryAttempts] = useState("2");
  const [autoSquareOff, setAutoSquareOff] = useState(false);

  // Execution status
  const [isExecuting, setIsExecuting] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-t-8 border-t-orange-400 bg-white shadow-md bg-gradient-to-b from-blue-100 to-gray-300">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-orange-400 to-gray-500 bg-clip-text text-transparent">
              Broker Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Broker</Label>
              <Select value={selectedBroker} onValueChange={setSelectedBroker}>
                <SelectTrigger disabled={isConnected}>
                  <SelectValue placeholder="Choose your broker" />
                </SelectTrigger>
                <SelectContent>
                  {brokers.map((broker) => (
                    <SelectItem key={broker.id} value={broker.id}>
                      {broker.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label>API Connection Status</Label>
                <div className="flex items-center mt-2">
                  {isConnected ? (
                    <>
                      <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-green-600 font-medium">
                        Connected
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="h-3 w-3 rounded-full bg-gray-300 mr-2"></div>
                      <span className="text-gray-500">Not Connected</span>
                    </>
                  )}
                </div>
              </div>

              <Button
                className={
                  isConnected
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }
                onClick={() => setIsConnected(!isConnected)}
              >
                {isConnected ? "Disconnect" : "Connect"}
              </Button>
            </div>

            {isConnected && (
              <div className="pt-2 space-y-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Account ID</span>
                  <span className="font-medium">AB12345</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Funds Available</span>
                  <span className="font-medium">₹10,00,000.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Status</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700"
                  >
                    Normal
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-t-8 border-t-orange-400 bg-white shadow-md bg-gradient-to-b from-blue-100 to-gray-300">
          <CardHeader>
            <CardTitle className="bg-gradient-to-r from-orange-400 to-gray-500 bg-clip-text text-transparent">
              Strategy Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Strategy</Label>
              <Select
                value={selectedStrategy}
                onValueChange={setSelectedStrategy}
                disabled={!isConnected || isExecuting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a strategy" />
                </SelectTrigger>
                <SelectContent>
                  {strategies.map((strategy) => (
                    <SelectItem
                      key={strategy.id}
                      value={strategy.id.toString()}
                    >
                      {strategy.name} ({strategy.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Execution Mode</Label>
              <Select
                value={executionMode}
                onValueChange={setExecutionMode}
                disabled={!isConnected || isExecuting}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paper">
                    Paper Trading (Simulated)
                  </SelectItem>
                  <SelectItem value="semi">
                    Semi-Automatic (Manual Confirm)
                  </SelectItem>
                  <SelectItem value="auto">Fully Automatic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Settings size={18} />
                <Label htmlFor="show-advanced" className="cursor-pointer">
                  Advanced Settings
                </Label>
              </div>
              <Switch
                id="show-advanced"
                checked={showAdvanced}
                onCheckedChange={setShowAdvanced}
              />
            </div>

            {showAdvanced && (
              <div className="pt-4 space-y-4 border-t">
                <div className="space-y-2">
                  <Label>Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="sl">Stop Loss</SelectItem>
                      <SelectItem value="sl-m">SL-Market</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Max Slippage Threshold (%)</Label>
                  <Input
                    value={slippageThreshold}
                    onChange={(e) => setSlippageThreshold(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Retry Attempts</Label>
                  <Input
                    value={retryAttempts}
                    onChange={(e) => setRetryAttempts(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-square">
                    Auto Square-Off at Market Close
                  </Label>
                  <Switch
                    id="auto-square"
                    checked={autoSquareOff}
                    onCheckedChange={setAutoSquareOff}
                  />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            {isExecuting ? (
              <Button
                variant="destructive"
                onClick={() => setIsExecuting(false)}
              >
                Stop Execution
              </Button>
            ) : (
              <Button
                className="bg-finance-orange hover:bg-orange-600"
                disabled={!isConnected || !selectedStrategy}
                onClick={() => setIsExecuting(true)}
              >
                Start Execution
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      {isExecuting && (
        <>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-finance-orange">
                  Execution Dashboard
                </CardTitle>
                <div className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="ml-2 text-sm text-green-600 font-medium">
                    Live
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="orders">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-finance-blue text-white">
                        <TableRow>
                          <TableHead className="text-white">Order ID</TableHead>
                          <TableHead className="text-white">Time</TableHead>
                          <TableHead className="text-white">Symbol</TableHead>
                          <TableHead className="text-white">Side</TableHead>
                          <TableHead className="text-right text-white">Qty</TableHead>
                          <TableHead className="text-right text-white">Price</TableHead>
                          <TableHead className="text-white">Status</TableHead>
                          <TableHead className="text-right text-white">Slippage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id}
                            </TableCell>
                            <TableCell>
                              {order.timestamp.split(" ")[1]}
                            </TableCell>
                            <TableCell>{order.symbol}</TableCell>
                            <TableCell
                              className={
                                order.side === "BUY"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {order.side}
                            </TableCell>
                            <TableCell className="text-right">
                              {order.qty}
                            </TableCell>
                            <TableCell className="text-right">
                              ₹{order.price}
                            </TableCell>
                            <TableCell>
                              <OrderStatus status={order.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              {order.slippage !== null
                                ? `${order.slippage}%`
                                : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="alerts">
                  <div className="space-y-4">
                    {alertHistory.map((alert) => (
                      <div
                        key={alert.id}
                        className={`flex p-3 rounded-md ${
                          alert.level === "error"
                            ? "bg-red-50 border border-red-200"
                            : alert.level === "warning"
                            ? "bg-amber-50 border border-amber-200"
                            : "bg-blue-50 border border-blue-200"
                        }`}
                      >
                        <div className="mr-3">
                          {alert.level === "error" ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : alert.level === "warning" ? (
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-medium">{alert.title}</span>
                            <span className="text-xs text-gray-500">
                              {alert.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-finance-orange">
                  Execution Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] border rounded-md p-2 bg-gray-50">
                  <div className="space-y-2">
                    {executionLogs.map((log, index) => (
                      <div key={index} className="flex text-xs font-mono">
                        <span className="text-gray-500 w-16">{log.time}</span>
                        <LogBadge type={log.type} />
                        <span className="ml-2">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" size="sm">
                    Clear
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Log
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-finance-orange">
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pnlChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <RechartsTooltip
                        formatter={(value: any) => {
                          // Fix the type issue by checking if value is a number
                          if (typeof value === "number") {
                            return [`₹${value.toLocaleString("en-IN")}`, "P&L"];
                          }
                          return [value, "P&L"];
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="pnl"
                        stroke="#FF7F41"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between mt-6 pt-4 border-t">
                  <div>
                    <div className="text-sm text-gray-500">Total P&L</div>
                    <div className="font-semibold text-green-600">+₹33,400</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Win Rate</div>
                    <div className="font-semibold">75%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Avg Slippage</div>
                    <div className="font-semibold">0.22%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

interface OrderStatusProps {
  status: string;
}

const OrderStatus = ({ status }: OrderStatusProps) => {
  if (status === "FILLED") {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700">
        <CheckCircle className="h-3 w-3 mr-1" />
        Filled
      </Badge>
    );
  } else if (status === "PENDING") {
    return (
      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
        <CreditCard className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700">
        <AlertCircle className="h-3 w-3 mr-1" />
        Rejected
      </Badge>
    );
  }
};

interface LogBadgeProps {
  type: string;
}

const LogBadge = ({ type }: LogBadgeProps) => {
  switch (type) {
    case "INFO":
      return (
        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
          INFO
        </span>
      );
    case "API":
      return (
        <span className="px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded">
          API
        </span>
      );
    case "SUCCESS":
      return (
        <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded">
          SUCCESS
        </span>
      );
    case "WARNING":
      return (
        <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded">
          WARN
        </span>
      );
    case "ERROR":
      return (
        <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded">
          ERROR
        </span>
      );
    default:
      return (
        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded">
          {type}
        </span>
      );
  }
};

export default AlgorithmExecution;
