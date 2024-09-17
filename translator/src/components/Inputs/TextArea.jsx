import React from 'react';

const TextArea = ({ id, value, onChange, placeholder }) => {
    return(
    <textarea 
    rows={5}
    id={id}
    className='py-2.5 px-4 border-none focus:outline-none block w-full border-transparent rounded-lg dark:bg-neutral-800 dark:border-transparent dark:text-neutral-200 bg-neutral-700 text-black  placeholder:text-neutral-400 p-3  border border-neutral-600 focus:ring focus:ring-neutral-500'
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    />);
} 

export default TextArea;