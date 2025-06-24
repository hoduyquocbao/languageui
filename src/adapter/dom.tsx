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