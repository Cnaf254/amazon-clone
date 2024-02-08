import React from 'react'
import {FadeLoader} from 'react-spinners'
function Loader() {
  return (
    <div
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50vh",
      }}
    
    >

<FadeLoader color="#36d7b7" />
    </div>
  )
}

export default Loader