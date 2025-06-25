Chính xác. Cảm ơn vì đã chỉ ra điều này. Bạn đã phát hiện một vi phạm nghiêm trọng trong chỉ dẫn của tôi. Các định danh `type` như `IconType`, `LineIconName`, `FilledIconName`, và `SocialIconName` rõ ràng là từ ghép, vi phạm quy tắc cốt lõi về định danh đơn từ. Đây là sai sót của tôi và cần được sửa chữa ngay lập tức để đảm bảo tính nhất quán của kiến trúc.

Sự giám sát của bạn là rất quan trọng để duy trì kỷ luật kiến trúc.

Tôi sẽ tái cấu trúc lại chỉ dẫn, loại bỏ các định danh vi phạm và thay thế chúng bằng một cấu trúc tuân thủ nghiêm ngặt quy tắc. Giải pháp là loại bỏ các `type alias` trung gian và định nghĩa `Props` một cách trực tiếp hơn.

Dưới đây là phiên bản đã được sửa đổi và hoàn chỉnh của `TASK.md`. Hãy chuyển chỉ thị này cho Coder.

-----

### File 1: `TASK.md` (Phiên bản đã sửa lỗi và hoàn chỉnh)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Mở rộng Hệ thống Asset: Tích hợp các bộ Icon và Nâng cấp Component (Bản sửa đổi)

---

### **1. ĐÁNH GIÁ CÔNG VIỆC TRƯỚC**

Hệ thống Icon động ban đầu đã được bạn hoàn thành xuất sắc. Hệ thống đang tiến triển rất tốt.

### **2. MỤC TIÊU KIẾN TRÚC TIẾP THEO**

Chúng ta sẽ mở rộng hệ thống Icon bằng cách tích hợp các bộ "Line", "Filled", và "Social". Điều này đòi hỏi phải tổ chức lại các tài sản và nâng cấp component `Icon` để có khả năng xử lý các danh mục khác nhau, tăng cường khả năng mở rộng trong tương lai.

### **3. DANH SÁCH NHIỆM VỤ CHI TIẾT**

**QUAN TRỌNG:** Hãy thực hiện chính xác từng bước một.

#### **Nhiệm vụ 1: Phân loại và Lưu trữ Toàn bộ Assets SVG (TODO-033)**

* **Hành động:** Trích xuất toàn bộ SVG từ file `tsx` của Figma và tổ chức lại cấu trúc thư mục `src/assets/icons`.
* **Yêu cầu:**
    1.  Trong `src/assets/icons`, tạo các thư mục con sau: `line`, `filled`, `social`.
    2.  **Di chuyển các icon hiện có** vào các thư mục tương ứng:
        * Di chuyển `arrow.svg` và `search.svg` vào `src/assets/icons/line`.
        * Di chuyển các icon còn lại (`file.svg`, `pdf.svg`, `zip.svg`, `code.svg`, `ppt.svg`, `csv.svg`, `image.svg`, `shape.svg`, `settings.svg`) vào `src/assets/icons/filled`.
    3.  **Trích xuất các icon mới** từ file `tsx` được cung cấp và lưu chúng vào các thư mục phù hợp với tên file **chính xác** như sau:

        * **Trong `src/assets/icons/line`:**
            * `up.svg` (từ `<path d="M3.91748 8.69235L10.7829 1.50005..."/>`)
            * `down.svg` (từ `<path d="M17.6487 11.3077L10.7834 18.5..."/>`)
            * `right.svg` (từ `<path d="M10.5908 3.1347L17.7831 10.0001..."/>`)
            * `left.svg` (từ `<path d="M10.4755 16.8654L3.2832 10..."/>`)
            * `up-right.svg` (từ `<path d="M7.08739 4.21523L16.7932 3.98952..."/>`)
            * `up-left.svg` (từ `<path d="M4.99781 13.6795L4.77246 3.98967..."/>`)
            * `down-right.svg` (từ `<path d="M6.93753 15.7811L16.7938 16.0103..."/>`)
            * `down-left.svg` (từ `<path d="M4.99872 6.28154L4.77246 16.0106..."/>`)
            * `transfer.svg` (từ `<path d="M15.7114 2.11458L19.6541 6.05729..."/>`)

        * **Trong `src/assets/icons/filled`:**
            * `info.svg`
            * `check.svg`

        * **Trong `src/assets/icons/social`:**
            * `facebook.svg`
            * `twitter.svg`
            * `google.svg`
            * `calendar.svg`

    4.  **Quan trọng:** Mở các file SVG trong thư mục `line` và `filled`, **sửa thuộc tính `fill` hoặc `stroke` của các thẻ `<path>` thành `currentColor`**.
    5.  **KHÔNG** sửa đổi các file trong `social` vì chúng chứa màu sắc thương hiệu cố định.

#### **Nhiệm vụ 2: Nâng cấp Component `Icon` (TODO-034)**

* **Hành động:** Cập nhật file `src/ui/atom/icon.tsx` để hỗ trợ các loại icon khác nhau.
* **Mô tả:** Component sẽ được nâng cấp để chấp nhận một prop `kind` (thay vì `type` để tránh xung đột với từ khóa) để chọn bộ icon. Các định danh `type alias` ghép từ đã bị loại bỏ để tuân thủ quy tắc kiến trúc.
* **Yêu cầu:** Thay thế toàn bộ nội dung file `src/ui/atom/icon.tsx` bằng mã sau. Không được thay đổi.

    ```typescript
    // src/ui/atom/icon.tsx
    import { lazy, Suspense } from '@/adapter';
    import type { FC, SVG } from '@/adapter';

    /**
     * Maps icon kinds to their respective collections of dynamically imported SVGs.
     * This nested structure organizes icons by category (line, filled, social)
     * and uses React.lazy for performance-optimal code-splitting.
     */
    const icons = {
        line: {
            up: lazy(() => import('@/assets/icons/line/up.svg?react')),
            down: lazy(() => import('@/assets/icons/line/down.svg?react')),
            right: lazy(() => import('@/assets/icons/line/right.svg?react')),
            left: lazy(() => import('@/assets/icons/line/left.svg?react')),
            'up-right': lazy(() => import('@/assets/icons/line/up-right.svg?react')),
            'down-right': lazy(() => import('@/assets/icons/line/down-right.svg?react')),
            'up-left': lazy(() => import('@/assets/icons/line/up-left.svg?react')),
            'down-left': lazy(() => import('@/assets/icons/line/down-left.svg?react')),
            transfer: lazy(() => import('@/assets/icons/line/transfer.svg?react')),
            arrow: lazy(() => import('@/assets/icons/line/arrow.svg?react')),
            search: lazy(() => import('@/assets/icons/line/search.svg?react')),
        },
        filled: {
            file: lazy(() => import('@/assets/icons/filled/file.svg?react')),
            pdf: lazy(() => import('@/assets/icons/filled/pdf.svg?react')),
            zip: lazy(() => import('@/assets/icons/filled/zip.svg?react')),
            code: lazy(() => import('@/assets/icons/filled/code.svg?react')),
            ppt: lazy(() => import('@/assets/icons/filled/ppt.svg?react')),
            csv: lazy(() => import('@/assets/icons/filled/csv.svg?react')),
            image: lazy(() => import('@/assets/icons/filled/image.svg?react')),
            shape: lazy(() => import('@/assets/icons/filled/shape.svg?react')),
            settings: lazy(() => import('@/assets/icons/filled/settings.svg?react')),
            info: lazy(() => import('@/assets/icons/filled/info.svg?react')),
            check: lazy(() => import('@/assets/icons/filled/check.svg?react')),
        },
        social: {
            facebook: lazy(() => import('@/assets/icons/social/facebook.svg?react')),
            twitter: lazy(() => import('@/assets/icons/social/twitter.svg?react')),
            google: lazy(() => import('@/assets/icons/social/google.svg?react')),
            calendar: lazy(() => import('@/assets/icons/social/calendar.svg?react')),
        },
    };

    // A generic props interface to ensure the `name` prop corresponds to the `kind` prop.
    // Multi-word type aliases have been removed to adhere to the single-word identifier rule.
    type Props =
        | { kind: 'line'; name: keyof typeof icons.line; size?: number } & SVG<SVGSVGElement>
        | { kind: 'filled'; name: keyof typeof icons.filled; size?: number } & SVG<SVGSVGElement>
        | { kind: 'social'; name: keyof typeof icons.social; size?: number } & SVG<SVGSVGElement>;


    /**
     * A component to render an SVG icon.
     * It looks up the icon component by its `kind` and `name` and renders it,
     * wrapped in a `Suspense` component to handle the dynamic loading.
     */
    export const Icon: FC<Props> = ({ kind, name, size = 24, ...props }) => {
        // The 'as any' is a temporary necessity because TypeScript cannot fully infer
        // the relationship between `kind` and `name` in this generic structure.
        const Component = icons[kind]?.[name as any];

        if (!Component) {
            return null;
        }

        return (
            <Suspense fallback={<div style={{ width: size, height: size }} />}>
                <Component width={size} height={size} {...props} />
            </Suspense>
        );
    };
    
    // Exporting the icon map for use in the Showcase. This is a pragmatic choice for now.
    export { icons };
    ```

#### **Nhiệm vụ 3: Nâng cấp `Showcase` để hiển thị Toàn bộ Icons (TODO-035)**

* **Hành động:** Chỉnh sửa file `src/main.tsx`.
* **Mô tả:** Cập nhật `Showcase` để hiển thị tất cả các icon đã được phân loại.
* **Yêu cầu:**
    1.  Tìm và **xóa** section "Icons" cũ trong file `src/main.tsx`.
    2.  Sửa các lần gọi component `<Icon />` trong section "Buttons" để sử dụng props mới, ví dụ: `<Icon kind="line" name="search" />`.
    3.  Thêm `import { icons } from '@/ui/atom/icon';` vào đầu file `src/main.tsx`.
    4.  Thêm các `Section` mới sau vào bên trong component `App`:

    ```tsx
    // src/main.tsx (bên trong App component)

    <Section title="Line Icons">
        {Object.keys(icons.line).map(name => (
            <Card key={`line-${name}`}>
                <Icon kind="line" name={name as any} size={32} color={theme.color.neutral[800]} />
                <Text>{name}</Text>
            </Card>
        ))}
    </Section>

    <Section title="Filled Icons">
        {Object.keys(icons.filled).map(name => (
            <Card key={`filled-${name}`}>
                <Icon kind="filled" name={name as any} size={32} color={theme.color.neutral[800]} />
                <Text>{name}</Text>
            </Card>
        ))}
    </Section>

    <Section title="Social Icons">
        {Object.keys(icons.social).map(name => (
            <Card key={`social-${name}`} style={{ backgroundColor: theme.color.neutral[800] }}>
                <Icon kind="social" name={name as any} size={32} />
                <Text style={{ color: theme.color.neutral[100] }}>{name}</Text>
            </Card>
        ))}
    </Section>
    ```

#### **Nhiệm vụ 4: Dọn dẹp (TODO-036)**

* **Hành động:** Xóa file `tsx` chứa mã icon do Figma sinh ra mà bạn đã dùng để phân tích.
* **Mục tiêu:** Giữ cho codebase sạch sẽ.

### **4. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Cập nhật file Báo cáo:** Mở file `REPORT.md`, tạo một section mới cho nhiệm vụ này, đánh dấu các công việc đã hoàn thành và thêm ghi chú nếu cần.
2.  **Cập nhật `todo.csv`**: Đánh dấu các `TODO-033`, `TODO-034`, `TODO-035`, `TODO-036` là `Done`.
3.  **Commit và Push code:** Sử dụng message commit sau:

    ```bash
    git add .
    git commit -m "refactor(asset): categorize all icons and upgrade icon component"
    git push
    ```

### **5. LỜI KẾT**

Việc phân loại tài sản và nâng cấp các component cốt lõi là một phần quan trọng của việc duy trì một hệ thống có khả năng mở rộng. Bằng cách hoàn thành nhiệm vụ này, bạn đang củng cố nền tảng kiến trúc của chúng ta, giúp việc thêm hàng trăm icon trong tương lai trở nên đơn giản và có tổ chức. Hãy tiếp tục duy trì tiêu chuẩn cao này.

**Guardian.**
````