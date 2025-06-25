import { style } from '@/adapter';
import { theme } from '@/core/theme';
import type { FC } from '@/adapter';
import { useState, useEffect } from 'react';

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

const Track = style('div')<{ checked: boolean; disabled?: boolean }>`
    width: 32px;
    height: 16px;
    background: ${({ checked, disabled }) => 
        disabled ? theme.color.neutral[200] : 
        checked ? theme.color.primary[100] : theme.color.neutral[300]
    };
    border-radius: 16px;
    position: relative;
    transition: background 150ms;
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

const Thumb = style('div')<{ checked: boolean; disabled?: boolean }>`
    position: absolute;
    top: 2px;
    left: ${({ checked }) => (checked ? '16px' : '2px')};
    width: 12px;
    height: 12px;
    background: ${({ disabled }) => disabled ? theme.color.neutral[300] : 'white'};
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
    transition: left 150ms;
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

export const Toggle: FC<Props> = ({ label, checked, disabled, ...rest }) => {
    const [isChecked, setIsChecked] = useState(false);
    
    useEffect(() => {
        if (checked !== undefined) {
            setIsChecked(checked);
        }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (checked === undefined) {
            setIsChecked(e.target.checked);
        }
        rest.onChange?.(e);
    };

    const currentChecked = checked !== undefined ? checked : isChecked;

    return (
        <Wrapper disabled={disabled}>
            <Hidden checked={currentChecked} disabled={disabled} onChange={handleChange} {...rest} />
            <Track checked={currentChecked} disabled={disabled}>
                <Thumb checked={currentChecked} disabled={disabled} />
            </Track>
            {label && <span>{label}</span>}
        </Wrapper>
    );
}; 