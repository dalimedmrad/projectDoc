import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/CustomButtons/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
// nodejs library to set properties for components

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CourseInstructorModal from "./CourseInstructorModal";

// material-ui icons
import MoreVert from "@material-ui/icons/MoreVert";

import Tooltip from "@material-ui/core/Tooltip";

import { Form, Input, Checkbox } from "antd";
import { Upload, message, notification } from "antd";

import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarStyle.js";
import buttonStyles from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";
import { Link } from "react-router-dom";
import { getId } from "../../reduxToolkit/features/course/CoursesSlice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import zIndex from "@material-ui/core/styles/zIndex";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import GroupModal from "./GroupModal";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import UpdateGroupAssessmentModal from "../Components/UpdateGroupAssessmentModal";
import ImportQuestionNotesModal from "../Components/ImportQuestionNotesModal";
import { ExportNoteQuestion } from "../../reduxToolkit/features/assessment/AssessmentSlice";
const useStyles = makeStyles(styles);
const useButtonStyles = makeStyles(buttonStyles);

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

export default function DropDownButtonExportImportQuestionNotes(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // console.log(props.course,"props.course")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openErrorModal, setOpenErrorModal] = React.useState(false);
  const [handledError, setHandledError] = React.useState("");
  const handleOpenErrorModal = () => {
    setOpenErrorModal(true);
  };
  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const openNotificationWithIcon = (type, msg) => {
    notification[type]({
      message: type,
      description: msg,
      top: 50,
      duration: 2,
    });
  };

  const onFinish = async () => {
    console.log("hello from here");
    let ExportData = {
      // group_id:
      // assessmentMethod-id:
      // course_id:
    };
    const resultAction = await dispatch(ExportNoteQuestion(ExportData));
    if (ExportNoteQuestion.fulfilled.match(resultAction)) {
      openNotificationWithIcon("success", `success Export`);
      handleClose();
    } else {
      if (resultAction.payload) {
        console.log(
          "resultAction.payload from component",
          resultAction.payload
        );
        setHandledError(resultAction.payload);
        handleOpenErrorModal();
      } else {
        console.log("resultAction.error  from component", resultAction.error);
        setHandledError(resultAction.error);
        handleOpenErrorModal();
      }
    }
  };
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        variant="contained"
        color="primary"
        onClick={handleClick}
        justIcon
        round
        aria-haspopup="true"
      >
        <MoreVert />
      </Button>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ImportQuestionNotesModal
          courseID={props.courseID}
          handleClose={handleClose}
          course={props.course}
          program={props.program}
          semester_id={props.semester_id}
          group_name={props.group_name}
        />
        <MenuItem
          onClick={() => {
            onFinish();
            // props.handleClose();
          }}
          style={{ color: "#AC79B0" }}
        >
          {t("Export Data")}
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
