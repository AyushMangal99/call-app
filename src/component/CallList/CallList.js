import React from 'react'
import CallCard from './CallCard/CallCard'
import './CallList.css'
function CallList(props) {
  return (
    <div>
      <CallCard Archived={props.Archived} unArchived={props.unArchived} archive_type={props.archive_type}/>
    </div>
  )
}

export default CallList