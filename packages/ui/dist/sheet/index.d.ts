import * as class_variance_authority_types from 'class-variance-authority/types';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VariantProps } from 'class-variance-authority';

declare const Sheet: React.FC<DialogPrimitive.DialogProps>;
declare const SheetTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const SheetPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare function SheetOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.JSX.Element;
declare namespace SheetOverlay {
    var displayName: string | undefined;
}
declare const sheetVariants: (props?: ({
    side?: "top" | "bottom" | "left" | "right" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SheetContentProps extends React.ComponentProps<typeof DialogPrimitive.Content>, VariantProps<typeof sheetVariants> {
}
declare function SheetContent({ side, className, children, ...props }: SheetContentProps): React.JSX.Element;
declare namespace SheetContent {
    var displayName: string | undefined;
}
declare function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare namespace SheetHeader {
    var displayName: string;
}
declare function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element;
declare namespace SheetFooter {
    var displayName: string;
}
declare function SheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): React.JSX.Element;
declare namespace SheetTitle {
    var displayName: string | undefined;
}
declare function SheetDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): React.JSX.Element;
declare namespace SheetDescription {
    var displayName: string | undefined;
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger };
