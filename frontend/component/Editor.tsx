import React,{useState} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { sendCode, getSolution } from '../pages/api/home';
import styles from "../styles/Home.module.css"
const cpp=`#include <iostream> \nusing namespace std; \nint main(){\n cout<<"Hello World";\n} `
import {v4} from "uuid"


function EditorArea() {
  const availableLanguage=[{name:"CPP",value:"cpp"}]
  // ,{name:"Python",value:"py"}
  const [id,setId]=useState(v4())
  const [code, setCode] = useState(cpp);
  const [language,setLanguage]=useState<string>("cpp");
  const [disabled,setDisabled]=useState(false);
  const [output,setOutput]=useState("");
  const [errors,setErrors]=useState("");
    // const [FontSize,setFontSize]=useState<string | number >(20)

const onSubmit=async ()=>{
    setDisabled(true);
    setErrors("");
    try {
      // console.log(code);
      const output=await sendCode({language,code,id});
      // console.log(output)
      // setOutput(output);
      // setDisabled(false)
      setTimeout(()=>{
        getCode();
      },1000)
    } catch (error:any) {
      setErrors("Something Went Wrong")
      
      if(error.data && error.data.stderr){
        setOutput(error.data.stderr);
      }else{
        
      }
    }

}

const getCode=async ()=>{

  try {
    const {output}= await getSolution({id});
    setOutput(output);
  } catch (error) {
    setTimeout(()=>{
      getCode();
    },1000)
  }
}






  return (
    <>
      {errors && <div>{errors}</div>}
    <label >Select a Language:</label>

  <select id="language" value={language} onChange={(e)=>setLanguage(e.target.value)}>
    {availableLanguage && availableLanguage.map((l,index)=>{
      return <option key={index} value={l.value} >{l.name}</option>
    })}
  {/* <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option> */}
</select>
    <div className={styles.code}>
    

    <Editor
      
          
      value={code}
      onValueChange={code => {setCode(code)
      setDisabled(false)}}
      highlight={code => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',

        // fontSize: {FontSize},
      }}
      />
      </div>
      <button disabled={disabled} onClick={onSubmit} >Submit</button>
      <h2>Output</h2>
      <textarea className={styles.output} value={output} rows={10} cols={80} onChange={(e)=>setOutput(e.target.value)} />
      </>
      
  );
}

export default EditorArea;