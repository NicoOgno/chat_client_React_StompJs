import React from 'react'
import styles from './sidebar.module.css'
//import { AppsIcon } from '@mui/icons-material/Apps'
//import { CasinoTwoToneIcon } from '@mui/icons-material/CasinoTwoTone'
//import { Button } from '@mui/material'

const Sidebar = () => {
  const sidebarRoomButtonsItems = [
    {
      name:'Code',
      icon: 'CasinoTwoToneIcon'
    },
    {
      name:'Cooking',
      icon:'CasinoTwoToneIcon'
    },
    {
      name:'Sports',
      icon:'CasinoTwoToneIcon'
    },
    {
      name:'Nature',
      icon:'CasinoTwoToneIcon'
    },
  ]
  return (
    <>
        <div className={styles.sidebarContainer}>
          <div className={styles.sidebar}>
            <div className={styles.topSection}>
              <h1 className={styles.logo}>Logo</h1>
              <div className={styles.bars}>
                MUI icon
              </div>
            </div>
            {
              sidebarRoomButtonsItems.map((srbi, indx) => {
                return (
                <button key={indx} className={styles.sbBtn} >
                  <div className="icon">{srbi.icon}</div>
                  <div className="btn_name">{srbi.name}</div>
                </button>
                )
              })
            }
          </div>
        </div>
    </>
  )
}

export default Sidebar