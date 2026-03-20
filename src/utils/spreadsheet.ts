import { JWT } from "google-auth-library"
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet"

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const doc = new GoogleSpreadsheet(
  process.env.BLOG_SHEET_ID ?? "",
  serviceAccountAuth
)

let isDocLoaded = false

export async function getLoadedSheet(): Promise<GoogleSpreadsheet> {
  if (!isDocLoaded) {
    await doc.loadInfo()
    isDocLoaded = true
  }

  return doc
}

export async function getOrCreateSheet(
  title: string,
  headerValues: string[]
): Promise<GoogleSpreadsheetWorksheet> {
  const loadedDoc = await getLoadedSheet()
  const existingSheet = loadedDoc.sheetsByTitle[title]

  if (!existingSheet) {
    return loadedDoc.addSheet({ title, headerValues })
  }

  try {
    await existingSheet.loadHeaderRow()
  } catch {
    await existingSheet.setHeaderRow(headerValues)
    return existingSheet
  }

  const currentHeaders = existingSheet.headerValues.map((value) => value.trim())
  const expectedHeaders = headerValues.map((value) => value.trim())

  const isSameHeader =
    currentHeaders.length === expectedHeaders.length &&
    currentHeaders.every((value, index) => value === expectedHeaders[index])

  if (!isSameHeader) {
    throw new Error(
      `Sheet '${title}' header mismatch. Expected: ${expectedHeaders.join(", ")}`
    )
  }

  return existingSheet
}
