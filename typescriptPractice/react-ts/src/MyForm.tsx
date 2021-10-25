import React, { useState } from 'react';

type MyFormProps = {
    onSubmit: (form: { title: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  const { title, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      title: '',
      description: '',
    }); // 초기화
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={title} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
