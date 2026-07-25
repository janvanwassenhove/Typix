import { ref } from 'vue'

const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297

/**
 * Rendering scale for the page capture. At scale 2 a full report becomes a
 * ~1600x6000 pixel image, which lands in the PDF as tens of megabytes; 1.5 is
 * still comfortably above the 96 DPI the page is laid out at.
 */
const CAPTURE_SCALE = 1.5

/** JPEG keeps a report around 1 MB where a lossless PNG of the same page ran to 30 MB. */
const JPEG_QUALITY = 0.92

export const usePdfExport = () => {
  const isGeneratingPDF = ref(false)

  const generatePDF = async (elementId: string, filename: string) => {
    isGeneratingPDF.value = true

    try {
      // Dynamic imports to avoid startup issues
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ])

      const element = document.getElementById(elementId)
      if (!element) {
        throw new Error(`Element with ID "${elementId}" not found`)
      }

      const canvas = await html2canvas(element, {
        scale: CAPTURE_SCALE,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0
      })

      const imgData = canvas.toDataURL('image/jpeg', JPEG_QUALITY)
      const imgHeight = (canvas.height * A4_WIDTH_MM) / canvas.width

      const pdf = new jsPDF('p', 'mm', 'a4')

      // The report is one tall image; each page shows a different slice of it
      // by shifting the same image up by a page height.
      const pageCount = Math.max(1, Math.ceil(imgHeight / A4_HEIGHT_MM))
      for (let page = 0; page < pageCount; page++) {
        if (page > 0) pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, -page * A4_HEIGHT_MM, A4_WIDTH_MM, imgHeight)
      }

      pdf.save(`${filename}.pdf`)

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
    generatePDF,
    isGeneratingPDF
  }
}
