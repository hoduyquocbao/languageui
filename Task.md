Chắc chắn rồi. Với vai trò là Guardian, tôi sẽ tạo một file `TASK.md` chi tiết và rõ ràng để "Coder" (người dùng Cursor) có thể thực thi một cách chính xác. File này sẽ không chỉ liệt kê các nhiệm vụ mà còn củng cố các nguyên tắc kiến trúc mà chúng ta đã thống nhất.

Bên cạnh đó, tôi sẽ tạo một file mẫu `REPORT.md` để Coder sử dụng khi hoàn thành.

-----

### File 1: `TASK.md`

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-24
**Chủ đề:** Triển khai Kiến trúc UI Nguyên tử (Atomic UI Architecture)

---

### **1. MỤC TIÊU TỔNG QUÁT**

Nhiệm vụ này nhằm mục đích triển khai nền tảng cho hệ thống UI của Agent, thay thế hoàn toàn các cấu trúc cũ, tĩnh và các đoạn mã được xuất tự động từ Figma. Mục tiêu cuối cùng là một codebase UI thanh lịch, có khả năng mở rộng, tái sử dụng cao và tuân thủ tuyệt đối các nguyên tắc đã được định nghĩa trong `.github/instructions/Coder.instructions.md`.

### **2. YÊU CẦU TIÊN QUYẾT (BẮT BUỘC ĐỌC)**

Trước khi bắt đầu, bạn phải:
1.  **Đọc và hiểu rõ** toàn bộ tài liệu `.github/instructions/Coder.instructions.md` về quy tắc đặt tên đơn từ và các kỹ thuật thiết kế.
2.  **Xem lại các phân tích và quyết định kiến trúc** của Guardian trong các trao đổi trước.
3.  **Hiểu rõ triết lý:** Chúng ta không "sửa" mã từ Figma. Chúng ta xây dựng lại nó một cách có chủ đích theo kiến trúc của chúng ta.

### **3. DANH SÁCH NHIỆM VỤ CHI TIẾT**

Thực hiện các nhiệm vụ dưới đây theo đúng thứ tự.

#### **Nhiệm vụ 1: Thiết lập Nguồn Chân lý - `theme.ts` (TODO-002, TODO-006)**

* **Hành động:** Tạo file `src/core/theme.ts`.
* **Mô tả:** File này sẽ chứa `theme` object, là nguồn chân lý duy nhất cho tất cả các design token.
* **Yêu cầu:**
    * Tạo các object con: `color`, `typography`, `shadow`, `radius`, `space`.
    * Dựa vào file Figma tham khảo, điền các giá trị token vào các object tương ứng.
        * **Ví dụ `color`:**
            ```typescript
            const color = {
                primary: {
                    100: "#2388FF",
                    200: "#FF2D46",
                    // ...
                },
                neutral: {
                    100: "#ffffff",
                    // ...
                },
                // Thêm các gradient và màu border đặc biệt ở đây
                gradient: {
                    primary: "linear-gradient(180deg, #2B7AFB 0%, #2174FD 100%)",
                },
                border: {
                    primary: "#174BD2",
                }
            };
            ```
    * **KHÔNG** hardcode bất kỳ giá trị style nào bên ngoài file này.

#### **Nhiệm vụ 2: Xây dựng Hệ thống `Icon` Tập trung (TODO-005)**

* **Hành động:** Tạo file `src/ui/atom/icon.tsx`.
* **Mô tả:** Tạo một component `Icon` duy nhất, có khả năng render các SVG khác nhau dựa trên `name` prop. Điều này giúp tránh việc tạo một component cho mỗi icon.
* **Yêu cầu:**
    * Tạo một thư mục `src/assets/icons` để chứa các file SVG gốc (ví dụ: `search.svg`, `arrow.svg`).
    * Xây dựng component `Icon` có thể tải và render SVG tương ứng.
    * Sử dụng `currentColor` cho thuộc tính `stroke` hoặc `fill` của SVG để chúng có thể kế thừa màu từ component cha.
    * **Ví dụ cấu trúc:**
        ```typescript
        // ui/atom/icon.tsx
        interface Props extends React.SVGProps<SVGSVGElement> {
            name: 'search' | 'arrow';
            size?: number;
        }

        export const Icon: React.FC<Props> = ({ name, ...props }) => {
            // Logic để chọn SVG dựa trên 'name'
            // const SvgComponent = getSvgByName(name);
            // return <SvgComponent {...props} />;
            return null; // Triển khai logic thực tế
        };
        ```

#### **Nhiệm vụ 3: Triển khai Component `Button` Động (TODO-002)**

* **Hành động:** Tạo file `src/ui/atom/button.tsx`.
* **Mô tả:** Xây dựng component `Button` có thể tái sử dụng, dựa trên kiến trúc đã được Guardian thiết kế.
* **Yêu cầu:**
    * Định nghĩa `Props` interface với các từ đơn: `variant`, `size`, `state`, `prefix`, `suffix`.
    * Sử dụng `styled-components` (hoặc thư viện tương tự) để tạo `Element` button.
    * **Tất cả các giá trị style (padding, color, background, v.v.) PHẢI được lấy từ `theme` object.**
    * Implement logic để hiển thị các `prefix` và `suffix` nodes (sử dụng component `Icon` từ Nhiệm vụ 2).
    * Code tham khảo từ Guardian:
        ```typescript
        // Props
        interface Props {
            children: React.ReactNode;
            variant?: 'primary' | 'secondary';
            size?: 'medium' | 'small';
            state?: 'disabled';
            prefix?: React.ReactNode;
            suffix?: React.ReactNode;
        }

        // Component
        export const Button: React.FC<Props> = ({ children, prefix, suffix, ...rest }) => {
            return (
                <Element {...rest}>
                    {prefix && <span>{prefix}</span>}
                    <span>{children}</span>
                    {suffix && <span>{suffix}</span>}
                </Element>
            );
        };
        ```

#### **Nhiệm vụ 4: Dọn dẹp Nợ Kỹ thuật (TODO-004, TODO-007)**

* **Hành động:** Xóa bỏ hoàn toàn các file và đoạn mã được xuất tự động từ Figma.
* **Mô tả:** Loại bỏ mọi dấu vết của kiến trúc cũ để đảm bảo codebase sạch sẽ.
* **Yêu cầu:**
    * Xóa file chứa component `KindCombinedSizeDefaultDarkModeFalseTypeButton`.
    * Kiểm tra toàn bộ dự án và đảm bảo không còn đoạn mã nào vi phạm quy tắc đặt tên hoặc sử dụng style hardcode.
    * Ghi nhớ: Từ bây giờ, **Figma chỉ là tài liệu tham khảo trực quan.**

### **4. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Tạo file Báo cáo:**
    * Tạo một file mới tên là `REPORT.md` ngay tại thư mục này.
    * Sao chép nội dung từ file mẫu `REPORT.template.md` (tôi đã cung cấp bên dưới) vào `REPORT.md`.
    * Điền vào báo cáo: đánh dấu các nhiệm vụ đã hoàn thành và thêm ghi chú nếu cần.

2.  **Commit và Push code:**
    * Sử dụng các lệnh sau để commit công việc của bạn.
    * Sử dụng message commit theo đúng chuẩn Conventional Commits.

    ```bash
    git add .
    git commit -m "feat(ui): implement atomic UI architecture foundation"
    git push
    ```

### **5. LỜI KẾT**

Hãy thực hiện các nhiệm vụ này với sự tập trung và kỷ luật cao nhất. Mỗi dòng code bạn viết là một viên gạch xây nên nền tảng cho một hệ thống vững mạnh. Sự thanh lịch và hiệu suất không phải là tùy chọn, chúng là yêu cầu.

**Guardian.**
````

-----

### File 2: `REPORT.template.md` (Coder sẽ copy nội dung này vào `REPORT.md`)

```markdown
# BÁO CÁO HOÀN THÀNH NHIỆM VỤ

**Gửi:** Guardian
**Từ:** Coder
**Ngày:** [Điền ngày hoàn thành]
**Commit Hash:** [Điền commit hash cuối cùng]

---

### **1. TRẠNG THÁI CÁC NHIỆM VỤ**

-   [x] **Nhiệm vụ 1:** Thiết lập Nguồn Chân lý - `theme.ts`.
-   [x] **Nhiệm vụ 2:** Xây dựng Hệ thống `Icon` Tập trung.
-   [x] **Nhiệm vụ 3:** Triển khai Component `Button` Động.
-   [x] **Nhiệm vụ 4:** Dọn dẹp Nợ Kỹ thuật.

### **2. GHI CHÚ THÊM (NẾU CÓ)**

* *(Ví dụ: Gặp khó khăn ở việc tìm giá trị token X, đã tạm sử dụng giá trị Y và đánh dấu `// TODO`).*
* *(Ví dụ: Hệ thống Icon đã được xây dựng, sẵn sàng để mở rộng cho các icon khác).*
* *(Ví dụ: Mọi thứ diễn ra suôn sẻ).*

```

Bây giờ bạn chỉ cần cung cấp hai file này (`TASK.md` và `REPORT.template.md`) cho "Coder". Họ sẽ có một lộ trình cực kỳ rõ ràng để thực thi và một quy trình chuẩn để báo cáo, đảm bảo chất lượng và sự nhất quán của dự án.