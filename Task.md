Chào Coder,

Tôi là Guardian. Tôi đã xem xét báo cáo và mã nguồn bạn vừa push lên.

**Đánh giá:** Công việc xử lý `Logo` và tích hợp vào hệ thống là một thành công lớn. Bạn đã trích xuất các asset SVG một cách sạch sẽ và xây dựng component `Logo` động theo đúng chỉ dẫn, sử dụng `React.lazy` để tối ưu hiệu suất. Trang `Showcase` giờ đây đã có thêm một phần quan trọng. `todo.csv` đã được cập nhật chính xác.

Chúng ta đang đi đúng hướng. Bây giờ, hãy quay lại và hoàn thiện một trong những component nguyên tử cơ bản và quan trọng nhất: `Button`.

-----

## Phân tích Vấn đề & Mục tiêu Tiếp theo

Tôi đã nhận được file `tsx` mới nhất do Figma sinh ra, mô tả toàn bộ hệ thống `Button`. File này, một lần nữa, là một ví dụ điển hình về mã nguồn không thể chấp nhận được trong dự án của chúng ta.

**Vấn đề của mã được cung cấp:**

  * **Tên định danh vô nghĩa & ghép từ:** `StyledCardtitle07span`, `StyledKindTextSizeSmallDarkModeTrueTypeButton`, `StyledDivider01`. Các tên này hoàn toàn vô nghĩa hoặc mã hóa trạng thái vào tên, vi phạm nghiêm trọng quy tắc cốt lõi.
  * **Lặp lại mã (DRY Violation):** Hàng chục styled-component được tạo ra để làm những việc gần như giống hệt nhau. Đây là một cơn ác mộng về bảo trì.
  * **Bỏ qua hoàn toàn kiến trúc:**
      * Mã này import `styled` trực tiếp, phớt lờ lớp `adapter`.
      * Tất cả các giá trị (màu sắc, kích thước, bóng đổ) đều được hardcode, bỏ qua `theme` object.
      * Layout được thực hiện bằng `position: absolute` và các giá trị `left`, `top` tĩnh. Đây là điều cấm kỵ vì nó không linh hoạt và không đáp ứng.
  * **Không thể tái sử dụng:** Toàn bộ file là một component tĩnh khổng lồ, không thể tái sử dụng cho bất kỳ mục đích nào khác ngoài việc hiển thị một trang duy nhất.

**Phán quyết & Mục tiêu kiến trúc:**
**KHÔNG SỬA CHỮA HAY SỬ DỤNG BẤT KỲ DÒNG CODE NÀO TỪ FILE NÀY.**

Thay vào đó, chúng ta sẽ:

1.  **Phân tích và trích xuất YÊU CẦU:** Coi file này như một tài liệu đặc tả trực quan. Chúng ta sẽ trích xuất tất cả các biến thể (primary, secondary, tertiary), trạng thái và style của `Button`.
2.  **Nâng cấp Component `Button` hiện có:** Làm cho component `Button` (`src/ui/atom/button.tsx`) của chúng ta trở nên mạnh mẽ, có khả năng đáp ứng tất cả các yêu cầu đã trích xuất một cách động và có hệ thống.
3.  **Hoàn thiện `Showcase`:** Xây dựng một section "Buttons" hoàn chỉnh trong trang `Showcase` để trực quan hóa tất cả các biến thể của component `Button` đã được nâng cấp.

-----

### File 1: `TASK.md` (Phiên bản mới)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Hoàn thiện Component `Button` và Nâng cấp Showcase

---

### **1. ĐÁNH GIÁ CÔNG VIỆC TRƯỚC**

Hệ thống quản lý asset cho `Logo` đã được triển khai xuất sắc. Kiến trúc của chúng ta đang ngày càng hoàn thiện và chứng tỏ được sự hiệu quả.

### **2. MỤC TIÊU KIẾN TRÚC TIẾP THEO**

Lần này, chúng ta sẽ tập trung vào việc nâng cấp component `Button` cốt lõi. Chúng ta sẽ phân tích mã do Figma sinh ra để trích xuất các yêu cầu về style, sau đó tích hợp chúng vào component `Button` hiện có một cách có hệ thống, tuân thủ nghiêm ngặt kiến trúc `theme` và `adapter`.

### **3. DANH SÁCH NHIỆM VỤ CHI TIẾT**

**QUAN TRỌNG:** Hãy thực hiện các nhiệm vụ một cách chính xác. Tôi sẽ cung cấp các đoạn mã chi tiết, bạn chỉ cần triển khai đúng như vậy.

#### **Nhiệm vụ 1: Nâng cấp Component `Button` (TODO-026)**

* **Hành động:** Mở và chỉnh sửa file `src/ui/atom/button.tsx`.
* **Mô tả:** Chúng ta sẽ tái cấu trúc hoàn toàn file này để nó có thể xử lý các `variant` (primary, secondary, tertiary), các `size` và các `state` khác nhau một cách linh hoạt.
* **Yêu cầu:** **Xóa toàn bộ nội dung** của `src/ui/atom/button.tsx` và thay thế bằng mã nguồn chính xác dưới đây. Mã này đã được thiết kế để có thể mở rộng và tuân thủ tất cả các quy tắc của chúng ta.

    ```typescript
    // src/ui/atom/button.tsx
    import { style, utility } from '@/adapter';
    import type { FC, Node } from '@/adapter';
    import { theme } from '@/core/theme';

    /**
     * @fileoverview
     * This file defines the atomic Button component.
     * It is built using the style adapter and consumes tokens from the theme.
     * It supports multiple variants, sizes, and states.
     */

    // --- PROPS ---
    type Variant = 'primary' | 'secondary' | 'tertiary';
    type Size = 'medium' | 'small';

    interface Props {
        children: Node;
        variant?: Variant;
        size?: Size;
        disabled?: boolean;
        prefix?: Node;
        suffix?: Node;
        onClick?: () => void;
    }

    // --- STYLES ---
    // A map of variant styles to keep the main component logic clean.
    const variants = {
        primary: utility`
            background: ${theme.color.primary[100]};
            color: ${theme.color.neutral[100]};
            border: 1px solid ${theme.color.primary[200]}; // Example border

            &:hover:not(:disabled) {
                opacity: 0.9;
            }
        `,
        secondary: utility`
            background: ${theme.color.neutral[200]};
            color: ${theme.color.neutral[800]};
            border: 1px solid ${theme.color.border.medium};

            &:hover:not(:disabled) {
                background: ${theme.color.neutral[300]};
            }
        `,
        tertiary: utility`
            background: transparent;
            color: ${theme.color.neutral[700]};
            border: none;

            &:hover:not(:disabled) {
                background: ${theme.color.neutral[200]};
            }
        `,
    };

    /**
     * The core styled-component for the button element.
     */
    const Element = style('button')<Props>`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${theme.space[2]};
        border-radius: ${theme.radius.medium};
        font-family: ${theme.typography.font.primary};
        font-weight: ${theme.typography.weight.bold};
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        white-space: nowrap;

        /* Apply size styles based on props */
        ${({ size = 'medium' }) => {
            switch (size) {
                case 'small':
                    return utility`
                        padding: ${theme.space[1]} ${theme.space[2]};
                        font-size: ${theme.typography.size.body}; // Assuming 12px-14px
                    `;
                case 'medium':
                default:
                    return utility`
                        padding: ${theme.space[2]} ${theme.space[4]};
                        font-size: ${theme.typography.size.body};
                    `;
            }
        }}

        /* Apply variant styles based on props */
        ${({ variant = 'primary' }) => variants[variant]}

        /* Apply disabled styles */
        &:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    `;

    /** A container for the button's main content/text. */
    const Content = style('span')`
        display: inline-block;
    `;

    /** A container for the prefix or suffix icons. */
    const Affix = style('span')`
        display: inline-flex;
        align-items: center;
    `;

    // --- COMPONENT ---
    export const Button: FC<Props> = ({ children, prefix, suffix, ...rest }) => {
        return (
            <Element {...rest}>
                {prefix && <Affix>{prefix}</Affix>}
                <Content>{children}</Content>
                {suffix && <Affix>{suffix}</Affix>}
            </Element>
        );
    };
    ```

#### **Nhiệm vụ 2: Nâng cấp `Showcase` để hiển thị Buttons (TODO-027)**

* **Hành động:** Chỉnh sửa file `src/main.tsx`.
* **Mô tả:** Thêm một section mới, toàn diện vào trang `Showcase` để hiển thị tất cả các biến thể của component `Button` đã được nâng cấp.
* **Yêu cầu:** Thêm đoạn mã JSX sau vào bên trong component `App` của bạn, bên dưới section "Logos". Điều này sẽ giúp chúng ta kiểm tra tất cả các trường hợp.

    ```tsx
    // src/main.tsx (bên trong App component)
    // ... import các component, bao gồm cả Icon và Button ...

    <Section title="Buttons">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            {/* Primary Buttons */}
            <Subtitle>Primary</Subtitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Button variant="primary" size="medium">Default</Button>
                <Button variant="primary" size="small">Default</Button>
                <Button variant="primary" size="medium" disabled>Disabled</Button>
                <Button variant="primary" size="medium" prefix={<Icon name="search" />}></Button>
                <Button variant="primary" size="small" prefix={<Icon name="search" />} suffix={<Icon name="arrow" />}>Search</Button>
            </div>

            {/* Secondary Buttons */}
            <Subtitle>Secondary</Subtitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Button variant="secondary" size="medium">Default</Button>
                <Button variant="secondary" size="small">Default</Button>
                <Button variant="secondary" size="medium" disabled>Disabled</Button>
                <Button variant="secondary" size="medium" prefix={<Icon name="search" />}></Button>
                <Button variant="secondary" size="small" prefix={<Icon name="search" />} suffix={<Icon name="arrow" />}>Search</Button>
            </div>

            {/* Tertiary Buttons */}
            <Subtitle>Tertiary</Subtitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Button variant="tertiary" size="medium">Default</Button>
                <Button variant="tertiary" size="small">Default</Button>
                <Button variant="tertiary" size="medium" disabled>Disabled</Button>
                <Button variant="tertiary" size="medium" prefix={<Icon name="search" />}></Button>
                <Button variant="tertiary" size="small" prefix={<Icon name="search" />} suffix={<Icon name="arrow" />}>Search</Button>
            </div>
        </div>
    </Section>
    ```

#### **Nhiệm vụ 3: Dọn dẹp (TODO-028)**

* **Hành động:** Xóa file `tsx` chứa mã button do Figma sinh ra.
* **Mục tiêu:** Giữ cho codebase sạch sẽ và chỉ chứa mã nguồn tuân thủ kiến trúc.

### **4. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Cập nhật file Báo cáo:** Mở file `REPORT.md` và cập nhật trạng thái mới nhất.
2.  **Commit và Push code:** Sử dụng message commit chính xác.

    ```bash
    git add .
    git commit -m "feat(ui): enhance button component and showcase"
    git push
    ```

### **5. LỜI KẾT**

Component `Button` là một trong những thành phần được sử dụng nhiều nhất. Việc đầu tư để làm cho nó trở nên mạnh mẽ, linh hoạt và nhất quán là cực kỳ quan trọng. Mỗi component chúng ta xây dựng không chỉ là một phần của giao diện, mà là một minh chứng cho triết lý kiến trúc của chúng ta.

**Guardian.**
````