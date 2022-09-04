import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import "./content-styles.css";
import { getOneById, UpdateDoc } from "../../reduxToolkit/docslice/DocSlice";
import axios from "axios";
const ReadFile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [document, setDocument] = useState({});
  //const Documents = useSelector((state) => state.Doc.allDocuments);
  const DoMSG = useSelector((state) => state.Doc.docMSG);
  //const doc = useSelector((state) => state.Doc.document);

  const data = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/doc/${id}`);
      setDocument(data.response);
      console.log(document);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //setDocument(Documents?.filter((el) => el._id === id)[0]);
    data();
  }, []);
  const handelchange = (e, editor) => {
    const data = editor.getData();
    setDocument({ ...document, text: data });
    dispatch(UpdateDoc(document, dispatch));
    //data();
  };

  return (
    <>
      {document.text != null ? (
        <div className="doccpage">
          <div className="docctit">
            <div>{DoMSG ? DoMSG : null}</div>
            <div>{`Derniere modification 
              ${document?.updatedAt?.substring(0, 16).replace("T", " ")}`}</div>
          </div>
          <div className="docc">
            <CKEditor
              class="ck-content"
              editor={ClassicEditor}
              data={`${document?.text}`}
              // onReady={(editor) => {
              //   // You can store the "editor" and use when it is needed.
              //   console.log("Editor is ready to use!", editor);
              // }}
              onChange={handelchange}
              // onBlur={(event, editor) => {
              //   console.log("Blur.", editor);
              // }}
              // onFocus={(event, editor) => {
              //   console.log("Focus.", editor);
              // }}
            />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ReadFile;
