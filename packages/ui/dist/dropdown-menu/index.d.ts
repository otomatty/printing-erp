import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

declare const DropdownMenu: React.FC<DropdownMenuPrimitive.DropdownMenuProps>;
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DropdownMenuGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const DropdownMenuPortal: React.FC<DropdownMenuPrimitive.DropdownMenuPortalProps>;
declare const DropdownMenuSub: React.FC<DropdownMenuPrimitive.DropdownMenuSubProps>;
declare const DropdownMenuRadioGroup: React.ForwardRefExoticComponent<DropdownMenuPrimitive.DropdownMenuRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuSubTriggerProps extends React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> {
    inset?: boolean;
}
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuSubTriggerProps): React.JSX.Element;
declare namespace DropdownMenuSubTrigger {
    var displayName: string | undefined;
}
interface DropdownMenuSubContentProps extends React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> {
}
declare function DropdownMenuSubContent({ className, ...props }: DropdownMenuSubContentProps): React.JSX.Element;
declare namespace DropdownMenuSubContent {
    var displayName: string | undefined;
}
interface DropdownMenuContentProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Content> {
    sideOffset?: number;
}
declare function DropdownMenuContent({ className, sideOffset, ...props }: DropdownMenuContentProps): React.JSX.Element;
declare namespace DropdownMenuContent {
    var displayName: string | undefined;
}
interface DropdownMenuItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
    inset?: boolean;
}
declare function DropdownMenuItem({ className, inset, ...props }: DropdownMenuItemProps): React.JSX.Element;
declare namespace DropdownMenuItem {
    var displayName: string | undefined;
}
interface DropdownMenuCheckboxItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> {
}
declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: DropdownMenuCheckboxItemProps): React.JSX.Element;
declare namespace DropdownMenuCheckboxItem {
    var displayName: string | undefined;
}
interface DropdownMenuRadioItemProps extends React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> {
}
declare function DropdownMenuRadioItem({ className, children, ...props }: DropdownMenuRadioItemProps): React.JSX.Element;
declare namespace DropdownMenuRadioItem {
    var displayName: string | undefined;
}
interface DropdownMenuLabelProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Label> {
    inset?: boolean;
}
declare function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps): React.JSX.Element;
declare namespace DropdownMenuLabel {
    var displayName: string | undefined;
}
interface DropdownMenuSeparatorProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Separator> {
}
declare function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps): React.JSX.Element;
declare namespace DropdownMenuSeparator {
    var displayName: string | undefined;
}
declare function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element;
declare namespace DropdownMenuShortcut {
    var displayName: string;
}

export { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger };
