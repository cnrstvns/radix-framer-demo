import {
  PropsWithChildren,
  forwardRef,
  useCallback,
  useState,
  createContext,
  useContext,
  useMemo,
} from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { cn } from "@/lib";
import { motion, AnimatePresence } from "framer-motion";
import Checkbox from "./checkbox";

// Primitives from Radix used or exported
const PrimitiveMenu = ContextMenuPrimitive.Root;
const PrimitiveContent = ContextMenuPrimitive.Content;
const PrimitiveTrigger = ContextMenuPrimitive.Trigger;
const PrimitiveSeparator = ContextMenuPrimitive.Separator;
const PrimitiveItem = ContextMenuPrimitive.Item;
const PrimitiveSubmenu = ContextMenuPrimitive.Sub;
const PrimitiveSubTrigger = ContextMenuPrimitive.SubTrigger;
const PrimitiveSubContent = ContextMenuPrimitive.SubContent;
const PrimitivePortal = ContextMenuPrimitive.Portal;
const PrimitiveRadioGroup = ContextMenuPrimitive.RadioGroup;
const PrimitiveRadioItem = ContextMenuPrimitive.RadioItem;
const PrimitiveItemIndicator = ContextMenuPrimitive.ItemIndicator;
const PrimitiveCheckboxItem = ContextMenuPrimitive.ContextMenuCheckboxItem;

// Types from Radix used as utility types
type PrimitiveContentProps = ContextMenuPrimitive.MenuContentProps;
type PrimitiveMenuItemProps = ContextMenuPrimitive.MenuItemProps;
type PrimitiveSubTriggerProps = ContextMenuPrimitive.MenuSubTriggerProps;
type PrimitiveSubContentProps = ContextMenuPrimitive.MenuSubContentProps;
type PrimitiveRadioGroupProps = ContextMenuPrimitive.MenuRadioGroupProps;
type PrimitiveCheckboxItemProps = ContextMenuPrimitive.MenuCheckboxItemProps;

// Internal types exported for later use
export type TitleProps = PropsWithChildren<{ indent?: boolean }>;
export type ContextMenuButtonProps = PrimitiveMenuItemProps & TriggerProps;
export type SubTriggerProps = PrimitiveSubTriggerProps & TriggerProps;
export type SubContentProps = PrimitiveSubContentProps;
export type CheckboxItemProps = PrimitiveCheckboxItemProps & CheckboxProps;

export type ContentProps = PrimitiveContentProps &
  PropsWithChildren<{
    className?: string;
    sideOffset?: number;
  }>;

export type TriggerProps = {
  image?: string;
  text: string;
  caption?: string;
  destructive?: boolean;
  chevron?: boolean;
  indent?: boolean;
};

export type RadioItemProps = {
  label: string;
  value: string;
};

export type RadioGroupProps = PrimitiveRadioGroupProps & {
  options: RadioItemProps[];
};

export type CheckboxProps = {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
};

type ContextMenuContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ContextMenuContext = createContext<ContextMenuContextType>(null!);
const useContextMenuContext = () => useContext(ContextMenuContext);

const ContextMenuSubContext = createContext<ContextMenuContextType>(null!);
const useContextMenuSubContext = () => useContext(ContextMenuSubContext);

function ContextMenuRoot({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const contextValue = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <ContextMenuContext.Provider value={contextValue}>
      <PrimitiveMenu modal={false} onOpenChange={setOpen}>
        {children}
      </PrimitiveMenu>
    </ContextMenuContext.Provider>
  );
}

function ContextMenuContent({ className, children, ...props }: ContentProps) {
  const { open } = useContextMenuContext();

  return (
    <AnimatePresence>
      {open && (
        <PrimitivePortal forceMount>
          <PrimitiveContent
            asChild
            className={cn(
              "context-menu-content z-50 !w-[170px] overflow-hidden rounded-lg bg-neutral-850",
              className
            )}
            {...props}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
              transition={{ type: "spring", stiffness: 1400, damping: 100 }}
            >
              {children}
            </motion.div>
          </PrimitiveContent>
        </PrimitivePortal>
      )}
    </AnimatePresence>
  );
}

function ContextMenuTitle({ children, indent }: TitleProps) {
  return (
    <div
      className={cn(
        "flex h-7 select-none items-center px-3 text-xs text-neutral-150",
        {
          "pl-10": indent,
        }
      )}
    >
      {children}
    </div>
  );
}

function ContextMenuButton({
  image,
  text,
  caption,
  destructive,
  chevron,
  onClick,
  indent,
  children,
  ...props
}: ContextMenuButtonProps) {
  return (
    <PrimitiveItem
      onClick={onClick}
      className={cn(
        "relative flex w-full px-3 hover:cursor-pointer hover:bg-neutral-800 focus:outline-none",
        {
          "flex h-8 items-center": !caption,
          "h-12 flex-col justify-center": !!caption,
          "pl-10": indent,
        }
      )}
      {...props}
    >
      <span
        className={cn("flex items-center text-sm leading-4 text-white", {
          "text-danger-100": destructive,
        })}
      >
        {image && (
          <img
            className="mr-2 h-5 w-5 rounded-full"
            src={image}
            alt="Context Menu Icon"
          />
        )}
        <span>{text}</span>
      </span>
      <span className="text-xs leading-4 text-neutral-150">{caption}</span>
    </PrimitiveItem>
  );
}

function ContextMenuDivider() {
  return <PrimitiveSeparator className="border-b-[0.5px] border-neutral-500" />;
}

function ContextMenuSubtrigger({
  image,
  text,
  caption,
  destructive,
  chevron,
  children,
  ...props
}: SubTriggerProps) {
  return (
    <PrimitiveSubTrigger
      className={cn(
        "relative flex w-full space-y-[0.5] px-3 hover:cursor-pointer hover:bg-neutral-800 focus:outline-none data-[state=open]:bg-neutral-800",
        {
          "flex h-8 items-center": !caption,
          "h-12 flex-col justify-center": !!caption,
        }
      )}
      {...props}
    >
      <span
        className={cn("flex items-center text-sm  text-white", {
          "text-danger-100": destructive,
          "!space-x-2": !!image,
        })}
      >
        {image && (
          <img
            className="h-5 w-5 rounded-full"
            src={image}
            alt="Context Menu Icon"
          />
        )}
        <span>{text}</span>
      </span>
      <span className="text-xs text-neutral-150">{caption}</span>
      {children}
    </PrimitiveSubTrigger>
  );
}

function ContextMenuSub({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const contextValue = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <ContextMenuSubContext.Provider value={contextValue}>
      <PrimitiveSubmenu open={open} onOpenChange={setOpen}>
        {children}
      </PrimitiveSubmenu>
    </ContextMenuSubContext.Provider>
  );
}

const ContextMenuSubcontent = forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  SubContentProps
>(({ className, children, ...props }, ref) => {
  const { open } = useContextMenuSubContext();

  return (
    <AnimatePresence>
      {open && (
        <PrimitivePortal forceMount>
          <PrimitiveSubContent
            asChild
            ref={ref}
            sideOffset={8}
            className={cn(
              "context-menu-content z-50 !w-[170px] overflow-hidden rounded-lg bg-neutral-850",
              className
            )}
            {...props}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
              transition={{ type: "spring", stiffness: 1500, damping: 90 }}
            >
              {children}
            </motion.div>
          </PrimitiveSubContent>
        </PrimitivePortal>
      )}
    </AnimatePresence>
  );
});

function ContextMenuRadioItem({ label, value, ...props }: RadioItemProps) {
  return (
    <PrimitiveRadioItem
      value={value}
      className="flex h-8 items-center pl-3 pr-2 text-sm text-white hover:cursor-pointer hover:bg-neutral-800 focus:outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      {...props}
    >
      <span className="mr-3 flex h-4 w-3.5 items-center justify-center">
        <PrimitiveItemIndicator>checked</PrimitiveItemIndicator>
      </span>
      <span>{label}</span>
    </PrimitiveRadioItem>
  );
}

function ContextMenuRadioGroup({ options, ...props }: RadioGroupProps) {
  return (
    <PrimitiveRadioGroup {...props}>
      {options.map((option, index) => (
        <div key={option.value}>
          <ContextMenuRadioItem label={option.label} value={option.value} />
          {index !== options.length - 1 && <ContextMenuDivider />}
        </div>
      ))}
    </PrimitiveRadioGroup>
  );
}

function ContextMenuCheckboxItem({
  checked,
  setChecked,
  label,
  ...props
}: CheckboxItemProps) {
  const handleChange = useCallback(
    (_checked: boolean | "indeterminate") => {
      if (_checked === "indeterminate") setChecked(false);
      else setChecked(_checked);
    },
    [setChecked]
  );

  return (
    <PrimitiveCheckboxItem
      checked={checked}
      onClick={(event) => event.stopPropagation()}
      onCheckedChange={handleChange}
      className="flex h-8 items-center pl-3 pr-2 text-sm text-white hover:cursor-pointer hover:bg-neutral-800 focus:outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
      {...props}
    >
      <span className="mr-3 flex h-4 w-4 items-center justify-center">
        <Checkbox checked={checked} setChecked={setChecked} />
      </span>
      <span>{label}</span>
    </PrimitiveCheckboxItem>
  );
}

// Display names for all components
ContextMenuContent.displayName = "Dropdown.Content";
ContextMenuTitle.displayName = "Dropdown.Title";
ContextMenuButton.displayName = "Dropdown.Button";
ContextMenuDivider.displayName = "Dropdown.Divider";
ContextMenuSubtrigger.displayName = "Dropdown.Subtrigger";
ContextMenuSubcontent.displayName = "Dropdown.SubContent";
ContextMenuRadioItem.displayName = "Dropdown.RadioItem";
ContextMenuRadioGroup.displayName = "Dropdown.RadioGroup";
ContextMenuCheckboxItem.displayName = "Dropdown.CheckboxItem";

// Compose object for export with all subcomponents
const ContextMenu = {
  Menu: ContextMenuRoot,
  Content: ContextMenuContent,
  Trigger: PrimitiveTrigger,
  Title: ContextMenuTitle,
  Divider: ContextMenuDivider,
  Button: ContextMenuButton,
  Submenu: ContextMenuSub,
  Subtrigger: ContextMenuSubtrigger,
  Subcontent: ContextMenuSubcontent,
  Portal: PrimitivePortal,
  RadioGroup: ContextMenuRadioGroup,
  Checkbox: ContextMenuCheckboxItem,
};

// Export composed component API
export default ContextMenu;
