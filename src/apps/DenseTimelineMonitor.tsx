import React from 'react'
// @ts-ignore - vite raw import
import timelineHtml from '../html/dense-timeline-monitor.html?raw'
import HtmlPageWrapper from './html/HtmlPageWrapper'

export default function DenseTimelineMonitor() {
  return <HtmlPageWrapper html={timelineHtml} title="Dense Timeline Monitor" />
}


