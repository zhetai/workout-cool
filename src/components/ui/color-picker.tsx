import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";

import { Input } from "@/components/ui/input";

interface HexColorPopoverPickerProps {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

export function HexColorPopoverPicker({ value, onChange, disabled }: HexColorPopoverPickerProps) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(value ?? "#000000");

  // Sync color if value changes from outside
  useEffect(() => {
    setColor(value ?? "#000000");
  }, [value]);

  return (
    <Popover.Root onOpenChange={setOpen} open={open}>
      <Popover.Trigger asChild>
        <button
          aria-label="Choisir une couleur"
          className="h-8 w-12 rounded border border-gray-300"
          disabled={disabled}
          style={{ background: color }}
          type="button"
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="z-50 rounded border bg-white p-4 shadow-lg" sideOffset={8}>
          <HexColorPicker
            color={color}
            onChange={(c) => {
              setColor(c);
              onChange?.(c);
            }}
          />
          <Input
            className="font-mono mt-2 w-24 rounded border px-2 py-1"
            onChange={(e) => {
              setColor(e.target.value);
              onChange?.(e.target.value);
            }}
            type="text"
            value={color}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
