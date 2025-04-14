import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';

declare const Popover: React.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React.FC<React.ComponentProps<typeof PopoverPrimitive.Content>>;

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
