// Component/Button.jsx
import './Button.css'
export default function Button({ handle, children, className=""}) {
  return (
    <div className='laybutton'>
      <button className={`button ${className}`} onClick={handle}>
      {children}
      </button>
    </div>
  )
}
