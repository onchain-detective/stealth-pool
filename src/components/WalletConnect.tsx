import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Shield, CheckCircle, ExternalLink } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <Card className="bg-gradient-card border-border shadow-glow">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-foreground">{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
                <Badge variant="secondary" className="bg-success/20 text-success">
                  <Shield className="w-3 h-3 mr-1" />
                  Protected
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Wallet Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => window.open(`https://sepolia.etherscan.io/address/${address}`, '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button variant="destructive" size="sm" onClick={() => disconnect()}>
              Disconnect
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
      <div className="p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-encrypted rounded-full flex items-center justify-center mx-auto animate-glow">
          <Wallet className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-2">Connect Wallet Required</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Connect your wallet to access encrypted liquidity pools and maintain privacy
          </p>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button 
                          onClick={openConnectModal}
                          variant="glow"
                          size="lg"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Connect Wallet
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button onClick={openChainModal} variant="destructive" size="lg">
                          Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={openChainModal}
                          variant="outline"
                          size="sm"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </Button>

                        <Button onClick={openAccountModal} variant="outline" size="sm">
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </Card>
  );
}