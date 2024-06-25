// Button.tsx

import React from 'react';
import { ButtonProps } from './type';

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  type = 'button',
  size = 'small',
  isLoading,
  leftIcon,
  rightIcon,
  className,
  hidden,
  bg,
  style,
  color
}) => {
  const baseClasses = `px-3 py-1.5 rounded min-w-[80px] flex items-center justify-center relative `;

  const sizeClasses = {
    small: 'text-xs',
    medium: 'text-base',
    large: 'text-lg',
  };

  const classes = `${baseClasses} ${sizeClasses[size]}
    ${className}
    ${hidden ? 'hidden' : ''}
    ${disabled ? ' opacity-50 cursor-not-allowed' : ''}
    ${isLoading ? ' transform-none opacity-80 cursor-not-allowed' : ''}
    `;
  const childrenClasses = `w-full flex items-center justify-center duration-[500ms,800ms]
  ${
    isLoading
      ? 'transform opacity-0 translate-y-full duration-300 ease-in-out'
      : ''
  }
  `;
  const loadingClasses = `absolute duration-[500ms,800ms]
  ${
    !isLoading
      ? 'transform opacity-0 translate-y-full duration-300 ease-in-out  '
      : ''
  }
  `;
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      style={{
        color,
        ...style,
        backgroundColor: bg,
      }}
    >
      <span className={loadingClasses}>
        {isLoading && (
          <span className="block w-4 h-4 border-2 border-t-transparent  rounded-full animate-spin " />
        )}
      </span>

      <span className={childrenClasses}>
        {leftIcon && (
          <span className="mr-1 w-4 h-4 flex items-center justify-center transition-opacity">
            {leftIcon}
          </span>
        )}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </span>
    </button>
  );
};

export default Button;
