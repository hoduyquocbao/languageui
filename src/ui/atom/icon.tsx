import { lazy, Suspense } from '@/adapter';
import type { FC, SVG } from '@/adapter';

/**
 * Dynamically loads and renders SVG icons.
 * The `icons` object maps a single-word `name` to a dynamically imported SVG.
 * This uses React.lazy to ensure icons are only loaded when needed.
 */
const icons = {
    file: lazy(() => import('@/assets/icons/file.svg?react')),
    pdf: lazy(() => import('@/assets/icons/pdf.svg?react')),
    zip: lazy(() => import('@/assets/icons/zip.svg?react')),
    code: lazy(() => import('@/assets/icons/code.svg?react')),
    ppt: lazy(() => import('@/assets/icons/ppt.svg?react')),
    csv: lazy(() => import('@/assets/icons/csv.svg?react')),
    image: lazy(() => import('@/assets/icons/image.svg?react')),
    shape: lazy(() => import('@/assets/icons/shape.svg?react')),
    search: lazy(() => import('@/assets/icons/search.svg?react')),
    arrow: lazy(() => import('@/assets/icons/arrow.svg?react')),
};

/**
 * The props for the Icon component.
 * It extends standard SVG props.
 * 'name' is the single-word identifier for the icon to display.
 */
interface Props extends SVG<SVGSVGElement> {
    name: keyof typeof icons;
    size?: number;
}

/**
 * A component to render an SVG icon.
 * It looks up the icon component by its `name` and renders it,
 * wrapped in a `Suspense` component to handle the dynamic loading.
 */
export const Icon: FC<Props> = ({ name, size = 24, ...props }) => {
    const Component = icons[name];

    if (!Component) {
        return null;
    }

    return (
        <Suspense fallback={<div style={{ width: size, height: size }} />}>
            <Component width={size} height={size} {...props} />
        </Suspense>
    );
};
