import { useState } from "react";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lock, 
  Shield, 
  Zap, 
  ArrowRight, 
  Plus, 
  Minus,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const LaunchApp = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [selectedPool, setSelectedPool] = useState("eth-usdc");

  const pools = [
    {
      id: "eth-usdc",
      name: "ETH/USDC Stealth",
      apy: "12.4%",
      risk: "Low",
      tvl: "$••••••••",
      minDeposit: "0.1 ETH"
    },
    {
      id: "btc-eth", 
      name: "BTC/ETH Shadow",
      apy: "18.7%",
      risk: "Medium", 
      tvl: "$••••••••",
      minDeposit: "0.01 BTC"
    },
    {
      id: "matic-usdc",
      name: "MATIC/USDC Veil", 
      apy: "22.1%",
      risk: "High",
      tvl: "$••••••••",
      minDeposit: "100 MATIC"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Launch SecureLP</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start providing liquidity with complete privacy and encrypted deposits
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Privacy Status */}
            <Card className="bg-gradient-glow border-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Shield className="w-6 h-6 text-success mr-3" />
                    <h3 className="text-lg font-semibold text-foreground">Privacy Engine Status</h3>
                  </div>
                  <Badge variant="outline" className="border-success text-success animate-pulse">
                    Active
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    <span className="text-sm text-muted-foreground">Encryption Ready</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    <span className="text-sm text-muted-foreground">Anonymous Mode</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-success mr-2" />
                    <span className="text-sm text-muted-foreground">Stealth Transactions</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Main Action Interface */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <Tabs value="provide" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="provide">Provide Liquidity</TabsTrigger>
                    <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="provide" className="space-y-6">
                    {/* Pool Selection */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Select Pool</h4>
                      <div className="grid gap-3">
                        {pools.map((pool) => (
                          <div
                            key={pool.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                              selectedPool === pool.id
                                ? "border-primary bg-primary/10"
                                : "border-border bg-encrypted hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedPool(pool.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Lock className="w-4 h-4 text-primary mr-3" />
                                <div>
                                  <p className="font-medium text-foreground">{pool.name}</p>
                                  <p className="text-sm text-muted-foreground">Min: {pool.minDeposit}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-success">{pool.apy}</p>
                                <Badge 
                                  variant={pool.risk === "Low" ? "secondary" : pool.risk === "Medium" ? "default" : "destructive"}
                                  className="text-xs"
                                >
                                  {pool.risk}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amount Input */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">Deposit Amount</h4>
                      <div className="space-y-4">
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                            className="pr-20 text-lg bg-card border-border"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                            <span className="text-sm text-muted-foreground mr-2">ETH</span>
                            <Button variant="outline" size="sm">Max</Button>
                          </div>
                        </div>
                        
                        {/* Quick amounts */}
                        <div className="flex gap-2">
                          {["0.1", "0.5", "1.0", "5.0"].map((amount) => (
                            <Button
                              key={amount}
                              variant="outline"
                              size="sm"
                              onClick={() => setDepositAmount(amount)}
                              className="border-border"
                            >
                              {amount} ETH
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Transaction Preview */}
                    {depositAmount && (
                      <Card className="bg-encrypted border-border">
                        <div className="p-4">
                          <h5 className="font-medium text-foreground mb-3">Transaction Preview</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Deposit Amount</span>
                              <span className="text-sm text-foreground">{depositAmount} ETH</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Pool Share</span>
                              <span className="text-sm text-foreground">••••••••</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Estimated APY</span>
                              <span className="text-sm text-success">
                                {pools.find(p => p.id === selectedPool)?.apy}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Privacy Level</span>
                              <span className="text-sm text-success">Maximum</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}

                    {/* Action Button */}
                    <Button 
                      variant="glow" 
                      size="lg" 
                      className="w-full animate-glow"
                      disabled={!depositAmount}
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Provide Liquidity Privately
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </TabsContent>

                  <TabsContent value="withdraw" className="space-y-6">
                    <div className="text-center py-12">
                      <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h4 className="font-semibold text-foreground mb-2">No Active Positions</h4>
                      <p className="text-muted-foreground">
                        Connect your wallet and provide liquidity to see your encrypted positions here.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WalletConnect />

            {/* Privacy Features */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Active Privacy Features
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse" />
                    <span className="text-sm text-muted-foreground">Encrypted deposits</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse" />
                    <span className="text-sm text-muted-foreground">Anonymous transactions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse" />
                    <span className="text-sm text-muted-foreground">Hidden LP positions</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse" />
                    <span className="text-sm text-muted-foreground">Strategy obfuscation</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Risk Warning */}
            <Card className="bg-gradient-card border-warning">
              <div className="p-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-warning mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Risk Notice</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Liquidity provision involves impermanent loss risk. Privacy features don't eliminate market risks.
                    </p>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-success" />
                  Platform Performance
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total TVL</span>
                    <span className="text-sm text-foreground">$127M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Users</span>
                    <span className="text-sm text-foreground">4,293</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Privacy Score</span>
                    <span className="text-sm text-success">98.7%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchApp;