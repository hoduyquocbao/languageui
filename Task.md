Gửi Coder,

Tôi là Guardian. Tôi đã xem xét commit gần nhất của bạn (`6ebaa05...`) và bản báo cáo trong `REPORT.md`.

**Đánh giá:** Công việc xuất sắc. Bạn đã triển khai lớp Adapter một cách hoàn hảo, tách biệt hoàn toàn mã nguồn ứng dụng của chúng ta khỏi các phụ thuộc bên ngoài. Nền tảng kiến trúc của chúng ta giờ đây cực kỳ vững chắc và thuần khiết. `todo.csv` đã được cập nhật chính xác.

Bây giờ, chúng ta sẽ sử dụng nền tảng này để hoàn thiện các "nguyên tử" (atoms) cốt lõi còn lại của hệ thống thiết kế và xây dựng một cơ chế để trực quan hóa chúng.

-----

## Phân tích Vấn đề & Mục tiêu Tiếp theo

Tôi đã xem xét các file mã `tsx` cho "Primary", "Secondary", và "Neutral" mà bạn cung cấp. Đây tiếp tục là những đoạn mã được xuất tự động từ Figma và chúng ta phải xử lý chúng với cùng một tư duy kiến trúc.

**Vấn đề của mã được cung cấp:**

  * **Lặp lại mã (DRY violation):** Ba file `Primary.tsx`, `Secondary.tsx`, `Neutral.tsx` có cấu trúc gần như y hệt nhau, chỉ khác nhau về giá trị `box-shadow` và tiêu đề. Đây là một sự lãng phí và tạo ra gánh nặng bảo trì rất lớn.
  * **Tên định danh ghép từ:** Các tên như `StyledSubtitletext01`, `StyledSectionWrapperTitles`, `StyledShadowCard` vi phạm nghiêm trọng quy tắc cốt lõi của chúng ta.
  * **Giá trị Hardcode:** Tất cả các giá trị style (`box-shadow`, `color`, `font-size`) đều được viết trực tiếp vào mã, hoàn toàn bỏ qua `theme` object và lớp `adapter` mà chúng ta vừa vất vả xây dựng.
  * **Thiết kế tĩnh:** Component được thiết kế để hiển thị một tập hợp bóng đổ duy nhất và không thể tái sử dụng cho bất kỳ mục đích nào khác.

**Mục tiêu kiến trúc tiếp theo:**

1.  **Hoàn thiện Core UI:** Tích hợp các token còn thiếu (như `shadow`) vào `theme` và tạo ra các component nguyên tử còn thiếu (`Card`, `Typography`, `Layout`).
2.  **Xây dựng một trang `Showcase`:** Thay vì tạo các component riêng lẻ chỉ để hiển thị style, chúng ta sẽ xây dựng một trang duy nhất để trực quan hóa toàn bộ hệ thống thiết kế. Trang này sẽ là công cụ để chúng ta kiểm tra, xác minh và phát triển các component.

-----

### File 1: `TASK.md` (Phiên bản mới)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Hoàn thiện Core UI và Xây dựng Showcase

---

### **1. ĐÁNH GIÁ CÔNG VIỆC TRƯỚC**

Việc triển khai lớp Adapter đã hoàn tất một cách xuất sắc. Toàn bộ mã nguồn ứng dụng hiện đã được tách rời khỏi các thư viện bên ngoài, đạt được một cột mốc kiến trúc quan trọng.

### **2. MỤC TIÊU KIẾN TRÚC TIẾP THEO**

Nhiệm vụ này tập trung vào việc hoàn thiện các phần cốt lõi của hệ thống UI và xây dựng một trang `Showcase` để trực quan hóa các token và component của chúng ta. Điều này sẽ loại bỏ nhu cầu tạo các file hiển thị tĩnh và cung cấp một môi trường để phát triển và kiểm thử UI một cách nhất quán.

### **3. DANH SÁCH NHIỆM VỤ CHI TIẾT**

#### **Nhiệm vụ 1: Mở rộng `theme` với các `shadow` tokens (TODO-013)**

* **Hành động:** Chỉnh sửa file `src/core/theme.ts`.
* **Mô tả:** Trừu tượng hóa các giá trị `box-shadow` từ mã Figma và thêm chúng vào `theme` object.
* **Yêu cầu:**
    * Trong `theme` object, cập nhật key `shadow` để chứa các giá trị cho `primary`, `secondary`, và `neutral`.
    * Sử dụng các tên đơn từ `xs`, `sm`, `md`, `lg` để định danh các kích thước shadow.

    ```typescript
    // Ví dụ trong src/core/theme.ts
    const shadow = {
        primary: {
            xs: "0px 0px 2px rgba(77, 145, 225, 0.23)",
            sm: "0px 4px 8px rgba(77, 145, 225, 0.10)",
            md: "0px 8px 15px rgba(77, 145, 225, 0.10)",
            lg: "0px 8px 24px rgba(77, 145, 225, 0.10)",
        },
        secondary: {
            xs: "0px 0px 2px rgba(155, 32, 47, 0.10)",
            sm: "0px 4px 8px rgba(155, 32, 47, 0.10)",
            md: "0px 8px 15px rgba(155, 32, 47, 0.10)",
            lg: "0px 8px 24px rgba(155, 32, 47, 0.14)",
        },
        neutral: {
            xs: "0px 1px 3px rgba(25, 33, 61, 0.10)",
            sm: "0px 2px 4px rgba(25, 33, 61, 0.08)",
            md: "0px 8px 15px rgba(25, 33, 61, 0.10)",
            lg: "0px 8px 24px rgba(25, 33, 61, 0.12)",
        }
    };
    ```

#### **Nhiệm vụ 2: Xây dựng Component `Card` (TODO-014)**

* **Hành động:** Tạo file `src/ui/atom/card.tsx`.
* **Mô tả:** Tạo một component `Card` có thể tái sử dụng, thay thế cho các `StyledShadowCard` lặp đi lặp lại.
* **Yêu cầu:**
    * Component `Card` phải nhận một prop `shadow` để áp dụng `box-shadow` tương ứng từ `theme`.
    * Sử dụng lớp `adapter` cho các import từ `react` và `styled-components`.

    ```typescript
    // Ví dụ trong src/ui/atom/card.tsx
    import { style } from '@/adapter';
    import type { FC, Node } from '@/adapter';
    import { theme } from '@/core/theme';

    type ShadowKey = keyof typeof theme.shadow.primary;

    interface Props {
        children: Node;
        variant?: 'primary' | 'secondary' | 'neutral';
        shadow?: ShadowKey;
    }
    
    const Element = style('div')<Props>`
        background: ${theme.color.neutral[100]};
        border-radius: ${theme.radius.large};
        padding: ${theme.space[4]};
        /* Logic để áp dụng shadow động */
        box-shadow: ${({ variant = 'neutral', shadow = 'sm' }) => theme.shadow[variant][shadow]};
    `;

    export const Card: FC<Props> = ({ children, ...rest }) => (
        <Element {...rest}>{children}</Element>
    );
    ```

#### **Nhiệm vụ 3: Xây dựng Components Typography (TODO-015)**

* **Hành động:** Tạo file `src/ui/atom/typography.tsx`.
* **Mô tả:** Tạo các component `Title`, `Subtitle`, `Text` để thay thế các `span` được styled thủ công.
* **Yêu cầu:**
    * Mỗi component phải lấy style (font-size, font-weight, line-height) từ `theme.typography`.
    * Tất cả phải là các component đơn giản, tuân thủ quy tắc đơn từ.

#### **Nhiệm vụ 4: Xây dựng Trang `Showcase` (TODO-016)**

* **Hành động:** Chỉnh sửa file `src/main.tsx` để xây dựng một trang hiển thị (showcase).
* **Mô tả:** Thay vì render một trang trống, hãy tạo một trang showcase để trực quan hóa các `shadow` token bằng cách sử dụng component `Card` mới.
* **Yêu cầu:**
    * Tạo một component `App` trong `main.tsx`.
    * Bên trong `App`, render một danh sách các `Card`, mỗi `Card` có một giá trị `shadow` khác nhau từ `theme`.
    * Sử dụng các component Typography từ Nhiệm vụ 3 để thêm tiêu đề.
    * **Ví dụ về cấu trúc JSX trong `App`:**
        ```tsx
        const App = () => (
          <div>
            <Title>Shadows Showcase</Title>
            
            <Subtitle>Primary</Subtitle>
            <div style={{ display: 'flex', gap: '24px' }}>
              <Card variant="primary" shadow="xs"><Text>XS</Text></Card>
              <Card variant="primary" shadow="sm"><Text>SM</Text></Card>
              <Card variant="primary" shadow="md"><Text>MD</Text></Card>
              <Card variant="primary" shadow="lg"><Text>LG</Text></Card>
            </div>

            {/* Lặp lại cho secondary và neutral */}
          </div>
        );
        ```

#### **Nhiệm vụ 5: Dọn dẹp (TODO-017)**

* **Hành động:** Xóa các file `Primary.tsx`, `Secondary.tsx`, `Neutral.tsx` và bất kỳ file tạm thời nào khác được tạo ra từ Figma.
* **Mục tiêu:** Giữ cho codebase sạch sẽ, chỉ chứa các component và module đã được duyệt về mặt kiến trúc.

### **4. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Cập nhật file Báo cáo:** Cập nhật file `REPORT.md` với trạng thái mới nhất.
2.  **Commit và Push code:** Sử dụng message commit theo đúng chuẩn.

    ```bash
    git add .
    git commit -m "feat(core): complete core UI atoms and build showcase"
    git push
    ```

### **5. LỜI KẾT**

Mục tiêu của chúng ta là xây dựng một hệ thống thiết kế "sống", nơi các token và component cốt lõi có thể được trực quan hóa và kiểm thử một cách tự động. Trang `Showcase` là bước đầu tiên để hiện thực hóa điều đó. Hãy tiếp tục duy trì kỷ luật và chất lượng cao.

**Guardian.**
````