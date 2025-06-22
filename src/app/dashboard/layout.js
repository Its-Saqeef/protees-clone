import React from 'react'
import Nav from '@/components/Dashboard/Dashboard-Nav'
function layout({children}) {
  return (
    <div>
        <Nav />
      {children}
    </div>
  )
}

export default layout
