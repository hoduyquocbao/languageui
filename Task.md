Chào Coder,

Tôi là Guardian. Tôi đã xem xét báo cáo của bạn và kiểm tra toàn bộ mã nguồn. Công việc xây dựng nền tảng cho các `Molecule` đã được thực hiện đúng theo chỉ dẫn.

Tuy nhiên, người dùng đã chỉ ra một điểm rất chính xác: Mặc dù về mặt kiến trúc các component đã đúng, nhưng về mặt **phong cách (style)**, chúng chưa hoàn toàn khớp với thiết kế trong Figma. Các chi tiết về kích thước, màu sắc, và trạng thái cần được tinh chỉnh để đạt được sự tương đồng 1:1.

Đây là một phản hồi giá trị. Giai đoạn đầu chúng ta tập trung vào việc xây dựng cấu trúc đúng. Bây giờ là lúc để **tinh chỉnh** các chi tiết trực quan.

## Phân tích Vấn đề & Mục tiêu Tiếp theo

Sau khi phân tích lại mã TSX do Figma sinh ra, tôi nhận thấy các điểm khác biệt chính sau:

  * **Component `Input`:** Thiết kế yêu cầu icon có thể nằm *bên trong* vùng nhập liệu (prefix/suffix). Component hiện tại của chúng ta chưa hỗ trợ điều này.
  * **Component `Toggle`:** Thiết kế yêu cầu một giao diện công tắc bật/tắt (track và thumb), trong khi component hiện tại của chúng ta có thể trông giống Checkbox.
  * **Chi tiết Styling:** Các giá trị `padding`, `border-radius`, và màu sắc cho các trạng thái (`focus`, `disabled`, `checked`) cần được ánh xạ chính xác hơn tới các token trong `theme.ts` của chúng ta.

**Phán quyết & Mục tiêu kiến trúc:**
Chúng ta sẽ **tái cấu trúc (refactor)** các component `Molecule` đã có để chúng không chỉ tuân thủ kiến trúc mà còn phản ánh chính xác các chi tiết trực quan từ bản thiết kế Figma.

-----

### File 1: `TASK.md` (Phiên bản mới)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Tinh chỉnh các Component Form Molecule để Khớp với Thiết kế

---

### **1. MỤC TIÊU KIẾN TRÚC**

Giai đoạn này tập trung vào việc tinh chỉnh giao diện người dùng. Chúng ta sẽ refactor các component `Molecule` đã tạo để đảm bảo chúng khớp hoàn toàn với các chi tiết style (kích thước, padding, màu sắc, trạng thái) được định nghĩa trong bản thiết kế Figma, trong khi vẫn tuân thủ nghiêm ngặt các quy tắc kiến trúc của chúng ta (sử dụng theme tokens, adapter, và định danh đơn từ).

### **2. DANH SÁCH NHIỆM VỤ CHI TIẾT**

#### **Nhiệm vụ 1: Refactor Component `Input` để Hỗ trợ Prefix/Suffix (TODO-043)**

* **Hành động:** Cập nhật file `src/ui/molecule/input.tsx`.
* **Mô tả:** Đây là thay đổi quan trọng nhất. Chúng ta sẽ cấu trúc lại `Input` để hỗ trợ các icon ở đầu và cuối, tương tự như component `Button`.
* **Yêu cầu:** Thay thế toàn bộ nội dung file bằng mã nguồn đã được refactor dưới đây.

    ```typescript
    // src/ui/molecule/input.tsx
    import { style } from '@/adapter';
    import { theme } from '@/core/theme';
    import type { FC, Node } from '@/adapter';

    const Wrapper = style('div')`
        position: relative;
        display: flex;
        align-items: center;
    `;

    const Field = style('input')`
        width: 100%;
        padding: ${theme.space[2]} ${theme.space[3]};
        border: 1px solid ${theme.color.neutral[300]};
        border-radius: ${theme.radius.medium};
        font-size: ${theme.typography.size.body};
        transition: border-color 150ms;
        
        &:focus {
            outline: none;
            border-color: ${theme.color.primary[100]};
        }
        
        &:disabled {
            background: ${theme.color.neutral[100]};
            color: ${theme.color.neutral[500]};
            cursor: not-allowed;
        }
        
        &::placeholder {
            color: ${theme.color.neutral[400]};
        }
    `;

    const Prefix = style('div')`
        position: absolute;
        left: ${theme.space[3]};
        color: ${theme.color.neutral[500]};
        pointer-events: none;
    `;

    const Suffix = style('div')`
        position: absolute;
        right: ${theme.space[3]};
        color: ${theme.color.neutral[500]};
        pointer-events: none;
    `;

    interface Props {
        placeholder?: string;
        disabled?: boolean;
        prefix?: Node;
        suffix?: Node;
        value?: string;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }

    export const Input: FC<Props> = ({ prefix, suffix, ...rest }) => (
        <Wrapper>
            <Field 
                {...rest} 
                style={{ 
                    paddingLeft: prefix ? `${theme.space[6]}` : undefined,
                    paddingRight: suffix ? `${theme.space[6]}` : undefined
                }}
            />
            {prefix && <Prefix>{prefix}</Prefix>}
            {suffix && <Suffix>{suffix}</Suffix>}
        </Wrapper>
    );
    ```

#### **Nhiệm vụ 2: Refactor Component `Checkbox` (TODO-044)**

* **Hành động:** Cập nhật file `src/ui/molecule/checkbox.tsx`.
* **Mô tả:** Tinh chỉnh lại cấu trúc và tên định danh để rõ ràng và tuân thủ quy tắc hơn.
* **Yêu cầu:** Thay thế toàn bộ nội dung file bằng mã sau.

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

    const Box = style('div')<{ checked: boolean }>`
        width: 16px;
        height: 16px;
        border: 1px solid ${({ checked }) => (checked ? theme.color.primary[100] : theme.color.neutral[300])};
        background: ${({ checked }) => (checked ? theme.color.primary[100] : 'white')};
        border-radius: ${theme.radius.small};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 150ms;
    `;

    const Wrapper = style('label')`
        display: inline-flex;
        align-items: center;
        gap: ${theme.space[2]};
        cursor: pointer;
    `;

    interface Props {
        label?: string;
        checked?: boolean;
        defaultChecked?: boolean;
        disabled?: boolean;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    }

    export const Checkbox: FC<Props> = ({ label, checked, defaultChecked, disabled, onChange, ...rest }) => (
        <Wrapper>
            <Hidden 
                checked={checked} 
                defaultChecked={defaultChecked}
                disabled={disabled}
                onChange={onChange}
                {...rest} 
            />
            <Box checked={!!checked}>
                {checked && <Icon kind="line" name="check" size={12} color="white" />}
            </Box>
            {label && <span>{label}</span>}
        </Wrapper>
    );
    ```

#### **Nhiệm vụ 3: Refactor Component `Toggle` (TODO-045)**

* **Hành động:** Cập nhật file `src/ui/molecule/toggle.tsx`.
* **Mô tả:** Triển khai lại hoàn toàn để có giao diện công tắc bật/tắt đúng như thiết kế.
* **Yêu cầu:** Thay thế toàn bộ nội dung file bằng mã sau.

    ```typescript
    // src/ui/molecule/toggle.tsx
    import { style } from '@/adapter';
    import { theme } from '@/core/theme';
    import type { FC } from '@/adapter';

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

    const Track = style('div')<{ checked: boolean }>`
        width: 32px;
        height: 16px;
        background: ${({ checked }) => (checked ? theme.color.primary[100] : theme.color.neutral[300])};
        border-radius: 16px;
        position: relative;
        transition: background 150ms;
    `;

    const Thumb = style('div')<{ checked: boolean }>`
        position: absolute;
        top: 2px;
        left: ${({ checked }) => (checked ? '16px' : '2px')};
        width: 12px;
        height: 12px;
        background: white;
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0,0,0,0.08);
        transition: left 150ms;
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

    export const Toggle: FC<Props> = ({ label, checked, ...rest }) => (
        <Wrapper>
            <Hidden checked={checked} {...rest} />
            <Track checked={!!checked}>
                <Thumb checked={!!checked} />
            </Track>
            {label && <span>{label}</span>}
        </Wrapper>
    );
    ```

#### **Nhiệm vụ 4: Cập nhật `Showcase` (TODO-046)**

* **Hành động:** Cập nhật file `src/main.tsx` để phản ánh các thay đổi và hiển thị đúng các trạng thái.
* **Yêu cầu:** Thay thế toàn bộ section "Form Controls" bằng mã sau để hiển thị đúng các ví dụ.

    ```tsx
    // Trong src/main.tsx, thay thế section "Form Controls"
    <Section title="Form Controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
            {/* Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Subtitle>Input</Subtitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Input placeholder="Default input" />
                    <Input placeholder="Disabled input" disabled />
                    <Input placeholder="With prefix" prefix={<Icon kind="line" name="search" />} />
                    <Input placeholder="With suffix" suffix={<Icon kind="line" name="check" />} />
                </div>
            </div>

            {/* Textarea */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Subtitle>Textarea</Subtitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Textarea placeholder="Default textarea" />
                    <Textarea placeholder="Disabled textarea" disabled />
                </div>
            </div>

            {/* Select */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Subtitle>Select</Subtitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Select>
                        <option value="">Choose an option</option>
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                    </Select>
                    <Select disabled>
                        <option value="">Disabled select</option>
                    </Select>
                </div>
            </div>

            {/* Checkbox */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Subtitle>Checkbox</Subtitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Checkbox label="Default checkbox" />
                    <Checkbox label="Checked checkbox" defaultChecked />
                    <Checkbox label="Disabled checkbox" disabled />
                    <Checkbox label="Disabled checked" defaultChecked disabled />
                </div>
            </div>

            {/* Radio */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Subtitle>Radio</Subtitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Radio name="radio1" label="Option 1" />
                    <Radio name="radio1" label="Option 2" defaultChecked />
                    <Radio name="radio1" label="Disabled option" disabled />
                </div>
            </div>

            {/* Toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Subtitle>Toggle</Subtitle>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Toggle label="Default toggle" />
                    <Toggle label="Checked toggle" defaultChecked />
                    <Toggle label="Disabled toggle" disabled />
                    <Toggle label="Disabled checked" defaultChecked disabled />
                </div>
            </div>
        </div>
    </Section>
    ```

#### **Nhiệm vụ 5: Dọn dẹp (TODO-047)**

* **Hành động:** Xóa các file `tsx` chứa mã form do Figma sinh ra mà bạn đã dùng để phân tích.
* **Mục tiêu:** Giữ cho codebase sạch sẽ, không còn rác từ file thiết kế.

### **3. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Cập nhật `REPORT.md`**: Tạo một section mới, ghi lại các công việc đã làm cho nhiệm vụ "Form Molecule Refinement".
2.  **Cập nhật `todo.csv`**: Đánh dấu các `TODO` từ `043` đến `047` là `Done`.
3.  **Commit và Push code:** Sử dụng message commit sau:

    ```bash
    git add .
    git commit -m "refactor(molecule): refine form components to match figma spec"
    git push
    ```

### **4. LỜI KẾT**

Sự chú ý đến chi tiết là điều phân biệt một sản phẩm tốt và một sản phẩm tuyệt vời. Bằng cách tinh chỉnh các component này, chúng ta đảm bảo rằng sản phẩm cuối cùng không chỉ mạnh mẽ về mặt kỹ thuật mà còn hoàn hảo về mặt thẩm mỹ.

**Guardian.**
````