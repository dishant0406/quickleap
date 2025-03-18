'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'border-1 relative box-border block h-[1rem] w-[1rem] cursor-pointer appearance-none rounded-sm border-[#d9d9d9] bg-slate-200 transition-all duration-300',
          'before:absolute before:left-2/4 before:top-[42%] before:h-[10px] before:w-[6px]',
          'before:-translate-x-2/4 before:-translate-y-2/4 before:rotate-45 before:scale-0',
          'before:border-b-2 before:border-r-2 before:border-solid before:border-b-white before:border-r-white',
          "before:opacity-0 before:transition-all before:delay-100 before:duration-100 before:ease-in before:content-['']",
          'after:absolute after:inset-0 after:rounded-[7px] after:opacity-0',
          "after:shadow-[0_0_0_calc(30px_/_2.5)_#1677ff] after:transition-all after:duration-500 after:ease-in after:content-['']",
          'checked:border-transparent checked:bg-[#1677ff]',
          'checked:before:-translate-x-2/4 checked:before:-translate-y-2/4',
          'checked:before:rotate-45 checked:before:scale-x-[1] checked:before:scale-y-[1]',
          'checked:before:opacity-100 checked:before:transition-all checked:before:delay-100 checked:before:duration-200',
          'hover:border-[#1677ff] focus:outline-[#1677ff]',
          '[&:active:not(:checked)]:after:opacity-100 [&:active:not(:checked)]:after:shadow-none [&:active:not(:checked)]:after:transition-none',
          className
        )}
        type="checkbox"
        {...props}
      />
    );
  }
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
