import React, { FC, PropsWithChildren } from 'react';
import { Overlay } from '../overlay/Overlay';

export interface ModalProps extends PropsWithChildren {
  width: number;
  height: number;
}

export const Modal: FC<ModalProps> = ({
  width = '400px',
  height = '400px',
  ...props
}) => {
  return (
    <>
      <Overlay />

      <aside className="modal" style={{ width: width, height: height }}></aside>

      <style jsx>{`
        .modal {
          background-color: var(--color-white);
          max-width: 95%;
          z-index: 20;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 6px;
          padding: 32px;
        }
      `}</style>
    </>
  );
};
