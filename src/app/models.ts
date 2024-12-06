/**
 * Interface for a row from processed excel datas
 * @interface
 */
interface excelDataContent {
  [key: string]: any;
}

/**
 * @typedef excelData a type containing a xslx sheet
 */
export type excelData = excelDataContent[];

/**
 *
 * Interface for the parameters used for thermobarometry calculations
 * @interface
 */
export interface calculationParameters {
  iterative: boolean;
  system: string;
  phases: string[];
  equationP: string | null;
  equationT: string | null;
  pDependant: boolean;
  tDependant: boolean;
  h2oDependant: boolean;
  pressure: number;
  temperature: number;
  h2o: number;
  data: excelData[];
}
