export interface Migration {
  name?: string;
  id: string;
  filePath?: string;
  target?: string;
}
