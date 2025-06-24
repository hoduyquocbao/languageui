Chào Coder,

Tôi là Guardian. Tôi đã xem xét báo cáo và mã nguồn bạn vừa push lên.

**Đánh giá:** Công việc hoàn thiện component `Button` và nâng cấp trang `Showcase` đã được thực hiện một cách xuất sắc. Bạn đã tuân thủ chính xác các chỉ dẫn về kiến trúc, tái cấu trúc mã nguồn, và kết nối với `theme` và `adapter`. Hệ thống của chúng ta đang ngày càng trở nên mạnh mẽ và nhất quán.

Bây giờ, chúng ta sẽ tiếp tục hoàn thiện hệ thống bằng cách xử lý một loại tài sản (asset) quan trọng khác: **Icons**.

-----

## Phân tích Vấn đề & Mục tiêu Tiếp theo

Tôi đã nhận và phân tích mã `tsx` do Figma sinh ra để hiển thị thư viện icon. Tình trạng của nó cũng tương tự như các file trước: một mớ hỗn độn của mã được sinh tự động và hoàn toàn không phù hợp với kiến trúc của chúng ta.

**Vấn đề của mã được cung cấp:**

  * **SVG bị nhúng trực tiếp (Inline SVG):** Toàn bộ mã nguồn của các icon được dán thẳng vào file TSX. Điều này làm phình to kích thước bundle Javascript một cách không cần thiết và khiến các icon không thể được tái sử dụng ở nơi khác.
  * **Tên định danh vô nghĩa và lặp lại:** `StyledIconSquareFile`, `StyledDivider01`, `StyledIconsrow`. Các tên này không có tính ngữ nghĩa, lặp lại và vi phạm quy tắc đơn từ.
  * **Bỏ qua hoàn toàn kiến trúc:** Mã này lại một lần nữa import `styled` trực tiếp, bỏ qua lớp `adapter`. Nó hardcode các giá trị màu sắc, kích thước và layout, bỏ qua `theme` object.
  * **Layout tĩnh và không thể tái sử dụng:** Toàn bộ file là một component tĩnh chỉ để hiển thị một trang duy nhất.

**Phán quyết & Mục tiêu kiến trúc:**
**KHÔNG SỬA CHỮA MÃ NÀY.** Nhiệm vụ của chúng ta là **trích xuất** các asset SVG từ file này, **loại bỏ** nó, và **xây dựng** một component `Icon` động, có hệ thống, hiệu năng cao và tuân thủ kiến trúc.

-----

### File 1: `TASK.md` (Phiên bản mới)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Hoàn thiện Hệ thống Asset: Xây dựng Component `Icon` động

---

### **1. ĐÁNH GIÁ CÔNG VIỆC TRƯỚC**

Component `Button` và section "Buttons" trong Showcase đã được bạn hoàn thành xuất sắc. Hệ thống đang tiến triển rất tốt.

### **2. MỤC TIÊU KIẾN TRÚC TIẾP THEO**

Loại bỏ mã giao diện Icon do Figma sinh ra. Thay vào đó, chúng ta sẽ xây dựng một hệ thống quản lý và hiển thị icon tập trung, hiệu suất cao thông qua một component `Icon` duy nhất.

### **3. DANH SÁCH NHIỆM VỤ CHI TIẾT**

**QUAN TRỌNG:** Hãy thực hiện chính xác từng bước một. Sự chính xác là yếu tố quyết định thành công của nhiệm vụ này.

#### **Nhiệm vụ 1: Trích xuất và Lưu trữ Assets SVG (TODO-029)**

* **Hành động:** Trích xuất mã SVG từ file `tsx` và lưu chúng thành các file `.svg` riêng biệt.
* **Yêu cầu:**
    1.  Tạo một thư mục mới: `src/assets/icons`.
    2.  Đi qua file `tsx` do Figma cung cấp, tìm đến từng khối `<svg>...</svg>`.
    3.  Với mỗi icon, sao chép mã SVG của nó vào một file mới trong `src/assets/icons`.
    4.  **Sử dụng chính xác các tên file sau đây (đây là các `name` mà component `Icon` sẽ sử dụng):**
        * `file.svg`
        * `pdf.svg`
        * `zip.svg`
        * `code.svg`
        * `ppt.svg`
        * `csv.svg`
        * `image.svg`
        * `shape.svg`
        * `search.svg`
        * `arrow.svg`
        * `settings.svg`
    5.  **Quan trọng:** Mở từng file `.svg` và **sửa thuộc tính `fill` hoặc `stroke` của các thẻ `<path>` thành `currentColor`**. Điều này cho phép chúng ta thay đổi màu của icon bằng thuộc tính `color` trong CSS, giúp icon linh hoạt hơn.

#### **Nhiệm vụ 2: Xây dựng Component `Icon` động (TODO-030)**

* **Hành động:** Tạo hoặc cập nhật file `src/ui/atom/icon.tsx`.
* **Mô tả:** Component này sẽ là điểm truy cập duy nhất để render icon. Nó sẽ sử dụng `React.lazy` để chỉ tải những icon cần thiết (code-splitting), giúp tối ưu hiệu suất.
* **Yêu cầu:** Triển khai chính xác nội dung file như sau. Không được thay đổi.

    ```typescript
    // src/ui/atom/icon.tsx
    import { lazy, Suspense } from '@/adapter';
    import type { FC, SVG } from '@/adapter';

    /**
     * Dynamically loads and renders SVG icons.
     * The `icons` object maps a single-word `name` to a dynamically imported SVG.
     * This uses React.lazy to ensure icons are only loaded when needed.
     */
    const icons = {
        file: lazy(() => import('@/assets/icons/file.svg?react')),
        pdf: lazy(() => import('@/assets/icons/pdf.svg?react')),
        zip: lazy(() => import('@/assets/icons/zip.svg?react')),
        code: lazy(() => import('@/assets/icons/code.svg?react')),
        ppt: lazy(() => import('@/assets/icons/ppt.svg?react')),
        csv: lazy(() => import('@/assets/icons/csv.svg?react')),
        image: lazy(() => import('@/assets/icons/image.svg?react')),
        shape: lazy(() => import('@/assets/icons/shape.svg?react')),
        search: lazy(() => import('@/assets/icons/search.svg?react')),
        arrow: lazy(() => import('@/assets/icons/arrow.svg?react')),
        settings: lazy(() => import('@/assets/icons/settings.svg?react')),
    };

    /**
     * The props for the Icon component.
     * It extends standard SVG props.
     * 'name' is the single-word identifier for the icon to display.
     */
    interface Props extends SVG<SVGSVGElement> {
        name: keyof typeof icons;
        size?: number;
    }

    /**
     * A component to render an SVG icon.
     * It looks up the icon component by its `name` and renders it,
     * wrapped in a `Suspense` component to handle the dynamic loading.
     */
    export const Icon: FC<Props> = ({ name, size = 24, ...props }) => {
        const Component = icons[name];

        if (!Component) {
            return null;
        }

        return (
            <Suspense fallback={<div style={{ width: size, height: size }} />}>
                <Component width={size} height={size} {...props} />
            </Suspense>
        );
    };
    ```

#### **Nhiệm vụ 3: Nâng cấp `Showcase` để hiển thị Icons (TODO-031)**

* **Hành động:** Chỉnh sửa file `src/main.tsx` (hoặc file chứa `App` component).
* **Mô tả:** Thêm một section mới vào trang `Showcase` để trực quan hóa toàn bộ thư viện icon của chúng ta.
* **Yêu cầu:** Thêm đoạn mã JSX sau vào bên trong component `App` của bạn.

    ```tsx
    // src/main.tsx (bên trong App component)

    // ... (import các component cần thiết như Section, Card, Icon)
    
    // Tạo một mảng chứa tên của tất cả các icon
    const iconNames: (keyof typeof icons)[] = [
        'file', 'pdf', 'zip', 'code', 'ppt', 'csv', 'image', 'shape', 
        'search', 'arrow', 'settings'
    ];

    <Section title="Icons">
        {iconNames.map(name => (
            <Card key={name}>
                <Icon name={name} size={48} color={theme.color.neutral[800]} />
            </Card>
        ))}
    </Section>
    ```

#### **Nhiệm vụ 4: Dọn dẹp (TODO-032)**

* **Hành động:** Xóa file `tsx` chứa mã icon do Figma sinh ra.
* **Mục tiêu:** Giữ cho codebase sạch sẽ, chỉ chứa các thành phần kiến trúc đã được định nghĩa.

### **4. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Cập nhật file Báo cáo:** Mở file `REPORT.md`, đánh dấu các công việc đã hoàn thành và thêm ghi chú nếu cần.
2.  **Commit và Push code:** Sử dụng message commit sau:

    ```bash
    git add .
    git commit -m "feat(asset): build dynamic icon system and enhance showcase"
    git push
    ```

### **5. LỜI KẾT**

Một hệ thống icon mạnh mẽ là xương sống của một design system. Bằng cách xây dựng một component `Icon` động và có hiệu suất cao, chúng ta đã tạo ra một giải pháp có thể mở rộng cho hàng trăm icon trong tương lai mà không làm ảnh hưởng đến kiến trúc hoặc tốc độ tải trang. Hãy tiếp tục duy trì tiêu chuẩn cao này.

**Guardian.**
````