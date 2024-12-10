import React from 'react'

function TreeSeletPure() {
  return (
    <div className="treeSelect">
      <div className="treeSelect_item">
        {/* heading */}
        <div className="treeSelect_heading">
          <button className="treeSelect_toggle">
            <svg 
              viewBox="0 0 1024 1024" 
              focusable="false" 
              data-icon="caret-down" 
              width="1em"
              height="1em" 
              fill="currentColor" 
              aria-hidden="true"
            >
              <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
            </svg>
          </button>
          <div className="treeSelect_selectable">
            <input id="chefo-elevation.dxf" type='checkbox' />
            <label htmlFor="chefo-elevation.dxf">chefo-elevation.dxf</label>
          </div>
        </div>
        
        <div className="treeSeelct_leaf">
          <div className='treeSelect_field'>
            <div className='treeSelect_input'>
              <input type="number" min="-100" max="100" step="0.1" value="0" />
              <input type="number" min="-100" max="100" step="0.1" value="0" />
              <input type="number" min="-100" max="100" step="0.1" value="0" />
            </div>
            <div className='treeSelect_input'>
              <input type="number" min="-100" max="100" step="0.1" value="0" />
              <input type="number" min="-100" max="100" step="0.1" value="0" />
              <input type="number" min="-100" max="100" step="0.1" value="0" />
            </div>
            <div className='treeSelect_input'>
              <input type="number" min="-100" max="100" step="0.1" value="0" />
              <input type="number" min="-100" max="100" step="0.1" value="0" />
              <input type="number" min="-100" max="100" step="0.1" value="0" />
            </div>
          </div>

          <div className='treeSelect_title'>
            <div className='treeSelect_node'>
              <div className='treeSelect_node_item active'>
                <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="16" height="6" x="2" y="2" rx="2"></rect>
                  <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
                  <rect width="4" height="6" x="8" y="16" rx="1"></rect>
                </svg>
                <div className="treeSelect_title_text" title="0433_A_E_Front_GA - CDA-014 Colour Hatch  Fill #2">
                  0433_A_E_Front_GA - CDA-014 Colour Hatch  Fill #2
                </div>
              </div>
             
            </div>

            <div className='treeSelect_node'>
              <div className='treeSelect_node_item active'>
                <svg class="shrink-0 size-4 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="16" height="6" x="2" y="2" rx="2"></rect>
                  <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
                  <rect width="4" height="6" x="8" y="16" rx="1"></rect>
                </svg>
                <div className="treeSelect_title_text" title="0433_A_E_Front_GA - CDA-014 Colour Hatch  Fill #2">
                  0433_A_E_Front_GA - CDA-014 Colour Hatch  Fill #2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreeSeletPure