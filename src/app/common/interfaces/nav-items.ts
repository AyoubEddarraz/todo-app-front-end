export interface NavItems {
  name: string;
  icone: string;
  routeLink: string;
  count ?: number;
  options ?: "delete" | "close" | "logout";
}
