import { useCallback, useEffect, useRef, useState } from "react"
import React from "react"

function App() {

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(6)
  const [num, setNum] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)

  //useRef Hook
  const passwordRef = useRef(null)

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 3)

    window.navigator.clipboard.writeText(password)
  }, [password])


  const generatePassword = useCallback(() => {
    var pass = ""
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (num) { str += "123345567890" }
    if (specialChar) { str += "!@#$%^&*()-+,./?;'`~:\|" }

    for (let i = 0; i < length; i++) {
      var char = Math.floor(Math.random() * str.length)
      pass = pass + str.charAt(char)
      console.log(i);

    }
    setPassword(pass)
  }, [num, specialChar, length])


  useEffect(() => {
    generatePassword()
  }
    ,[num, specialChar, length]
  )
  return (
    <>

      <div className=" w-full h-screen flex align-top justify-center bg-slate-900 gap-3">

        <div className=" w-auto bg-gray-700 h-fit my-10 gap-1 rounded-md">

          <div className=" text-white justify-center align-middle flex m-4 flex-wrap">
            <h2>Password Generator</h2>
          </div>

          <div className="flex">

            <input
              className="m-2 rounded-md cursor-default w-full"
              readOnly
              type="text"
              value={password}
              placeholder="Password"
              ref={passwordRef}

            />
            <button className="m-3 text-white bg-blue-600 px-2 py-1 rounded-md " onClick={copyToClipboard}>Copy</button>
          </div>

          <input
            className=" cursor-pointer"
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="text-white mx-2">Length: {length}</label>

          <input
            type="checkbox"
            defaultValue={num}
            onChange={() => {
              setNum((prev) => !prev)
            }}
          />
          <label className="text-white mx-2">Numbers</label>

          <input
            type="checkbox"
            defaultValue={specialChar}
            onChange={() => {
              setSpecialChar((prev) => !prev)
            }}
          />
          <label className="text-white mx-2">Special Characters</label>

        </div>
      </div>

    </>
  )
}

export default App
