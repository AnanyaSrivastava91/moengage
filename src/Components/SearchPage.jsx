import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Context from "../Context";
import { supabase } from "../supabaseClient";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const SearchPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { session } = useContext(Context);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [images, setImages] = useState([]);
  const [listName, setListName] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [openLists, setOpenLists] = React.useState(false);
  const [lists, setLists] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpenLists = () => {
    setOpenLists(true);
  };

  const handleCloseLists = () => {
    setOpenLists(false);
  };

  const handleGetName = async () => {
    let { data: User, error } = await supabase.from("User").select("name");
    setName(User[0].name);
  };

  const handleGetImage = async () => {
    let { data: images, error } = await supabase
      .from("images")
      .select("*")
      .like("image_url", `%${search}%`);
    // console.log(search);
    setImages(images || []);
    // console.log(images);
    console.log(error);
  };

  const handleGetLists = async () => {
    let { data: lists, error } = await supabase
      .from("Lists")
      .select("*")
      .eq("user_id", session.user.id);
    console.log(lists);
    console.log(error);
  };

  const handleCheckboxChange = (image) => {
    setSelectedImage((prev) =>
      prev.some((img) => img.image_url === image.image_url)
        ? prev.filter((img) => img.image_url !== image.image_url)
        : [...prev, image]
    );
  };

  const handleCreateLists = async () => {
    const { data, error } = await supabase
      .from("Lists")
      .insert([{ list_name: listName, user_id: session.user.id }])
      .select();
    console.log(error);
  };

  useEffect(() => {
    handleGetName();
    handleGetLists();
    // console.log(selectedImage);
    console.log(session);
  }, []);

  useEffect(() => {
    handleGetImage();
  }, [search]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFDEE9",
        backgroundImage: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box>
        <Typography sx={{ fontSize: "2.2rem", fontWeight: "500" }}>
          Welcome Ananya Srivastava,
        </Typography>
        <Typography>
          Here you can search for images of dogs based on status code and we
          hope you can learn something about status codes while searching for
          dog images
        </Typography>
      </Box>
      <Box sx={{ display: "flex", minWidth: "60%", gap: "20px" }}>
        <TextField
          variant="outlined"
          label="Search for status codes"
          fullWidth
          sx={{ borderColor: "black" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" onClick={handleGetImage}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          variant="outlined"
          sx={{ ":hover": { backgroundColor: "black", color: "white" } }}
          onClick={handleClickOpen}
        >
          + Create List
        </Button>
        <Button
          variant="outlined"
          sx={{ ":hover": { backgroundColor: "black", color: "white" } }}
          onClick={() => navigate("/lists")}
        >
          My Lists
        </Button>
        <Button
          variant="outlined"
          sx={{ ":hover": { backgroundColor: "black", color: "white" } }}
          onClick={handleClick}
        >
          Add to List
        </Button>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // maxWidth={"lg"}
        fullWidth
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Create a List"}</DialogTitle>
        <DialogContent sx={{ padding: "20px" }}>
          <DialogContentText id="alert-dialog-slide-description">
            <TextField
              variant="outlined"
              label="List name"
              fullWidth
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              handleCreateLists, handleClose;
            }}
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openLists}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseLists}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Select List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            </Menu>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLists}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {images.map((image) => (
            <Grid
              size={3}
              minWidth={270}
              key={image.image_url}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Item>
                <img
                  src={image.image_url}
                  alt={image.status_code}
                  width={256}
                  height={256}
                />
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedImage.some(
                          (img) => img.image_url === image.image_url
                        )}
                        onChange={() => handleCheckboxChange(image)}
                      />
                    }
                    label="Add to List"
                  />
                </FormGroup>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default SearchPage;
