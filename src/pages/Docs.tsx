import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Book, 
  Search, 
  Lock, 
  Shield, 
  Code, 
  Zap, 
  Users, 
  ExternalLink,
  ChevronRight,
  Lightbulb,
  AlertTriangle
} from "lucide-react";

const Docs = () => {
  const docSections = [
    {
      title: "Getting Started",
      icon: <Lightbulb className="w-5 h-5" />,
      items: [
        "What is SecureLP?",
        "How Privacy Works",
        "Setting Up Your Wallet",
        "First Liquidity Provision"
      ]
    },
    {
      title: "Privacy Features",
      icon: <Shield className="w-5 h-5" />,
      items: [
        "Encrypted Deposits",
        "Hidden LP Positions", 
        "Anonymous Yield Farming",
        "Strategy Obfuscation"
      ]
    },
    {
      title: "Pool Management",
      icon: <Users className="w-5 h-5" />,
      items: [
        "Creating Pools",
        "Pool Parameters",
        "Risk Assessment",
        "Withdrawal Strategies"
      ]
    },
    {
      title: "Technical Reference",
      icon: <Code className="w-5 h-5" />,
      items: [
        "Smart Contract API",
        "Integration Guide",
        "Security Audits",
        "Protocol Specifications"
      ]
    }
  ];

  const quickLinks = [
    { title: "Privacy Whitepaper", type: "PDF", external: true },
    { title: "Smart Contract Code", type: "GitHub", external: true },
    { title: "Security Audit", type: "Report", external: true },
    { title: "Community Discord", type: "Chat", external: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Complete guide to privacy-first liquidity provision and encrypted DeFi protocols
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* Quick Start */}
        <Card className="bg-gradient-glow border-border mb-12">
          <div className="p-8">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-2xl font-bold text-foreground">Quick Start Guide</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Get started with SecureLP in just 5 minutes. Learn how to provide liquidity while maintaining complete privacy.
            </p>
            <Button variant="glow" className="animate-glow">
              <Book className="w-4 h-4 mr-2" />
              Start Tutorial
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Documentation */}
          <div className="lg:col-span-2 space-y-8">
            {docSections.map((section) => (
              <Card key={section.title} className="bg-gradient-card border-border">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-primary mr-3">{section.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3">
                    {section.items.map((item) => (
                      <div 
                        key={item}
                        className="flex items-center p-3 rounded-lg bg-encrypted hover:bg-border transition-colors cursor-pointer group"
                      >
                        <ChevronRight className="w-4 h-4 text-muted-foreground mr-3 group-hover:text-primary transition-colors" />
                        <span className="text-foreground group-hover:text-primary transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {/* Security Notice */}
            <Card className="bg-gradient-card border-warning">
              <div className="p-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-warning mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Security Best Practices</h4>
                    <p className="text-muted-foreground mb-4">
                      Always verify smart contract addresses and use hardware wallets for large transactions. 
                      Your privacy is only as strong as your operational security.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Security Guide
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <ExternalLink className="w-5 h-5 mr-2 text-primary" />
                  Quick Links
                </h3>
                <div className="space-y-3">
                  {quickLinks.map((link) => (
                    <div 
                      key={link.title}
                      className="flex items-center justify-between p-3 rounded-lg bg-encrypted hover:bg-border transition-colors cursor-pointer"
                    >
                      <span className="text-sm text-foreground">{link.title}</span>
                      <Badge variant="secondary">{link.type}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* API Status */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-4">API Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Privacy Engine</span>
                    <Badge variant="outline" className="border-success text-success">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pool Interface</span>
                    <Badge variant="outline" className="border-success text-success">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Analytics API</span>
                    <Badge variant="outline" className="border-success text-success">Online</Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Community */}
            <Card className="bg-gradient-card border-border">
              <div className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Community</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our community for support, updates, and discussions about privacy-first DeFi.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Discord Community
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Code className="w-4 h-4 mr-2" />
                    GitHub Repository
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;