import React from 'react'
// @ts-ignore - vite raw import
import advancedHtml from '../html/em-analysis-advanced.html?raw'
import HtmlPageWrapper from './html/HtmlPageWrapper'

export default function AdvancedEMAnalysis() {
  return <HtmlPageWrapper html={advancedHtml} title="Bra Underwire Electromagnetic Analysis (v2)" />
}


