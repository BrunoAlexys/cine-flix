import classNames from 'classnames';
import './input.css';

interface InputProps {
    className?: string;
    type: 'text' | 'password' | 'email' | 'number' | 'search' | 'submit' | 'reset' | 'tel' | 'url';
    placeholder?: string;
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void; 
}


export const Input = ({ className, type, placeholder, value, onChange, onClick, onKeyDown }: InputProps) => {
    
    const defaultClass = 'input-defult';

    return (
        <input 
            className={classNames(defaultClass, className)}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onClick={onClick}
            onKeyDown={onKeyDown}
        />
    );
}