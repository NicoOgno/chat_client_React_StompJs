import React from 'react'
import styles from './roombuttons.module.css'

const RoomButtons = ({ selectChatRoom }) => {
  return (
    <>
      <div className={styles.roomsButtonContainer}>
          <div className={styles.buttonWrapper} >
          <button className={styles.roomButtons}  onClick={() => selectChatRoom('Code') } >Code</button>
          <button className={styles.roomButtons}  onClick={() => selectChatRoom('Cooking') } >Cooking</button>
          <button className={styles.roomButtons}  onClick={() => selectChatRoom('Sports') } >Sports</button> 
          <button className={styles.roomButtons}  onClick={() => selectChatRoom('Nature') } >Nature</button>
          </div>
      </div>
    </>
  )
}

export default RoomButtons;