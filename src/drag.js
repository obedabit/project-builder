import savePage from "./savePage";
import Test from "./components/elements/Test";
import Button from "./components/elements/Button";
import Image from "./components/elements/Image";
import Input from "./components/elements/Input";
import Link from "./components/elements/Link";
import Nav from "./components/elements/Nav";
import RadioButton from "./components/elements/RadioButton";
import Section from "./components/elements/Section";
import Video from "./components/elements/Video";
import ReactDOMServer from "react-dom/server";

let tempElement = null;
let inIframe = false;
let oldBackground = "";
const mousePosition = {
  x: 0,
  y: 0,
};

const dropPosition = (targetNode) => {
  const targetRec = targetNode.getBoundingClientRect();

  if (
    targetNode === document.querySelector("iframe").contentWindow.document.body
  )
    return "add";

  let position = "";
  if (targetRec.top + targetRec.height / 3 > mousePosition.y) {
    position = "before";
  } else if (
    targetRec.top + targetRec.height / 3 < mousePosition.y &&
    targetRec.top + targetRec.height - targetRec.height / 3 < mousePosition.y
  ) {
    position = "after";
  } else {
    position = "add";
  }

  return position;
};

const SelectTag = (element) => {
  let tag = null;
  switch (element.id) {
    case "section":
      tag = <Section />;
      break;
    case "navbar":
      tag = <Nav />;
      break;
    case "link":
      tag = <Link />;
      break;
    case "button":
      tag = <Button />;
      break;
    case "radio-button":
      tag = <RadioButton />;
      break;
    case "input-text":
      tag = <Input />;
      break;
    case "image":
      tag = <Image />;
      break;
    case "video":
      tag = <Video />;
      break;
    default:
      tag = <Test />;
      break;
  }

  const htmlString = ReactDOMServer.renderToStaticMarkup(tag);
  const el = new DOMParser().parseFromString(htmlString, "text/html");
  tag = el.body.firstChild;

  tag.draggable = "true";
  return tag;
};

const dragStart = (e) => {
  if (e.target.ownerDocument.querySelector("body").id === "target") {
    inIframe = true;
    tempElement = e.target;
  } else {
    inIframe = false;
    tempElement = SelectTag(e.target);
  }
};

const dragEnter = (e) => {
  oldBackground = e.target.style.background;
  e.target.style.background = "#afc7ff";
};

const dragLeave = (e) => {
  e.target.style.background = oldBackground;
};

const drop = (e) => {
  e.preventDefault();
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;

  let clone = null;

  if (e.target === tempElement) {
    e.target.style.background = oldBackground;
    return;
  }

  clone = tempElement;
  switch (dropPosition(e.target)) {
    case "before":
      e.target.parentNode.insertBefore(tempElement, e.target);
      break;
    case "after":
      e.target.parentNode.insertBefore(tempElement, e.target.nextSibling);
      break;
    default:
      e.target.appendChild(clone);
      break;
  }

  if (!inIframe) {
    clone.id = Math.random().toString(36).substr(2, 5);
  }

  e.target.style.background = oldBackground;
  e.target.style.outline = "1px dotted #2196f3";
  savePage(false);
};

const dragOver = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
};

export { drag, dragStart, dragOver, drop, dragLeave, dragEnter };