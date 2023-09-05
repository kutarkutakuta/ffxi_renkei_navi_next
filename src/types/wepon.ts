import { WeponType } from "./wepon_type";

export interface Wepon {
  name: string;
  group: string;
  weponTypes: string[];
  outWSTypes: string[];
}
