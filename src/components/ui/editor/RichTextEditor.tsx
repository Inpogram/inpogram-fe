import React from 'react'
import ReactQuill from 'react-quill'

type RichTextEditorType = {
  value: string
  wrapperClassname?: string
  className?: string
  onChange: (content: string) => void
  onBlur: () => void
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
  className,
  onChange,
  onBlur
}) => {
  return (
    <div>
      <ReactQuill
        modules={toolbarOptions}
        theme="snow"
        className={`${className}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default RichTextEditor
