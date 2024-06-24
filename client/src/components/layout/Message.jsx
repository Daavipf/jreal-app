import { useState, useEffect } from "react"
import bus from "../../utils/bus"

function Message() {
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    bus.addListener('flash', ({ message }) => {
      setVisibility(true)
      setMessage(message)

      setTimeout(() => {
        setVisibility(false)
      }, 3000)
    })
  }, [])
  return (
    visibility && (
      <div className="w-fit p-2.5 fixed bottom-10 left-52 z-10 bg-JReal-200 rounded-lg text-white text-xs md:text-base">
        <p>{message}</p>
      </div>
    )

  )
}

export default Message