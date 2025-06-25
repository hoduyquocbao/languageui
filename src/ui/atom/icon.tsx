import { lazy, Suspense } from '@/adapter';
import type { FC, SVG } from '@/adapter';

/**
 * Maps icon kinds to their respective collections of dynamically imported SVGs.
 * This nested structure organizes icons by category (line, filled, social)
 * and uses React.lazy for performance-optimal code-splitting.
 */
const icons = {
    line: {
        up: lazy(() => import('@/assets/icons/line/up.svg?react')),
        down: lazy(() => import('@/assets/icons/line/down.svg?react')),
        right: lazy(() => import('@/assets/icons/line/right.svg?react')),
        left: lazy(() => import('@/assets/icons/line/left.svg?react')),
        'up-right': lazy(() => import('@/assets/icons/line/up-right.svg?react')),
        'down-right': lazy(() => import('@/assets/icons/line/down-right.svg?react')),
        'up-left': lazy(() => import('@/assets/icons/line/up-left.svg?react')),
        'down-left': lazy(() => import('@/assets/icons/line/down-left.svg?react')),
        transfer: lazy(() => import('@/assets/icons/line/transfer.svg?react')),
        arrow: lazy(() => import('@/assets/icons/line/arrow.svg?react')),
        search: lazy(() => import('@/assets/icons/line/search.svg?react')),
        'chevron-down': lazy(() => import('@/assets/icons/line/chevron-down.svg?react')),
        check: lazy(() => import('@/assets/icons/line/check.svg?react')),
    },
    filled: {
        file: lazy(() => import('@/assets/icons/filled/file.svg?react')),
        pdf: lazy(() => import('@/assets/icons/filled/pdf.svg?react')),
        zip: lazy(() => import('@/assets/icons/filled/zip.svg?react')),
        code: lazy(() => import('@/assets/icons/filled/code.svg?react')),
        ppt: lazy(() => import('@/assets/icons/filled/ppt.svg?react')),
        csv: lazy(() => import('@/assets/icons/filled/csv.svg?react')),
        image: lazy(() => import('@/assets/icons/filled/image.svg?react')),
        shape: lazy(() => import('@/assets/icons/filled/shape.svg?react')),
        settings: lazy(() => import('@/assets/icons/filled/settings.svg?react')),
        info: lazy(() => import('@/assets/icons/filled/info.svg?react')),
        check: lazy(() => import('@/assets/icons/filled/check.svg?react')),
    },
    social: {
        facebook: lazy(() => import('@/assets/icons/social/facebook.svg?react')),
        twitter: lazy(() => import('@/assets/icons/social/twitter.svg?react')),
        google: lazy(() => import('@/assets/icons/social/google.svg?react')),
        calendar: lazy(() => import('@/assets/icons/social/calendar.svg?react')),
    },
};

// A generic props interface to ensure the `name` prop corresponds to the `kind` prop.
// Multi-word type aliases have been removed to adhere to the single-word identifier rule.
type Props =
    | { kind: 'line'; name: keyof typeof icons.line; size?: number } & SVG<SVGSVGElement>
    | { kind: 'filled'; name: keyof typeof icons.filled; size?: number } & SVG<SVGSVGElement>
    | { kind: 'social'; name: keyof typeof icons.social; size?: number } & SVG<SVGSVGElement>;


/**
 * A component to render an SVG icon.
 * It looks up the icon component by its `kind` and `name` and renders it,
 * wrapped in a `Suspense` component to handle the dynamic loading.
 */
export const Icon: FC<Props> = ({ kind, name, size = 24, ...props }) => {
    // Type assertion to handle the nested structure properly
    const iconCollection = icons[kind] as Record<string, any>;
    const Component = iconCollection?.[name];

    if (!Component) {
        return null;
    }

    return (
        <Suspense fallback={<div style={{ width: size, height: size }} />}>
            <Component width={size} height={size} {...props} />
        </Suspense>
    );
};

// Exporting the icon map for use in the Showcase. This is a pragmatic choice for now.
export { icons };
