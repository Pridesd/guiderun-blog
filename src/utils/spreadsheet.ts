import { JWT } from "google-auth-library"
import { GoogleSpreadsheet } from "google-spreadsheet"

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
