import React, { useEffect, useState } from 'react'
import './CallCard.css'
import { IoMdCall } from "react-icons/io";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { IoArchive } from "react-icons/io5";
import { IoMdArchive } from "react-icons/io";

function CallCard(props) {
  const [arrowType, setArrowType] = useState(0)

  function archiveFunc(event) {
    let data = props.unArchived.remove(event.target.id);
    // console.log(data)
    if (data != null) {
      props.Archived.insert(event.target.id, data.data)
    }
    setArrowType(1)
  }
  function unarchiveFunc(event) {
    let data = props.Archived.remove(event.target.id);
    // console.log(data)
    if (data != null) {
      props.unArchived.insert(event.target.id, data.data)
    }
    setArrowType(1)
  }

  var call_list1 = []
  props.archive_type == 0 ? props.unArchived.inOrderTraversal((node) => call_list1.push(node.data)) : props.Archived.inOrderTraversal((node) => call_list1.push(node.data));

  useEffect(() => {
    call_list1 = []
    props.archive_type == 0 ? props.unArchived.inOrderTraversal((node) => call_list1.push(node.data)) : props.Archived.inOrderTraversal((node) => call_list1.push(node.data));
    setArrowType(0)
  }, [arrowType])


  function contact_list() {
    let result = []
    if (call_list1.length == 0) {
      props.archive_type == 1 ? result.push(<div key={1} style={{ textAlign: 'center', marginTop: '50%', fontSize: '400%', fontWeight: '700', color: 'blue' }}><IoMdArchive /></div>) : result.push(<div key={1} style={{ textAlign: 'center', marginTop: '50%', fontSize: '200%', fontWeight: '700', color: 'red' }}>No logs </div>)
      return result

    }
    for (let i of call_list1) {
      result.push(
        <div key={i.time}>
          <p className='call-date'>..............................    July, 21 2017   ............................</p>
          <div className='phone-number' style={{ position: 'relative' }} >
            <div><IoMdCall size="65%" /><span>{i.type == 0 ? <FaArrowUp size='25%' color='green' /> : <FaArrowDown size='25%' color='red' />}</span></div>
            <div>
              <p>{i.phone_number}</p>
              <p>{i.description}</p>
            </div>
            <div>{i.time} <span>{i.time_type}</span></div>
            <button className='archive-button' onClick={props.archive_type == 0 ? archiveFunc : unarchiveFunc} id={i.time}><IoArchive size="13px" color='orange' id={i.time} /></button>
          </div>
        </div>
      )
    }
    return result
  }
  return (
    <div className='call-card'>
      {contact_list()}
    </div>
  )
}

export default CallCard