import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import QRCode from 'qrcode'
import { jsPDF } from 'jspdf'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const websiteUrl = 'https://mawacompanylimited.vercel.app/'
const qrOptions = {
  errorCorrectionLevel: 'Q',
  margin: 4,
  width: 320,
  color: { dark: '#282521', light: '#ffffff' },
}
const qrDataUrl = await QRCode.toDataURL(websiteUrl, qrOptions)
const qrImagePath = path.join(root, 'public', 'mawa-website-qr.png')
await QRCode.toFile(qrImagePath, websiteUrl, qrOptions)
const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' })
const pageWidth = 148
const pageHeight = 210

pdf.setFillColor(248, 245, 239)
pdf.rect(0, 0, pageWidth, pageHeight, 'F')
pdf.setFillColor(40, 37, 33)
pdf.rect(0, 0, pageWidth, 4, 'F')
pdf.setFillColor(168, 110, 67)
pdf.rect(0, 4, pageWidth, 1, 'F')

pdf.setFillColor(168, 110, 67)
pdf.circle(26, 26, 12, 'F')
pdf.setTextColor(255, 255, 255)
pdf.setFont('helvetica', 'bold')
pdf.setFontSize(16)
pdf.text('M', 26, 31.5, { align: 'center' })
pdf.setTextColor(54, 48, 41)
pdf.setFont('helvetica', 'bold')
pdf.setFontSize(11)
pdf.text('MAWA AIR COND SERVICE', 46, 22)
pdf.setFont('helvetica', 'normal')
pdf.setFontSize(7.5)
pdf.setTextColor(122, 108, 91)
pdf.text('AIR CONDITIONING CARE · KUALA LUMPUR', 46, 28)

pdf.setFillColor(255, 255, 255)
pdf.setDrawColor(232, 223, 211)
pdf.roundedRect(12, 48, 124, 145, 5, 5, 'FD')

pdf.setTextColor(43, 39, 34)
pdf.setFont('helvetica', 'bold')
pdf.setFontSize(21)
pdf.text('Discover MAWA online', pageWidth / 2, 65, { align: 'center' })
pdf.setFont('helvetica', 'normal')
pdf.setFontSize(9)
pdf.setTextColor(103, 93, 80)
pdf.text('Explore our services, prices and contact details.', pageWidth / 2, 73, { align: 'center' })

pdf.setFillColor(249, 246, 240)
pdf.roundedRect(36, 81, 76, 76, 3, 3, 'F')
pdf.addImage(qrDataUrl, 'PNG', 40, 85, 68, 68)

pdf.setTextColor(54, 48, 41)
pdf.setFont('helvetica', 'bold')
pdf.setFontSize(9)
pdf.text('mawacompanylimited.vercel.app', pageWidth / 2, 169, { align: 'center' })
pdf.setFont('helvetica', 'normal')
pdf.setFontSize(8)
pdf.setTextColor(122, 108, 91)
pdf.text('Point your camera at the code to visit our website.', pageWidth / 2, 177, { align: 'center' })

pdf.setDrawColor(232, 223, 211)
pdf.line(25, 183, 123, 183)
pdf.setFontSize(7)
pdf.text('Air conditioning service in Kuala Lumpur · +60 17-313 2571', pageWidth / 2, 188, { align: 'center' })

const output = path.join(root, 'public', 'mawa-website-qr.pdf')
await writeFile(output, Buffer.from(pdf.output('arraybuffer')))
console.log(`Created ${qrImagePath}`)
console.log(`Created ${output}`)
