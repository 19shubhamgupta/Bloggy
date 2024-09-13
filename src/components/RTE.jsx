import { Editor } from "@tinymce/tinymce-react";
import React from "react";

import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "No Content" }) {
  return (
    <>
      <div className="w-100">
        {label && <label className="d-inline-block mb-1 ps-1">{label}</label>}
      </div>

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey='0geh75px1zidccna87sndlb362yzeq2ic8hx01o6x9cj0alv'
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      ></Controller>
    </>
  );
}

export default RTE;
