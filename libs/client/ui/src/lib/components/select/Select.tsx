/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Children,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useRef,
  useState,
} from 'react';
import { useClickOutside } from '../../hooks/click-outside.hook';

export interface SelectProps extends PropsWithChildren {
  name: string;
  onChange?: (value: any) => void;
}

export interface SelectContextParams {
  setValue?: (value: any) => any;
  value: any;
}

export const SelectContext = createContext<SelectContextParams>({
  value: undefined,
});

export const Select: FC<SelectProps> = ({
  children,
  name,
  onChange,
  ...props
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>();
  const [value, setValue] = useState(undefined);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef.current, () => {
    setIsSelectOpen(false);
  });

  return (
    <>
      <div className="select-container" ref={selectRef}>
        <input type="text" readOnly value={value || ''} />
        <select value={value}>{children}</select>

        <SelectContext.Provider
          value={{
            value: undefined,
            setValue: (value) => {
              setValue(value);
              onChange && onChange(value);
            },
          }}
        >
          {isSelectOpen && <div className="options-wrapper">{children}</div>}
        </SelectContext.Provider>
      </div>

      <style jsx>{`
        .select-container {
          position: relative;
        }

        select {
          appearance: none;
          outline: none;
          border: 1px solid rgba(130, 143, 163, 0.25);
          border-radius: 4px;
          visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        input {
          position: relative;
          appearance: none;
          width: 100%;
          outline: none;
          border: 1px solid rgba(130, 143, 163, 0.25);
          border-radius: 4px;
          z-index: 5;
          padding: 8px 16px;

          &:focus {
            border: 1px solid #635fc7;
          }
        }

        .options-wrapper {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          transform: translateY(101%);
          z-index: 5;
          background-color: var(--color-white);
          box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};
