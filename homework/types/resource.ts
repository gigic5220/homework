export interface Resource {
  id: number;
  name: string;
  url: string | ArrayBuffer;
  enabled?: boolean;
}
export interface ResourceReq {
  id?: number;
  name: string;
  url?: string | ArrayBuffer;
}
