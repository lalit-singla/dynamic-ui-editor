import React from 'react'
import DesignPreview from './components/DesignPreview'
import EditorPanel from './components/EditorPanel'
import { UIConfig, defaultA, defaultB } from './config'

export default function App(){
  const [cfg, setCfg] = React.useState<UIConfig>(() => {
    const saved = localStorage.getItem('ui-config')
    return saved ? JSON.parse(saved) as UIConfig : defaultA
  })

  React.useEffect(()=>{
    localStorage.setItem('ui-config', JSON.stringify(cfg))
  }, [cfg])

  const switchLayout = () => {
    setCfg(prev => prev.layout === 'layoutA' ? {...prev, ...defaultB, layout: 'layoutB'} : {...prev, ...defaultA, layout: 'layoutA'})
  }

  return (
    <div className="app">
      <EditorPanel cfg={cfg} setCfg={setCfg} />
      <main>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <h2 style={{margin:0}}>Live Preview</h2>
          <button onClick={switchLayout}>Toggle Layout</button>
        </div>
        <DesignPreview cfg={cfg} />
      </main>
    </div>
  )
}
