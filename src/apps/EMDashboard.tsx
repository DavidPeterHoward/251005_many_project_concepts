import React from 'react'
// @ts-ignore - vite raw import
import dashboardHtml from '../html/em-analysis-dashboard.html?raw'
import HtmlPageWrapper from './html/HtmlPageWrapper'

export default function EMDashboard() {
  return <HtmlPageWrapper html={dashboardHtml} title="Electromagnetic Analysis Dashboard" />
}


