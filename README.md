# 🛍️ Aurore E-commerce

A modern e-commerce platform built with Next.js 15, React 19, TypeScript, and GraphQL. Features responsive UI, authentication, product management, and shopping cart.

## ✨ Main Features
- Homepage with hero, categories, featured products, and reviews
- Product catalog, detail, filtering, and cart/checkout flow
- User authentication (JWT), session, and account management
- Responsive UI (TailwindCSS), loading skeletons, toast notifications
- GraphQL data fetching (Apollo Client)

## 🚀 Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** TailwindCSS
- **Data:** Apollo Client, GraphQL
- **Testing:** Vitest, MSW
- **Deployment:** Vercel

## 📁 Project Structure (src)
```
src/
├── app/         # Next.js App Router (pages, layout, api)
├── components/  # Reusable UI components
├── features/    # Feature modules (product, cart, auth, ...)
├── graphql/     # GraphQL queries & mutations
├── lib/         # Apollo, actions, utils
├── contexts/    # React context providers
├── types/       # TypeScript types
├── mocks/       # Mock data, MSW handlers
```

## 🛠️ Quick Start
1. **Clone & install**
   ```bash
   git clone <repo-url>
   cd aurore-ecommerce
   npm install
   ```
2. **Setup env**
   ```bash
   cp .env.example .env.local
   # Edit GraphQL endpoint if needed
   ```
3. **Run dev server**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

## 🐳 WooCommerce Backend (Optional)
1. **Set-up:**
      Prepare WordPress source
   Put your WordPress files (with wp-config.php, wp-content/, etc.) anywhere on your computer, e.g.:
   /path/to/your/wordpress/html

   Edit docker-compose.yml
   Set volume mount in wordpress service:

   ```bash
   volumes:
   - /path/to/your/wordpress/html:/var/www/html
   Replace with your actual path.

   Start containers and import database

   ```bash
   docker-compose up -d
   docker exec -i db-test sh -c 'mysql -u root -prootpass wpdb' < /path/to/your/wpdb_backup.sql
   On Windows PowerShell:

   ```bash
   Get-Content C:\path\to\your\wpdb_backup.sql | docker exec -i db-test sh -c 'mysql -u root -prootpass wpdb'
   Access WordPress at: http://localhost:8000
  
   GraphQL endpoint: http://localhost:8000/graphql
  ```
- Install WPGraphQL & WPGraphQL for WooCommerce plugins in WP Admin
- Add products, categories, payment methods as needed

## 🔗 Environment Variables
```
NEXT_PUBLIC_CLIENT_URI=http://localhost:8000/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---
For more details, see code comments or contact the maintainer.
