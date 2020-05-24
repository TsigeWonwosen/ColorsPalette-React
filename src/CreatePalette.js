import React, { useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Button from "@material-ui/core/Button";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { SketchPicker } from "react-color";

import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  button: {
    margin: theme.spacing(1),
    fontSize: "13px",
  },
}));

export default function CreatePalette(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [colorName, setName] = React.useState("");
  const [newColor, setColor] = React.useState("#333");
  const [colors, setColors] = React.useState([
    {
      name: "rgb-blue",
      color: "#417505",
    },
    {
      name: "Hex-red",
      color: "#B8E986",
    },
    {
      name: "rgba - orange",
      color: "#f4f4ee",
    },
  ]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorName", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColor", (value) => {
      return colors.every(({ color }) => color !== newColor);
    });
  }, [colorName]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChangeComplete = (color) => {
    setColor(color.hex);
  };
  const handleChange = (evt) => {
    console.log(colorName);
    setName(evt.target.value);
  };
  const addColors = () => {
    let newColorPick = {};
    newColorPick.name = colorName;
    newColorPick.color = newColor;
    setColors((prvSt) => [newColorPick, ...prvSt]);
    setName("");
  };
  function deleteColor(name) {
    // let newColors = colors.filter((color) => color.id !== id);
    colors.splice(name, 1);
    setColors(colors);
  }

  return (
    <div>
      <button onClick={() => props.history.push("/")}> Back</button>
      <h1>Create Palette ...</h1>

      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h5' noWrap>
              Create Palette
              <Link to='/'>Back to Home</Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Typography variant='h5'>Design Your Palette</Typography>
            <ListItem>
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
              >
                Clear Palette
              </Button>
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
              >
                Random Color
              </Button>
            </ListItem>
            <ListItem>
              <SketchPicker
                color={newColor}
                onChangeComplete={handleChangeComplete}
              />
            </ListItem>
            <ValidatorForm
              useRef='form'
              onSubmit={addColors}
              onError={(errors) => console.log(errors)}
            >
              <TextValidator
                label='New Color'
                onChange={handleChange}
                name='colorName'
                value={colorName}
                validators={["required", "isColorName", "isColor"]}
                errorMessages={[
                  "this field is required",
                  "Color Name is not valid",
                  "Color is already Taken",
                ]}
              />

              <Button
                className={classes.button}
                variant='contained'
                type='submit'
                style={{ background: newColor }}
              >
                {" "}
                ADD COLOR
              </Button>
            </ValidatorForm>

            <Divider />
            {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />

          <Typography paragraph>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              {colors.map((color) => (
                <DraggableColorBox
                  color={color.color}
                  key={color.name}
                  name={color.name}
                  deleteColor={deleteColor}
                  id={color.name}
                />
              ))}
            </div>
          </Typography>
        </main>
      </div>
    </div>
  );
}
