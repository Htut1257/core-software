export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}
  
export interface MenuItem{
  displayName:string,
  Name:string,
  route?:string,
  children?:MenuItem[]
}