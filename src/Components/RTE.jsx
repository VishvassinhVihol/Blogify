    // real time editor component

    import React from 'react'
    import { Controller } from 'react-hook-form'
    import {Editor} from '@tinymce/tinymce-react'
    import conf from '../conf/conf'


    // React Hook Form normally register se kaam chala leta hai.
    // Lekin kuch custom inputs directly register nahi ho paate.
    // Unko form ke control mein lana ke liye Controller use hota hai.
    //RTE editors custom components hote hain, aur inko hum register() se direct control nahi kar sakte.

    // 🔧 "Controller is a wrapper that connects your custom component with the React Hook Form ecosystem."

    //aa control ni madad thi aa component ne form ma access kari shako chho
    const RTE = ({ name, control, label, defaultValue = '' }) => {
        return (
            <div className='w-full'>
                {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

                <Controller
                    name={name ||  "content"}
                    control={control}//here control is parent element
                    render = {({ field: { onChange                                                                                                                                                   } }) => (//je pan event ni tracking karvi hoy te ahi onChange

                        //call back na andar je pan field rander karavi hoy te
                        <Editor
                        
                            apiKey={conf.tinymceApiKey}
                            initialValue={defaultValue}
                            init={{
                                initialValue: defaultValue,
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    base_url: `https://cdn.tiny.cloud/1/${conf.tinymceApiKey}/tinymce/6`, // ✅ Add this
                            }}
                            onEditorChange={onChange}
                             tinymceScriptSrc={`https://cdn.tiny.cloud/1/${conf.tinymceApiKey}/tinymce/6/tinymce.min.js`}
                        />
                    )}

                />
            </div>
        )
    }

    

    export default RTE