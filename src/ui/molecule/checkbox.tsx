import { style, state, effect } from '@/adapter';
import { theme } from '@/core/theme';
import type { FC } from '@/adapter';
import { Icon } from '@/ui/atom/icon';

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

const Box = style('div')<{ checked: boolean; disabled?: boolean }>`
    width: 16px;
    height: 16px;
    border: 1px solid ${({ checked, disabled }) => 
        disabled ? theme.color.neutral[300] : 
        checked ? theme.color.primary[100] : theme.color.neutral[300]
    };
    background: ${({ checked, disabled }) => 
        disabled ? theme.color.neutral[100] : 
        checked ? theme.color.primary[100] : 'white'
    };
    border-radius: ${theme.radius.small};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 150ms;
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

const Wrapper = style('label')<{ disabled?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: ${theme.space[2]};
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
`;

interface Props {
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<Props> = ({ label, checked, defaultChecked, disabled, onChange, ...rest }) => {
    const [isChecked, setIsChecked] = state(defaultChecked || false);
    
    effect(() => {
        if (checked !== undefined) {
            setIsChecked(checked);
        }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (checked === undefined) {
            setIsChecked(e.target.checked);
        }
        onChange?.(e);
    };

    const currentChecked = checked !== undefined ? checked : isChecked;

    return (
        <Wrapper disabled={disabled}>
            <Hidden 
                checked={checked !== undefined ? checked : undefined}
                defaultChecked={checked === undefined ? defaultChecked : undefined}
                disabled={disabled}
                onChange={handleChange}
                {...rest} 
            />
            <Box checked={currentChecked} disabled={disabled}>
                {currentChecked && !disabled && <Icon kind="line" name="check" size={12} color="white" />}
            </Box>
            {label && <span>{label}</span>}
        </Wrapper>
    );
}; 