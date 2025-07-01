# Aurore E-commerce

Aurore E-commerce là dự án web bán hàng hiện đại sử dụng Next.js 15, React 19, Apollo Client, GraphQL, TailwindCSS và các thư viện UI của Radix UI. Dự án hỗ trợ các tính năng thương mại điện tử cơ bản như xem sản phẩm, đánh giá, lọc, và quản lý giỏ hàng.

## Tính năng chính

- Trang chủ với banner, danh mục, sản phẩm mới, sản phẩm bán chạy, đánh giá nổi bật
- Trang chi tiết sản phẩm với breadcrumb, mô tả, đánh giá, tab thông tin, sản phẩm liên quan
- Đánh giá sản phẩm, lọc/sắp xếp đánh giá
- Giao diện responsive, hiện đại
- Quản lý trạng thái với React Hook Form, Zod validation
- Tích hợp Apollo Client cho GraphQL
- Error boundary toàn cục (có thể mở rộng với error.tsx)

## Cấu trúc thư mục chính

```
aurore-ecommerce/
├── src/
│   ├── app/
│   │   ├── (front)/
│   │   │   ├── layout.tsx         # Layout chung: Header, Footer, Signup CTA
│   │   │   ├── page.tsx           # Trang chủ
│   │   │   └── product/
│   │   │       └── [id]/
│   │   │           └── page.tsx   # Trang chi tiết sản phẩm
│   │   │
│   │   ├── components/                # UI components: header, footer, banner, hero, ...
│   │   ├── features/                  # Business logic: product, rating, checkout, ...
│   │   ├── lib/                       # API, utils, apollo client
│   │   ├── mocks/                     # Mock data, MSW handlers
│   │   ├── types/                     # TypeScript types
│   │   └── config/                    # Cấu hình fonts, routes
│   ├── public/                        # Ảnh, icon, assets tĩnh
│   ├── package.json                   # Thông tin, scripts, dependencies
│   ├── tsconfig.json                  # TypeScript config
│   └── README.md                      # (Bạn đang đọc)
```

## Công nghệ sử dụng

- **Next.js 15** (App Router, SSR, SSG)
- **React 19**
- **Apollo Client** & **GraphQL**
- **TailwindCSS**
- **Radix UI** (Dialog, Select, Popover...)
- **React Hook Form**, **Zod** (form & validation)
- **MSW** (Mock Service Worker cho test/mock API)
- **Vitest** (unit test)

## Hướng dẫn cài đặt & chạy

```bash
# Cài dependencies
npm install

# Chạy dev
npm run dev

# Build production
npm run build

# Chạy test
npm run test
```

## Scripts chính

- `dev`: Chạy development server
- `build`: Build production
- `start`: Chạy production server
- `lint`: Kiểm tra code với ESLint
- `test`: Chạy unit test với Vitest
- `codegen`: Sinh mã từ GraphQL schema

## Đóng góp

Pull request, issue và góp ý đều được chào đón!

---

## Deploy on Vercel

## License

MIT
