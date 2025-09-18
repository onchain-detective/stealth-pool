# Vercel Deployment Guide for Stealth Pool

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare your environment configuration

## Step-by-Step Deployment

### Step 1: Connect GitHub Repository

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign in" and authenticate with GitHub

2. **Import Project**
   - Click "New Project" on the dashboard
   - Select "Import Git Repository"
   - Choose `onchain-detective/stealth-pool` from the list
   - Click "Import"

### Step 2: Configure Build Settings

1. **Framework Preset**
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Root Directory**
   - Leave as default (root of repository)

### Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

#### Required Environment Variables:

```env
# Network Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration
NEXT_PUBLIC_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

#### How to Add Environment Variables:

1. In your Vercel project dashboard
2. Go to "Settings" tab
3. Click "Environment Variables" in the left sidebar
4. Add each variable:
   - **Name**: `NEXT_PUBLIC_CHAIN_ID`
   - **Value**: `11155111`
   - **Environment**: Production, Preview, Development (select all)
   - Click "Save"

5. Repeat for all environment variables listed above:
   - `NEXT_PUBLIC_RPC_URL`: Your Infura RPC URL
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Your WalletConnect Project ID
   - `NEXT_PUBLIC_INFURA_API_KEY`: Your Infura API Key (optional)

### Step 4: Advanced Configuration

1. **Build Settings**
   - Go to "Settings" → "General"
   - Under "Build & Development Settings":
     - Node.js Version: `18.x`
     - Install Command: `npm install`
     - Build Command: `npm run build`
     - Output Directory: `dist`

2. **Functions Configuration**
   - No serverless functions needed for this static site

### Step 5: Domain Configuration (Optional)

1. **Custom Domain**
   - Go to "Settings" → "Domains"
   - Add your custom domain if you have one
   - Configure DNS settings as instructed

2. **Default Domain**
   - Vercel will provide a default domain like `stealth-pool-xxx.vercel.app`

### Step 6: Deploy

1. **Automatic Deployment**
   - Once configured, Vercel will automatically deploy
   - Go to "Deployments" tab to monitor progress
   - Wait for deployment to complete (usually 2-5 minutes)

2. **Manual Deployment**
   - If needed, click "Redeploy" button
   - Or push new commits to trigger automatic deployment

### Step 7: Post-Deployment Verification

1. **Check Deployment Status**
   - Visit your deployment URL
   - Ensure the site loads correctly
   - Test wallet connection functionality

2. **Test Wallet Integration**
   - Connect with MetaMask or Rainbow wallet
   - Verify network switching to Sepolia
   - Test basic functionality

## Important Configuration Notes

### Environment Variables Priority:
1. **Production**: Used for production deployments
2. **Preview**: Used for preview deployments (PR branches)
3. **Development**: Used for local development

### Build Optimization:
- Vercel automatically optimizes Vite builds
- Static assets are served from CDN
- Automatic HTTPS is enabled

### Monitoring:
- Check "Functions" tab for any build errors
- Monitor "Analytics" for performance metrics
- Use "Speed Insights" for performance monitoring

## Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version (should be 18.x)
   - Verify all dependencies are in package.json
   - Check build logs in Vercel dashboard

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_`
   - Redeploy after adding new variables
   - Check variable names match exactly

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure network configuration is correct

### Support Resources:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/installation)

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel automatically provides HTTPS
   - No additional SSL configuration needed

3. **Access Control**
   - Consider adding authentication if needed
   - Implement rate limiting for API calls

## Performance Optimization

1. **CDN**
   - Vercel automatically uses global CDN
   - Static assets are cached globally

2. **Build Optimization**
   - Vite automatically optimizes builds
   - Code splitting is enabled by default

3. **Monitoring**
   - Enable Vercel Analytics
   - Monitor Core Web Vitals
   - Set up alerts for performance issues

## Final Checklist

- [ ] Repository connected to Vercel
- [ ] Build settings configured correctly
- [ ] All environment variables added
- [ ] Deployment successful
- [ ] Site accessible via provided URL
- [ ] Wallet connection working
- [ ] Network switching functional
- [ ] Performance metrics acceptable

## Next Steps

1. **Domain Setup**: Configure custom domain if needed
2. **Analytics**: Set up monitoring and analytics
3. **CI/CD**: Configure automatic deployments
4. **Security**: Implement additional security measures
5. **Performance**: Monitor and optimize as needed

Your Stealth Pool application should now be live and accessible via the Vercel-provided URL!
