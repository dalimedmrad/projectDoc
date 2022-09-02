import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader/Loader";
import { getallDocs } from "./reduxToolkit/docslice/DocSlice";
import SideIcons from "./Components/sideIcons";
const Component = lazy(() => import("./Components/filesView/FilesView"));
const Component1 = lazy(() => import("./Components/readfile/ReadFile"));

const App = () => {
  const dispatch = useDispatch();
  const [ping, setPing] = useState(false);

  useEffect(() => {
    dispatch(getallDocs());
  }, [dispatch, ping]);

  return (
    <div>
      <div className="app__main">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              exact
              path="/"
              element={<Component ping={ping} setPing={setPing} />}
            />
            <Route exact path="/file/:id" element={<Component1 />} />
          </Routes>
        </Suspense>
        {/* <SideIcons /> */}
      </div>
    </div>
  );
};

export default App;

// import * as React from "react";
// import {
//   DocumentEditorContainerComponent,
//   Toolbar,
// } from "@syncfusion/ej2-react-documenteditor";
// import { DocumentEditorComponent } from "@syncfusion/ej2-react-documenteditor";

// export default class App extends React.Component {
//   onImportClick() {
//     //Open file picker.
//     document.getElementById("file_upload").click();
//   }
//   onFileChange(e) {
//     if (e.target.files[0]) {
//       //Get selected file.
//       let file = e.target.files[0];
//       if (file.name.substr(file.name.lastIndexOf(".")) !== ".sfdt") {
//         this.loadFile(file);
//       }
//     }
//   }
//   loadFile(file) {
//     let ajax = new XMLHttpRequest();
//     ajax.open("POST", "https://localhost:4000/api/documenteditor/Import", true);
//     ajax.onreadystatechange = () => {
//       if (ajax.readyState === 4) {
//         if (ajax.status === 200 || ajax.status === 304) {
//           // open SFDT text in document editor
//           this.documenteditor.open(ajax.responseText);
//         }
//       }
//     };
//     let formData = new FormData();
//     formData.append("files", file);
//     ajax.send(formData);
//   }
//   render() {
//     return (
//       // <DocumentEditorContainerComponent

//       //   id="container"
//       //   height={"590px"}
//       //   serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
//       //   enableToolbar={true}
//       // />
//       <div>
//         <input
//           type="file"
//           id="file_upload"
//           accept=".dotx,.docx,.docm,.dot,.doc,.rtf,.txt,.xml,.sfdt"
//           onChange={this.onFileChange.bind(this)}
//         />
//         <button onClick={this.onImportClick.bind(this)}>Import</button>
//         <DocumentEditorComponent
//           id="container"
//           height={"330px"}
//           ref={(scope) => {
//             this.documenteditor = scope;
//           }}
//         />
//       </div>
//     );
//   }
// }
