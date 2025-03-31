'use client';

import React, { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { X } from 'lucide-react';
import { useTheme } from 'next-themes';
import ReactDOM from 'react-dom';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  closeButtonClassName?: string;
  footer?: ReactNode;
};

export const ModalFooter: React.FC<{
  className?: string;
  children: ReactNode;
}> = ({ className, children }) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 border-t-4 border-border p-4',
      className
    )}
  >
    {children}
  </div>
);

export const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);

export const ModalTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h2 className={cn('text-lg font-heading leading-none tracking-tight', className)} {...props} />
);

export const ModalDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => <p className={cn('text-sm font-base text-text', className)} {...props} />;

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  overlayClassName,
  contentClassName,
  footer,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();
  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('.modal-handle')) {
        setIsDragging(true);
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      }
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  if (!isVisible && !isOpen) return null;

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-overlay backdrop-blur-[2px] transition-all duration-300 ease-out',
        isOpen
          ? 'opacity-100 data-[state=open]:animate-in data-[state=open]:fade-in-0'
          : 'opacity-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        {
          dark: isDarkTheme,
          light: !isDarkTheme,
        },
        overlayClassName
      )}
    >
      <div
        ref={modalRef}
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4',
          'rounded-base border-2 border-border bg-bg shadow-shadow',
          'transform transition-all duration-300 flex flex-col',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          className
        )}
        style={{
          transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
      >
        {title && (
          <div className="p-4 border-b-4 border-border z-10 flex justify-between items-center modal-handle cursor-move">
            <h2 className="text-lg font-heading leading-none tracking-tight">{title}</h2>
            <Button className="h-8 w-8" onClick={onClose}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        )}
        <div className={cn('flex-grow overflow-y-auto', contentClassName)}>
          <div className="p-4 py-0">{children || <></>}</div>
        </div>
        {footer && <div className="z-[1]">{footer}</div>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
