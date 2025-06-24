import { style } from '@/adapter';
import type { FC, Node } from '@/adapter';
import { theme } from '@/core/theme';

const utility = style.utility;

/**
 * @fileoverview
 * Đây là component Button nguyên tử, xây dựng bằng style adapter và sử dụng token từ theme.
 * Hỗ trợ nhiều biến thể (variant), kích thước (size) và trạng thái (state).
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
// Map các style cho từng variant để tách logic style khỏi component chính.
const variants = {
    primary: utility`
        background: ${theme.color.primary[100]};
        color: ${theme.color.neutral[100]};
        border: 1px solid ${theme.color.primary[200]};

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
 * Component styled chính cho button.
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

    /* Style theo size */
    ${({ size = 'medium' }) => {
        switch (size) {
            case 'small':
                return utility`
                    padding: ${theme.space[1]} ${theme.space[2]};
                    font-size: ${theme.typography.size.body};
                `;
            case 'medium':
            default:
                return utility`
                    padding: ${theme.space[2]} ${theme.space[4]};
                    font-size: ${theme.typography.size.body};
                `;
        }
    }}

    /* Style theo variant */
    ${({ variant = 'primary' }) => variants[variant]}

    /* Style disabled */
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

/** Container cho nội dung chính của button */
const Content = style('span')`
    display: inline-block;
`;

/** Container cho prefix/suffix icon */
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