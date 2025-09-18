import { EncryptedPoolCard } from "@/components/EncryptedPoolCard";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Lock, Search, Filter, Plus, TrendingUp, Users } from "lucide-react";

const allPools = [
  {
    id: "1",
    name: "ETH/USDC Stealth",
    encryptedTVL: "$••••••••",
    apy: "12.4%",
    risk: "low" as const,
    participants: 1247,
    lockPeriod: "30 days"
  },
  {
    id: "2", 
    name: "BTC/ETH Shadow",
    encryptedTVL: "$••••••••",
    apy: "18.7%",
    risk: "medium" as const,
    participants: 892,
    lockPeriod: "60 days"
  },
  {
    id: "3",
    name: "USDT/DAI Phantom",
    encryptedTVL: "$••••••••",
    apy: "8.2%",
    risk: "low" as const,
    participants: 2156,
    lockPeriod: "14 days"
  },
  {
    id: "4",
    name: "WETH/LINK Ghost",
    encryptedTVL: "$••••••••",
    apy: "15.3%",
    risk: "medium" as const,
    participants: 634,
    lockPeriod: "45 days"
  },
  {
    id: "5",
    name: "MATIC/USDC Veil",
    encryptedTVL: "$••••••••",
    apy: "22.1%",
    risk: "high" as const,
    participants: 421,
    lockPeriod: "90 days"
  }
];

const Pools = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Pools Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Encrypted Liquidity Pools</h1>
                <p className="text-muted-foreground">
                  Private liquidity provision with hidden strategies and encrypted deposits
                </p>
              </div>
              <Button variant="glow" className="animate-glow">
                <Plus className="w-4 h-4 mr-2" />
                Create New Pool
              </Button>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search pools..."
                  className="pl-10 bg-card border-border"
                />
              </div>
              <Button variant="outline" className="border-border">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Pool Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-gradient-card border-border">
                <div className="p-4 text-center">
                  <TrendingUp className="w-5 h-5 text-success mx-auto mb-2" />
                  <p className="text-lg font-semibold text-foreground">$127M</p>
                  <p className="text-sm text-muted-foreground">Total Encrypted TVL</p>
                </div>
              </Card>
              <Card className="bg-gradient-card border-border">
                <div className="p-4 text-center">
                  <Users className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-lg font-semibold text-foreground">4,293</p>
                  <p className="text-sm text-muted-foreground">Active LPs</p>
                </div>
              </Card>
              <Card className="bg-gradient-card border-border">
                <div className="p-4 text-center">
                  <Lock className="w-5 h-5 text-secondary mx-auto mb-2" />
                  <p className="text-lg font-semibold text-foreground">15.2%</p>
                  <p className="text-sm text-muted-foreground">Avg APY</p>
                </div>
              </Card>
            </div>

            {/* Pool List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Available Pools</h2>
                <Badge variant="outline" className="border-primary text-primary">
                  {allPools.length} Pools
                </Badge>
              </div>
              
              <div className="grid gap-4">
                {allPools.map((pool) => (
                  <EncryptedPoolCard key={pool.id} pool={pool} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <WalletConnect />
            
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-primary" />
                  Pool Categories
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stable Pairs</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Volatile Pairs</span>
                    <Badge variant="secondary">8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Exotic Pairs</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Risk Levels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-success rounded-full mr-2" />
                      <span className="text-sm text-muted-foreground">Low Risk</span>
                    </div>
                    <span className="text-sm text-foreground">5-10% APY</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-warning rounded-full mr-2" />
                      <span className="text-sm text-muted-foreground">Medium Risk</span>
                    </div>
                    <span className="text-sm text-foreground">10-20% APY</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-destructive rounded-full mr-2" />
                      <span className="text-sm text-muted-foreground">High Risk</span>
                    </div>
                    <span className="text-sm text-foreground">20%+ APY</span>
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

export default Pools;