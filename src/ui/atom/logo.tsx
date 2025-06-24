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