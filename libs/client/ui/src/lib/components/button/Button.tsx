import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

export interface ButtonProps extends PropsWithChildren {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'large' | 'small';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'large',
  disabled = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <>
      <button
        disabled={disabled}
        className={classNames(`size--${size}`, `variant--${variant}`)}
        onClick={onClick}
      >
        {children}
      </button>

      <style jsx>{`
        button {
          display: flex;
          height: min-content;
          align-items: center;
          justify-content: center;
          transition: background-color 0.1s ease-in;
          color: var(--color-white);
          padding: 12px 30px;
          appearance: none;
          border: none;
          outline: none;
          background-color: transparent;
          cursor: pointer;

          &:disabled {
            opacity: 0.5;
          }
        }

        .size {
          &--large {
            min-height: 48px;
            font-size: var(--text-md);
            border-radius: 24px;
          }

          &--small {
            font-size: var(--text-body);
            border-radius: var(--radius-button-sm);
          }
        }

        .variant {
          &--primary {
            background-color: var(--color-purple);
          }

          &--primary:not(:disabled):hover {
            background-color: var(--color-purple-hover);
          }

          &--secondary {
            background: rgba(99, 95, 199, 0.1);
            color: var(--color-purple);
          }

          &--secondary:not(:disabled):hover {
            background: rgba(99, 95, 199, 0.25);
          }

          &--danger {
            background-color: var(--color-red);
          }

          &--danger:hover {
            background-color: var(--color-red-hover);
          }
        }
      `}</style>
    </>
  );
};
