import React from 'react'
// @ts-ignore - vite raw import
import lunarHtml from '../html/lunar-harmonics-analysis.html?raw'
import HtmlPageWrapper from './html/HtmlPageWrapper'

export default function LunarHarmonics() {
  return <HtmlPageWrapper html={lunarHtml} title="Lunar Harmonics Analysis" />
}


