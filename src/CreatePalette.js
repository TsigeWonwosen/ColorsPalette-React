import React, { useEffect } from "react";

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
import TextField from "@material-ui/core/TextField";
import { arrayMove } from "react-sortable-hoc";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { SketchPicker } from "react-color";

import DraggableColorList from "./DraggableColorList";

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
  const [newColor, setColor] = React.useState("#fefefe");
  const [colors, setColors] = React.useState(props.paletteColors[0].colors);
  const [paletteName, setPaletteName] = React.useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorName", (value) => {
      return colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });

    ValidatorForm.addValidationRule("isColor", (value) => {
      return colors.every(({ color }) => color !== newColor);
    });
  }, [colorName, colors, newColor]);

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
    setColors(colors.filter((color) => color.name !== name));
  }
  const onSortEnd = ({ oldIndex, newIndex }) => {
    // setColors(({ colors }) => ({
    //   colors: arrayMove(colors, oldIndex, newIndex),
    // }));

    setColors(arrayMove(colors, oldIndex, newIndex));
  };
  const handlePalette = (e) => {
    setPaletteName(e.target.value);
  };
  const handlePaletteSubmit = () => {
    let NewPalette = {
      paletteName,
      id: paletteName.toLocaleLowerCase().replace(/ /g, "-"),
      emoji: "(*Emoji*)",
      colors: colors,
    };
    props.addNewPalette(NewPalette);
    props.history.push("/");
  };
  const clearPalette = () => {
    setColors([]);
  };

  function addRandomColor() {
    const allColors = props.paletteColors.map((p) => p.colors).flat();
    let rand;
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
    }
    setColors((prvState) => [...prvState, randomColor]);
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

            <Typography
              variant='h5'
              noWrap
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                textAlign: "center",
              }}
            >
              <span>Create Palette</span>
              <Link to='/'>
                {" "}
                <ArrowBackIosSharpIcon /> Back{" "}
              </Link>
              <form className={classes.root} noValidate autoComplete='off'>
                <TextField
                  id='paletteName'
                  label='Palette Name'
                  name='paletteName'
                  onChange={handlePalette}
                  variant='filled'
                />
              </form>
              <Button
                variant='contained'
                color='primary'
                onClick={handlePaletteSubmit}
              >
                Create New Palette
              </Button>
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
                onClick={clearPalette}
              >
                Clear Palette
              </Button>
              <Button
                className={classes.button}
                variant='contained'
                color='secondary'
                onClick={addRandomColor}
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
            <DraggableColorList
              colors={colors}
              deleteColor={deleteColor}
              axis='xy'
              onSortEnd={onSortEnd}
            />
          </Typography>
        </main>
      </div>
    </div>
  );
}
