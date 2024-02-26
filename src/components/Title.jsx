import React from 'react'

const Title = ({children, themeColor}) => {
  return (
    <h1 className={`text-lg font-semibold`} style={{color:themeColor}}>{children}</h1>
  )
}

export default Title