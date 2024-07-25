"use client";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

export default function Home() {
  const elementRef = useRef(null);
  const preRef = useRef(null);
  const [theme, setTheme] = useState("");
  const [darkToggle, setDarkToggle] = useState(true);
  const [inputText, setInputText] = useState("");
  const [dynamicPadding, setDynamicPadding] = useState("64");
  const [backgroundColor, setBackgroundColor] = useState(
    "linear-gradient(140deg, rgb(255, 99, 99), rgb(115, 52, 52))"
  );

  const handlePadding = (event) => {
  
    const { value } = event.target;
    debugger;
    setDynamicPadding(value);
  };

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    autoResize();
  }, [inputText]);

  const formatTextarea = () => {
    hljs.registerLanguage("javascript", javascript);
    const highlightedCode = hljs.highlight(inputText, {
      language: "javascript",
      registerLanguage: "javascript",
    }).value;
    return (
      <pre
        className="Editor_formatted__x4nkp hljs hljs-rest crimsonTheme"
        ref={preRef}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      ></pre>
    );
  };

  function autoResize() {
    const textarea2 = document.getElementById("myTextarea2");
    textarea2.style.height = "auto";
    textarea2.style.height = textarea2.scrollHeight + "px";
  }

  const themeChange = (value) => {
    const preElement = document.querySelector(
      "pre.Editor_formatted__x4nkp.hljs"
    );
    if (value === "Crimson") {
      preElement.classList.remove("blueTheme");
      preElement.classList.remove("purpleTheme");
      preElement.classList.add("crimsonTheme");
      setBackgroundColor(
        "linear-gradient(140deg, rgb(255, 99, 99), rgb(115, 52, 52))"
      );
    } else if (value === "Purple") {
      preElement.classList.remove("blueTheme");
      preElement.classList.remove("crimsonTheme");
      preElement.classList.add("purpleTheme");
      setBackgroundColor(
        "linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))"
      );
    } else {
      preElement.classList.remove("purpleTheme");
      preElement.classList.remove("crimsonTheme");
      preElement.classList.add("blueTheme");
      setBackgroundColor(
        "linear-gradient(140deg, rgb(142, 199, 251), rgb(28, 85, 170))"
      );
    }
  };
  const handleColor = (event) => {
    const { value } = event.target;
    setTheme(value);
    themeChange(value);
  };

  return (
    <div className="flex justify-center items-center mx-auto min-h-screen bg-black">
      <div
        ref={elementRef}
        className={`${
          dynamicPadding === "64"
            ? "p-20"
            : dynamicPadding === "128"
            ? "p-28"
            : dynamicPadding === "32"
            ? "p-14"
            : "p-8"
        } bg-slate-200`}
        style={{
          backgroundImage: `${backgroundColor}`,
        }}
      >
        <div
          className=" min-w-max h-content min-h-28 rounded-xl px-2"
          style={
            darkToggle
              ? { backgroundColor: "rgba(0,0,0,.75)" }
              : { backgroundColor: "white" }
          }
        >
          <div className="w-38 h-full	pt-4 font-medium text-white flex">
            <div className="w-1/3 flex pl-2 pr-2">
              <div className="w-3 h-3 bg-red-500 rounded-lg mr-1.5"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-lg mr-1.5"></div>
              <div className="w-3 h-3 bg-green-500 rounded-lg mr-1.5"></div>
            </div>
            <div
              className="text-sm w-72 flex justify-center text-slate-400 mr-4"
              contentEditable
              style={{ outline: "none" }}
            >
              untitled-1
            </div>
          </div>
          <div id="myTextarea2" className="Editor_editor__Jz9sW">
            <textarea
              id="myTextarea"
              onInput={() => autoResize()}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="off"
            />
            {formatTextarea()}
          </div>
        </div>
      </div>

      <div className="dashboard">
        <div className="dashboard_items">
          <strong className="dashboard_heading">Theme</strong>
          <select
            style={{
              backgroundColor: "#191919",
              color: "#959595",
              border: " 1px solid #959595",
            }}
            onChange={handleColor}
            className="block bg-black w-26 p-1  outline-none text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option
              value="Purple"
              style={{ backgroundColor: "#191919", color: "#959595" }}
            >
              Purple
            </option>
            <option
              selected
              value="Crimson"
              style={{ backgroundColor: "#191919", color: "#959595" }}
            >
              Crimson
            </option>
            <option
              value="Blue"
              style={{ backgroundColor: "#191919", color: "#959595" }}
            >
              Blue
            </option>
          </select>
        </div>
        <div className="dashboard_items">
          <strong class="dashboard_heading">Dark mode</strong>
          <label className="inline-flex items-center cursor-pointer outline-none mt-2">
            <input
              type="checkbox"
              checked={darkToggle}
              value={darkToggle}
              onChange={() => {
                setDarkToggle(!darkToggle);
              }}
              className="sr-only peer outline-none"
            />
            <div className="relative w-9 h-5 outline-none bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="dashboard_items">
          <strong className="dashboard_heading">Padding</strong>
          <div className=" mt-2">
            <div className="flex text-sm " style={{ color: "#959595" }}>
              <button className={`mr-2 ${dynamicPadding==="16" ? "text-red-400":""}`} value={"16"} onClick={handlePadding}>
                16
              </button>
              <button className={`mr-2 ${dynamicPadding==="32" ? "text-red-400":""}`} value={"32"} onClick={handlePadding}>
                32
              </button>
              <button className={`mr-2 ${dynamicPadding==="64" ? "text-red-400":""}`} value={"64"} onClick={handlePadding}>
                64
              </button>
              <button className={`mr-2 ${dynamicPadding==="128" ? "text-red-400":""}`} value={"128"} onClick={handlePadding}>
                128
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard_items">
          <strong className="dashboard_heading">Language</strong>
          <div className="mt-1">
            <span className="font-medium" style={{ color: "#fb8d8d" }}>
              Javascript
            </span>
          </div>
        </div>
        <div className="dashboard_items">
          <button
            onClick={htmlToImageConvert}
            className="bg-red-400 w-20 text-sm p-2 rounded-lg"
          >
            Save PNG
          </button>
        </div>
      </div>
    </div>
  );
}
