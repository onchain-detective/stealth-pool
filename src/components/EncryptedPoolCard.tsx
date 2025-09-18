import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, TrendingUp, Zap } from "lucide-react";

interface EncryptedPoolData {
  id: string;
  name: string;
  encryptedTVL: string;
  apy: string;
  risk: "low" | "medium" | "high";
  participants: number;
  lockPeriod: string;
}

interface EncryptedPoolCardProps {
  pool: EncryptedPoolData;
}

export function EncryptedPoolCard({ pool }: EncryptedPoolCardProps) {
  return (
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 group">
      <div className="p-6 space-y-4">
        {/* Pool Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-encrypted rounded-xl flex items-center justify-center animate-glow">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{pool.name}</h3>
              <p className="text-sm text-muted-foreground">Privacy Pool</p>
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className={`
              ${pool.risk === 'low' ? 'bg-success/20 text-success' : 
                pool.risk === 'medium' ? 'bg-warning/20 text-warning' : 
                'bg-destructive/20 text-destructive'}
            `}
          >
            {pool.risk} risk
          </Badge>
        </div>

        {/* Encrypted Data Layer */}
        <div className="space-y-3 p-4 bg-encrypted rounded-lg border border-border/50 animate-encrypted-float">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">Encrypted Layer</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Total Value Locked</p>
              <p className="font-mono text-sm text-foreground blur-sm hover:blur-none transition-all duration-300">
                {pool.encryptedTVL}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">APY</p>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <p className="font-semibold text-success">{pool.apy}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Participants</p>
              <p className="text-sm text-foreground">{pool.participants.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Lock Period</p>
              <p className="text-sm text-foreground">{pool.lockPeriod}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
          <Button 
            className="w-full hover:shadow-glow-strong transition-all duration-300 group-hover:animate-glow"
            variant="glow"
            size="lg"
          >
          <Zap className="w-4 h-4 mr-2" />
          Provide Liquidity
        </Button>
      </div>
    </Card>
  );
}