import React,{ useState } from 'react'
import { useBetween } from 'use-between';

const useShareableState = () => {
    const [selectedChat,setSelectedChat]=useState({})
    const [activeID, setActiveID] = useState('')
    const [notification,setNotification]=useState([])
    const [clicked,setClicked]=useState(false)
    const [unclicked,setunClicked]=useState(true)

  return {
    selectedChat,
    setSelectedChat,
    activeID,
    setActiveID,
    notification,
    setNotification,
    unclicked,setunClicked,
    clicked,setClicked
  }
}

export default useShareableState