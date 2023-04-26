import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {senduser, senduserCk} from './api-calling/api'
import ShowFiles from './ShowFiles';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from 'ckeditor4-react';


function App() {
 
  const [store, Setstore] = useState();
  const [name, Setname] = useState();
  const [discription , setdiscription]=useState();

const sendValuedfiles = async()=>{
// e.preventDefault()
let formData = new FormData()
formData.append('uploadfile',store) 
formData.append('name',name) 
console.log(store);
console.log(formData);
 await senduser(formData)

}

// console.log(store);

// console.log("e",discription);


const sendcrk = async()=>{
await senduserCk({discription});
}
  return (
   <>
   <input type='text' name="name" onChange={(e)=>{Setname(e.target.value)}}/>
        <input type="file" name="uploadfile" accept='csv' onChange={(e)=>{Setstore(e.target.files[0])}} />
   <button onClick={sendValuedfiles}>submit</button>
  

                <h2>Discription</h2>
                <CKEditor
                    // editor={ ClassicEditor }
                 
                    // data=
                    initData="<p></p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                      setdiscription(editor.getData())
                        console.log( { event, editor, discription } );
                
                    } }
                    
                />
   
   <button onClick={()=>{sendcrk()}}>submit data</button>

   <ShowFiles/>

</>
  );
}

export default App;
