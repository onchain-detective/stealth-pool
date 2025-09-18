import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity, DollarSign } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Encrypted performance metrics and anonymized market insights
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Encrypted TVL</p>
                  <p className="text-2xl font-bold text-foreground">$127.5M</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm text-success">+12.3%</span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Pools</p>
                  <p className="text-2xl font-bold text-foreground">25</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm text-success">+3</span>
                  </div>
                </div>
                <PieChart className="w-8 h-8 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average APY</p>
                  <p className="text-2xl font-bold text-foreground">15.2%</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-destructive mr-1" />
                    <span className="text-sm text-destructive">-0.8%</span>
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-warning" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Privacy Score</p>
                  <p className="text-2xl font-bold text-foreground">98.7%</p>
                  <div className="flex items-center mt-2">
                    <Activity className="w-4 h-4 text-success mr-1" />
                    <span className="text-sm text-success">Excellent</span>
                  </div>
                </div>
                <Activity className="w-8 h-8 text-success" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* TVL Chart */}
          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Encrypted TVL Trend</h3>
                <Badge variant="outline" className="border-primary text-primary">30 Days</Badge>
              </div>
              <div className="h-64 flex items-center justify-center bg-encrypted rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Encrypted Chart Visualization</p>
                  <p className="text-sm text-muted-foreground">Data protected by privacy protocols</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Pool Distribution */}
          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Pool Distribution</h3>
                <Button variant="outline" size="sm">Export Data</Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-3" />
                    <span className="text-sm text-foreground">Stable Pairs</span>
                  </div>
                  <span className="text-sm text-muted-foreground">48%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-secondary rounded-full mr-3" />
                    <span className="text-sm text-foreground">Volatile Pairs</span>
                  </div>
                  <span className="text-sm text-muted-foreground">32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-warning rounded-full mr-3" />
                    <span className="text-sm text-foreground">Exotic Pairs</span>
                  </div>
                  <span className="text-sm text-muted-foreground">20%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Top Performing Pools</h3>
              <div className="space-y-3">
                {['ETH/USDC Stealth', 'MATIC/USDC Veil', 'BTC/ETH Shadow'].map((pool, index) => (
                  <div key={pool} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-3">#{index + 1}</Badge>
                      <span className="text-sm text-foreground">{pool}</span>
                    </div>
                    <span className="text-sm text-success">+{(25.3 - index * 3.2).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Privacy Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Encrypted Transactions</span>
                  <span className="text-sm text-foreground">12,547</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Anonymous LPs</span>
                  <span className="text-sm text-foreground">4,293</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Hidden Strategies</span>
                  <span className="text-sm text-foreground">847</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-card border-border">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Market Health</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Liquidity Coverage</span>
                  <Badge variant="outline" className="border-success text-success">Excellent</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pool Diversity</span>
                  <Badge variant="outline" className="border-primary text-primary">High</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Distribution</span>
                  <Badge variant="outline" className="border-warning text-warning">Balanced</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;