import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { PiDogFill } from "react-icons/pi";
import Context from "../Context";
import { supabase } from "../supabaseClient";

const SignUp = () => {
  //   const { signUpNewUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  //   const handleSignUp = () => {
  //     const result = signUpNewUser(email, password);
  //     if (result.success) {
  //     //   navigate("/");
  //       console.log(result.data);
  //     //   navigate('/');
  //     } else {
  //       console.log("error occured in sign in page");
  //       navigate("/");
  //       // console.log()
  //       console.log(result.error);
  //     }
  //   };
  const signUpNewUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      //   console.log(error.message);
      if (error.message === "User already registered") {
        navigate("/search");
      }
      //   return { success: false, error: error };
    } else {
      // return { success: true, data: data };
      navigate("/profile");
    }
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
          Sign Up
        </Typography>

        <TextField
          label="Email address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={signUpNewUser}>
          Sign In
        </Button>
        <Divider />
        <Button variant="outlined" onClick={() => navigate("/")}>
          Already have an account, Sign In
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;
