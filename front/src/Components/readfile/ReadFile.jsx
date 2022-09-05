import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import "./content-styles.css";
import { UpdateDoc } from "../../reduxToolkit/docslice/DocSlice";
import axios from "axios";
import Swal from "sweetalert2";

const ReadFile = () => {
  // const dispatch = useDispatch();
  const location = useLocation();
  // const { id } = useParams();
  const { el } = location.state;
  const [document, setDocument] = useState({});
  const [updatedoc, setupdatedoc] = useState(false);
  //const Documents = useSelector((state) => state.Doc.allDocuments);
  //const DoMSG = useSelector((state) => state.Doc.docMSG);
  //const doc = useSelector((state) => state.Doc.document);

  // const data = async () => {
  //   try {
  //     const { data } = await axios.get(`http://localhost:5000/api/doc/${id}`);
  //     setDocument1(data.response);
  //     setDocument(data.response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const update = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/doc/${document._id}`,
        document
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setupdatedoc(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handelchange = (e, editor) => {
    setupdatedoc(true);
    setDocument({ ...document, text: editor.getData() });
    // update();
    //dispatch(UpdateDoc(document));
  };
  useEffect(() => {
    setDocument(el);
  }, []);

  return (
    <>
      {el?._id ? (
        <div className="doccpage">
          <div className="docctit">
            <button
              disabled={updatedoc ? false : true}
              onClick={update}
              className="btn btn-success"
            >
              Sauvgarder
            </button>
          </div>
          <div className="docc">
            <CKEditor
              class="ck-content"
              editor={ClassicEditor}
              data={`${el?.text}`}
              // onReady={(editor) => {
              //   // You can store the "editor" and use when it is needed.
              //   console.log("Editor is ready to use!", editor);
              // }}
              onChange={(e, editor) => {
                handelchange(e, editor);
              }}
              // onBlur={}
            />
            {/* {document?.text} */}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ReadFile;
