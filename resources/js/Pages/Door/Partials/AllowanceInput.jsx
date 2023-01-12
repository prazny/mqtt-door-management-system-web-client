import {forwardRef, useEffect, useRef} from 'react';

export default forwardRef(function TextInput(
    {type = 'text', name, id, value, className, autoComplete, required, isFocused, handleChange, min, max},
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input name={name}
                   id={id}
                   min={min}
                   max={max}
                   value={value}
                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                   onChange={(e) => handleChange(e)}
                   ref={input}
            />

        </div>
    );
});
