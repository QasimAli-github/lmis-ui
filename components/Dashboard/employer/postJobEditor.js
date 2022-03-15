import React, {useState} from 'react'; 
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import Style from '../../../styles/jobs.module.scss'

const PostJobEditor = (props) => {
    const [editorHtml, setEditorHtml] = useState(props.editJobEditor || "");
    const handleChange = (template) => {
        setEditorHtml(template);
        props.onEditorChange(template);

    }
    return(
        <ReactQuill style={{height: "540px"}} value={editorHtml} onChange={handleChange}/>
    )
}

export default PostJobEditor
