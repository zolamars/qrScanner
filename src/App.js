import React from "react"
import QRReader from "react-qr-reader"

function App() {
  const handleScan = (data) => {
    if (data) {
      console.log("Result: ", data)
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  return (
    <div>
      <QRReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
    </div>
  )
}

export default App
