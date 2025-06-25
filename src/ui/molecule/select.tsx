import { style } from '@/adapter';
import { theme } from '@/core/theme';
import type { FC, Node } from '@/adapter';
import { Icon } from '@/ui/atom/icon';

const Wrapper = style('div')`
    position: relative;
    width: 100%;
`;

const Element = style('select')`
    appearance: none;
    width: 100%;
    border: 1px solid ${theme.color.border.medium};
    background: ${theme.color.neutral[100]};
    border-radius: ${theme.radius.medium};
    padding: ${theme.space[2]} ${theme.space[4]} ${theme.space[2]} ${theme.space[3]};
    font-size: ${theme.typography.size.body};
    color: ${theme.color.neutral[800]};
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
        outline: none;
        border-color: ${theme.color.primary[100]};
        box-shadow: 0 0 0 2px ${theme.color.secondary[200]};
    }
    &:disabled {
        background: ${theme.color.neutral[200]};
        cursor: not-allowed;
    }
`;

const Chevron = style(Icon)`
    position: absolute;
    right: ${theme.space[2]};
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
`;

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    children: Node;
}

export const Select: FC<Props> = ({ children, ...rest }) => (
    <Wrapper>
        <Element {...rest}>{children}</Element>
        <Chevron kind="line" name="chevron-down" size={16} />
    </Wrapper>
); 