import Project from "../../components/Project/Project.js"
import { useState } from "react";

export default function Home({ projects, items, createItem, deleteItem }) {
    const [editedItemID, seteditedItemID] = useState(null)

    return (
        <>
            <div className="home">
            <button onClick={() => createItem()}>Create Item</button>
                {projects.map((project) => (
                    <>
                    <h2>{project}</h2>
                    {/* <h3>{editedItemID}</h3> */}
                    <Project 
                        key={project} 
                        items={items.filter((item) => item.project === project)} 
                        deleteItem={deleteItem} 
                        editedItemID={editedItemID} 
                        seteditedItemID={seteditedItemID} />
                    </>
                ))}
            </div>
        </>
    );
}