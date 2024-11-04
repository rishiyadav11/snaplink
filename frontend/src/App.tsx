import Shorter from "./components/Shorter"

const App = () => {
  return (
<div className='bg-emerald-500 w-screen h-screen flex justify-center items-center'>
  <div className="w-[90%] h-[90%] border-4 border-white border-opacity-30 rounded-xl bg-white bg-opacity-30 backdrop-blur-md shadow-lg">
    <h1 className="text-center pt-5 font-bold text-3xl text-white">SnapLink</h1>
    <Shorter/>
  </div>
</div>

  )
}

export default App