Chào Coder,

Tôi là Guardian. Tôi đã xem xét báo cáo và mã nguồn bạn push lên repository `languageui`.

**Đánh giá:** Rất tốt. Bạn đã hoàn thành xuất sắc các nhiệm vụ hoàn thiện Core UI và xây dựng trang Showcase ban đầu. Các component `Card` và `Typography` được xây dựng đúng kiến trúc và kết nối với `theme`. Việc sử dụng lớp `adapter` cũng được áp dụng một cách chính xác. Nền tảng của chúng ta ngày càng vững chắc.

Bây giờ, chúng ta sẽ tiếp tục hoàn thiện `core` của hệ thống bằng cách làm giàu cho `theme` và nâng cấp `Showcase` để nó trở thành một công cụ trực quan mạnh mẽ hơn.

-----

## Phân tích Vấn đề & Mục tiêu Tiếp theo

Tôi đã nhận và phân tích mã `tsx` do Figma sinh ra để hiển thị bảng màu (colors). Tình trạng của nó còn tệ hơn các file trước, và nó cho thấy lý do tại sao chúng ta **phải** tuân thủ kiến trúc một cách nghiêm ngặt.

**Vấn đề của mã được cung cấp:**

  * **Tên định danh Thảm họa:** `StyledColorname01span`, `StyledHexcode02span`, `StyledMastercolorcard15`, `StyledFlexHorizontal23`. Đây là những cái tên vô nghĩa, được đánh số thứ tự, khiến việc bảo trì là không thể. Nó vi phạm quy tắc đơn từ một cách nghiêm trọng.
  * **Lặp lại Mã (DRY Violation) ở Mức độ Cực lớn:** Hàng chục styled-component được định nghĩa chỉ để phục vụ một mục đích duy nhất, trong khi về bản chất chúng hoàn toàn giống nhau, chỉ khác một giá trị màu.
  * **Bỏ qua Hoàn toàn Kiến trúc:**
      * Mã này import `styled` trực tiếp, hoàn toàn phớt lờ lớp `adapter` mà chúng ta vừa xây dựng.
      * Nó hardcode mọi giá trị (màu sắc, font-size, padding), bỏ qua `theme` object.
      * Nó sử dụng các CSS variable lạ (`var(--Global-Texts-Color-4, #19213D)`) không thuộc hệ thống của chúng ta.
  * **Không thể Tái sử dụng:** Toàn bộ file là một component tĩnh khổng lồ, không có khả năng tái sử dụng bất kỳ phần nào.

**Phán quyết & Mục tiêu kiến trúc:**
**KHÔNG SỬA CHỮA MÃ NÀY.** Chúng ta sẽ trích xuất **DỮ LIỆU** (các mã màu) từ nó và xây dựng lại theo đúng kiến trúc, với các mục tiêu sau:

1.  **Hoàn thiện `theme.color`:** Làm giàu cho `theme` object với một bảng màu đầy đủ, có cấu trúc.
2.  **Xây dựng Component `Swatch`:** Tạo một component nguyên tử mới, có thể tái sử dụng, để hiển thị một mẫu màu.
3.  **Nâng cấp `Showcase`:** Biến trang showcase hiện tại thành một "style guide sống", có khả năng tự động hiển thị toàn bộ bảng màu từ `theme`.

-----

### File 1: `TASK.md` (Phiên bản mới)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Hoàn thiện Hệ thống Design Token và Nâng cấp Showcase

---

### **1. ĐÁNH GIÁ CÔNG VIỆC TRƯỚC**

Bạn đã hoàn thành xuất sắc việc xây dựng các UI atom và trang Showcase ban đầu. Lớp Adapter cũng đã được tích hợp thành công. Nền tảng hiện tại rất tốt.

### **2. MỤC TIÊU KIẾN TRÚC TIẾP THEO**

Nhiệm vụ này tập trung vào việc hoàn thiện hệ thống design token, đặc biệt là màu sắc, và nâng cấp trang Showcase để nó có thể tự động trực quan hóa các token này. Chúng ta sẽ trích xuất dữ liệu màu sắc từ file Figma-export và loại bỏ hoàn toàn mã rác đó.

### **3. DANH SÁCH NHIỆM VỤ CHI TIẾT**

**QUAN TRỌNG:** Hãy thực hiện các nhiệm vụ một cách chính xác. Tôi sẽ cung cấp các đoạn mã chi tiết, bạn chỉ cần triển khai đúng như vậy.

#### **Nhiệm vụ 1: Hoàn thiện `theme.color` (TODO-018)**

* **Hành động:** Mở và chỉnh sửa file `src/core/theme.ts`.
* **Mô tả:** Trích xuất tất cả các giá trị màu từ file Figma-export và cập nhật vào `theme.color`.
* **Yêu cầu:** Sao chép và thay thế toàn bộ object `color` trong `theme.ts` bằng cấu trúc chính xác dưới đây.

    ```typescript
    // src/core/theme.ts (phần color)
    const color = {
        primary: {
            100: "#2388FF",
            200: "#FF2D46",
            300: "#FFC700",
            400: "#63DE77"
        },
        secondary: {
            100: "#1777E7",
            200: "#F6FAFF", // Light Blue
            300: "#DE1F35",
            400: "#FFE8EA", // Light Red
            500: "#e79800",
            600: "#fff9e5", // Light Yellow
            700: "#37C972",
            800: "#e5f8e8"  // Light Green
        },
        neutral: {
            100: "#ffffff",
            200: "#f8faff",
            300: "#f1f3f7",
            400: "#e1e4ed",
            500: "#b4b9c9",
            600: "#6d758f",
            700: "#353e5c",
            800: "#19213d"
        },
        overlay: {
            light: {
                100: "rgba(255, 255, 255, 0.40)",
                200: "rgba(255, 255, 255, 0.50)",
                300: "rgba(255, 255, 255, 0.65)",
                400: "rgba(255, 255, 255, 0.80)"
            },
            dark: {
                100: "rgba(25, 33, 61, 0.40)",
                200: "rgba(25, 33, 61, 0.50)",
                300: "rgba(25, 33, 61, 0.65)",
                400: "rgba(25, 33, 61, 0.80)"
            }
        },
        gradient: {
            red: "linear-gradient(47deg, #DF001B 0%, #FFDDDF 100%)",
            blue: "linear-gradient(45deg, #0075FF 0%, #D0EBFF 100%)",
            yellow: "linear-gradient(45deg, #FF9416 0%, #FFE03A 100%)",
            green: "linear-gradient(45deg, #3ACD52 0%, #7DFFA2 100%)"
        },
        border: {
            // Thêm các màu border được sử dụng
            light: "#F0F2F5",
            medium: "#E3E6EA"
        }
    };
    ```

#### **Nhiệm vụ 2: Xây dựng Component `Swatch` (TODO-019)**

* **Hành động:** Tạo một file mới `src/ui/atom/swatch.tsx`.
* **Mô tả:** Component này dùng để hiển thị một mẫu màu, tên và mã hex của nó. Nó phải hoàn toàn tái sử dụng được.
* **Yêu cầu:** Triển khai chính xác nội dung file như sau:

    ```typescript
    // src/ui/atom/swatch.tsx
    import { style } from '@/adapter';
    import type { FC } from '@/adapter';
    import { theme } from '@/core/theme';

    interface Props {
        name: string;
        color: string;
    }

    const Container = style('div')`
        display: flex;
        flex-direction: column;
        width: 160px;
        box-shadow: ${theme.shadow.neutral.sm};
        border-radius: ${theme.radius.medium};
        overflow: hidden;
        border: 1px solid ${theme.color.border.medium};
    `;

    const Block = style('div')<{ color: string }>`
        height: 100px;
        background: ${({ color }) => color};
    `;

    const Info = style('div')`
        padding: ${theme.space[2]} ${theme.space[3]};
        background: ${theme.color.neutral[100]};
    `;

    const Name = style('p')`
        font-weight: ${theme.typography.weight.bold};
        font-size: 14px;
        color: ${theme.color.neutral[800]};
        margin: 0 0 ${theme.space[1]} 0;
    `;

    const Hex = style('p')`
        font-family: monospace;
        font-size: 12px;
        color: ${theme.color.neutral[600]};
        margin: 0;
        text-transform: uppercase;
    `;

    export const Swatch: FC<Props> = ({ name, color }) => {
        return (
            <Container>
                <Block color={color} />
                <Info>
                    <Name>{name}</Name>
                    <Hex>{color}</Hex>
                </Info>
            </Container>
        );
    };
    ```

#### **Nhiệm vụ 3: Nâng cấp `Showcase` để hiển thị Màu sắc (TODO-020)**

* **Hành động:** Chỉnh sửa file `src/main.tsx` (hoặc file chứa component `App` của bạn).
* **Mô tả:** Tái cấu trúc trang `Showcase` để nó có thể hiển thị cả `shadows` và `colors` một cách có hệ thống. Trang `Showcase` sẽ tự động render các màu từ `theme` object.
* **Yêu cầu:** Cấu trúc lại component `App` để render các section một cách động. Dưới đây là ví dụ cho việc render các màu `primary`. **Bạn phải áp dụng pattern tương tự cho tất cả các nhóm màu khác (`secondary`, `neutral`, etc.).**

    ```tsx
    // src/main.tsx (ví dụ phần App)
    import { style } from '@/adapter';
    import type { FC } from '@/adapter';
    import { theme } from '@/core/theme';
    import { Card } from '@/ui/atom/card';
    import { Title, Subtitle, Text } from '@/ui/atom/typography';
    import { Swatch } from '@/ui/atom/swatch'; // Import component mới

    // ... (Giữ lại Global, Section, Showcase) ...
    
    // Component để hiển thị một nhóm màu
    const Palette: FC<{ title: string; colors: Record<string, string> }> = ({ title, colors }) => (
        <Section title={title}>
            {Object.entries(colors).map(([name, hex]) => (
                <Swatch key={name} name={name} color={hex} />
            ))}
        </Section>
    );

    const App: FC = () => (
        <main>
            <Title>LanguageUI Showcase</Title>

            {/* PHẦN HIỂN THỊ MÀU SẮC */}
            <Palette title="Primary Colors" colors={theme.color.primary} />
            <Palette title="Secondary Colors" colors={theme.color.secondary} />
            <Palette title="Neutral Colors" colors={theme.color.neutral} />
            {/* Thêm các section cho Overlay và Gradient nếu cần */}

            {/* PHẦN HIỂN THỊ SHADOWS (Giữ lại từ trước) */}
            <Section title="Primary Shadows">
                {/* ... cards ... */}
            </Section>
            <Section title="Secondary Shadows">
                {/* ... cards ... */}
            </Section>
            <Section title="Neutral Shadows">
                {/* ... cards ... */}
            </Section>
        </main>
    );

    // ... (Phần render của dom) ...
    ```

#### **Nhiệm vụ 4: Dọn dẹp (TODO-021)**

* **Hành động:** Xóa file `tsx` chứa mã màu do Figma sinh ra.
* **Mục tiêu:** Đảm bảo codebase không chứa bất kỳ mã nguồn nào được sinh tự động và không tuân thủ kiến trúc.

### **4. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Cập nhật file Báo cáo:** Mở file `REPORT.md` và cập nhật trạng thái mới nhất.
2.  **Commit và Push code:** Sử dụng message commit chính xác.

    ```bash
    git add .
    git commit -m "feat(theme): enrich color system and enhance showcase"
    git push
    ```

### **5. LỜI KẾT**

Đây là một bước quan trọng để xây dựng một hệ thống thiết kế "sống" và tự ghi chép (self-documenting). Khi `theme` thay đổi, `Showcase` sẽ tự động cập nhật. Kỷ luật hôm nay là sự ổn định của ngày mai. Hãy thực thi cẩn thận.

**Guardian.**
````