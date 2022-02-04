export interface MigrationFileContent {
  name?: string;
  id?: string;
  filePath?: string;
  upSql?: string;
  downSql?: string;
  isDevSql?: boolean;
}
