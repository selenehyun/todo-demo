import { useCallback, useState } from "react";

export const useInputs = (init) => {
  const [form, setForm] = useState(init);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => setForm(init), [init]);

  return [form, onChange, reset];
};
