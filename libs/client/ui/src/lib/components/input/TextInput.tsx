import classNames from 'classnames';
import React, { CSSProperties, FC, forwardRef, PropsWithRef } from 'react';

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  name: string;
  error?: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  cursor?: CSSProperties['cursor'];
  onBlur?: () => void;
  onClick?: () => void;
  onChange?: (value: string) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      fullWidth = true,
      readOnly = false,
      label,
      placeholder,
      value,
      name,
      error,
      cursor = "text",
      onChange,
      onBlur,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <div
          className={classNames(
            'input-container',
            fullWidth && 'input--full-width'
          )}
          onClick={onClick}
        >
          {label && <label htmlFor="">{label}</label>}

          <input
            ref={ref}
            className={classNames('input', error && 'input--error')}
            type="text"
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            name={name}
            onChange={({ target }) => onChange && onChange(target.value)}
            onBlur={onBlur}
          />
        </div>

        <style jsx>{`
          .input-container {
            display: inline-flex;
            flex-direction: column;
            gap: 4px;
          }

          label {
            color: var(--color-md-gray);
            font-weight: var(--fw-bold);
            font-size: var(--text-md);
          }

          .input {
            appearance: none;
            outline: none;
            border: 1px solid rgba(130, 143, 163, 0.25);
            border-radius: 4px;
            padding: 8px 16px;
            color: var(--color-black);
            cursor: ${cursor};

            &--error {
              border: 1px solid var(--color-red);
            }

            &::placeholder {
              opacity: 0.25;
            }
          }

          .input--full-width {
            width: 100%;
          }
        `}</style>
      </>
    );
  }
);
