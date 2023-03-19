import React, { FC } from 'react';

export interface OverlayProps {
  zIndex?: number;
  onClick?: () => void;
}

export const Overlay: FC<OverlayProps> = ({ zIndex = 10, ...props }) => {
  return (
    <>
      <div className="overlay" onClick={props?.onClick}></div>

      <style jsx>{`
        .overlay {
          width: 100%;
          height: 100%;
          position: fixed;
          top: 0;
          left: 0;
          z-index: ${zIndex};
          background: #000000;
          mix-blend-mode: normal;
          opacity: 0.5;
        }
      `}</style>
    </>
  );
};
