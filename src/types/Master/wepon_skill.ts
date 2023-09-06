export interface WeponSkill {
  id: number;
  wepon: string;
  name: string;
  ws_type: string;
  order_no?: number;
  short_name?: string;
  renkei1?: string;
  renkei2?: string;
  renkei3?: string;
  element?: string;
  range?: boolean;
  power?: number;
  jobs?: string;
  bonus?: string;
  memo?: string;
  disabled?: boolean;
  aftermath?: boolean;
  tp_bonus?: string;
  requests_count?: number;
  requests_avg?: number;
  requests_mdn?: number;
}
