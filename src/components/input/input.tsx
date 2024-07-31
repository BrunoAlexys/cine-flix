import classNames from 'classnames';
import './input.css';

interface InputProps {
    className?: string;
    type: string;
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ className, type, placeholder, value, onChange }: InputProps) => {
    
    const defaultClass = 'input-defult';

    return (
        <input 
            className={classNames(defaultClass, className)}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
}