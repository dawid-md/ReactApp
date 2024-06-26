export default function Home({ items, deleteItem }) {
    console.log(items);

    return (
        <div className="home-container">
            <div className="left-panel">

            </div>
            <div className="home-content">
                {items.map((item) => (
                    <div key={item.id} className="task">
                        <h3>{item.id}</h3>
                        <p>{item.name}</p>
                        <button onClick={() => deleteItem(item.id)}>delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}