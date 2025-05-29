import { ref } from 'vue'

export const usePdfExport = () => {
  const isGeneratingPDF = ref(false)

  const generatePDF = async (elementId: string, filename: string) => {
    isGeneratingPDF.value = true
    
    try {
      console.log('Starting PDF generation for element:', elementId)
      
      // Dynamic imports to avoid startup issues
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ])

      console.log('Libraries loaded successfully')

      const element = document.getElementById(elementId)
      if (!element) {
        console.error('Element not found:', elementId)
        throw new Error(`Element with ID "${elementId}" not found`)
      }

      console.log('Element found, creating canvas...')

      // Create canvas from HTML element with better options
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0
      })

      console.log('Canvas created, dimensions:', canvas.width, 'x', canvas.height)

      const imgData = canvas.toDataURL('image/png', 1.0)
      console.log('Image data created, length:', imgData.length)
      
      // Calculate dimensions for A4
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      console.log('Creating PDF with dimensions:', imgWidth, 'x', imgHeight)

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      let position = 0

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      console.log('PDF created, attempting to save as:', `${filename}.pdf`)

      // Save the PDF
      pdf.save(`${filename}.pdf`)
      
      console.log('PDF save command executed')
      
      // Add a small delay to ensure the download starts
      await new Promise(resolve => setTimeout(resolve, 100))
      
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
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
