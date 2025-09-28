# Environment Configuration Setup

## ✅ Complete Environment-Based API Configuration

Your frontend now uses environment variables for API URLs, making it easy to switch between development and production environments.

## 📁 Environment Files Created

### `.env` (Development - Default)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=E-commerce App
VITE_APP_VERSION=1.0.0
```

### `.env.production` (Production)
```env
VITE_API_BASE_URL=https://your-production-api.com
VITE_APP_NAME=E-commerce App
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
```

### `.env.example` (Template)
```env
# Environment Variables Template
# Copy this file to .env and update the values

# API Configuration
VITE_API_BASE_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=E-commerce App
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=development
```

## 🔧 API Configuration

### Centralized API Configuration (`src/config/api.js`)
- **Environment Variables**: Automatically reads from `.env` files
- **API Endpoints**: All endpoints centralized and environment-aware
- **Axios Configuration**: Consistent configuration across all API calls
- **Logging**: Development-only API call logging

### Updated Redux Slices
All Redux slices now use the centralized API configuration:

✅ **Authentication Slice** (`store/auth-slice/index.js`)
- Register, login, logout, check auth

✅ **Shop Products Slice** (`store/shop/products-slice/index.js`)
- Get filtered products, product details

✅ **Cart Slice** (`store/shop/cart-slice/index.js`)
- Add, update, delete, fetch cart items

✅ **Order Slice** (`store/shop/order-slice/index.js`)
- Create orders, capture payments, get orders

✅ **Address Slice** (`store/shop/address-slice/index.js`)
- Add, update, delete, fetch addresses

✅ **Review Slice** (`store/shop/review-slice/index.js`)
- Add and get product reviews

✅ **Search Slice** (`store/shop/search-slice/index.js`)
- Search products by keyword

✅ **Admin Products Slice** (`store/admin/products-slice/index.js`)
- CRUD operations for products

✅ **Admin Orders Slice** (`store/admin/order-slice/index.js`)
- Manage orders, update status

✅ **Common Slice** (`store/common-slice/index.js`)
- Feature images management

## 🚀 How to Use

### Development
1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **The frontend will automatically use:**
   - `VITE_API_BASE_URL=http://localhost:5000`
   - All API calls will go to `http://localhost:5000/api/*`

### Production Deployment

1. **Update `.env.production`:**
   ```env
   VITE_API_BASE_URL=https://your-production-api.com
   VITE_APP_ENV=production
   ```

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **The built app will use the production API URL**

### Custom Environment

1. **Create a new environment file:**
   ```bash
   cp .env.example .env.staging
   ```

2. **Update the staging environment:**
   ```env
   VITE_API_BASE_URL=https://staging-api.yourdomain.com
   VITE_APP_ENV=staging
   ```

3. **Use with Vite:**
   ```bash
   npm run dev -- --mode staging
   ```

## 🔍 Features

### Environment Detection
- **Development**: `VITE_APP_ENV=development` (default)
- **Production**: `VITE_APP_ENV=production`
- **Custom**: Any custom environment name

### API Call Logging
- **Development**: All API calls are logged to console
- **Production**: No logging (cleaner performance)

### Centralized Configuration
- **Single Source of Truth**: All API endpoints in one file
- **Type Safety**: Consistent endpoint structure
- **Easy Maintenance**: Update URLs in one place

### Security
- **Environment Variables**: Sensitive data not in code
- **Build-time Configuration**: Variables baked into build
- **No Runtime Exposure**: Variables not accessible in browser

## 📋 API Endpoints Structure

```javascript
// All endpoints are now environment-aware
API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    // ... more auth endpoints
  },
  SHOP_PRODUCTS: {
    GET_ALL: `${API_BASE_URL}/api/shop/products/get`,
    GET_BY_ID: (id) => `${API_BASE_URL}/api/shop/products/get/${id}`,
  },
  // ... more endpoint categories
}
```

## 🛠️ Benefits

1. **Easy Deployment**: Change one environment variable
2. **Multiple Environments**: Dev, staging, production
3. **No Hardcoded URLs**: All URLs are configurable
4. **Consistent Configuration**: Same setup across all API calls
5. **Development Tools**: Built-in logging and debugging
6. **Production Ready**: Optimized for production builds

## 🔄 Migration Complete

✅ **All hardcoded `localhost:5000` URLs removed**
✅ **Environment variables implemented**
✅ **Centralized API configuration**
✅ **All Redux slices updated**
✅ **Production-ready setup**

Your frontend is now fully environment-aware and ready for deployment! 🎉

