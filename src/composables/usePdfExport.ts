import { ref } from 'vue'
import type { jsPDF } from 'jspdf'

export interface PdfProperties {
  title: string
  subject: string
  author?: string
}

/**
 * Builds the report as a real PDF document rather than a screenshot of the
 * page: the text stays selectable and searchable, page breaks fall between
 * sections instead of through them, and a full report is a few hundred
 * kilobytes instead of tens of megabytes.
 */
export const usePdfExport = () => {
  const isGeneratingPDF = ref(false)

  const savePdf = async (
    filename: string,
    properties: PdfProperties,
    build: (doc: jsPDF) => void
  ) => {
    isGeneratingPDF.value = true

    try {
      const { jsPDF } = await import('jspdf')

      const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
        compress: true
      })

      doc.setProperties({
        title: properties.title,
        subject: properties.subject,
        author: properties.author ?? 'Typix',
        creator: 'Typix'
      })

      build(doc)
      doc.save(`${filename}.pdf`)

      // Give the browser a moment to start the download before the button
      // becomes clickable again.
      await new Promise(resolve => setTimeout(resolve, 100))
    } catch (error) {
      console.error('Error generating PDF:', error)
      throw error
    } finally {
      isGeneratingPDF.value = false
    }
  }

  return {
    savePdf,
    isGeneratingPDF
  }
}

/** Safe, readable filename component: "Alex Demo" -> "Alex-Demo". */
export function slug(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40)
}
