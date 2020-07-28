import React from 'react';
import { Portal } from '../Portal';
import { BackDrop } from './BackDrop';
import { UseDialogProps, useDialog } from './use-dialog';

type Props = Partial<UseDialogProps>;

export const Dialog: React.FC<Props> = ({
  isOpen = false,
  onDismiss = () => undefined,
  children,
  enableAutoFocus = true,
  hasBackDrop = true,
  preventScroll = true,
}) => {
  const domRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLElement | null>(null);
  const { style, handleBackDropClick } = useDialog(
    { isOpen, onDismiss, enableAutoFocus, preventScroll, hasBackDrop },
    { content: contentRef.current },
  );

  React.useEffect(() => {
    if (isOpen && domRef.current) {
      contentRef.current = domRef.current.firstElementChild as HTMLElement | null;
    }
  }, [isOpen]);

  return (
    <Portal>
      {isOpen && (
        <div ref={domRef} className="fixed inset-0 flex items-center justify-center z-50" style={style}>
          {children}
          {hasBackDrop && <BackDrop onClick={handleBackDropClick} />}
        </div>
      )}
    </Portal>
  );
};
