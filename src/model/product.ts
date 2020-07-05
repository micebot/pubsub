export default interface Product {
  uuid: string;
  code: string;
  summary: string;
  taken: boolean;
  takenAt?: string;
}
