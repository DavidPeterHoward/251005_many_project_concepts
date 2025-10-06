import React from 'react'
// @ts-ignore - vite raw import
import nasalHtml from '../html/nasal-device-concepts.html?raw'
import HtmlPageWrapper from './html/HtmlPageWrapper'

export default function NasalDeviceConcepts() {
  return <HtmlPageWrapper html={nasalHtml} title="Nasal Device Concepts" />
}


