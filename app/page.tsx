"use client";

import dynamic from "next/dynamic";
import "@tldraw/tldraw/tldraw.css";
import { useEditor } from "@tldraw/tldraw";
import { getSvgAsImage } from "@/lib/getSvgAsImage";
import { blobToBase64 } from "@/lib/blobToBase64";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { PreviewModal } from "@/components/PreviewModal";
import InitialForm from "@/components/InitialForm";

const Tldraw = dynamic(async () => (await import("@tldraw/tldraw")).Tldraw, {
  ssr: false,
});

export default function Home() {
  const [html, setHtml] = useState<null | string>(null);
  const [formData, setFormData] = useState<boolean>(false);
  const [option1, setOption1] = React.useState<string>('');
  const [option2, setOption2] = React.useState<string>('');
  const [option3, setOption3] = React.useState<string>('');

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHtml(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  });

  const handleFormResponse = (e: any) => {
    e.preventDefault();
    if (e.target.framework.value && e.target.style.value && e.target.script.value ) {
      setFormData(true);
      setOption1(e.target.framework.value);
      setOption2(e.target.style.value);
      setOption3(e.target.script.value);
    }
    // console.log(e.target.framework.value);
    // console.log(e.target.style.value);
    // console.log(e.target.script.value);
  }
  return (
    <>

      {formData ?
        <>
          <div className={`w-screen h-screen`}>
            <Tldraw persistenceKey="tldraw">
              <ExportButton setHtml={setHtml} frameworkName={option1} styleName={option2} scriptName={option3} />
            </Tldraw>
          </div>
          {html &&
            ReactDOM.createPortal(
              <div
                className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
                style={{ zIndex: 2000, backgroundColor: "rgba(0,0,0,0.5)" }}
                onClick={() => setHtml(null)}
              >
                <PreviewModal html={html} setHtml={setHtml} />
              </div>,
              document.body
            )}
        </>
        : <InitialForm onFormSubmit={handleFormResponse} />
      }
    </>
  );
}

function ExportButton({ setHtml,frameworkName,styleName,scriptName  }: { setHtml: (html: string) => void,frameworkName:string,styleName:string,scriptName:string }) {
 console.log('frameworkframeworkframework',frameworkName,styleName,scriptName);
  const editor = useEditor();
  const [loading, setLoading] = useState(false);
  // A tailwind styled button that is pinned to the bottom right of the screen
  return (
    <button
      onClick={async (e) => {
        setLoading(true);
        try {
          e.preventDefault();
          const svg = await editor.getSvg(
            Array.from(editor.currentPageShapeIds)
          );
          if (!svg) {
            return;
          }
          const png = await getSvgAsImage(svg, {
            type: "png",
            quality: 1,
            scale: 1,
          });
          const dataUrl = await blobToBase64(png!);
          const resp = await fetch("/api/toHtml", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: dataUrl,frameworkName:frameworkName,styleName:styleName,scriptName:scriptName }),
          });

          const json = await resp.json();

          if (json.error) {
            alert("Error from open ai: " + JSON.stringify(json.error));
            return;
          }

          const message = json.choices[0].message.content;
          const start = message.indexOf("<!DOCTYPE html>");
          const end = message.indexOf("</html>");
          const html = message.slice(start, end + "</html>".length);
          setHtml(html);
        } finally {
          setLoading(false);
        }
      }}
      className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ="
      style={{ zIndex: 1000 }}
      disabled={loading}
    >
      {loading ? (
        <div className="flex justify-center items-center ">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        </div>
      ) : (
        "Create Component"
      )}
    </button>
  );
}
