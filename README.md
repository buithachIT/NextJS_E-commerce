# Aurore Ecommerce

Aurore Ecommerce là một dự án web thương mại điện tử hiện đại, xây dựng với Next.js, React, GraphQL và TypeScript.

## Chức năng chính

- Trang chủ với banner, hero section, danh mục sản phẩm nổi bật
- Tìm kiếm, lọc và xem chi tiết sản phẩm
- Đánh giá sản phẩm (rating)
- Quy trình thanh toán (checkout) với chọn địa chỉ, quốc gia, tỉnh/thành
- Giao diện responsive, tối ưu cho desktop và mobile

## Công nghệ sử dụng

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [Zod](https://zod.dev/) (validate form)
- [Tailwind CSS](https://tailwindcss.com/)

## Cài đặt & chạy dự án

### 1. Clone source code

```bash
git clone <repo-url>
cd aurore-ecommerce
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để xem website.

### 4. Build production

```bash
npm run build
npm start
```

## Cấu trúc thư mục chính

- `src/app/` : Các route và layout chính của Next.js
- `src/components/` : Các component UI tái sử dụng
- `src/features/` : Chức năng theo domain (checkout, product, rating...)
- `src/lib/` : Thư viện, utils, cấu hình Apollo client
- `src/types/` : Định nghĩa type chung
- `src/assets/` : Hình ảnh, icon, font
- `graphql/` : Các file query GraphQL

## Đóng góp

## Deploy on Vercel

## License

MIT
