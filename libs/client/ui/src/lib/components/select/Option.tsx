import React, { FC, PropsWithChildren, useContext } from 'react';
import { SelectContext, SelectContextParams } from './Select';

export interface OptionProps extends PropsWithChildren {
  value: any;
}

export const Option: FC<OptionProps> = ({ children, value, ...props }) => {
  const selectContext = useContext(SelectContext);

  const handleOptionClick = () => {
    if (selectContext?.setValue) selectContext.setValue(value);
  };

  return (
    <>
      <option value={value} onClick={handleOptionClick}>
        {children}
      </option>

      <style jsx>{`
        option {
          appearance: none;
          cursor: pointer;
          padding: 8px;
          transition: background-color 0.16s ease-out;

          &:hover {
            background-color: var(--color-light-gray);
          }
        }
      `}</style>
    </>
  );
};
