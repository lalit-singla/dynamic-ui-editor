import React from 'react'
import type { UIConfig, LayoutKind, ShadowSize, Align, GalleryAlign } from '../config'

type Props = {
  cfg: UIConfig
  setCfg: (f: (prev: UIConfig) => UIConfig) => void
}

function NumberInput({ label, value, onChange, min, max, step=1 }:{label:string, value:number, onChange:(v:number)=>void, min:number, max:number, step?:number}){
  return (
    <div className="control">
      <label>{label} <span className="small">({min} – {max})</span></label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
      <input type="number" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
    </div>
  )
}

function ColorInput({ label, value, onChange }:{label:string, value:string, onChange:(v:string)=>void}){
  return (
    <div className="control">
      <label>{label}</label>
      <div className="input-row">
        <input type="color" value={value} onChange={e=>onChange(e.target.value)} />
        <input type="text" value={value} onChange={e=>onChange(e.target.value)} />
      </div>
    </div>
  )
}

export default function EditorPanel({ cfg, setCfg }: Props){
  const update = (path: (draft: UIConfig)=>void) => setCfg(prev => {
      const copy = JSON.parse(JSON.stringify(prev)) as UIConfig
      path(copy)
      return copy
    })

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(cfg, null, 2)], {type:'application/json'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ui-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJSON = async (file: File) => {
    const text = await file.text()
    try{
      const parsed = JSON.parse(text) as UIConfig
      setCfg(()=>parsed)
      localStorage.setItem('ui-config', JSON.stringify(parsed))
      alert('Configuration loaded successfully.')
    }catch(err){
      alert('Invalid configuration file.')
    }
  }

  return (
    <aside className="panel">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h3 style={{margin:0}}>Editor</h3>
        <select value={cfg.layout} onChange={e=>update(d=>{d.layout = e.target.value as LayoutKind})}>
          <option value="layoutA">Layout A</option>
          <option value="layoutB">Layout B</option>
        </select>
      </div>

      <hr/>
      <div className="section-title">Typography</div>
      <div className="control">
        <label>Font Family</label>
        <select value={cfg.typography.fontFamily} onChange={e=>update(d=>{d.typography.fontFamily = e.target.value as any})}>
          <option>Inter</option>
          <option>Roboto</option>
          <option>Poppins</option>
        </select>
      </div>

      <div className="input-row">
        <div>
          <label>Font Weight</label>
          <select value={cfg.typography.fontWeight} onChange={e=>update(d=>{d.typography.fontWeight = Number(e.target.value) as any})}>
            <option value={400}>400</option>
            <option value={500}>500</option>
            <option value={600}>600</option>
            <option value={700}>700</option>
          </select>
        </div>
        <div>
          <NumberInput label="Font Size (px)" value={cfg.typography.fontSize} min={10} max={60} onChange={v=>update(d=>{d.typography.fontSize = v})} />
        </div>
      </div>

      <hr/>
      <div className="section-title">Button</div>
      <NumberInput label="Border Radius (px)" value={cfg.button.radius} min={0} max={40} onChange={v=>update(d=>{d.button.radius=v})} />
      <div className="control">
        <label>Shadow</label>
        <select value={cfg.button.shadow} onChange={e=>update(d=>{d.button.shadow = e.target.value as ShadowSize})}>
          <option>none</option>
          <option>small</option>
          <option>medium</option>
          <option>large</option>
        </select>
      </div>
      <div className="control">
        <label>Alignment</label>
        <select value={cfg.button.align} onChange={e=>update(d=>{d.button.align = e.target.value as Align})}>
          <option>left</option>
          <option>center</option>
          <option>right</option>
        </select>
      </div>
      <ColorInput label="Background Color" value={cfg.button.background} onChange={v=>update(d=>{d.button.background=v})} />
      <ColorInput label="Text Color" value={cfg.button.color} onChange={v=>update(d=>{d.button.color=v})} />

      <hr/>
      <div className="section-title">Gallery / Images</div>
      <div className="control">
        <label>Gallery Alignment</label>
        <select value={cfg.gallery.align} onChange={e=>update(d=>{d.gallery.align = e.target.value as GalleryAlign})}>
          <option value="left">grid left</option>
          <option value="center">grid center</option>
          <option value="right">grid right</option>
        </select>
      </div>
      <NumberInput label="Spacing (px)" value={cfg.gallery.gap} min={0} max={40} onChange={v=>update(d=>{d.gallery.gap=v})} />
      <NumberInput label="Image Border Radius (px)" value={cfg.gallery.imgRadius} min={0} max={40} onChange={v=>update(d=>{d.gallery.imgRadius=v})} />

      <hr/>
      <div className="section-title">General Layout</div>
      <NumberInput label="Card Corner Radius (px)" value={cfg.layoutBox.cardRadius} min={0} max={32} onChange={v=>update(d=>{d.layoutBox.cardRadius=v})} />
      <NumberInput label="Container Padding (px)" value={cfg.layoutBox.containerPadding} min={8} max={64} onChange={v=>update(d=>{d.layoutBox.containerPadding=v})} />
      <ColorInput label="Section Background" value={cfg.layoutBox.sectionBg} onChange={v=>update(d=>{d.layoutBox.sectionBg=v})} />

      <hr/>
      <div className="section-title">Stroke / Border</div>
      <ColorInput label="Stroke Color" value={cfg.stroke.color} onChange={v=>update(d=>{d.stroke.color=v})} />
      <NumberInput label="Stroke Weight (px)" value={cfg.stroke.weight} min={0} max={4} step={0.5} onChange={v=>update(d=>{d.stroke.weight=v})} />

      <hr/>
      <div className="section-title">Config</div>
      <div className="input-row">
        <button onClick={exportJSON}>Export JSON</button>
        <label style={{display:'inline-flex', gap:8, alignItems:'center'}}>
          <input type="file" accept="application/json" onChange={e => e.target.files && importJSON(e.target.files[0])}/>
          Import JSON
        </label>
      </div>
      <div className="small">Config is auto-saved to LocalStorage.</div>
    </aside>
  )
}
