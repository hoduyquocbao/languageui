# LanguageUI Project

## 1. Tổng quan

Dự án này tuân thủ các nguyên tắc kiến trúc nghiêm ngặt dưới sự giám sát của Guardian (Kiến trúc sư hệ thống). Mục tiêu là xây dựng một giao diện người dùng có cấu trúc thanh lịch, hiệu suất cao và dễ bảo trì.

## 2. Vai trò

-   **Guardian**: Chịu trách nhiệm về kiến trúc tổng thể, các quyết định thiết kế, quy tắc đặt tên, phân chia module và quản lý các file PKB (`architecture.csv`, `memories.csv`, `todo.csv`).
-   **Coder**: Chịu trách nhiệm triển khai (implement) mã nguồn tuân thủ nghiêm ngặt theo các chỉ dẫn và kiến trúc do Guardian đề ra.

## 3. Quy trình Giao tiếp qua Git

Giao tiếp giữa Guardian và Coder được thực hiện **DUY NHẤT** thông qua các commit trong Git.

### 3.1. Luồng công việc

1.  **Guardian Giao việc**: Guardian sẽ tạo hoặc cập nhật các file PKB (`.csv`) để định nghĩa công việc và kiến trúc. Commit sẽ có định dạng: `Guardian: SET TASK <Mô tả ngắn>`.
2.  **Coder Nhận việc**: Coder thực hiện `git pull` để nhận các nhiệm vụ mới từ `todo.csv`.
3.  **Coder Thực thi**: Coder viết code để hoàn thành nhiệm vụ được mô tả trong `todo.csv`.
4.  **Coder Báo cáo**: Sau khi hoàn thành, Coder cập nhật cột `Status` trong `todo.csv` thành `Done` và commit toàn bộ thay đổi (cả code và file `todo.csv` đã cập nhật) với định dạng: `Coder: IMPL <Mô tả ngắn về việc đã làm>`.
5.  **Guardian Đánh giá**: Guardian sẽ review commit của Coder. Nếu có phản hồi, Guardian sẽ tạo một task mới trong `todo.csv` và lặp lại chu trình.

### 4. Nguyên tắc Bắt buộc

1.  **Kiến trúc PKB-first**: Luôn đọc các file `.csv` trước khi code. `todo.csv` là nguồn công việc duy nhất. `architecture.csv` là bản thiết kế phải tuân theo. `memories.csv` là nhật ký quyết định cần tham khảo.
2.  **Đặt tên Đơn từ**: Toàn bộ định danh (biến, hàm, component, file, folder...) phải là **MỘT TỪ TIẾNG ANH**. Quy tắc này áp dụng cho cả cấu trúc thư mục. Vi phạm sẽ bị từ chối trong quá trình review. Tham khảo các kỹ thuật phân rã trong `README.md` gốc để tuân thủ.
3.  **Cấu trúc Thư mục Phản ánh Kiến trúc**: Cấu trúc thư mục phải tuân theo sự phân chia `Module` và `Context` đã được định nghĩa trong `architecture.csv`.

**NHIỆM VỤ HIỆN TẠI CỦA BẠN (CODER): ĐỌC FILE `todo.csv` VÀ THỰC HIỆN.**