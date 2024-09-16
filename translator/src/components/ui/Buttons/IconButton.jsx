import React from 'react'

function IconButton({Icon, onCLick}) {
  return (
    <span className='cursor-pointer flex items-center space-x-2 ' onClick={onCLick}>
     <Icon size={22} className='text-gray-400'/>   
    </span>
  )
}

export default IconButton