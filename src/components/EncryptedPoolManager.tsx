import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStealthPool } from '@/hooks/useStealthPool';
import { Shield, Plus, TrendingUp, AlertTriangle, Lock } from 'lucide-react';
import { toast } from 'sonner';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x742d35Cc6634C0532925a3b8D0C0E4C8e4b8b8b8';

export function EncryptedPoolManager() {
  const { createPool, addLiquidity, executeTrade, updateRiskMetrics, isLoading, error } = useStealthPool(CONTRACT_ADDRESS);
  
  // Pool creation state
  const [poolName, setPoolName] = useState('');
  const [poolDescription, setPoolDescription] = useState('');
  const [initialLiquidity, setInitialLiquidity] = useState('');
  
  // Liquidity addition state
  const [selectedPoolId, setSelectedPoolId] = useState('');
  const [liquidityAmount, setLiquidityAmount] = useState('');
  const [entryPrice, setEntryPrice] = useState('');
  
  // Trading state
  const [tradePoolId, setTradePoolId] = useState('');
  const [tradeVolume, setTradeVolume] = useState('');
  const [priceImpact, setPriceImpact] = useState('');
  const [slippage, setSlippage] = useState('');
  const [isBuy, setIsBuy] = useState(true);
  
  // Risk metrics state
  const [riskPoolId, setRiskPoolId] = useState('');
  const [riskScore, setRiskScore] = useState('');
  const [volatility, setVolatility] = useState('');
  const [maxDrawdown, setMaxDrawdown] = useState('');
  const [sharpeRatio, setSharpeRatio] = useState('');
  const [isHighRisk, setIsHighRisk] = useState(false);

  const handleCreatePool = async () => {
    try {
      const hash = await createPool(
        poolName,
        poolDescription,
        parseFloat(initialLiquidity)
      );
      
      toast.success('Pool created successfully!', {
        description: `Transaction hash: ${hash}`,
        duration: 5000,
      });
      
      // Reset form
      setPoolName('');
      setPoolDescription('');
      setInitialLiquidity('');
    } catch (err) {
      toast.error('Failed to create pool', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  const handleAddLiquidity = async () => {
    try {
      const hash = await addLiquidity(
        parseInt(selectedPoolId),
        parseFloat(liquidityAmount),
        parseFloat(entryPrice)
      );
      
      toast.success('Liquidity added successfully!', {
        description: `Transaction hash: ${hash}`,
        duration: 5000,
      });
      
      // Reset form
      setSelectedPoolId('');
      setLiquidityAmount('');
      setEntryPrice('');
    } catch (err) {
      toast.error('Failed to add liquidity', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  const handleExecuteTrade = async () => {
    try {
      const hash = await executeTrade(
        parseInt(tradePoolId),
        parseFloat(tradeVolume),
        parseFloat(priceImpact),
        parseFloat(slippage),
        isBuy
      );
      
      toast.success('Trade executed successfully!', {
        description: `Transaction hash: ${hash}`,
        duration: 5000,
      });
      
      // Reset form
      setTradePoolId('');
      setTradeVolume('');
      setPriceImpact('');
      setSlippage('');
    } catch (err) {
      toast.error('Failed to execute trade', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  const handleUpdateRiskMetrics = async () => {
    try {
      const hash = await updateRiskMetrics(
        parseInt(riskPoolId),
        parseFloat(riskScore),
        parseFloat(volatility),
        parseFloat(maxDrawdown),
        parseFloat(sharpeRatio),
        isHighRisk
      );
      
      toast.success('Risk metrics updated successfully!', {
        description: `Transaction hash: ${hash}`,
        duration: 5000,
      });
      
      // Reset form
      setRiskPoolId('');
      setRiskScore('');
      setVolatility('');
      setMaxDrawdown('');
      setSharpeRatio('');
      setIsHighRisk(false);
    } catch (err) {
      toast.error('Failed to update risk metrics', {
        description: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Encrypted Pool Manager
        </h1>
        <p className="text-muted-foreground">
          Manage your privacy-preserving DeFi operations with FHE encryption
        </p>
        {error && (
          <Badge variant="destructive" className="mt-2">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {error}
          </Badge>
        )}
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Create Pool
          </TabsTrigger>
          <TabsTrigger value="liquidity" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Add Liquidity
          </TabsTrigger>
          <TabsTrigger value="trade" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Execute Trade
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Risk Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Create Encrypted Pool
              </CardTitle>
              <CardDescription>
                Create a new liquidity pool with encrypted data protection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="poolName">Pool Name</Label>
                <Input
                  id="poolName"
                  value={poolName}
                  onChange={(e) => setPoolName(e.target.value)}
                  placeholder="Enter pool name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="poolDescription">Description</Label>
                <Textarea
                  id="poolDescription"
                  value={poolDescription}
                  onChange={(e) => setPoolDescription(e.target.value)}
                  placeholder="Enter pool description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="initialLiquidity">Initial Liquidity (ETH)</Label>
                <Input
                  id="initialLiquidity"
                  type="number"
                  value={initialLiquidity}
                  onChange={(e) => setInitialLiquidity(e.target.value)}
                  placeholder="0.0"
                />
              </div>
              <Button 
                onClick={handleCreatePool} 
                disabled={isLoading || !poolName || !poolDescription || !initialLiquidity}
                className="w-full"
              >
                {isLoading ? 'Creating Pool...' : 'Create Encrypted Pool'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liquidity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Add Encrypted Liquidity
              </CardTitle>
              <CardDescription>
                Add liquidity to existing pools with privacy protection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="selectedPoolId">Pool ID</Label>
                <Input
                  id="selectedPoolId"
                  type="number"
                  value={selectedPoolId}
                  onChange={(e) => setSelectedPoolId(e.target.value)}
                  placeholder="Enter pool ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="liquidityAmount">Liquidity Amount (ETH)</Label>
                <Input
                  id="liquidityAmount"
                  type="number"
                  value={liquidityAmount}
                  onChange={(e) => setLiquidityAmount(e.target.value)}
                  placeholder="0.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="entryPrice">Entry Price (ETH)</Label>
                <Input
                  id="entryPrice"
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(e.target.value)}
                  placeholder="0.0"
                />
              </div>
              <Button 
                onClick={handleAddLiquidity} 
                disabled={isLoading || !selectedPoolId || !liquidityAmount || !entryPrice}
                className="w-full"
              >
                {isLoading ? 'Adding Liquidity...' : 'Add Encrypted Liquidity'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trade" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Execute Private Trade
              </CardTitle>
              <CardDescription>
                Execute trades with encrypted volume and impact data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tradePoolId">Pool ID</Label>
                <Input
                  id="tradePoolId"
                  type="number"
                  value={tradePoolId}
                  onChange={(e) => setTradePoolId(e.target.value)}
                  placeholder="Enter pool ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tradeVolume">Trade Volume (ETH)</Label>
                <Input
                  id="tradeVolume"
                  type="number"
                  value={tradeVolume}
                  onChange={(e) => setTradeVolume(e.target.value)}
                  placeholder="0.0"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceImpact">Price Impact (%)</Label>
                  <Input
                    id="priceImpact"
                    type="number"
                    value={priceImpact}
                    onChange={(e) => setPriceImpact(e.target.value)}
                    placeholder="0.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slippage">Slippage (%)</Label>
                  <Input
                    id="slippage"
                    type="number"
                    value={slippage}
                    onChange={(e) => setSlippage(e.target.value)}
                    placeholder="0.0"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isBuy"
                  checked={isBuy}
                  onCheckedChange={setIsBuy}
                />
                <Label htmlFor="isBuy">{isBuy ? 'Buy Order' : 'Sell Order'}</Label>
              </div>
              <Button 
                onClick={handleExecuteTrade} 
                disabled={isLoading || !tradePoolId || !tradeVolume || !priceImpact || !slippage}
                className="w-full"
              >
                {isLoading ? 'Executing Trade...' : 'Execute Private Trade'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Update Risk Metrics
              </CardTitle>
              <CardDescription>
                Update encrypted risk metrics for pool assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="riskPoolId">Pool ID</Label>
                <Input
                  id="riskPoolId"
                  type="number"
                  value={riskPoolId}
                  onChange={(e) => setRiskPoolId(e.target.value)}
                  placeholder="Enter pool ID"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="riskScore">Risk Score (0-100)</Label>
                  <Input
                    id="riskScore"
                    type="number"
                    value={riskScore}
                    onChange={(e) => setRiskScore(e.target.value)}
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volatility">Volatility (%)</Label>
                  <Input
                    id="volatility"
                    type="number"
                    value={volatility}
                    onChange={(e) => setVolatility(e.target.value)}
                    placeholder="0.0"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxDrawdown">Max Drawdown (%)</Label>
                  <Input
                    id="maxDrawdown"
                    type="number"
                    value={maxDrawdown}
                    onChange={(e) => setMaxDrawdown(e.target.value)}
                    placeholder="0.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sharpeRatio">Sharpe Ratio</Label>
                  <Input
                    id="sharpeRatio"
                    type="number"
                    value={sharpeRatio}
                    onChange={(e) => setSharpeRatio(e.target.value)}
                    placeholder="0.0"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isHighRisk"
                  checked={isHighRisk}
                  onCheckedChange={setIsHighRisk}
                />
                <Label htmlFor="isHighRisk">High Risk Pool</Label>
              </div>
              <Button 
                onClick={handleUpdateRiskMetrics} 
                disabled={isLoading || !riskPoolId || !riskScore || !volatility || !maxDrawdown || !sharpeRatio}
                className="w-full"
              >
                {isLoading ? 'Updating Risk Metrics...' : 'Update Encrypted Risk Metrics'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
