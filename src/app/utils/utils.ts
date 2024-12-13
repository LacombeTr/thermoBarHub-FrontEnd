import * as XLSX from 'xlsx';
import {excelData} from "../models";

/**
 * Function to round numbers to only 2 decimals
 * @param value
 *
 * @return value either untouched or cut to two significant digits
 */
export function roundDictValues(value: string | number): number | string {
  if (typeof value === 'number') {
    return parseFloat(value.toFixed(2));
  } else {
    return value
  }
}

export function objectKeys(obj: any): string[] {
  return Object.keys(obj);
}

export async function prepareXslx(event: any): Promise<{ excelData: any[]; dataColumns: string[]; }> {
  return await new Promise<{ excelData: any[]; dataColumns: string[] }>((resolve, reject) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      try {
        const file = XLSX.read(e.target.result, {type: 'binary'});
        const firstSheet = file.SheetNames[0];
        const worksheet = file.Sheets[firstSheet];
        const excelData: excelData[] = XLSX.utils.sheet_to_json(worksheet, {raw: true});
        const dataColumns = Object.keys(excelData[0]);
        resolve({excelData, dataColumns});
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
}
