export interface Issue {
  id: number;
  title: string;
  html_url: string;
  number: number;
  labels: {
    color: string;
    name: string;
  }[];
}
