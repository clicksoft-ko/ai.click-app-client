export interface ChildrenProps {
  children?: React.ReactNode;
}
export interface ClassNameProps {
  className?: string;
}
export interface ChildrenClassNameProps extends ChildrenProps, ClassNameProps {}
