// @ts-check
import Database from 'better-sqlite3'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function seed() {
    const sqlite = new Database(':memory:')

    // sqlite.exec(readFileSync("src/products.sql", "utf8"));
    sqlite.exec(readFileSync(join(__dirname, 'products.sql'), 'utf8'))
    // await sqlite.backup("src/products.db");
    await sqlite.backup(join(__dirname, 'products.db'))
}

export function wipe() {
    // const sqlite = new Database("src/products.db");
    const sqlite = new Database(join(__dirname, 'products.db'))
    sqlite.prepare('DELETE FROM products').run()
    sqlite.close()
}

import { resolve } from 'path'
import { pathToFileURL } from 'url'
import path from 'path'
const scriptPath = path.resolve(process.argv[1])
const scriptURL = pathToFileURL(scriptPath).href
if (import.meta.url === scriptURL) {
    await seed()
}

//if (import.meta.url === `file://${process.argv[1]}`) {
//    await seed()
//}
