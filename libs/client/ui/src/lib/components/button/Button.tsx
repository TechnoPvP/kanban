import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

export interface ButtonProps extends PropsWithChildren {
  color?: 'red' | 'purple';
  size?: 'large' | 'small';
}

export const Button: FC<ButtonProps> = ({
  color = 'purple',
  size = 'large',
  children,
  ...props
}) => {
  return (
    <>
      <button className={classNames(`size--${size}`, `color--${color}`)}>
        {children}
      </button>

      {/* <style jsx>{`

      `}</style> */}
    </>
  );
};
