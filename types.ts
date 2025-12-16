export interface Creator {
  id: string; // required for routing & deletion
  name: string;
  url: string;
  description: string;
  imageURL: string;
}
