import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { PiDogFill } from "react-icons/pi";
import Context from "../Context";
import {supabase} from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { session } = useContext(Context);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleProfle = async () => {
    const { data, error } = await supabase
      .from("User")
      .insert([{ user_id: session.user.id, name: name, password: password }])
      .select();

      console.log(error);
      navigate('/search');
  };

  return (
    <div
      style={{
        minWidth: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFDEE9",
        backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          minWidth: "40%",
          maxWidth: "50%",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          <PiDogFill size={50} />
        </Typography>
        <Typography
          sx={{ fontSize: "2.2rem", fontWeight: "500", textAlign: "center" }}
        >
          Fill your details
        </Typography>

        <TextField
          label="Full name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleProfle}>Submit</Button>
        {/* <Divider />
      <Button variant="outlined">New to the website Sign Up</Button> */}
      </Box>
    </div>
  );
};

export default Profile;
