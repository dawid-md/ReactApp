export default function Home({ items }) {
    console.log(items);

    return (
        <div className="home-container">
            <div className="left-panel"></div>
            <div className="home-content">
                {items.map((item) => (
                    <div key={item.id} className="task">
                        <h3>{item.id}</h3>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}