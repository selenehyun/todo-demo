import { useState } from "react";

export const TodoItem = ({ onUp, onDown, onChange, disabled, children }) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const emitChange = () => {
    if (value !== String(children)) {
      onChange && onChange(value);
      setEditing(false);
    }
  };

  return (
    <>
      {!editing && (
        <span
          onDoubleClick={() => setValue(String(children)) || setEditing(true)}
        >
          {children}
        </span>
      )}
      {editing && (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={emitChange}
        />
      )}
      <button onClick={() => onUp()} disabled={!onUp || disabled}>
        up
      </button>
      <button onClick={() => onDown()} disabled={!onDown || disabled}>
        down
      </button>
    </>
  );
};
