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

If you want to use WooCommerce as the backend, follow these steps:

### 1. Prepare Your WordPress Source

- Make sure you have your WordPress source files (including `wp-config.php`, the `wp-content/` folder, etc.).
- Example path:
  ```
  /path/to/your/wordpress/html
  ```

### 2. Edit `docker-compose.yml`

- Open your `docker-compose.yml` file.
- Find the `wordpress` service and update the volume section:
  ```yaml
  volumes:
    - /path/to/your/wordpress/html:/var/www/html
  ```
  > **Note:** Replace `/path/to/your/wordpress/html` with your actual local path.

### 3. Start Containers & Import Database

- **Start Docker containers:**
  ```bash
  docker-compose up -d
  ```

- **Import your database backup:**

  - **On Linux/macOS:**
    ```bash
    docker exec -i db-test sh -c 'mysql -u root -prootpass wpdb' < /path/to/your/wpdb_backup.sql
    ```

  - **On Windows PowerShell:**
    ```powershell
    Get-Content C:\path\to\your\wpdb_backup.sql | docker exec -i db-test sh -c 'mysql -u root -prootpass wpdb'
    ```

### 4. Access WordPress

- Open your browser and go to:
  [http://localhost:8000](http://localhost:8000)

### 5. Install GraphQL Plugins

- Log in to your WordPress admin dashboard.
- Install and activate the following plugins:
  - [WPGraphQL](https://wordpress.org/plugins/wp-graphql/)
  - [WPGraphQL for WooCommerce](https://github.com/wp-graphql/wp-graphql-woocommerce)

### 6. Add Sample Data

- Add products, categories, and payment methods as needed in your WordPress admin.

### 7. Verify GraphQL Endpoint

- Make sure your GraphQL endpoint is available at:
  [http://localhost:8000/graphql](http://localhost:8000/graphql)

---

**Relevant environment variables:**
```env
NEXT_PUBLIC_CLIENT_URI=http://localhost:8000/graphql
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---
For more details, see code comments or contact the maintainer.
