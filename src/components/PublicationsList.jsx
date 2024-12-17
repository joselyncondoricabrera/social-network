import { PublicationCard } from "./PublicationCard"

export const PublicationsList = ({publications , getPublications}) => {
  
  return (
    <div className="publication-list">
      {
        publications.map( (publication) => ( 
          <PublicationCard key={ publication.idPubli}  publication = {publication} getPublications={getPublications} />
        ))
      }
    </div>
  )
}
