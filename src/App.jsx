import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCopy } from "react-icons/fa6";

function App() {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([])

  // randomly generate hex code
  const getHexColorCode = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.floor(Math.random() * rgb);
    const hexCode = random.toString(16);
    const colorHex = hexCode.padEnd(6, "0")
    return `#${colorHex}`
  };
  //randomly generate gradient 
  const generateGradient = () => {
    const colors = [];
    for (let i = 0; i < num; i++) {
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const color3 = getHexColorCode();
      const color4 = getHexColorCode();
      const color5 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360)
      const degreeString = `${degree}deg`
      if (type === "linear") {
        colors.push({
          gradient: `linear-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background-image: 'linear-gradient(${degreeString}, ${color1}, ${color2})'`,
        })
      } else if (type === "radial") {
        colors.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background-image: 'radial-gradient(circle, ${color1}, ${color2})'`,
        })
      } else {
        colors.push({
          gradient: `conic-gradient(${color1}, ${color2}, ${color3})`,
          css: `background-image: 'conic-gradient(${color1}, ${color2}, ${color3}, ${color4}, ${color5})'`,
        })
      }
    };
    setGradients(colors);
  };
  // css gradient background code copy
  const handleCopy = (cssCode) => {
    navigator.clipboard.writeText(cssCode);
    toast.success("Gradient CSS code copied!")
  }
  // 
  useEffect(() => {
    generateGradient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <section className="min-h-screen py-10 font-display">
        <div className="max-w-7xl mx-auto space-y-8 px-4 xl:px-0">
          <div className="bg-slate-400 shadow-lg rounded-lg py-6 px-2 space-y-2 md:space-y-0 md:flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">🎨 Gradient Generator</h1>
            <div className="sm:flex justify-center space-y-3 sm:space-y-0 gap-2 md:gap-3 text-center">
              <div className="flex justify-center gap-2 md:gap-3">
                <input
                  type="number"
                  placeholder="12"
                  value={num}
                  className="max-w-20 p-2 border bg-white border-slate-300 rounded-lg outline-0 focus:bg-red-50"
                  onChange={(e) => setNum(Math.max(4, Number(e.target.value)))}
                />
                <select
                  value={type}
                  className="max-w-24 p-2 border bg-white border-slate-300 rounded-lg outline-0 focus:bg-red-50"
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                  <option value="conic">Conic</option>
                </select>
              </div>
              <button type="button" onClick={generateGradient}
                className="px-22 sm:px-14 py-2 bg-red-600 text-slate-50 font-bold rounded-lg hover:bg-red-500 transition duration-200 cursor-pointer">Generate</button>
            </div>
          </div>
          {/* Gradient color box container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              gradients.map((item, index) => {
                return <div key={index}
                  style={{ backgroundImage: item.gradient }}
                  className="h-52 rounded-lg relative">
                  <button
                    type="button"
                    title="Copy to clipboard"
                    onClick={() => handleCopy(item.css)}
                    className="p-2 rounded-full absolute right-2 top-2 cursor-pointer font-semibold bg-slate-900/50 hover:bg-slate-900 transition duration-200 text-slate-100 text-sm"><FaCopy /></button>
                </div>
              })
            }
          </div>
        </div>
      </section >
    </>
  )
}

export default App
