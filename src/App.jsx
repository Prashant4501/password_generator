import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(true);
  const [character, setcharacter] = useState(true);
  const [password, setpassword] = useState("");

  const passwordref=useRef(null);
  const copyPasswordtoClipboard=useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password);
  },[password])

  const Passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdegfhijklmnopqrstuvwxyz"

    if (number) {
      str += "0123456789"
    }
    if (character) {
      str+="!@#$%^&*()_"
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1))
    }
    setpassword(pass)
  }, [length, number, character, setpassword])
  
  useEffect(()=>{
    Passwordgenerator()
  },[length, number, character, Passwordgenerator])

  return (
    <>
      <div className='w-full max-w-screen-md mx-auto rounded-md shadow-md px-4 py-3 my-8 text-center text-orange-500 bg-gray-500'>
        <h1 className='text-white'>Password Generator</h1>
        <div className='flex shadow-sm rounded-lg overflow-hidden mb-4 p-2'>
          <input type="text"
            value={password}
            placeholder='password'
            className='outline-none w-full py-1 px-3 read-only:' 
            ref={passwordref}/>
          <button
            className='bg-green-500 p-2 text-white rounded-lg hover:bg-green-700'
            onClick={copyPasswordtoClipboard}>copy</button>
        </div>
        <div className='flex gap-x-2 text-sm'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
              min={6}
              max={60}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }} />
            <label htmlFor="">length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={number}
              id="number input"
              onChange={() => {
                setnumber((prev) => !prev);
              }} />
            <label htmlFor="">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={character}
              id="char input"
              onChange={() => {
                setcharacter((prev) => !prev);
              }} />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
