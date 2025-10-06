import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { createWorker } = require('tesseract.js')

const SCREENSHOTS_DIR = path.resolve('src', 'screenshots')
const README_PATH = path.resolve('README.md')

function slugify(title) {
  return title
    .replace(/Advanced/gi, '')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[^a-zA-Z0-9\s\-_.]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

function pickTitle(text) {
  if (!text) return null
  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean)

  // Heuristics: prefer lines likely to be app titles
  const candidates = lines.filter(l => {
    const len = l.length
    if (len < 5 || len > 60) return false
    if (/^http(s)?:\/\//i.test(l)) return false
    if (/^(file|edit|view|help)$/i.test(l)) return false
    // prefer lines with words and capital letters
    return /[A-Za-z]/.test(l)
  })

  // Rank: fewer special chars, more capitalized words, longer first
  const scored = candidates.map(l => {
    const caps = (l.match(/[A-Z][a-z]+/g) || []).length
    const specials = (l.match(/[^\w\s\-]/g) || []).length
    return { l, score: caps * 2 - specials + Math.min(20, l.length / 3) }
  })
  scored.sort((a, b) => b.score - a.score)
  const best = scored[0]?.l || lines[0] || null
  if (!best) return null
  return best.replace(/\s+/g, ' ').trim()
}

async function main() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    console.error('Screenshots directory not found:', SCREENSHOTS_DIR)
    process.exit(1)
  }

  const worker = await createWorker('eng')
  const files = fs.readdirSync(SCREENSHOTS_DIR).filter(f => /\.(png|jpg|jpeg)$/i.test(f))

  const mapping = []
  for (const file of files) {
    const full = path.join(SCREENSHOTS_DIR, file)
    try {
      const { data } = await worker.recognize(full)
      const title = pickTitle(data.text) || path.parse(file).name
      const baseSlug = slugify(title) || path.parse(file).name.toLowerCase().replace(/\s+/g, '-')
      let newBase = baseSlug.replace(/(^-|-$)/g, '') || 'screenshot'
      let candidate = `${newBase}.png`
      let i = 2
      while (fs.existsSync(path.join(SCREENSHOTS_DIR, candidate))) {
        candidate = `${newBase}-${i}.png`
        i += 1
      }
      const dest = path.join(SCREENSHOTS_DIR, candidate)
      fs.renameSync(full, dest)
      mapping.push({ from: file, to: candidate, title })
      console.log(`Renamed: ${file} -> ${candidate} (${title})`)
    } catch (e) {
      console.warn('OCR failed for', file, e?.message)
    }
  }

  await worker.terminate()

  // Update README screenshots list
  if (fs.existsSync(README_PATH)) {
    let readme = fs.readFileSync(README_PATH, 'utf8')
    const header = 'Screenshots Gallery\n-------------------'
    const idx = readme.indexOf(header)
    if (idx !== -1) {
      const before = readme.substring(0, idx + header.length)
      const afterStart = readme.indexOf('\n', idx + header.length)
      const rest = afterStart !== -1 ? readme.substring(afterStart) : ''
      const bullets = mapping
        .map(m => `- \`${m.to}\``)
        .join('\n')
      const newSection = `\n\nThe following screenshots are available in \`src/screenshots/\`:\n\n${bullets}\n\nNote: Filenames were generated via OCR and sanitized (removed the word "Advanced").` 
      readme = before + newSection
      // Try to remove old bullet list by cutting until next header or end
      const nextHeaderMatch = rest.match(/\n\S.*\n[-=]{3,}/)
      if (nextHeaderMatch) {
        const nextHeaderIdx = rest.indexOf(nextHeaderMatch[0])
        readme += rest.substring(nextHeaderIdx)
      }
      fs.writeFileSync(README_PATH, readme)
      console.log('Updated README screenshots section')
    }
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})


