/**
 * Turning the on-screen charts into images the PDF can embed.
 *
 * The charts are the part of a report people actually look at, so they go in
 * at twice the display resolution rather than being re-drawn in vector form —
 * that keeps one source of truth for how a wheel looks.
 */

/**
 * Charts are drawn at twice their layout size. That makes them sharp on a
 * retina screen and, more to the point, gives the PDF an image with enough
 * resolution to hold up in print rather than one sized for a browser window.
 */
export const CHART_SCALE = 2

/**
 * Size a canvas's backing store for `CHART_SCALE` and hand back a context that
 * still takes coordinates in layout pixels.
 */
export function prepareCanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number
): CanvasRenderingContext2D | null {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  if (canvas.width !== width * CHART_SCALE || canvas.height !== height * CHART_SCALE) {
    canvas.width = width * CHART_SCALE
    canvas.height = height * CHART_SCALE
  }

  ctx.setTransform(CHART_SCALE, 0, 0, CHART_SCALE, 0, 0)
  ctx.clearRect(0, 0, width, height)
  return ctx
}

export interface ChartImage {
  dataUrl: string
  /** width / height, so the layout can size it without distorting. */
  aspect: number
}

export function canvasToImage(canvas: HTMLCanvasElement | undefined | null): ChartImage | null {
  if (!canvas || !canvas.width || !canvas.height) return null
  return {
    dataUrl: canvas.toDataURL('image/png'),
    aspect: canvas.width / canvas.height
  }
}

/**
 * Rasterise an inline SVG. The markup is self-contained (no external images or
 * stylesheets), so it can be loaded straight from a data URL.
 */
export function svgToImage(svg: SVGSVGElement | undefined | null, scale = 2): Promise<ChartImage | null> {
  if (!svg) return Promise.resolve(null)

  const viewBox = svg.viewBox.baseVal
  const width = viewBox?.width || svg.clientWidth || 400
  const height = viewBox?.height || svg.clientHeight || 400

  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  clone.setAttribute('width', String(width))
  clone.setAttribute('height', String(height))
  // Scoped styles live in a stylesheet the clone cannot see, and the symbol
  // relies on presentation attributes for everything except the font.
  clone.setAttribute('font-family', 'Helvetica, Arial, sans-serif')

  const markup = new XMLSerializer().serializeToString(clone)
  const source = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`

  return new Promise(resolve => {
    const image = new Image()
    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width * scale
      canvas.height = height * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) return resolve(null)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      resolve({ dataUrl: canvas.toDataURL('image/png'), aspect: width / height })
    }
    image.onerror = () => resolve(null)
    image.src = source
  })
}
