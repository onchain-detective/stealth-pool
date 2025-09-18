import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Eye, TrendingUp, Users, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative py-24 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="container mx-auto text-center relative z-10">
          <Badge className="bg-primary/20 text-primary mb-6 animate-pulse">
            <Zap className="w-3 h-3 mr-1" />
            Privacy-First DeFi
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Provide Liquidity Without Exposure
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hidden liquidity provision with encrypted deposits. Prevent competitors from 
            tracking your LP strategy while maximizing returns through privacy-enhanced pools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/launch">
              <Button size="lg" variant="glow" className="animate-glow">
                <Shield className="w-5 h-5 mr-2" />
                Start Providing Liquidity
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <Eye className="w-5 h-5 mr-2" />
                View Documentation
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <div className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">$127M</p>
                <p className="text-sm text-muted-foreground">Total Encrypted TVL</p>
              </div>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <div className="p-4 text-center">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">4,293</p>
                <p className="text-sm text-muted-foreground">Private LPs</p>
              </div>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <div className="p-4 text-center">
                <Shield className="w-6 h-6 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Privacy Guaranteed</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose SecureLP?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced privacy features designed for professional liquidity providers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-card border-border p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Encrypted Deposits</h3>
              <p className="text-sm text-muted-foreground">
                All deposit amounts are encrypted and hidden from competitors
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-border p-6 text-center">
              <Lock className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Anonymous LP</h3>
              <p className="text-sm text-muted-foreground">
                Provide liquidity without revealing your identity or strategy
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-border p-6 text-center">
              <TrendingUp className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Optimized Returns</h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms maximize yield while maintaining privacy
              </p>
            </Card>
            
            <Card className="bg-gradient-card border-border p-6 text-center">
              <Eye className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Zero Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Prevent front-running and competitor analysis of your moves
              </p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/pools">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                Explore All Pools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;