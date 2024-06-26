export default function Project({ items, deleteProject }) {
    return (
        <div className="project">
            {items.map((item) => (
                <div key={item.id} className="task">
                    <p>{item.id}</p>
                    <p>{item.project}</p>
                    <p>{item.stream}</p>
                    <p>{item.assignee}</p>
                    <p>{item.taskName}</p>
                    <p>{item.priority}</p>
                    <p>{item.start}</p>
                    <p>{item.due}</p>
                    <p>{item.status}</p>
                    <p>{item.category}</p>
                    <p>{item.validator}</p>
                    <p>{item.description}</p>
                    <button onClick={() => deleteProject(item.id)}>delete</button>
                </div>
            ))}
        </div>
    )
}