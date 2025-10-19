import React from 'react'
import type { UIConfig } from '../config'
import { alignToCSS, galleryAlignToCSS, shadowToCSS } from '../config'

const sampleImages = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500534629026-1b56fcbf2157?q=80&w=800&auto=format&fit=crop'
]

function applyCSSVariables(cfg: UIConfig) {
  const root = document.documentElement
  root.style.setProperty('--font-family', `'${cfg.typography.fontFamily}', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`)
  root.style.setProperty('--font-size', cfg.typography.fontSize + 'px')
  root.style.setProperty('--font-weight', String(cfg.typography.fontWeight))

  root.style.setProperty('--section-bg', cfg.layoutBox.sectionBg)
  root.style.setProperty('--container-padding', cfg.layoutBox.containerPadding + 'px')
  root.style.setProperty('--card-radius', cfg.layoutBox.cardRadius + 'px')

  root.style.setProperty('--stroke-color', cfg.stroke.color)
  root.style.setProperty('--stroke-weight', cfg.stroke.weight + 'px')

  root.style.setProperty('--btn-radius', cfg.button.radius + 'px')
  root.style.setProperty('--btn-bg', cfg.button.background)
  root.style.setProperty('--btn-color', cfg.button.color)
  root.style.setProperty('--btn-shadow', shadowToCSS(cfg.button.shadow))
  root.style.setProperty('--btn-align', alignToCSS(cfg.button.align))

  root.style.setProperty('--gallery-gap', cfg.gallery.gap + 'px')
  root.style.setProperty('--gallery-justify', galleryAlignToCSS(cfg.gallery.align))
  root.style.setProperty('--img-radius', cfg.gallery.imgRadius + 'px')
}

export default function DesignPreview({ cfg }: { cfg: UIConfig }) {
  React.useEffect(() => { applyCSSVariables(cfg) }, [cfg])

  return (
    <div className="preview">
      <div className={`card ${cfg.layout === 'layoutB' ? 'layoutB': ''}`}>
        <div className="card-header">
          <div>
            <h2 className="title">Dynamic UI Editor</h2>
            <p className="subtitle">Live preview that updates as you tweak settings</p>
          </div>
          <div className="small">Layout: <strong>{cfg.layout}</strong></div>
        </div>

        {cfg.layout === 'layoutA' ? (
          <div className="gallery">
            {sampleImages.slice(0, 3).map((src, i) => (
              <img src={src} key={i} alt={`sample ${i}`} />
            ))}
          </div>
        ) : (
          <div className="layoutB">
            <div>
              <h3 style={{ margin: '0 0 8px 0' }}>Visual Highlights</h3>
              <p className="small" style={{ marginBottom: 12 }}>
                This layout places content alongside a compact gallery — good for marketing banners.
              </p>
              <div className="btn-row">
                <button className="cta">Primary Action</button>
              </div>
            </div>
            <div className="gallery">
              {sampleImages.slice(0, 4).map((src, i) => (
                <img src={src} key={i} alt={`sample ${i}`} />
              ))}
            </div>
          </div>
        )}

        {cfg.layout === 'layoutA' && (
          <div className="btn-row">
            <button className="cta">Primary Action</button>
          </div>
        )}
      </div>
    </div>
  )
}
