import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { FHEUtils } from '@/lib/fhe-utils';

// Contract ABI for StealthPool
const STEALTH_POOL_ABI = [
  {
    "inputs": [
      {"name": "_name", "type": "string"},
      {"name": "_description", "type": "string"},
      {"name": "_initialLiquidity", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "createPool",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "poolId", "type": "uint256"},
      {"name": "_amount", "type": "bytes"},
      {"name": "_entryPrice", "type": "bytes"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "addLiquidity",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "poolId", "type": "uint256"},
      {"name": "_volume", "type": "bytes"},
      {"name": "_priceImpact", "type": "bytes"},
      {"name": "_slippage", "type": "bytes"},
      {"name": "_isBuy", "type": "bool"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "executeTrade",
    "outputs": [{"name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"name": "poolId", "type": "uint256"},
      {"name": "_riskScore", "type": "bytes"},
      {"name": "_volatility", "type": "bytes"},
      {"name": "_maxDrawdown", "type": "bytes"},
      {"name": "_sharpeRatio", "type": "bytes"},
      {"name": "_isHighRisk", "type": "bool"},
      {"name": "inputProof", "type": "bytes"}
    ],
    "name": "updateRiskMetrics",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export function useStealthPool(contractAddress?: string) {
  const { address } = useAccount();
  const [fheUtils, setFheUtils] = useState<FHEUtils | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize FHE utilities
  useEffect(() => {
    const initFHE = async () => {
      try {
        const utils = await import('@/lib/fhe-utils').then(m => m.initializeFHE());
        setFheUtils(await utils);
      } catch (err) {
        console.error('Failed to initialize FHE:', err);
        setError('Failed to initialize FHE encryption');
      }
    };

    initFHE();
  }, []);

  // Contract write functions
  const { writeContract: createPoolWrite } = useWriteContract();
  const { writeContract: addLiquidityWrite } = useWriteContract();
  const { writeContract: executeTradeWrite } = useWriteContract();
  const { writeContract: updateRiskMetricsWrite } = useWriteContract();

  // Create a new encrypted pool
  const createPool = async (
    name: string,
    description: string,
    initialLiquidity: number
  ) => {
    if (!fheUtils || !contractAddress) {
      throw new Error('FHE not initialized or contract address missing');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { encrypted, proof } = await fheUtils.encryptLiquidity(initialLiquidity);
      
      const hash = await createPoolWrite({
        address: contractAddress as `0x${string}`,
        abi: STEALTH_POOL_ABI,
        functionName: 'createPool',
        args: [name, description, encrypted, proof]
      });

      return hash;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create pool';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Add liquidity to an existing pool
  const addLiquidity = async (
    poolId: number,
    amount: number,
    entryPrice: number
  ) => {
    if (!fheUtils || !contractAddress) {
      throw new Error('FHE not initialized or contract address missing');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { encrypted: encryptedAmount, proof: amountProof } = await fheUtils.encryptLiquidity(amount);
      const { encrypted: encryptedPrice, proof: priceProof } = await fheUtils.encryptLiquidity(entryPrice);
      
      const hash = await addLiquidityWrite({
        address: contractAddress as `0x${string}`,
        abi: STEALTH_POOL_ABI,
        functionName: 'addLiquidity',
        args: [poolId, encryptedAmount, encryptedPrice, amountProof]
      });

      return hash;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add liquidity';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Execute a private trade
  const executeTrade = async (
    poolId: number,
    volume: number,
    priceImpact: number,
    slippage: number,
    isBuy: boolean
  ) => {
    if (!fheUtils || !contractAddress) {
      throw new Error('FHE not initialized or contract address missing');
    }

    setIsLoading(true);
    setError(null);

    try {
      const { encryptedVolume, encryptedPriceImpact, encryptedSlippage, proof } = 
        await fheUtils.encryptTradingData({ volume, priceImpact, slippage });
      
      const hash = await executeTradeWrite({
        address: contractAddress as `0x${string}`,
        abi: STEALTH_POOL_ABI,
        functionName: 'executeTrade',
        args: [poolId, encryptedVolume, encryptedPriceImpact, encryptedSlippage, isBuy, proof]
      });

      return hash;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to execute trade';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Update risk metrics for a pool
  const updateRiskMetrics = async (
    poolId: number,
    riskScore: number,
    volatility: number,
    maxDrawdown: number,
    sharpeRatio: number,
    isHighRisk: boolean
  ) => {
    if (!fheUtils || !contractAddress) {
      throw new Error('FHE not initialized or contract address missing');
    }

    setIsLoading(true);
    setError(null);

    try {
      const {
        encryptedRiskScore,
        encryptedVolatility,
        encryptedMaxDrawdown,
        encryptedSharpeRatio,
        proof
      } = await fheUtils.encryptRiskMetrics({
        riskScore,
        volatility,
        maxDrawdown,
        sharpeRatio
      });
      
      const hash = await updateRiskMetricsWrite({
        address: contractAddress as `0x${string}`,
        abi: STEALTH_POOL_ABI,
        functionName: 'updateRiskMetrics',
        args: [poolId, encryptedRiskScore, encryptedVolatility, encryptedMaxDrawdown, encryptedSharpeRatio, isHighRisk, proof]
      });

      return hash;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update risk metrics';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    isLoading,
    error,
    fheUtils,
    
    // Functions
    createPool,
    addLiquidity,
    executeTrade,
    updateRiskMetrics,
    
    // Utils
    isConnected: !!address,
    address
  };
}
