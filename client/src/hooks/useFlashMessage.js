//esse código emite as flash mesages

import bus from "../utils/bus"

export default function useFlashMessage() {
  function setFlashMessage(msg) {
    bus.emit('flash', {
      message: msg
    })
  }

  return { setFlashMessage }
}