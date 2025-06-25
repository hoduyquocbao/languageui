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