import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBlog } from '@fortawesome/free-solid-svg-icons'

function Logo() {
  return (
<FontAwesomeIcon icon={faBlog} style={{ color: "#74C0FC", fontSize: '1.5rem' }} />
  )
}

export default Logo