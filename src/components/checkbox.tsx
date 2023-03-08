import { MouseEvent, useCallback } from "react";
import { cn } from "@/lib";

type CheckboxProps =
  | {
      checked: boolean;
      setChecked?: (checked: boolean, e: MouseEvent<HTMLDivElement>) => void;
      indeterminate?: undefined;
      setIndeterminate?: undefined;
    }
  | {
      checked: boolean;
      setChecked?: (checked: boolean, e: MouseEvent<HTMLDivElement>) => void;
      indeterminate: boolean;
      setIndeterminate?: (indeterminate: boolean) => void;
    };

export default function Checkbox({
  checked,
  setChecked,
  indeterminate,
  setIndeterminate,
}: CheckboxProps) {
  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (indeterminate) {
        if (setChecked) setChecked(false, e);
        if (setIndeterminate) setIndeterminate(false);
      } else if (setChecked) {
        setChecked(!checked, e);
      }
    },
    [checked, setChecked, indeterminate, setIndeterminate]
  );

  return (
    <div
      role="checkbox"
      tabIndex={0}
      onClick={handleClick}
      aria-checked={indeterminate ? "mixed" : checked}
      className={cn(
        "group relative h-[18px] w-[18px] select-none rounded-[4px] border focus:outline-none",
        {
          "border-neutral-500": !checked && !indeterminate,
          "border-primary-900 bg-primary-600": checked || indeterminate,
        }
      )}
    >
      <div className="relative h-full">
        {checked && !indeterminate && "ch"}

        {indeterminate && (
          <div className="absolute top-[7px] right-[3.5px] h-[1.5px] w-[9px] rounded bg-white" />
        )}
      </div>
    </div>
  );
}
