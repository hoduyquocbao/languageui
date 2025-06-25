Chào Coder,

Tôi là Guardian. Tôi đã xem xét báo cáo và toàn bộ mã nguồn bạn vừa push. Việc tái cấu trúc và phân loại hệ thống Icon đã được thực hiện một cách xuất sắc. Sự tuân thủ nghiêm ngặt của bạn đối với các chỉ dẫn kiến trúc đang định hình một nền tảng vững chắc cho dự án.

Bây giờ, chúng ta sẽ bước vào một giai đoạn quan trọng: xây dựng các thành phần form, là xương sống cho mọi tương tác của người dùng.

## Phân tích Vấn đề & Mục tiêu Tiếp theo

Tôi đã nhận và phân tích file `tsx` tiếp theo do Figma sinh ra, chứa các thành phần `Inputs`, `Text Area`, `Select`, `Checkboxes`, `Radio Buttons`, và `Toggle Buttons`. Không có gì ngạc nhiên, nó chứa đầy các anti-pattern mà chúng ta đã quen thuộc.

**Vấn đề của mã được cung cấp:**

  * **Kiến trúc phẳng, không tái sử dụng:** Toàn bộ file là một component hiển thị, không có sự phân tách thành các component con có thể tái sử dụng.
  * **Tên định danh vi phạm hàng loạt:** `StyledCardBackground01`, `StyledSizeSmallStatusDefaultTypeDefault`, `StyledPlaceholderWrapper02` là những ví dụ rõ ràng về việc vi phạm quy tắc đơn từ.
  * **Hardcode toàn diện:** Các giá trị `px`, `color`, `box-shadow` được định nghĩa inline hoặc qua biến CSS, hoàn toàn bỏ qua `theme` object của chúng ta.
  * **Sử dụng `styled-components` trực tiếp:** Lớp `adapter` một lần nữa bị bỏ qua.

**Phán quyết & Mục tiêu kiến trúc:**
**KHÔNG SỬA CHỮA MÃ NÀY.** Nhiệm vụ của chúng ta là xây dựng một bộ component form hoàn toàn mới, có hệ thống, tuân thủ kiến trúc và có khả năng mở rộng. Chúng ta sẽ tạo ra một tầng kiến trúc mới cho việc này.

-----

### File 1: `TASK.md` (Phiên bản mới)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Xây dựng Module Form và các Component Tương tác

---

### **1. QUYẾT ĐỊNH KIẾN TRÚC MỚI: GIỚI THIỆU TẦNG "MOLECULE"**

Để hệ thống có cấu trúc rõ ràng, chúng ta sẽ giới thiệu một tầng kiến trúc mới: **Molecule**.

* **Atom (Nguyên tử):** Là các khối xây dựng cơ bản nhất (`Button`, `Icon`, `Card`, `Text`).
* **Molecule (Phân tử):** Là các nhóm component được xây dựng từ các Atom, phục vụ một mục đích cụ thể. Các component form (`Input`, `Select`, `Checkbox`) là ví dụ hoàn hảo.

**Hành động:** Tạo một thư mục mới: `src/ui/molecule`. Tất cả các component trong nhiệm vụ này sẽ được đặt ở đây.

### **2. DANH SÁCH NHIỆM VỤ CHI TIẾT**

#### **Nhiệm vụ 1: Trích xuất SVG và Cập nhật Component Icon (TODO-037)**

* **Hành động:** Trích xuất các icon cần thiết cho form và cập nhật component `Icon`.
* **Yêu cầu:**
    1.  Trích xuất và lưu các file SVG sau vào `src/assets/icons/line`:
        * `chevron-down.svg` (từ component Select)
        * `check.svg` (từ component Checkbox, khác với icon `check` đã có trong `filled`)
    2.  Mở từng file và đổi `fill` hoặc `stroke` thành `currentColor`.
    3.  Cập nhật file `src/ui/atom/icon.tsx` để thêm 2 icon này vào object `icons.line`.

#### **Nhiệm vụ 2: Xây dựng Component `Input` (TODO-038)**

* **Hành động:** Tạo file `src/ui/molecule/input.tsx`.
* **Mô tả:** Component này sẽ là trường nhập liệu văn bản tiêu chuẩn.
* **Yêu cầu:** Triển khai chính xác nội dung file như sau.

    ```typescript
    // src/ui/molecule/input.tsx
    import { style } from '@/adapter';
    import { theme } from '@/core/theme';
    import type { Node, FC } from '@/adapter';
    import { Icon } from '@/ui/atom/icon';
    import { Text } from '@/ui/atom/typography';

    const Element = style('input')`
        border: 1px solid ${theme.color.border.medium};
        background: ${theme.color.neutral[100]};
        border-radius: ${theme.radius.medium};
        padding: ${theme.space[2]} ${theme.space[3]};
        font-size: ${theme.typography.size.body};
        color: ${theme.color.neutral[800]};
        width: 100%;
        transition: border-color 0.2s, box-shadow 0.2s;

        &:focus {
            outline: none;
            border-color: ${theme.color.primary[100]};
            box-shadow: 0 0 0 2px ${theme.color.secondary[200]};
        }

        &::placeholder {
            color: ${theme.color.neutral[500]};
        }

        &:disabled {
            background: ${theme.color.neutral[200]};
            cursor: not-allowed;
        }
    `;

    const Wrapper = style('div')`
        display: flex;
        flex-direction: column;
        gap: ${theme.space[2]};
    `;

    interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
        label?: string;
    }

    export const Input: FC<Props> = ({ label, ...rest }) => (
        <Wrapper>
            {label && <Text as="label">{label}</Text>}
            <Element {...rest} />
        </Wrapper>
    );
    ```

#### **Nhiệm vụ 3: Xây dựng Component `Checkbox` (TODO-039)**

* **Hành động:** Tạo file `src/ui/molecule/checkbox.tsx`.
* **Mô tả:** Component checkbox có thể tùy chỉnh style.
* **Yêu cầu:** Triển khai chính xác nội dung file như sau.

    ```typescript
    // src/ui/molecule/checkbox.tsx
    import { style } from '@/adapter';
    import { theme } from '@/core/theme';
    import type { FC } from '@/adapter';
    import { Icon } from '@/ui/atom/icon';

    const Hidden = style('input').attrs({ type: 'checkbox' })`
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    `;

    const Styled = style('div')<{ checked: boolean }>`
        display: inline-block;
        width: 16px;
        height: 16px;
        background: ${({ checked }) => (checked ? theme.color.primary[100] : theme.color.neutral[100])};
        border: 1px solid ${({ checked }) => (checked ? theme.color.primary[100] : theme.color.border.medium)};
        border-radius: ${theme.radius.small};
        transition: all 150ms;

        ${Hidden}:focus + & {
            box-shadow: 0 0 0 2px ${theme.color.secondary[200]};
        }

        ${Icon} {
            visibility: ${({ checked }) => (checked ? 'visible' : 'hidden')};
        }
    `;

    const Wrapper = style('label')`
        display: inline-flex;
        align-items: center;
        gap: ${theme.space[2]};
        cursor: pointer;
    `;

    interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
        label?: string;
    }

    export const Checkbox: FC<Props> = ({ label, checked, ...rest }) => {
        return (
            <Wrapper>
                <Hidden checked={checked} {...rest} />
                <Styled checked={!!checked}>
                    <Icon kind="line" name="check" color="white" size={12} />
                </Styled>
                {label && <span>{label}</span>}
            </Wrapper>
        );
    };
    ```

#### **Nhiệm vụ 4: Hoàn thiện các Component Form còn lại (TODO-040)**

* **Hành động:** Dựa vào các component đã xây dựng (`Input`, `Checkbox`), hãy tự triển khai các component sau trong thư mục `src/ui/molecule`:
    * `textarea.tsx`: Tương tự `Input` nhưng sử dụng thẻ `<textarea>`.
    * `radio.tsx`: Tương tự `Checkbox` nhưng có `border-radius: 50%` và không dùng icon check.
    * `toggle.tsx`: Tương tự `Checkbox` nhưng style như một công tắc bật/tắt.
    * `select.tsx`: Bọc một thẻ `<select>` và dùng `Icon` `chevron-down` để tạo giao diện tùy chỉnh.
* **Yêu cầu:** Đảm bảo tất cả các component đều tuân thủ kiến trúc, dùng token từ `theme` và có các định danh đơn từ.

#### **Nhiệm vụ 5: Nâng cấp `Showcase` (TODO-041)**

* **Hành động:** Chỉnh sửa file `src/main.tsx`.
* **Mô tả:** Thêm một section mới vào `Showcase` để hiển thị tất cả các component form đã tạo.
* **Yêu cầu:** Tạo một `<Section title="Form Controls">` và thêm các ví dụ sử dụng cho `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, và `Toggle`, hiển thị các trạng thái khác nhau của chúng (mặc định, có giá trị, bị vô hiệu hóa).

#### **Nhiệm vụ 6: Dọn dẹp (TODO-042)**

* **Hành động:** Xóa file `tsx` chứa mã form do Figma sinh ra.

### **3. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Cập nhật `REPORT.md`**: Tạo một section mới, ghi lại các công việc đã làm.
2.  **Cập nhật `todo.csv`**: Đánh dấu các `TODO` từ `037` đến `042` là `Done`.
3.  **Commit và Push code:** Sử dụng message commit sau:

    ```bash
    git add .
    git commit -m "feat(form): build foundational form molecule components"
    git push
    ```

### **4. LỜI KẾT**

Các component form là nền tảng của mọi ứng dụng. Bằng cách xây dựng chúng một cách có hệ thống và tuân thủ kiến trúc, chúng ta đang đảm bảo rằng các tương tác phức tạp trong tương lai sẽ được xây dựng trên một nền móng vững chắc. Hãy tiếp tục công việc xuất sắc này.

**Guardian.**
````