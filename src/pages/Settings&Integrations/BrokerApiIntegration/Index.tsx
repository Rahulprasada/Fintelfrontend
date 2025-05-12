import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  AlertCircle,
  BarChart3,
  Link,
  Link2Off,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Landmark,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BrokerConnection, Order, Portfolio } from "../ToolsModel";
import { brokerConnections, orders, portfolios } from "../ToolSettingData";
import BrokerConnectDialog from "./BrokerConnectDialog";

function BrokerApiIntegration() {
  const [activeTab, setActiveTab] = useState("connections");
  const [userConnections, setUserConnections] =
    useState<BrokerConnection[]>(brokerConnections);
  const [userOrders, setUserOrders] = useState<Order[]>(orders);
  const [userPortfolios, setUserPortfolios] = useState<Portfolio[]>(portfolios);
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState<BrokerConnection | null>(
    null
  );

  const handleConnectBroker = () => {
    setSelectedBroker(null);
    setIsConnectDialogOpen(true);
  };

  const handleDisconnectBroker = (broker: BrokerConnection) => {
    setUserConnections(
      userConnections.map((conn) =>
        conn.id === broker.id ? { ...conn, status: "Disconnected" } : conn
      )
    );

    toast({
      title: "Broker Disconnected",
      description: `Your ${broker.brokerName} account has been disconnected.`,
    });
  };

  const handleReconnectBroker = (broker: BrokerConnection) => {
    setSelectedBroker(broker);
    setIsConnectDialogOpen(true);
  };

  const handleToggleTradingMode = (
    brokerId: string,
    mode: "Live" | "Paper"
  ) => {
    setUserConnections(
      userConnections.map((conn) =>
        conn.id === brokerId ? { ...conn, tradingMode: mode } : conn
      )
    );

    toast({
      title: "Trading Mode Changed",
      description: `Trading mode has been changed to ${mode} mode.`,
    });
  };

  const handleSaveBrokerConnection = (broker: BrokerConnection) => {
    if (selectedBroker) {
      // Update existing connection
      setUserConnections(
        userConnections.map((conn) => (conn.id === broker.id ? broker : conn))
      );

      toast({
        title: "Connection Updated",
        description: `Your ${broker.brokerName} connection has been updated.`,
      });
    } else {
      // Add new connection
      setUserConnections([...userConnections, broker]);

      toast({
        title: "Broker Connected",
        description: `Your ${broker.brokerName} account has been connected successfully.`,
      });
    }

    setIsConnectDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-50 text-green-600 border-green-200";
      case "Disconnected":
        return "bg-gray-50 text-gray-600 border-gray-200";
      case "Error":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "Executed":
        return "bg-green-50 text-green-600 border-green-200";
      case "Pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "Cancelled":
        return "bg-gray-50 text-gray-600 border-gray-200";
      case "Failed":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      <div  className="mb-6 p-4 rounded-md shadow-sm"
        style={{ background: "linear-gradient(to right, #d5e2f3, #effcec)" }}>
        <h2 className="text-xl font-bold text-finance-blue">
          Broker API Integrations
        </h2>
        <p className="text-muted-foreground">
          Connect your brokerage accounts for live or paper trading
        </p>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="connections">
            <Link className="mr-2 h-4 w-4" />
            Connections
          </TabsTrigger>
          <TabsTrigger value="orders">
            <BarChart3 className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <Landmark className="mr-2 h-4 w-4" />
            Portfolio
          </TabsTrigger>
        </TabsList>
    

      <TabsContent value="connections" className="mt-6 space-y-6">
        <div className="flex justify-end items-center mb-4">
          <Button onClick={handleConnectBroker}>
            <Link className="mr-2 h-4 w-4" />
            Connect Broker
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userConnections.map((broker) => (
            <Card
              key={broker.id}
              className={broker.status === "Error" ? "border-red-300" : "bg-blue-50"}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{broker.brokerName}</CardTitle>
                    <CardDescription>
                      Account ID: {broker.accountId}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(broker.status)}
                  >
                    {broker.status === "Connected" && (
                      <CheckCircle className="mr-1 h-3 w-3" />
                    )}
                    {broker.status === "Error" && (
                      <AlertCircle className="mr-1 h-3 w-3" />
                    )}
                    {broker.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {broker.status === "Connected" && (
                  <>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Last synchronized:
                      </div>
                      <div className="font-medium">
                        {broker.lastSyncAt
                          ? new Date(broker.lastSyncAt).toLocaleString()
                          : "Never"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`trading-mode-${broker.id}`}
                          checked={broker.tradingMode === "Live"}
                          onCheckedChange={(checked) =>
                            handleToggleTradingMode(
                              broker.id,
                              checked ? "Live" : "Paper"
                            )
                          }
                        />
                        <Label
                          htmlFor={`trading-mode-${broker.id}`}
                          className={
                            broker.tradingMode === "Live"
                              ? "text-red-500 font-medium"
                              : ""
                          }
                        >
                          {broker.tradingMode === "Live"
                            ? "Live Trading"
                            : "Paper Trading"}
                        </Label>
                      </div>

                      {broker.tradingMode === "Paper" &&
                        broker.paperTradingBalance && (
                          <div className="text-sm font-medium">
                            ${broker.paperTradingBalance.toLocaleString()}
                          </div>
                        )}
                    </div>

                    <div className="pt-2 flex justify-between gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          toast({
                            title: "Refreshing Data",
                            description: `Syncing data from ${broker.brokerName}...`,
                          });

                          setTimeout(() => {
                            toast({
                              title: "Sync Complete",
                              description:
                                "Your portfolio data has been updated.",
                            });
                          }, 1500);
                        }}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDisconnectBroker(broker)}
                      >
                        <Link2Off className="mr-2 h-4 w-4" />
                        Disconnect
                      </Button>
                    </div>
                  </>
                )}

                {broker.status === "Error" && (
                  <>
                    <div className="flex items-center bg-red-50 p-3 rounded-md">
                      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                      <div className="text-sm text-red-600">{broker.error}</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleReconnectBroker(broker)}
                      className="w-full"
                    >
                      Reconnect
                    </Button>
                  </>
                )}

                {broker.status === "Disconnected" && (
                  <Button
                    size="sm"
                    onClick={() => handleReconnectBroker(broker)}
                    className="w-full"
                  >
                    Reconnect
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          {userConnections.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 border rounded-lg border-dashed">
              <Link className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">
                No broker connections
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                Connect your brokerage accounts to enable trading features
              </p>
              <Button onClick={handleConnectBroker}>Connect a Broker</Button>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="orders" className="mt-6">
        <Card>
          <CardHeader className="bg-green-100">
            <CardTitle>Order History</CardTitle>
            <CardDescription>
              View all orders placed via the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-finance-blue text-white">
                <TableRow>
                  <TableHead className="text-white">Symbol</TableHead>
                  <TableHead className="text-white">Type</TableHead>
                  <TableHead className="text-white">Side</TableHead>
                  <TableHead className="text-white">Quantity</TableHead>
                  <TableHead className="text-white">Price</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Broker</TableHead>
                  <TableHead className="hidden md:table-cell text-white">
                    Created At
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <BarChart3 className="h-10 w-10 mb-2" />
                        <p className="text-lg font-medium mb-1">
                          No orders found
                        </p>
                        <p className="text-sm">
                          Connect a broker and start trading to see orders here
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  userOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.symbol}
                      </TableCell>
                      <TableCell>{order.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            order.side === "Buy"
                              ? "bg-green-50 text-green-600 border-green-200"
                              : "bg-red-50 text-red-600 border-red-200"
                          }
                        >
                          {order.side}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>
                        {order.executionPrice ? (
                          <>
                            {order.executionPrice}{" "}
                            <span className="text-muted-foreground text-xs">
                              (executed)
                            </span>
                          </>
                        ) : (
                          order.price
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={getOrderStatusColor(order.status)}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.brokerName}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(order.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="portfolio" className="mt-6">
        {userPortfolios.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 border rounded-lg border-dashed">
            <Landmark className="h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium mb-1">No portfolio data</h3>
            <p className="text-muted-foreground text-center mb-4">
              Connect a broker to sync your portfolio holdings
            </p>
            <Button onClick={handleConnectBroker}>Connect a Broker</Button>
          </div>
        ) : (
          userPortfolios.map((portfolio) => {
            // Find the broker for this portfolio
            const broker = userConnections.find(
              (b) => b.id === portfolio.brokerConnectionId
            );

            return (
              <Card key={portfolio.brokerConnectionId} className="mb-6">
                <CardHeader className="bg-blue-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{broker?.brokerName} Portfolio</CardTitle>
                      <CardDescription>
                        Last updated:{" "}
                        {new Date(portfolio.lastSyncAt).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-finance-blue text-white">
                      <TableRow>
                        <TableHead className="text-white">Symbol</TableHead>
                        <TableHead className="text-white">Quantity</TableHead>
                        <TableHead className="text-white">Avg. Price</TableHead>
                        <TableHead className="text-white">Current Price</TableHead>
                        <TableHead className="text-white">Value</TableHead>
                        <TableHead className="text-white">P&L</TableHead>
                        <TableHead className="text-white">P&L %</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolio.holdings.map((holding) => (
                        <TableRow key={holding.symbol}>
                          <TableCell className="font-medium">
                            {holding.symbol}
                          </TableCell>
                          <TableCell>{holding.quantity}</TableCell>
                          <TableCell>
                            {holding.averagePrice.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {holding.currentPrice?.toFixed(2) || "-"}
                          </TableCell>
                          <TableCell>
                            {holding.value?.toLocaleString() || "-"}
                          </TableCell>
                          <TableCell
                            className={
                              holding.pnl && holding.pnl > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {holding.pnl
                              ? (holding.pnl > 0 ? "+" : "") +
                                holding.pnl.toFixed(2)
                              : "-"}
                          </TableCell>
                          <TableCell
                            className={
                              holding.pnlPercent && holding.pnlPercent > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {holding.pnlPercent
                              ? (holding.pnlPercent > 0 ? "+" : "") +
                                holding.pnlPercent.toFixed(2) +
                                "%"
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          })
        )}
      </TabsContent>
  </Tabs>
      {/* Broker Connect Dialog */}
      <BrokerConnectDialog
        open={isConnectDialogOpen}
        onOpenChange={setIsConnectDialogOpen}
        broker={selectedBroker}
        onSave={handleSaveBrokerConnection}
      />
    </div>
  );
}
export default BrokerApiIntegration;
