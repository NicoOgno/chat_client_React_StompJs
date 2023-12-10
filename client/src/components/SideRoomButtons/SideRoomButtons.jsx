import React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'
import styles from './sideroombuttons.module.css'

const SideRoomButtons = ({ selectChatRoom }) => {

  const buttons = [
    <button key='code' className={styles.sideRoomButtons}  onClick={() => selectChatRoom('Code') } >Code</button>,
    <button key='cooking' className={styles.sideRoomButtons}  onClick={() => selectChatRoom('Cooking') } >Cooking</button>,
    <button key='sports' className={styles.sideRoomButtons}  onClick={() => selectChatRoom('Sports') } >Sports</button>,
    <button key='nature' className={styles.sideRoomButtons}  onClick={() => selectChatRoom('Nature') } >Nature</button>,
  ]
  return (
    <div className={styles.sideBtnsContainer}>
      <ButtonGroup
        orientation='vertical'
        aria-label='vertical outlined button group'
      >
        {buttons}
      </ButtonGroup>     
    </div>
  )
}

export default SideRoomButtons