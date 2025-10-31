
export interface Node {
  id: string;
  label: string;
  color: string;
  title: string;
  group?: string;
}

export interface Edge {
  from: string;
  to: string;
  arrows: string;
}
