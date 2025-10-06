import React from 'react'

type HtmlPageWrapperProps = {
  html: string
  title: string
}

const HtmlPageWrapper: React.FC<HtmlPageWrapperProps> = ({ html, title }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded shadow border">
        <div className="px-4 py-3 border-b">
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <iframe
          title={title}
          srcDoc={html}
          className="w-full h-[85vh]"
        />
      </div>
    </div>
  )
}

export default HtmlPageWrapper


