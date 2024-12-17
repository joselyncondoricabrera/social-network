import { useEffect, useState } from "react";
import { PostCreation } from "../components/PostCreation";
import { PublicationsList } from "../components/PublicationsList";
import '../styles/publicationsViews.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase_config";

export const PublicationsView = () => {

  const [arrayPublications, setArrayPublications] = useState([]);
  const [loadPubli, setLoadPubli] = useState(false);

  const handleGetPublications = async() => {
    console.log('get de publicaciones');
    
    const collectionRef = collection( db , `publications`);
    const docs = await getDocs( collectionRef );

    const publi = [];


    for (const doc of docs.docs) {
      publi.push( {idPubli: doc.id, ...doc.data() });
    }

    setArrayPublications(publi);
  }

  useEffect(() => {
   handleGetPublications();
  }, [loadPubli])
  
  return (
    <>

      <div className="publications-container">
        <div className="publications-section">
          <PostCreation loadPubli={ loadPubli } setLoadPubli = { setLoadPubli }/>
          <PublicationsList publications = {arrayPublications}  getPublications={handleGetPublications}/>
          <div className="spacer"></div> 
        </div>
      </div>
    </>

  )
}
