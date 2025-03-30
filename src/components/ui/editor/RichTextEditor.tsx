import React from 'react'
import ReactQuill from 'react-quill'

type RichTextEditorType = {
  onChange: (content: string) => void
  value: string
  className?: string
}

const toolbarOptions = {
  toolbar: [
    [{ font: [] }, { size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ script: 'super' }, { script: 'sub' }],
    [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['direction', { align: [] }],
    ['link', 'image', 'video', 'formula'],
    ['clean']
  ]
}

const RichTextEditor: React.FC<RichTextEditorType> = ({
  value,
  onChange,
  className
}) => {
  return (
    <div>
      <ReactQuill
        modules={toolbarOptions}
        theme="snow"
        className={`${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default RichTextEditor
