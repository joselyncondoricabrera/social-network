import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

import { db } from "../firebase/firebase_config";
import { collection, doc, setDoc } from "firebase/firestore";
import { fileUpload } from "../helpers/fileUpload";



export const PostCreation = ( { loadPubli, setLoadPubli }) => {
    const fileInputRef = useRef(null);

    const [textPublication, setTextPublication] = useState('');
    const [file, setFile] = useState(null);
    const auth = useAuth();

    const handleCreatePublication = async() => {
        console.log('se esta activando el post publicación');
        //guardando imagen a cloudinary y obtener url
        const urlImage = await fileUpload( file );
             
        //obtener uid
        const { uid, displayName, photoURL } = auth.activeUser;

        //referencia de la coleccion a crear
        const newDoc =  doc( collection( db , `publications`));

       //obtener texto de la publicación
        const dataPublication = {
            id: newDoc.id,
            uid,
            displayName,
            photoURL,
            text: textPublication,
            urlImage,
            likes: []
        }
        

        const resp = await setDoc( newDoc, dataPublication);

        setLoadPubli(!loadPubli);

        //reset de valores del textare y file
        setTextPublication('');
        fileInputRef.current.value='';

    }

    const handleCancelPublication = () => {
        setTextPublication('');
        fileInputRef.current.value='';
    }

    const handleImageInputChange = async({ target }) => {
        if( target.files.length == 0) return;
        setFile(target.files[0]);
    }

    return (
        <div className="publication-create-container">
            <div className="publication-create-text">
                <textarea
                 placeholder="Escribe algo ..."
                 value={textPublication}
                 onChange={(e)=>setTextPublication(e.target.value)}
                />

            </div>
            <div className="publication-create-image">
                <input
                 type="file"
                 onChange={ handleImageInputChange}
                 ref={ fileInputRef }
                />
            </div>
            
            <div className="publication-create-buttons">
                <button 
                  disabled = { textPublication == '' ? true : false } 
                  className="publication-create-button-create" 
                  onClick={ handleCreatePublication }
                >
                    Publicar
                </button>
                <button className="publication-create-button-cancel" onClick={ handleCancelPublication }>Cancelar</button>
            </div>
        </div>
    )
}
