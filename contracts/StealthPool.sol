// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint64, externalEuint64, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";
import { Reencrypt } from "@fhevm/solidity/lib/Reencrypt.sol";

contract StealthPool is SepoliaConfig {
    using FHE for *;
    
    struct PoolData {
        euint32 poolId;
        euint32 totalLiquidity;
        euint32 totalVolume;
        euint32 participantCount;
        euint32 averageAPY;
        ebool isActive;
        ebool isVerified;
        string name;
        string description;
        address creator;
        uint256 creationTime;
        uint256 lastUpdateTime;
    }
    
    struct LiquidityPosition {
        euint32 positionId;
        euint32 amount;
        euint32 entryPrice;
        euint32 currentValue;
        ebool isActive;
        address owner;
        uint256 timestamp;
    }
    
    struct TradingActivity {
        euint32 activityId;
        euint32 volume;
        euint32 priceImpact;
        euint32 slippage;
        ebool isBuy;
        address trader;
        uint256 timestamp;
    }
    
    struct RiskMetrics {
        euint32 riskScore;
        euint32 volatility;
        euint32 maxDrawdown;
        euint32 sharpeRatio;
        ebool isHighRisk;
        uint256 lastCalculated;
    }
    
    mapping(uint256 => PoolData) public pools;
    mapping(uint256 => LiquidityPosition) public positions;
    mapping(uint256 => TradingActivity) public activities;
    mapping(uint256 => RiskMetrics) public riskMetrics;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public userActivityScore;
    
    uint256 public poolCounter;
    uint256 public positionCounter;
    uint256 public activityCounter;
    
    address public owner;
    address public verifier;
    
    event PoolCreated(uint256 indexed poolId, address indexed creator, string name);
    event LiquidityAdded(uint256 indexed positionId, uint256 indexed poolId, address indexed user, uint32 amount);
    event TradingExecuted(uint256 indexed activityId, uint256 indexed poolId, address indexed trader, uint32 volume);
    event RiskUpdated(uint256 indexed poolId, uint32 riskScore);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createPool(
        string memory _name,
        string memory _description,
        externalEuint32 _initialLiquidity,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 poolId = poolCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalLiquidity = FHE.fromExternal(_initialLiquidity, inputProof);
        
        pools[poolId] = PoolData({
            poolId: FHE.asEuint32(poolId),
            totalLiquidity: internalLiquidity,
            totalVolume: FHE.asEuint32(0),
            participantCount: FHE.asEuint32(1),
            averageAPY: FHE.asEuint32(0),
            isActive: FHE.asEbool(true),
            isVerified: FHE.asEbool(false),
            name: _name,
            description: _description,
            creator: msg.sender,
            creationTime: block.timestamp,
            lastUpdateTime: block.timestamp
        });
        
        emit PoolCreated(poolId, msg.sender, _name);
        return poolId;
    }
    
    function addLiquidity(
        uint256 poolId,
        externalEuint32 _amount,
        externalEuint32 _entryPrice,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(pools[poolId].creator != address(0), "Pool does not exist");
        require(FHE.decrypt(pools[poolId].isActive), "Pool is not active");
        
        uint256 positionId = positionCounter++;
        
        // Convert external values to internal
        euint32 internalAmount = FHE.fromExternal(_amount, inputProof);
        euint32 internalEntryPrice = FHE.fromExternal(_entryPrice, inputProof);
        
        positions[positionId] = LiquidityPosition({
            positionId: FHE.asEuint32(positionId),
            amount: internalAmount,
            entryPrice: internalEntryPrice,
            currentValue: internalAmount, // Initially same as amount
            isActive: FHE.asEbool(true),
            owner: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update pool totals
        pools[poolId].totalLiquidity = FHE.add(pools[poolId].totalLiquidity, internalAmount);
        pools[poolId].participantCount = FHE.add(pools[poolId].participantCount, FHE.asEuint32(1));
        pools[poolId].lastUpdateTime = block.timestamp;
        
        emit LiquidityAdded(positionId, poolId, msg.sender, 0); // Amount will be decrypted off-chain
        return positionId;
    }
    
    function executeTrade(
        uint256 poolId,
        externalEuint32 _volume,
        externalEuint32 _priceImpact,
        externalEuint32 _slippage,
        bool _isBuy,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(pools[poolId].creator != address(0), "Pool does not exist");
        require(FHE.decrypt(pools[poolId].isActive), "Pool is not active");
        
        uint256 activityId = activityCounter++;
        
        // Convert external values to internal
        euint32 internalVolume = FHE.fromExternal(_volume, inputProof);
        euint32 internalPriceImpact = FHE.fromExternal(_priceImpact, inputProof);
        euint32 internalSlippage = FHE.fromExternal(_slippage, inputProof);
        
        activities[activityId] = TradingActivity({
            activityId: FHE.asEuint32(activityId),
            volume: internalVolume,
            priceImpact: internalPriceImpact,
            slippage: internalSlippage,
            isBuy: FHE.asEbool(_isBuy),
            trader: msg.sender,
            timestamp: block.timestamp
        });
        
        // Update pool volume
        pools[poolId].totalVolume = FHE.add(pools[poolId].totalVolume, internalVolume);
        pools[poolId].lastUpdateTime = block.timestamp;
        
        // Update user activity score
        userActivityScore[msg.sender] = FHE.add(userActivityScore[msg.sender], FHE.asEuint32(1));
        
        emit TradingExecuted(activityId, poolId, msg.sender, 0); // Volume will be decrypted off-chain
        return activityId;
    }
    
    function updateRiskMetrics(
        uint256 poolId,
        externalEuint32 _riskScore,
        externalEuint32 _volatility,
        externalEuint32 _maxDrawdown,
        externalEuint32 _sharpeRatio,
        bool _isHighRisk,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update risk metrics");
        require(pools[poolId].creator != address(0), "Pool does not exist");
        
        // Convert external values to internal
        euint32 internalRiskScore = FHE.fromExternal(_riskScore, inputProof);
        euint32 internalVolatility = FHE.fromExternal(_volatility, inputProof);
        euint32 internalMaxDrawdown = FHE.fromExternal(_maxDrawdown, inputProof);
        euint32 internalSharpeRatio = FHE.fromExternal(_sharpeRatio, inputProof);
        
        riskMetrics[poolId] = RiskMetrics({
            riskScore: internalRiskScore,
            volatility: internalVolatility,
            maxDrawdown: internalMaxDrawdown,
            sharpeRatio: internalSharpeRatio,
            isHighRisk: FHE.asEbool(_isHighRisk),
            lastCalculated: block.timestamp
        });
        
        emit RiskUpdated(poolId, 0); // Risk score will be decrypted off-chain
    }
    
    function updateUserReputation(
        address user,
        externalEuint32 _reputation,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        
        euint32 internalReputation = FHE.fromExternal(_reputation, inputProof);
        userReputation[user] = internalReputation;
        
        emit ReputationUpdated(user, 0); // Reputation will be decrypted off-chain
    }
    
    function verifyPool(uint256 poolId) public {
        require(msg.sender == verifier, "Only verifier can verify pools");
        require(pools[poolId].creator != address(0), "Pool does not exist");
        
        pools[poolId].isVerified = FHE.asEbool(true);
    }
    
    function deactivatePool(uint256 poolId) public {
        require(msg.sender == pools[poolId].creator || msg.sender == owner, "Unauthorized");
        require(pools[poolId].creator != address(0), "Pool does not exist");
        
        pools[poolId].isActive = FHE.asEbool(false);
    }
    
    // View functions for encrypted data (require reencryption)
    function getPoolData(uint256 poolId) public view returns (PoolData memory) {
        return pools[poolId];
    }
    
    function getPositionData(uint256 positionId) public view returns (LiquidityPosition memory) {
        return positions[positionId];
    }
    
    function getActivityData(uint256 activityId) public view returns (TradingActivity memory) {
        return activities[activityId];
    }
    
    function getRiskMetrics(uint256 poolId) public view returns (RiskMetrics memory) {
        return riskMetrics[poolId];
    }
    
    // Reencryption functions for off-chain decryption
    function reencryptPoolLiquidity(uint256 poolId, bytes32 publicKey) public view returns (bytes memory) {
        return Reencrypt.reencrypt(pools[poolId].totalLiquidity, publicKey);
    }
    
    function reencryptPoolVolume(uint256 poolId, bytes32 publicKey) public view returns (bytes memory) {
        return Reencrypt.reencrypt(pools[poolId].totalVolume, publicKey);
    }
    
    function reencryptPositionAmount(uint256 positionId, bytes32 publicKey) public view returns (bytes memory) {
        return Reencrypt.reencrypt(positions[positionId].amount, publicKey);
    }
    
    function reencryptActivityVolume(uint256 activityId, bytes32 publicKey) public view returns (bytes memory) {
        return Reencrypt.reencrypt(activities[activityId].volume, publicKey);
    }
    
    function reencryptRiskScore(uint256 poolId, bytes32 publicKey) public view returns (bytes memory) {
        return Reencrypt.reencrypt(riskMetrics[poolId].riskScore, publicKey);
    }
    
    function reencryptUserReputation(address user, bytes32 publicKey) public view returns (bytes memory) {
        return Reencrypt.reencrypt(userReputation[user], publicKey);
    }
}
