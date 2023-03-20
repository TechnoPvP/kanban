/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import React, {
  Children,
  createContext,
  FC,
  forwardRef,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useClickOutside } from '../../hooks/click-outside.hook';
import { TextInput } from '../input/TextInput';

export interface SelectProps extends PropsWithChildren {
  name: string;
  defaultValue?: any;
  value: any;
  onChange?: (value: any) => void;
}

export interface SelectContextParams {
  setValue?: (value: any, label: string) => any;
  value: any;
  defaultValue?: any;
  label?: string;
}

export const SelectContext = createContext<SelectContextParams>({
  value: undefined,
  label: undefined,
});

export const Select = forwardRef<HTMLInputElement, SelectProps>(
  ({ children, name, defaultValue, onChange, value, ...props }, ref) => {
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>();
    const [stateValue, setValue] = useState(undefined);
    const [label, setLabel] = useState<string | undefined>(undefined);
    const selectRef = useRef<HTMLDivElement>(null);

    useClickOutside(selectRef.current, () => {
      setIsSelectOpen(false);
    });

    return (
      <>
        <div className="select-container" ref={selectRef}>
          <TextInput
            ref={ref}
            onClick={() => setIsSelectOpen((open) => !open)}
            name={name}
            label="Status"
            placeholder="Select status"
            value={label || ''}
            readOnly
            cursor="default"
          />
          <SelectContext.Provider
            value={{
              value: value,
              defaultValue: value,
              setValue: (value, label) => {
                setValue(value);
                setLabel(label);
                onChange && onChange(value);
                setIsSelectOpen(false);
              },
            }}
          >
            <div
              className={classNames('options-wrapper', isSelectOpen && 'open')}
            >
              {children}
            </div>
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
            cursor: default;

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
            display: none;

            &.open {
              display: block;
            }
          }
        `}</style>
      </>
    );
  }
);
