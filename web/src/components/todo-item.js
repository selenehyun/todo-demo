import { useState } from "react";

export const TodoItem = ({
  onUp,
  onDown,
  onChange,
  done,
  disabled,
  children,
}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState("");

  const emitChange = () => {
    if (value !== String(children)) {
      onChange && onChange({ value });
    }
    setEditing(false);
  };

  return (
    <>
      <input
        type="checkbox"
        checked={done}
        onChange={() => onChange && onChange({ done: !done })}
      />
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
