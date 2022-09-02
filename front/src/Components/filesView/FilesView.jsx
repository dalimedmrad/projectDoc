import React, { useState } from "react";
import "./FilesView.css";
import { useSelector } from "react-redux";
import FileCard from "../filecard/FileCard";
import Header from "../header/index";

const FilesView = ({ ping, setPing }) => {
  const Documents = useSelector((state) => state.Doc.allDocuments);
  const [filter, setFilter] = useState("");
  return (
    <div className="fileView">
      <Header
        filter={filter}
        setFilter={setFilter}
        ping={ping}
        setPing={setPing}
      />
      <div className="fileView1">
        {Documents?.filter((el) =>
          el.file.fileName.toLowerCase().includes(filter.toLowerCase())
        ).map((el) => (
          <FileCard el={el} ping={ping} setPing={setPing} />
        ))}
      </div>
    </div>
  );
};

export default FilesView;
