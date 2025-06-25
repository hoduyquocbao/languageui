import { style } from '@/adapter';
import { theme } from '@/core/theme';
import type { FC } from '@/adapter';

const Hidden = style('input').attrs({ type: 'radio' })`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

const Styled = style('div')<{ checked: boolean; disabled?: boolean }>`
    display: inline-block;
    width: 16px;
    height: 16px;
    background: ${({ checked, disabled }) => 
        disabled ? theme.color.neutral[100] : 
        checked ? theme.color.primary[100] : theme.color.neutral[100]
    };
    border: 1px solid ${({ checked, disabled }) => 
        disabled ? theme.color.neutral[300] : 
        checked ? theme.color.primary[100] : theme.color.border.medium
    };
    border-radius: 50%;
    transition: all 150ms;
    position: relative;
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};

    ${Hidden}:focus + & {
        box-shadow: 0 0 0 2px ${theme.color.secondary[200]};
    }

    &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
        opacity: ${({ checked, disabled }) => 
            disabled ? 0.3 : 
            checked ? 1 : 0
        };
        transition: opacity 150ms;
    }
`;

const Wrapper = style('label')<{ disabled?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: ${theme.space[2]};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Radio: FC<Props> = ({ label, checked, disabled, ...rest }) => {
    return (
        <Wrapper disabled={disabled}>
            <Hidden checked={checked} disabled={disabled} {...rest} />
            <Styled checked={!!checked} disabled={disabled} />
            {label && <span>{label}</span>}
        </Wrapper>
    );
}; 