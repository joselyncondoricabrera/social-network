import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase_config";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";


export const PublicationCard = ({ publication }) => {
  
  
  const auth = useAuth();
  const [likes, setLikes] = useState(publication.likes);
  const { uid } = auth.activeUser;


  const [imageIconLike, setImageIconLike] = useState(publication.likes.some( idUser => idUser == uid) ? '../src/assets/likeClicked.png': '../src/assets/like.png');

  const handleCountLikes = async () => {
    const { uid } = auth.activeUser;

    // Referencia al documento específico
    const docRef = doc(db, `publications/${publication.id}`);

 
    // //verificar si existe la uid usuario activo
    if(likes.some(( idUser ) => idUser == uid)){
      console.log("ya existe un like del usuario, elimando..");
      setLikes((initLikes) => initLikes.filter( (idUser) => idUser !== uid ) );
      setImageIconLike('../src/assets/like.png');

      await updateDoc(docRef, {
        likes: arrayRemove(uid) // Campo y valor a actualizar
      });

    }else{
      setLikes( (initLikes) => [...initLikes, uid] );
      setImageIconLike('../src/assets/likeClicked.png')

      console.log('no hay like, agregando....');
      await updateDoc(docRef, {
        likes: arrayUnion(uid) // Campo y valor a actualizar
      });

      
    }
  }



  return (
    <div className="publication-card">
      <div className="card-info">
        <div className="card-info-photo">
          <img src={publication.photoURL} alt="profile" />
        </div>
        <div className="card-info-title">
          <h3>{publication.displayName}</h3>
          <h4>wenvjv</h4>
          <h5>14/11/2024</h5>
        </div>
      </div>

      <div className="card-info-text">
        <p>{publication.text}</p>
      </div>

      <div className="card-content">
        <div className="card-content-image">
          <img 
           src={ publication.urlImage } 
           alt="publication" 
          />
        </div>
        <div className="card-content-like">
          <button onClick={handleCountLikes}>
            <img src={imageIconLike} alt="icon-like" />
          </button>
          {/* #FF77B7 */}
          <h3>{likes.length} Me encanta </h3> 
        </div>
      </div>
    </div>
  )
}
