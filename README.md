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

## Website đã triển khai

Địa chỉ chính: https://hailv-blog-website.pages.dev

Đã triển khai bản mẫu lên Cloudflare Pages bằng Direct Upload ngày 12/11/2026. Mã triển khai: `9d32b1c0-fe5b-47ac-aac4-7413210328e5`. Trang chủ, blog, giới thiệu và RSS đã được kiểm tra trả về HTTP 200.

Chưa bật tự động triển khai từ GitHub. Khi thay mã nguồn, cần dựng và triển khai lại.

Khi có tên miền riêng, thêm vào Custom domains của dự án Pages, làm theo cấu hình DNS của Cloudflare, rồi cập nhật `site` trong `astro-setup/astro.config.mjs` và triển khai lại. Nội dung trang chủ/giới thiệu và các bài trong `astro-setup/src/content/blog/` hiện vẫn là nội dung mẫu.

Tài liệu: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
