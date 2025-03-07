import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { PiDogFill } from "react-icons/pi";
import Context from "../Context";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
const SignIn = () => {
  // const { signIn } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const handleSignIn = () => {
  //   const result = signIn(email, password);
  //   if (!result.success) {
  //     console.log(result.data);
  //     console.log('wrong credentials');
  //     navigate("/search");
  //   }
  //   else{
  //     console.log("error occured in sign in page");
  //     // navigate("/search");
  //     // console.log()
  //     console.log(result.error);
  //   }
  // };
  const signIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error(error.message);
        // return {success:false,error};
        if (
          error.status === 400 &&
          error.message !== "Invalid login credentials"
        ) {
          navigate("/signup");
        }
        // else if(error.status === 422){
        //   // navigate()
        //   alert('wrong credentials');
        // }
      } else {
        console.log("success");
        navigate("/search");
      }
      //   return {success:true,data};
    } catch (error) {
      console.log(error);
      alert("wrong credentials");
      // navigate('/signup');
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
          Sign In
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
        <Button variant="contained" onClick={signIn}>
          Sign In
        </Button>
        <Divider />
        <Button variant="outlined" onClick={() => navigate("/signup")}>
          New to the website Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default SignIn;
