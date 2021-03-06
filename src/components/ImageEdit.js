import React, { useContext, useRef, useEffect } from "react";
import { ElementContext2 } from "../ElementContext";
import { MdClose } from "react-icons/md";
import resize from "../resize";
import savePage from "../savePage";

export default function ImageEdit(props) {
  const [selectedTarget] = useContext(ElementContext2);
  const edit = useRef(null);
  const fileInput = useRef(null);
  const imageURL = useRef(null);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTarget.dataset.name !== "image") return;
    if (fileInput && fileInput.current.files[0]) {
      getBase64(fileInput.current.files[0]).then((result) => {
        localStorage.setItem(selectedTarget.id + "-img", result);
        selectedTarget.src = result;
        savePage(false);
      });
    } else {
      if (imageURL.current) {
        selectedTarget.src = imageURL.current.value.toString();
      }
    }
    savePage(false);
  };

  const hide = () => {
    props.hide(false);
  };

  useEffect(() => {
    if (selectedTarget && edit.current) {
      resize(edit.current, selectedTarget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  if (props.show) {
    return (
      <div ref={edit} className="image-edit shadow" data-panel>
        <div className="media-label ">
          <span>Select Image</span>
          <MdClose onClick={hide} />
        </div>
        <div>
          <form className="media-form" onSubmit={handleSubmit}>
            <input type="file" accept="image/*" ref={fileInput} />
            <input
              className="shadow"
              type="text"
              placeholder="URL"
              ref={imageURL}
            />
            <input className="shadow" type="submit" value="Add Image" />
          </form>
        </div>
      </div>
    );
  }
  return null;
}
