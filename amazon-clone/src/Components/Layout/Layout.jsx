import React from 'react'
import Header from "../Header/Header"
function Layout({children}) {
  return (
    <div>
<Header />
{children}
    </div>
  )
}

export default Layout