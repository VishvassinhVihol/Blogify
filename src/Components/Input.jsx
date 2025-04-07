import React,{useId} from 'react'

const Input = React.forwardRef(({label,type="text",className="",...props},ref) => {

    const id = useId()
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>{label}</label>}
        <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
        />
    </div>
  )
})

export default Input


// 🤔 Without forwardRef — It Doesn’t Work

// // Custom Input component
// function MyInput(props) {
//   return <input type="text" {...props} />;
// }

// // App component
// function App() {
//   const inputRef = React.useRef();

//   return (
//     <>
//       <MyInput ref={inputRef} /> {/* ❌ ref doesn’t go to <input> */}
//       <button onClick={() => inputRef.current.focus()}>Focus</button>
//     </>
//   );
// }
// ➡️ This will not work — because ref is not passed to the real <input> inside MyInput.

// ✅ With forwardRef — It Works!

// // Custom Input component using forwardRef
// const MyInput = React.forwardRef((props, ref) => {
//   return <input type="text" ref={ref} {...props} />;
// });

// // App component
// function App() {
//   const inputRef = React.useRef();

//   return (
//     <>
//       <MyInput ref={inputRef} />
//       <button onClick={() => inputRef.current.focus()}>Focus</button>
//     </>
//   );
// }
// 💥 Now it works! The ref goes from App → to MyInput → to the actual <input>.

// forwardRef React का एक फ़ंक्शन है जो पैरेंट कंपोनेंट को चाइल्ड कंपोनेंट के अंदर के DOM एलिमेंट तक सीधे पहुँचने (ref से) की सुविधा देता है।
