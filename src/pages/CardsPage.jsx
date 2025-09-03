import { useContext } from "react";
import Card from "../components/Card";
import { useParams,useOutletContext } from "react-router-dom";
import { StorageContext } from "../context/context";


const CardsPage = () => {
  const { storage } = useContext(StorageContext);
  const { id } = useParams();
   const { toggleSidebar } = useOutletContext();

  // Find the specific group using the ID from the URL
  const group = storage.find((obj) => obj.unique === id);

  return (
    <div className={`grid  gap-6  mt-32 grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] p-3 transition-all duration-150 ${toggleSidebar ? 'ml-8' : 'ml-64'}`}>
      {
        group?.summary ? group?.summary.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
          />
        ))  : <h1>Nothing</h1>
      }
    </div>
  );
};

export default CardsPage;
