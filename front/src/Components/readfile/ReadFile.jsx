import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import "./content-styles.css";
import { UpdateDoc } from "../../reduxToolkit/docslice/DocSlice";
const ReadFile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [document, setDocument] = useState({});
  const Documents = useSelector((state) => state.Doc.allDocuments);
  useEffect(() => {
    setDocument(Documents?.filter((el) => el._id === id)[0]);
  }, [Documents, id]);
  const handelchange = (e, editor) => {
    const data = editor.getData();
    setDocument({ ...document, text: data });
    dispatch(UpdateDoc(document));
  };
  return (
    <>
      {document?.text ? (
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ReadFile;
