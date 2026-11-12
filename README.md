# hailv-blog-website
Website cá nhân và blog của Hailv

## Mã nguồn

Ứng dụng nằm trong `astro-setup/`, được khởi tạo từ mẫu Astro Blog chính thức bằng create-cloudflare. Có trang chủ, danh sách bài viết, trang giới thiệu, Markdown/MDX, RSS và sitemap. Nội dung mẫu vẫn được giữ để làm điểm bắt đầu.

## Chạy trên máy

Yêu cầu Node.js 22.23.4 trở lên (khuyến nghị Node.js 24).

```sh
npm --prefix astro-setup ci
npm run dev
```

Mở địa chỉ mà lệnh phát triển hiển thị, thường là http://localhost:4321.

```sh
npm run build
npm run preview
```

## Cloudflare Pages

Đây là blog tĩnh, không cần adapter SSR. Bộ khởi tạo Pages tự thêm adapter Cloudflare mới dành cho Workers và gây lỗi binding ASSETS khi build, nên adapter đã được bỏ khỏi cấu hình.

- Kho GitHub: `lvh2710/hailv-blog-website`
- Nhánh sản xuất: `main`
- Thư mục gốc ứng dụng: `astro-setup`
- Lệnh dựng: `npm run build`
- Thư mục kết quả: `dist`

Hoặc, sau khi đăng nhập Cloudflare bằng `npx wrangler login` trong `astro-setup/`, chạy `npm run deploy` từ gốc repo. Lệnh này xuất bản thật lên Cloudflare.

Chưa triển khai website lên Cloudflare. Trước khi xuất bản, đổi `site` trong `astro-setup/astro.config.mjs` từ `https://example.com` sang tên miền thật, sửa nội dung trang chủ/giới thiệu và thay các bài mẫu trong `astro-setup/src/content/blog/`.

Tài liệu: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
