import { useState } from 'react'
import './Task.css'
import Button from '../Button/Button'

export default function Task({ children, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(children)

  function handleSave() {
    if (text.trim() !== '') {
      onUpdate(text)   // gửi text mới lên App
    } else {
      setText(children) // nếu để trống thì giữ lại text cũ
    }
    setIsEditing(false)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
  }

  return (
    <div className='tasks'>
      <div className="layout_task">
        {isEditing ? (
          <textarea
          className='edit-area'
            value={text}
            onChange={(e) => setText(e.target.value)}
            // onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span className="task_text">{children}</span>
        )}
      </div>
      
      {isEditing ? (
        <Button type="button" handle={handleSave} className="save">💾</Button>
      ) : (
        <Button handle={() => setIsEditing(true)} className="edit">✏️</Button>
      )}
      
      <Button handle={onDelete}>×</Button>
    </div>
  )
}
