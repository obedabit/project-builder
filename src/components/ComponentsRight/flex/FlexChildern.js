import React, { useState, useContext, useEffect } from "react";
import { ElementContext,ElementContext2 } from "../../../ElementContext";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { saveRecord, clearRedoRecord } from "../../../undo";

let px;

function FlexChildern() {
	const [selectedTarget] = useContext(ElementContext2);
	const [selectedElement, setSelectedElement] = useContext(ElementContext);
	const [flexGrow, setflexGrow] = useState("");
	const [flexShrink, setflexShrink] = useState("");
	const [flexBasis, setflexBasis] = useState("");
	const [px_f1, setPx_f1] = useState("px");

	useEffect(() => {
		setflexGrow(selectedElement.flexGrow);
		setflexShrink(selectedElement.flexShrink);
		setflexBasis(check(selectedElement.flexBasis));
		setPx_f1(px);
	}, [selectedElement]);

	const check = value => {
		let num = "";
		px = "";
		if (value === "") {
			return;
		} else {
			if (value !== undefined) {
				num = value.indexOf("%");
				if (num === -1) {
					num = value.indexOf("p");
				}
				px = value.slice(num);
				value = value.slice(0, num);
				return value;
			}
		}
	};

	const updateState = (name, value) => {
		switch (name) {
			case "flexGrow":
				setflexGrow(value);
				break;
			case "flexShrink":
				setflexShrink(value);
				break;
			case "flexBasis":
				setflexBasis(value);
				break;
			case "px_f1":
				setPx_f1(value);
				break;

			default:
				break;
		}
	};

	const handleInput = e => {
		saveRecord(selectedTarget, "style-change");
		clearRedoRecord();
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		switch (e.target.name) {
			case "flexGrow":
				temp[e.target.name] = e.target.value;
				break;
			case "flexShrink":
				temp[e.target.name] = e.target.value;
				break;
			case "flexBasis":
				temp[e.target.name] = e.target.value + px_f1;
				break;
			default:
				break;
		}

		setSelectedElement(temp);
	};

	const handlePx = e => {
		saveRecord(selectedTarget, "style-change");
		clearRedoRecord();
		updateState(e.target.name, e.target.value);
		const temp = selectedElement;
		switch (e.target.name) {
			case "px_f1":
				temp.flexBasis = flexBasis + e.target.value;
				break;
			default:
				break;
		}
	};
	const checkInput = e => {
		var ch = String.fromCharCode(e.which);
		if (!/[0-9]/.test(ch)) {
			e.preventDefault();
		}
	};

	const increase = e => {
		var value = e.target.value;
		if (value === "") {
			updateState(e.target.name, "0");
		} else {
			value = parseInt(value) + 1;
			e.target.value = value.toString();
			updateState(e.target.name, e.target.value);
			handleInput(e);
		}
	};

	const decrease = e => {
		var value = e.target.value;
		if (value === "") {
			updateState(e.target.name, "0");
		} else {
			value = parseInt(value) - 1;
			e.target.value = value.toString();
			updateState(e.target.name, e.target.value);
			handleInput(e);
		}
	};
	return (
		<div>
			<div>
				<span>Flex</span>
			</div>
			<div>
				<div>
					<div>
						<span>Grow </span>
					</div>
					<div>
						<span>
							<input name="flexGrow" type="text" value={flexGrow ? flexGrow : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>

						<div>
							<button id="+Grow" name="flexGrow" value={flexGrow ? flexGrow : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+Grow">
								<TiArrowSortedUp />
							</label>

							<button id="-Grow" name="flexGrow" value={flexGrow ? flexGrow : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-Grow">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>Shrink </span>
					</div>
					<div>
						<span>
							<input name="flexShrink" type="text" value={flexShrink ? flexShrink : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>
						<div>
							<button id="+Shrink" name="flexShrink" value={flexShrink ? flexShrink : ""} onClick={increase} style={{ display: "none" }} />
							<label htmlFor="+Shrink">
								<TiArrowSortedUp />
							</label>

							<button id="-Shrink" name="flexShrink" value={flexShrink ? flexShrink : ""} onClick={decrease} style={{ display: "none" }} />
							<label htmlFor="-Shrink">
								<TiArrowSortedDown />
							</label>
						</div>
					</div>
				</div>
				<div>
					<div>
						<span>Basis </span>
					</div>
					<div>
						<span>
							<input name="flexBasis" type="text" value={flexBasis ? flexBasis : ""} onChange={handleInput} onKeyPress={checkInput}></input>
						</span>
						<span>
							<select name="px_f1" value={px_f1 ? px_f1 : updateState("px_f1", "%")} onChange={handlePx}>
								<option value="%">%</option>
								<option value="px">px</option>
							</select>

							<div>
								<button id="+Basis" name="flexBasis" value={flexBasis ? flexBasis : ""} onClick={increase} style={{ display: "none" }} />
								<label htmlFor="+Basis">
									<TiArrowSortedUp />
								</label>

								<button id="-Basis" name="flexBasis" value={flexBasis ? flexBasis : ""} onClick={decrease} style={{ display: "none" }} />
								<label htmlFor="-Basis">
									<TiArrowSortedDown />
								</label>
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FlexChildern;