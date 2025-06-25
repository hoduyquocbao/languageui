import { style } from '@/adapter';
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

const Box = style('div')<{ checked: boolean }>`
    width: 16px;
    height: 16px;
    border: 1px solid ${({ checked }) => (checked ? theme.color.primary[100] : theme.color.neutral[300])};
    background: ${({ checked }) => (checked ? theme.color.primary[100] : 'white')};
    border-radius: ${theme.radius.small};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 150ms;
`;

const Wrapper = style('label')`
    display: inline-flex;
    align-items: center;
    gap: ${theme.space[2]};
    cursor: pointer;
`;

interface Props {
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<Props> = ({ label, checked, defaultChecked, disabled, onChange, ...rest }) => (
    <Wrapper>
        <Hidden 
            checked={checked} 
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={onChange}
            {...rest} 
        />
        <Box checked={!!checked}>
            {checked && <Icon kind="line" name="check" size={12} color="white" />}
        </Box>
        {label && <span>{label}</span>}
    </Wrapper>
); 