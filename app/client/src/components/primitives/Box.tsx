import type { ElementType, ComponentPropsWithoutRef } from "react";

type BoxProps<T extends ElementType = "div"> = {
  as?: T;
  dataId?: string;
  dataRole?: string;
} & ComponentPropsWithoutRef<T>;

//<PRIMITIVE>
export function Box<T extends ElementType = "div">({
  as,
  dataId,
  dataRole,
  ...rest
}: BoxProps<T>) {
  const Component = (as || "div") as ElementType;
  return <Component data-id={dataId} data-role={dataRole} {...rest} />;
}
