import "google-apps-script";
import { sheetId } from "./config";

export function doPost(e: GoogleAppsScript.Events.DoPost) {
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadsheet.getSheets()[0];
  const data = JSON.parse(e.postData.contents);
  switch (data.type) {
    case "append": {
      sheet.appendRow([...data.data, new Date().toISOString()]);
      break;
    }
    case "modify": {
      const values = getValues(sheet);
      const row = values.findIndex((r) => r[0] == data.uuid);
      if (row === -1) break;
      const range = sheet.getRange(row + 2, 1, 1, sheet.getLastColumn());
      range.setValues([data.data]);
      break;
    }
    case "delete": {
      const values = getValues(sheet);
      const row = values.findIndex((r) => r[0] == data.uuid);
      if (row === -1) break;
      sheet.deleteRow(row + 2);
      break;
    }
  }

  return ContentService.createTextOutput("");
}

export function doGet() {
  const spreadsheet = SpreadsheetApp.openById(sheetId);
  const sheet = spreadsheet.getSheets()[1];
  const values = getValues(sheet);
  return ContentService.createTextOutput(JSON.stringify(values)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getValues(sheet: GoogleAppsScript.Spreadsheet.Sheet) {
  return sheet.getSheetValues(
    2,
    1,
    sheet.getLastRow() - 1,
    sheet.getLastColumn()
  );
}
