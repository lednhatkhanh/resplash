export interface StyleProps {
  className?: string;
  style?: React.CSSProperties;
}

export type ExtendableComponentProps<
  Component extends React.ElementType,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Props extends Record<string, unknown> = {}
> = Omit<React.ComponentPropsWithRef<Component>, keyof Props> & Props;

export type OverridableComponentProps<
  Component extends React.ElementType,
  // eslint-disable-next-line @typescript-eslint/ban-types
  Props extends Record<string, unknown> = {}
> = ExtendableComponentProps<Component, Props> & { component?: Component };
