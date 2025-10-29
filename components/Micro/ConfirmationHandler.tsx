import React from 'react';

import { createRoot } from 'react-dom/client';

import { Button } from '../ui/button';

import Modal, { ModalFooter } from './Modal';

// Type for the configuration object
type ConfirmModalConfig = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  contentClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
};

// The wrapper function that creates the confirmation handler
const createConfirmationHandler = <T extends (...args: any[]) => any>(
  callback: T,
  config: ConfirmModalConfig
) => {
  // Return a new function that matches the original function's parameters
  return (...args: Parameters<T>): void => {
    const ConfirmationModal = () => {
      const [isOpen, setIsOpen] = React.useState(true);

      const handleConfirm = () => {
        callback(...args);
        setIsOpen(false);
      };

      const handleClose = () => {
        setIsOpen(false);
      };

      // Cleanup effect
      React.useEffect(() => {
        if (!isOpen) {
          // Give time for the close animation to finish
          const timer = setTimeout(() => {
            if (modalRoot) {
              root.unmount();
              modalRoot.remove();
            }
          }, 300);
          return () => clearTimeout(timer);
        }
      }, [isOpen]);

      const footer = (
        <ModalFooter className="flex md:justify-end gap-2">
          <Button className={config.cancelButtonClassName} onClick={handleClose}>
            {config.cancelText || 'Cancel'}
          </Button>
          <Button className={config.confirmButtonClassName} onClick={handleConfirm}>
            {config.confirmText || 'Confirm'}
          </Button>
        </ModalFooter>
      );

      return (
        <Modal
          className={config.className || 'max-w-md mx-auto'}
          contentClassName={config.contentClassName}
          footer={footer}
          isOpen={isOpen}
          overlayClassName="z-[100]"
          title={config.title}
          onClose={handleClose}
        >
          {config.description && (
            <p
              dangerouslySetInnerHTML={{
                __html: config.description.replace(/\n/g, '<br />'),
              }}
            ></p>
          )}
        </Modal>
      );
    };

    // Create a root element and render the modal
    const modalRoot = document.createElement('div');
    document.body.appendChild(modalRoot);
    const root = createRoot(modalRoot);
    root.render(<ConfirmationModal />);
  };
};

export default createConfirmationHandler;
