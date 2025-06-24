Chào Coder,

Tôi là Guardian. Tôi đã xem xét báo cáo và mã nguồn bạn vừa push lên.

**Đánh giá:** Rất tốt. Việc hoàn thiện hệ thống `theme.color` và nâng cấp trang `Showcase` để hiển thị màu sắc một cách động từ `theme` đã được thực hiện chính xác theo chỉ dẫn. Bạn đã chứng minh được khả năng tuân thủ kiến trúc và các pattern đã thiết lập. Nền tảng của chúng ta đang ngày càng hoàn thiện.

Bây giờ, chúng ta sẽ giải quyết một trong những phần phức tạp nhất nhưng cũng quan trọng nhất của hệ thống: quản lý tài sản (assets), cụ thể là Logo.

-----

## Phân tích Vấn đề & Mục tiêu Tiếp theo

Tôi đã nhận và phân tích mã `tsx` do Figma sinh ra để hiển thị các phiên bản Logo. Phải nói rằng, đây là file tệ nhất chúng ta từng thấy. Nó là một mớ hỗn độn của SVG inline, các thẻ `div` được định vị tuyệt đối bằng tọa độ pixel, và hàng trăm styled-component được đặt tên vô nghĩa (`StyledVector01`, `StyledLogoText02`, `StyledMastercolorcard09`).

**Các vấn đề nghiêm trọng:**

  * **Mã nguồn không thể bảo trì:** Nếu có một thay đổi nhỏ về thiết kế, việc tìm và sửa mã này là bất khả thi.
  * **Hiệu suất kém:** Nhúng trực tiếp mã SVG phức tạp vào file `tsx` làm tăng kích thước gói bundle của ứng dụng một cách không cần thiết.
  * **Kiến trúc Zero:** File này vi phạm mọi nguyên tắc chúng ta đã đặt ra: không tái sử dụng, không có quy tắc đặt tên, bỏ qua `adapter` và `theme`, và có cấu trúc HTML/CSS cực kỳ cứng nhắc.

**Phán quyết & Mục tiêu kiến trúc:**
**Chúng ta sẽ không động một dòng nào vào việc "sửa chữa" file này.** Nhiệm vụ của chúng ta là:

1.  **Trích xuất tài sản (Assets Extraction):** Coi file `tsx` như một "mỏ" để khai thác tài sản SVG. Chúng ta sẽ lấy mã SVG ra và lưu thành các file `.svg` riêng biệt.
2.  **Xây dựng Component `Logo` thông minh:** Tạo một component `Logo` duy nhất, có khả năng render đúng phiên bản logo (icon/full, light/dark) dựa trên các props được truyền vào.
3.  **Trực quan hóa trên `Showcase`:** Tích hợp component `Logo` mới vào trang `Showcase` để chúng ta có một nơi trực quan để kiểm tra và tham khảo tất cả các biến thể logo.

-----

### File 1: `TASK.md` (Phiên bản mới)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Hoàn thiện Hệ thống Asset: Xây dựng Component `Logo`

---

### **1. ĐÁNH GIÁ CÔNG VIỆC TRƯỚC**

Hệ thống màu sắc và trang Showcase đã được bạn hoàn thiện chính xác. Đây là một bước tiến quan trọng.

### **2. MỤC TIÊU KIẾN TRÚC TIẾP THEO**

Loại bỏ hoàn toàn mã giao diện Logo do Figma sinh ra. Thay vào đó, chúng ta sẽ xây dựng một component `Logo` động, có cấu trúc tốt, giúp việc sử dụng tài sản thương hiệu trong ứng dụng trở nên nhất quán và dễ dàng.

### **3. DANH SÁCH NHIỆM VỤ CHI TIẾT**

**QUAN TRỌNG:** Hãy thực hiện chính xác từng bước một. Đây là nhiệm vụ đòi hỏi sự tỉ mỉ.

#### **Nhiệm vụ 1: Trích xuất và Lưu trữ Assets SVG (TODO-022)**

* **Hành động:** Trích xuất mã SVG từ file `tsx` của Figma và lưu chúng thành các file `.svg` riêng biệt.
* **Yêu cầu:**
    1.  Tạo một thư mục mới: `src/assets/logos`.
    2.  Trong file `tsx` Figma cung cấp, tìm đến các khối `<svg>...</svg>`.
    3.  Với mỗi biến thể logo (Icon Light, Icon Dark, Full Light, Full Dark), hãy sao chép toàn bộ khối `<svg>...</svg>` của nó và dán vào một file mới trong thư mục `src/assets/logos`.
    4.  **Sử dụng chính xác các tên file sau:**
        * `icon-light.svg`
        * `icon-dark.svg`
        * `full-light.svg`
        * `full-dark.svg`
    5.  **Dọn dẹp mã SVG:** Mở từng file `.svg` vừa tạo, xóa bỏ các thuộc tính không cần thiết như `data-layer`, `data-svg-wrapper` và các thẻ `<defs>` chứa `linearGradient` hoặc `filter` nếu chúng không ảnh hưởng đến hình dạng cơ bản. Mục tiêu là có một file SVG sạch.

#### **Nhiệm vụ 2: Xây dựng Component `Logo` (TODO-023)**

* **Hành động:** Tạo một file mới `src/ui/atom/logo.tsx`.
* **Mô tả:** Component này sẽ là điểm truy cập duy nhất để render logo trong ứng dụng. Nó sẽ tự động tải file SVG tương ứng dựa trên props. Chúng ta sẽ sử dụng `vite-plugin-svgr` đã được cài đặt.
* **Yêu cầu:** Triển khai chính xác nội dung file như sau. Không được thay đổi.

    ```typescript
    // src/ui/atom/logo.tsx
    import { lazy, Suspense } from '@/adapter';
    import type { FC, SVG } from '@/adapter';

    // Định nghĩa các biến thể và chế độ của Logo
    type Variant = 'icon' | 'full';
    type Mode = 'light' | 'dark';

    // Ánh xạ props tới các file SVG tương ứng bằng React.lazy để code-splitting
    // Tên file phải khớp chính xác với Nhiệm vụ 1
    const assets: Record<Variant, Record<Mode, any>> = {
        icon: {
            light: lazy(() => import('@/assets/logos/icon-light.svg?react')),
            dark: lazy(() => import('@/assets/logos/icon-dark.svg?react')),
        },
        full: {
            light: lazy(() => import('@/assets/logos/full-light.svg?react')),
            dark: lazy(() => import('@/assets/logos/full-dark.svg?react')),
        },
    };

    // Định nghĩa props cho component Logo
    interface Props extends SVG<SVGSVGElement> {
        variant?: Variant;
        mode?: Mode;
        size?: number;
    }

    /**
     * Component Logo động, có khả năng render các biến thể khác nhau
     * từ các file SVG riêng biệt.
     */
    export const Logo: FC<Props> = ({ variant = 'full', mode = 'light', size, ...props }) => {
        const Component = assets[variant]?.[mode];

        if (!Component) {
            // Trường hợp không tìm thấy logo, không render gì cả
            return null;
        }
        
        // Sử dụng Suspense để xử lý việc tải động
        return (
            <Suspense fallback={<div style={{ width: size, height: size }} />}>
                <Component
                    width={size}
                    // height sẽ tự động tính theo tỷ lệ của SVG
                    {...props}
                />
            </Suspense>
        );
    };
    ```

#### **Nhiệm vụ 3: Nâng cấp `Showcase` để hiển thị Logo (TODO-024)**

* **Hành động:** Chỉnh sửa file `src/main.tsx` (hoặc file chứa `App` component).
* **Mô tả:** Thêm một section mới vào trang `Showcase` để trực quan hóa tất cả các biến thể của component `Logo` vừa tạo.
* **Yêu cầu:** Thêm đoạn mã JSX sau vào bên trong component `App` của bạn.

    ```tsx
    // src/main.tsx (bên trong App component)

    // ... (import các component cần thiết như Section, Card, Logo)
    
    <Section title="Logos">
        <Card>
            <Logo variant="icon" mode="light" size={80} />
        </Card>
        <Card>
            <Logo variant="icon" mode="dark" size={80} />
        </Card>
        <Card>
            <Logo variant="full" mode="light" height={40} />
        </Card>
        <Card>
            <Logo variant="full" mode="dark" height={40} />
        </Card>
    </Section>
    ```

#### **Nhiệm vụ 4: Dọn dẹp (TODO-025)**

* **Hành động:** Xóa file `tsx` chứa mã logo do Figma sinh ra.
* **Mục tiêu:** Giữ cho codebase sạch sẽ, không còn mã rác, chỉ chứa các thành phần kiến trúc đã được định nghĩa.

### **4. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Cập nhật file Báo cáo:** Mở file `REPORT.md`, đánh dấu các công việc đã hoàn thành và thêm ghi chú nếu cần.
2.  **Commit và Push code:** Sử dụng message commit sau:

    ```bash
    git add .
    git commit -m "feat(asset): build dynamic logo component and enhance showcase"
    git push
    ```

### **5. LỜI KẾT**

Xử lý tài sản tĩnh một cách hệ thống là dấu hiệu của một kiến trúc trưởng thành. Bằng cách trừu tượng hóa Logo thành một component động, chúng ta đảm bảo rằng việc sử dụng nó trong tương lai sẽ luôn nhất quán, hiệu quả và dễ dàng bảo trì. Chúng ta không chỉ viết code, chúng ta đang xây dựng một hệ thống bền vững.

**Guardian.**
````