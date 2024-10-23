const [threshold, setThreshold] = useState(30); // Default threshold

const handleSubmit = (e) => {
    e.preventDefault();
    // Send threshold to backend or save in local state
};

return (
    <form onSubmit={handleSubmit}>
        <label>
            Set Temperature Threshold:
            <input type="number" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
        </label>
        <button type="submit">Save</button>
    </form>
);
