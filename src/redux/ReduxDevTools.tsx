import React from 'react'
import { createDevTools } from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'

export const ReduxDevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-g"
    defaultIsVisible={false}
  >
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
)

export const DevTools: React.FC = () => {
  return process.env.NODE_ENV === 'development' ? (
    <>
      <ReduxDevTools />
    </>
  ) : null
}
