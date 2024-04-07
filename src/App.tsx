import { useState } from "react"
import DotCircle from "./components/dotCircle"

const App = () => {
  type DotType = {
    clientX: number,
    clientY: number
  }
  const [arrayDots, setArrayDots] = useState<DotType[]>([])
  const [undoArrayDots, setUndoArrayDots] = useState<DotType[]>([])


  const handleCreatingDot = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setArrayDots(prev => [...prev, { clientX: e.clientX, clientY: e.clientY }])
  }

  const handleUndo = () => {
    if (arrayDots && arrayDots.length > 0) {
      setArrayDots(prev => {
        const newArrayDots = [...prev];
        newArrayDots.pop(); // Remove the last element
        return newArrayDots; 
      });

      setUndoArrayDots((prev) => {
        const newUndoArrayDots = [...prev];
        newUndoArrayDots.push(arrayDots[arrayDots.length - 1]); // Add the last element
        return newUndoArrayDots
      })
    }

  }
  const handleRedo = () => {
    if (undoArrayDots.length > 0 && arrayDots.length >= 0) {
      setArrayDots(prev => {
        const newArrayDots = [...prev];
        newArrayDots.push(undoArrayDots[undoArrayDots.length - 1]); // add the latest element from undo
        return newArrayDots; 
      });

      setUndoArrayDots((prev) => {
        const newUndoArrayDots = [...prev];
        newUndoArrayDots.splice(undoArrayDots.length - 1, 1); // Remove the latest element
        return newUndoArrayDots
      })
    }
  }
  return (
    <div
      className="w-screen h-screen bg-neutral-800 overflow-hidden">
      <div className="flex bg-neutral-600 shadow-md shadow-neutral-600 px-4 py-2 space-x-1 font-bold tracking-wider text-neutral-300 ">
        <button
          onClick={handleUndo}
          className="px-3 py-2 bg-neutral-500/80 hover:bg-neutral-400/60 rounded-md ">Undo</button>
        <button
          onClick={handleRedo}
          className="px-3 py-2 bg-neutral-500/80 hover:bg-neutral-400/60 rounded-md ">Redo</button>
      </div>

      <div
        className="w-full h-full "
        onClick={(e) => handleCreatingDot(e)}
      >
        {
          arrayDots.map((dot, idx) => (
            <DotCircle key={idx} index={idx} clientX={dot.clientX} clientY={dot.clientY} />
          ))
        }
      </div>
    </div>
  )
}

export default App