# 🛍️ Aurore E-commerce

A modern e-commerce platform built with Next.js 15, React 19, and GraphQL. Features a responsive design, user authentication, product management, and shopping cart functionality.

## ✨ Features

### 🏠 **Homepage**
- Hero section with dynamic banners
- Category browsing with visual cards
- Featured products showcase
- Customer reviews and ratings
- Newsletter signup

### 🛒 **Shopping Experience**
- Product catalog with filtering and sorting
- Detailed product pages with images, descriptions, and reviews
- Shopping cart management
- Checkout process with billing and shipping
- User account management

### 🔐 **Authentication**
- User registration and login
- JWT token-based authentication
- Password validation and security
- Session management with refresh tokens

### 📱 **User Interface**
- Fully responsive design (mobile-first)
- Modern UI with TailwindCSS
- Accessible components with Radix UI
- Dark/light mode support
- Loading states and error handling

## 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Frontend** | React 19, TypeScript |
| **Styling** | TailwindCSS, Radix UI |
| **Data Fetching** | Apollo Client, GraphQL |
| **Forms** | React Hook Form, Zod validation |
| **Testing** | Vitest, MSW (Mock Service Worker) |
| **Deployment** | Vercel |

## 📁 Project Structure

```
aurore-ecommerce/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (front)/                  # Public pages
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── product/[slug]/       # Product details
│   │   │   ├── category/[slug]/      # Category pages
│   │   │   ├── cart/                 # Shopping cart
│   │   │   └── checkout/             # Checkout process
│   │   ├── api/                      # API routes
│   │   │   └── user/                 # User authentication APIs
│   │   └── layout.tsx                # Root layout
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # Base UI components (Radix)
│   │   ├── headers/                  # Navigation components
│   │   ├── footers/                  # Footer components
│   │   └── skeletons/                # Loading skeletons
│   ├── features/                     # Feature-based modules
│   │   ├── auth/                     # Authentication logic
│   │   ├── product/                  # Product management
│   │   ├── cart/                     # Shopping cart logic
│   │   ├── checkout/                 # Checkout process
│   │   └── rating/                   # Product ratings
│   ├── lib/                          # Utilities and configurations
│   │   ├── apollo/                   # Apollo Client setup
│   │   ├── action/                   # Server actions
│   │   └── utils/                    # Helper functions
│   ├── graphql/                      # GraphQL operations
│   │   ├── mutations/                # GraphQL mutations
│   │   └── queries/                  # GraphQL queries
│   ├── types/                        # TypeScript type definitions
│   ├── config/                       # App configuration
│   └── mocks/                        # Mock data and MSW handlers
├── public/                           # Static assets
│   └── assets/                       # Images, icons, fonts
├── tests/                            # Test configuration
└── docs/                             # Documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Docker & Docker Compose (for WooCommerce backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aurore-ecommerce.git
   cd aurore-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_CLIENT_URI=http://localhost:8000/graphql
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Setup

### Prerequisites
- Docker Desktop installed
- Docker Compose installed

### Quick Start with Docker

1. **Start WooCommerce backend**
   ```bash
   # Start WordPress with WooCommerce
   docker-compose up -d
   ```

2. **Access WordPress admin**
   - Navigate to [http://localhost:8000](http://localhost:8000)
   - Complete WordPress installation
   - Install and activate WooCommerce plugin

3. **Configure WooCommerce**
   - Go to WooCommerce → Settings
   - Set up your store details
   - Configure payment methods
   - Add products and categories

### Docker Services

| Service | Port | Description |
|---------|------|-------------|
| **WordPress** | 8000 | WooCommerce backend with GraphQL |
| **MySQL** | 3306 | Database (internal) |

### Useful Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset everything (⚠️ deletes data)
docker-compose down -v
docker-compose up -d

# Access MySQL
docker-compose exec db mysql -u wpuser -p wpdb
```

## 🔗 WooCommerce Integration

### GraphQL Setup

1. **Install WPGraphQL plugin**
   - Go to WordPress Admin → Plugins → Add New
   - Search for "WPGraphQL"
   - Install and activate

2. **Install WPGraphQL for WooCommerce**
   - Search for "WPGraphQL for WooCommerce"
   - Install and activate

3. **Configure GraphQL endpoint**
   - Default endpoint: `http://localhost:8000/graphql`
   - Test with GraphQL Playground: `http://localhost:8000/graphql`

### WooCommerce Configuration

1. **Products Setup**
   ```
   WooCommerce → Products → Add New
   - Product name, description, images
   - Price, inventory, categories
   - Product variations (size, color, etc.)
   ```

2. **Categories & Attributes**
   ```
   WooCommerce → Products → Categories
   WooCommerce → Products → Attributes
   ```

3. **Payment Methods**
   ```
   WooCommerce → Settings → Payments
   - Enable desired payment gateways
   - Configure API keys
   ```

4. **Shipping Zones**
   ```
   WooCommerce → Settings → Shipping
   - Configure shipping zones
   - Set up shipping methods
   ```

### Environment Variables for WooCommerce

```env
# Development
NEXT_PUBLIC_CLIENT_URI=http://localhost:8000/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production (replace with your domain)
NEXT_PUBLIC_CLIENT_URI=https://your-domain.com/graphql
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Testing WooCommerce Connection

1. **Test GraphQL endpoint**
   ```bash
   curl -X POST http://localhost:8000/graphql \
     -H "Content-Type: application/json" \
     -d '{"query":"{ products { nodes { id name } } }"}'
   ```

2. **Verify products in frontend**
   - Visit [http://localhost:3000](http://localhost:3000)
   - Check if products are loading
   - Test product details pages

## 📜 Available Scripts
  
| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run codegen` | Generate GraphQL types |

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_CLIENT_URI` | GraphQL endpoint | `http://localhost:8000/graphql` |
| `NEXT_PUBLIC_SITE_URL` | Site URL | `http://localhost:3000` |

### GraphQL Setup

The project uses Apollo Client for GraphQL operations. Configure your GraphQL endpoint in the environment variables.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write unit tests for new features
- Use conventional commits
- Ensure responsive design
- Follow accessibility guidelines

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [Apollo Client](https://www.apollographql.com/docs/react/) for GraphQL

---

**Made with ❤️ by BuiThach**
