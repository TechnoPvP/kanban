import classNames from 'classnames';
import React, { FC, PropsWithChildren, useContext, useEffect } from 'react';
import { SelectContext, SelectContextParams } from './Select';

export interface OptionProps extends PropsWithChildren {
  value: any;
  selected?: boolean;
  label?: string;
  onChange?: () => void;
}

export const Option: FC<OptionProps> = ({
  children,
  value,
  label,
  ...props
}) => {
  const selectContext = useContext(SelectContext);

  const handleOptionClick = () => {
    if (selectContext?.setValue)
      selectContext.setValue(
        value,
        label || typeof children === 'string' ? children : value
      );
  };

  useEffect(() => {
    if (value === selectContext.value) {
      selectContext.setValue &&
        selectContext.setValue(
          value,
          label || typeof children === 'string' ? children : value
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <option
        value={value}
        onClick={handleOptionClick}
        className={classNames(
          'option',
          selectContext.value === value && 'selected'
        )}
      >
        {children}
      </option>

      <style jsx>{`
        option {
          appearance: none;
          cursor: pointer;
          padding: 8px;
          transition: background-color 0.16s ease-out;

          &.selected {
            background-color: #3c36b52d;
          }

          &:not(.selected):hover {
            background-color: var(--color-light-gray);
          }
        }
      `}</style>
    </>
  );
};
