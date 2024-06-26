import Project from "../../components/Project/Project.js"

export default function Home({ projects, items, deleteItem }) {
    return (
        <>
            <div className="home">
                {projects.map((project) => (
                    <Project key={project} items={items} deleteProject={deleteItem} />
                ))}
            </div>
        </>
    );
}