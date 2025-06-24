Gửi Coder,

Tôi là Guardian. Tôi đã xem xét toàn bộ các thay đổi bạn đã push lên repository `languageui` cùng với file `REPORT.md`.

**Đánh giá:** Xuất sắc. Bạn đã triển khai nền tảng kiến trúc UI nguyên tử một cách chính xác, tuân thủ nghiêm ngặt các yêu cầu về `theme`, component `Icon` động, và `Button` động. Các file mã nguồn sạch sẽ, tuân thủ quy tắc đơn từ ở cấp độ component, và nợ kỹ thuật từ mã Figma-export đã được xử lý.

Bây giờ nền tảng đã vững chắc, chúng ta sẽ tiến đến một bước đi kiến trúc tiếp theo, một bước đi sẽ đưa triết lý của chúng ta lên một tầm cao mới và bảo vệ hệ thống khỏi sự biến động của các thư viện bên ngoài.

-----

## Phân tích Kiến trúc và Yêu cầu Tiếp theo

### Vấn đề hiện tại: Sự phụ thuộc tường minh (Explicit Dependency)

Mặc dù các component của chúng ta (`Button`, `Icon`) đã tuân thủ quy tắc, mã nguồn *bên trong* chúng vẫn phải gọi trực tiếp đến các thư viện bên ngoài với các API không phải đơn từ của họ.

  * `import React, { useState } from 'react';`
  * `import ReactDOM from 'react-dom/client';`
  * `import styled, { css } from 'styled-components';`
  * Các lệnh gọi như `useState(...)`, `styled.button`, `ReactDOM.createRoot(...)` vẫn là các định danh ghép hoặc có namespace.

Điều này tạo ra một sự **khớp nối chặt (tight coupling)** giữa logic ứng dụng của chúng ta và API của các thư viện bên ngoài. Nếu trong tương lai chúng ta muốn đổi `styled-components` sang `Emotion`, hoặc một thay đổi lớn trong API của React xảy ra, chúng ta sẽ phải đi sửa ở rất nhiều nơi.

### Giải pháp: Lớp Adapter (The Adapter Layer)

Để giải quyết vấn đề này và đạt được sự thuần khiết tối đa trong mã nguồn ứng dụng, chúng ta sẽ giới thiệu một lớp kiến trúc mới: **Adapter**.

**Triết lý:** Lớp Adapter đóng vai trò như một **lớp chống tham nhũng (Anti-Corruption Layer)**. Nó sẽ bao bọc (encapsulate) **tất cả** các thư viện bên ngoài, cung cấp một API nội bộ tuân thủ 100% quy tắc đơn từ cho phần còn lại của ứng dụng.

**Luồng phụ thuộc mới:**
`External Libraries` -\> `[Adapter Layer]` -\> `Our Application Code (Components, Hooks, etc.)`

Mã nguồn ứng dụng của chúng ta sẽ **không bao giờ** import trực tiếp từ `react`, `styled-components`, v.v. nữa. Thay vào đó, nó sẽ chỉ import từ `adapter` của chúng ta.

**Lợi ích:**

1.  **Độ thuần khiết kiến trúc:** Logic ứng dụng của chúng ta sẽ gần như hoàn toàn chỉ bao gồm các định danh đơn từ, đạt được mục tiêu cuối cùng của triết lý.
2.  **Khớp nối lỏng (Decoupling):** Hệ thống của chúng ta không còn bị phụ thuộc vào một thư viện cụ thể. Việc thay thế một thư viện chỉ yêu cầu cập nhật một file duy nhất trong lớp Adapter, không ảnh hưởng đến hàng trăm file component khác.
3.  **Kiểm soát tập trung:** Tất cả các điểm tiếp xúc với thế giới bên ngoài được quản lý tại một nơi duy nhất.
4.  **API đơn giản hóa:** Chúng ta có thể tạo ra các hàm facade đơn giản hơn, che giấu sự phức tạp không cần thiết từ các thư viện gốc.

-----

### File 1: `TASK.md` (Phiên bản mới)

````markdown
# NHIỆM VỤ DÀNH CHO CODER

**Gửi:** Coder
**Từ:** Guardian
**Ngày:** 2025-06-25
**Chủ đề:** Giới thiệu Lớp Adapter và Tái cấu trúc Phụ thuộc

---

### **1. ĐÁNH GIÁ CÔNG VIỆC TRƯỚC**

Công việc triển khai nền tảng UI nguyên tử đã được hoàn thành xuất sắc. Các component `Button`, `Icon` và `theme` đã được xây dựng đúng theo kiến trúc. Nền tảng hiện tại đã sẵn sàng cho bước tiếp theo.

### **2. MỤC TIÊU KIẾN TRÚC TIẾP THEO**

Nhiệm vụ này tập trung vào việc xây dựng **Lớp Adapter** để bao bọc tất cả các thư viện bên ngoài. Mục tiêu là để mã nguồn ứng dụng của chúng ta chỉ phụ thuộc vào API nội bộ tuân thủ quy tắc đơn từ, giúp tăng tính bền vững và khả năng bảo trì của dự án.

### **3. DANH SÁCH NHIỆM VỤ CHI TIẾT**

#### **Nhiệm vụ 1: Thiết lập Cấu trúc Thư mục `adapter` (TODO-008)**

* **Hành động:** Tạo cấu trúc thư mục và file cho lớp Adapter.
* **Yêu cầu:**
    * Tạo thư mục `src/adapter`.
    * Bên trong `src/adapter`, tạo các file sau:
        * `react.ts` (để bao bọc thư viện `react`)
        * `style.ts` (để bao bọc `styled-components`)
        * `dom.ts` (để bao bọc `react-dom/client`)

#### **Nhiệm vụ 2: Triển khai Adapter cho `react` (TODO-009)**

* **Hành động:** Viết mã trong `src/adapter/react.ts` để xuất ra các hàm/hook của React dưới tên đơn từ.
* **Yêu cầu:**
    ```typescript
    // src/adapter/react.ts
    import React from 'react';

    // Re-export các hook và hàm cốt lõi dưới dạng tên đơn từ
    export const state = React.useState;
    export const effect = React.useEffect;
    export const context = React.useContext;
    export const reducer = React.useReducer;
    export const memo = React.useMemo;
    export const callback = React.useCallback;
    export const ref = React.useRef;
    export const lazy = React.lazy;
    export const suspense = React.Suspense;

    // Xuất các type cần thiết
    export type Node = React.ReactNode;
    export type Element = React.ReactElement;
    export type FC<P = {}> = React.FC<P>;
    ```

#### **Nhiệm vụ 3: Triển khai Adapter cho `styled-components` (TODO-010)**

* **Hành động:** Viết mã trong `src/adapter/style.ts`.
* **Yêu cầu:** Tạo một facade đơn giản thay vì export trực tiếp.
    ```typescript
    // src/adapter/style.ts
    import styled, {
        css as cssUtil,
        createGlobalStyle,
        ThemeProvider,
        DefaultTheme
    } from 'styled-components';

    // Tạo một hàm facade 'style' đơn giản
    // Ví dụ: style('button') thay cho styled.button
    type Tag = keyof JSX.IntrinsicElements;
    export const style = (tag: Tag) => styled(tag);

    // Re-export các utility dưới tên đơn từ
    export const utility = cssUtil;
    export const global = createGlobalStyle;
    export const provider = ThemeProvider;

    // Re-export type
    export type Theme = DefaultTheme;
    ```

#### **Nhiệm vụ 4: Triển khai Adapter cho `react-dom/client` (TODO-011)**

* **Hành động:** Viết mã trong `src/adapter/dom.ts`.
* **Yêu cầu:** Đóng gói logic tạo root và render.
    ```typescript
    // src/adapter/dom.ts
    import ReactDOM from 'react-dom/client';
    import React from 'react';

    // Đóng gói toàn bộ quá trình render vào một hàm đơn
    export function render(element: React.ReactElement, containerId: string) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`DOM container with id '${containerId}' not found.`);
            return;
        }
        const root = ReactDOM.createRoot(container);
        root.render(
            <React.StrictMode>
                {element}
            </React.StrictMode>
        );
    }
    ```

#### **Nhiệm vụ 5: Tái cấu trúc (Refactor) Codebase để Sử dụng Adapter (TODO-012)**

* **Hành động:** Cập nhật các file hiện có (`main.tsx`, `button.tsx`, `icon.tsx`) để sử dụng lớp Adapter.
* **Mô tả:** Đây là bước quan trọng nhất. Thay thế tất cả các import trực tiếp từ thư viện bên ngoài bằng import từ `src/adapter`.
* **Ví dụ trong `button.tsx`:**
    * **TRƯỚC ĐÂY:**
        ```typescript
        import React from 'react';
        import styled, { css } from 'styled-components';
        ```
    * **BÂY GIỜ:**
        ```typescript
        import { FC, Node } from '../adapter/react'; // Giả sử đường dẫn tương đối
        import { style, utility } from '../adapter/style';
        ```
* **Ví dụ trong `main.tsx`:**
    * **TRƯỚC ĐÂY:**
        ```typescript
        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import { ThemeProvider } from 'styled-components';
        ```
    * **BÂY GIỜ:**
        ```typescript
        import { provider as Provider } from './adapter/style';
        import { render } from './adapter/dom';
        import { App } from './App'; // Giả sử bạn tạo 1 App component
        
        render(<Provider theme={theme}><App /></Provider>, 'root');
        ```

### **4. QUY TRÌNH BÁO CÁO VÀ BÀN GIAO**

Sau khi hoàn thành **TẤT CẢ** các nhiệm vụ trên:

1.  **Tạo file Báo cáo:** Tạo file `REPORT.md` và điền thông tin theo mẫu.
2.  **Commit và Push code:** Sử dụng message commit có ý nghĩa.

    ```bash
    git add .
    git commit -m "refactor(arch): introduce adapter layer and decouple dependencies"
    git push
    ```

### **5. LỜI KẾT**

Lớp Adapter là một sự đầu tư cho tương lai. Nó giúp hệ thống của chúng ta trở nên mạnh mẽ, linh hoạt và thực sự tuân thủ triết lý thiết kế mà chúng ta theo đuổi. Hãy thực hiện nhiệm vụ này một cách cẩn thận.

**Guardian.**
````

-----

### File 2: `REPORT.template.md` (Nội dung cho Coder sử dụng)

```markdown
# BÁO CÁO HOÀN THÀNH NHIỆM VỤ

**Gửi:** Guardian
**Từ:** Coder
**Ngày:** [Điền ngày hoàn thành]
**Commit Hash:** [Điền commit hash cuối cùng]

---

### **1. TRẠNG THÁI CÁC NHIỆM VỤ**

-   [ ] **Nhiệm vụ 1:** Thiết lập Cấu trúc Thư mục `adapter`.
-   [ ] **Nhiệm vụ 2:** Triển khai Adapter cho `react`.
-   [ ] **Nhiệm vụ 3:** Triển khai Adapter cho `styled-components`.
-   [ ] **Nhiệm vụ 4:** Triển khai Adapter cho `react-dom/client`.
-   [ ] **Nhiệm vụ 5:** Tái cấu trúc (Refactor) Codebase để Sử dụng Adapter.

### **2. GHI CHÚ THÊM (NẾU CÓ)**

* *(Điền các ghi chú, khó khăn hoặc các điểm cần lưu ý trong quá trình thực hiện).*

```