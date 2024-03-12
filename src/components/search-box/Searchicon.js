import React from 'react'
import useWindowSize from "hooks/useWindowSize";
const Searchicon = () => {
  const window=useWindowSize()
  return (
    <div>
<svg width={window<500?"20":"24"} height={window<500?"20":"24"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22 22L20 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

    </div>
  )
}

export default Searchicon