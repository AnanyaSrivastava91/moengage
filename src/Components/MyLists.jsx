import { Typography } from '@mui/material'
import React from 'react'

const MyLists = () => {
  return (
    <div style={{
        height:"100vh",
        backgroundColor: "#FFDEE9",
        backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "20px",
    }}>
        <Typography sx={{fontSize:"2.2rem",fontWeight:"500"}}>
            My Lists
        </Typography>
    </div>
  )
}

export default MyLists