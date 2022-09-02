import React, { useRef, useState } from "react";
import "./NewFile.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { PostDoc } from "../../reduxToolkit/docslice/DocSlice";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Modal, Button } from "react-bootstrap";
import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../media/cloud-upload-regular-240.png";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";

const NewFile = ({ ping, setPing }) => {
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [file, setDoc] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const handleUpload = async (e) => {
    e.preventDefault();
    setFileList(e.target.files[0]);
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/upload0",
        formData,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      setDoc(data.file);
      setLoading(false);
    } catch (err) {
      // alert(err.response.data.msg);
    }
  };
  const fileRemove = () => {
    setFileList(0);
    setDoc({});
  };
  const handelAdd = (e) => {
    e.preventDefault();
    dispatch(PostDoc({ file, text }, dispatch));
    fileRemove();
    setPing(!ping);
  };
  const showFile = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setText(text);
    };
    reader.readAsBinaryString(e.target.files[0]);
    console.log(text);
  };
  return (
    <div className="newFile">
      <button
        className="btn btn-success rounded-pill newFilebtn"
        onClick={handleShow}
      >
        <AddCircleIcon />
        New
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <>
            {fileList ? (
              <>
                {loading ? (
                  <div className="loading1">
                    <div></div>
                  </div>
                ) : (
                  <div className="drop-file-preview__item">
                    <img
                      src={
                        ImageConfig[fileList.type.split("/")[1]] ||
                        ImageConfig["default"]
                      }
                      alt=""
                    />
                    <div className="drop-file-preview__item__info">
                      <p>{fileList.name}</p>
                      <p>{fileList.size}B</p>
                    </div>
                    <span className="dropdel" onClick={fileRemove}>
                      <DeleteIcon style={{ color: red[600] }} />
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                <div className="drop-file-input__label">
                  <img src={uploadImg} alt="" />
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    handleUpload(e);
                    showFile(e);
                  }}
                />
              </div>
            )}
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={!loading && file.filePath ? false : true}
            variant="primary"
            onClick={(e) => {
              handleClose();
              handelAdd(e);
            }}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </div>
  );
};

export default NewFile;
