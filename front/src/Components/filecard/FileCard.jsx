import React, { useEffect, useRef, useState } from "react";
import "./FileCard.css";
import Swal from "sweetalert2";
import DeleteIcon from "@material-ui/icons/Delete";
import red from "@material-ui/core/colors/red";
import { Document, Page, pdfjs } from "react-pdf";
import PDF from "../../media/images.png";
import file from "../../media/file-blank-solid-240.png";
import docs from "../../media/word.png";
import imgicon from "../../media/imgicon.png";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { DeleteDoc } from "../../reduxToolkit/docslice/DocSlice";
import { Modal } from "react-bootstrap";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import WebViewer from "@pdftron/webviewer";
import { Link, useNavigate } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FileCard = ({ el, setPing, ping }) => {
  const navigate = useNavigate();
  const viewerDiv = useRef();
  const dispatch = useDispatch();
  const handelDel = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: `${el.file.fileName} will be deleted!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteDoc(el._id, dispatch));
        setPing(!ping);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  // const handleGo = () => {
  //   navigate(`/file/${el._id}`, {
  //     state: { el },
  //   });
  // };
  // const defaultLayoutPluginInstance = defaultLayoutPlugin({
  //   sidebarTabs: (defaultTabs) => [
  //     // Remove the attachments tab (\`defaultTabs[2]\`)
  //     defaultTabs[0], // Bookmarks tab
  //   ],
  //   setInitialTab: (doc) => Promise.resolve(0),
  // });
  useEffect(() => {
    WebViewer(
      {
        path: "lib",
        initialDoc: `${`http://localhost:5000/${el.file.filePath.substring(
          7
        )}`}`,
      },
      viewerDiv.current
    );
  });

  return (
    <div className="fileCard">
      <div className="fileCardtop">
        {el.file.fileType === "application/pdf" && (
          <Document
            onClick={handleShow}
            file={`http://localhost:5000/${el.file.filePath.substring(7)}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page height="150" width="170" pageNumber={pageNumber} />
          </Document>
        )}
        {el.file.fileType.includes("image") && (
          <img
            alt=""
            className="img1"
            onClick={handleShow}
            src={`http://localhost:5000/${el.file.filePath.substring(7)}`}
          />
        )}
        {el.file.fileType.includes("officedocument") && (
          <img className="img1" alt="" onClick={handleShow} src={docs} />
        )}
        {el.file.fileType === "text/plain" && (
          <Link target="_blank" to={`/file/${el._id}`} state={{ el: el }}>
            {" "}
            <img className="img1" alt="" src={file} />
          </Link>
        )}
        <span
          className="drop-file-preview__item__del"
          onClick={(e) => handelDel(e)}
        >
          <DeleteIcon style={{ color: red[600] }} />
        </span>

        <Modal
          show={show}
          fullscreen={fullscreen}
          onHide={() => setShow(false)}
        >
          <Modal.Header closeButton>
            Uploaded at : {el.createdAt.substring(0, 19).replace("T", " ")}
          </Modal.Header>
          <Modal.Body>
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              <Viewer
                plugins={[defaultLayoutPluginInstance]}
                fileUrl={`http://localhost:5000/${el.file.filePath.substring(
                  7
                )}`}
              />
            </Worker> */}
            <div ref={viewerDiv} style={{ height: "100vh" }}></div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="fileCardbottom">
        {el.file.fileType === "application/pdf" && (
          <Avatar className="imgs" src={PDF} alt="" />
        )}
        {el.file.fileType.includes("image") && (
          <Avatar className="imgs" src={imgicon} alt="" />
        )}
        {el.file.fileType.includes("word") && (
          <Avatar className="imgs" src={docs} alt="" />
        )}
        {el.file.fileType === "text/plain" && (
          <Avatar className="imgs" src={file} alt="" />
        )}
        {el.file.fileName.length > 20 ? (
          <p data-title={el.file.fileName}>
            {`${el.file.fileName.substring(0, 20)}...`}
          </p>
        ) : (
          <p>{el.file.fileName}</p>
        )}
      </div>
    </div>
  );
};

export default FileCard;
