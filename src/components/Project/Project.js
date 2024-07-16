export default function Project({ items, deleteItem, editedItemID, seteditedItemID }) {
    return (
        <div className="project">
            <table>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Project</th>
                        <th>Stream</th>
                        <th>Assignee</th>
                        <th>Task Name</th>
                        <th>Priority</th>
                        <th>Start</th>
                        <th>Due</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Validator</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            {/* <td>{item.id}</td> */}
                            <td>{item.project}</td>
                            <td>{item.stream}</td>
                            <td>{item.assignee}</td>
                            <td>{item.taskName}</td>
                            <td>{item.priority}</td>
                            <td>{item.start}</td>
                            <td>{item.due}</td>
                            <td>{item.status}</td>
                            <td>{item.category}</td>
                            <td>{item.validator}</td>
                            <td>{item.description}</td>
                            <td>
                                <button onClick={() => deleteItem(item.id)}>Delete</button>
                                {(!editedItemID || editedItemID !== item.id) && <button onClick={() => seteditedItemID(item.id)}>Edit</button>}
                                {editedItemID && editedItemID === item.id && <button onClick={() => seteditedItemID(null)}>Cancel</button>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
