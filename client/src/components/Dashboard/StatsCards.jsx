const StatsCards = ({ stats }) => {
  const cards = [
    { label: "Total Items", value: stats.total, bg: "bg-blue-500" },
    { label: "Notes", value: stats.notes, bg: "bg-yellow-500" },
    { label: "Links", value: stats.links, bg: "bg-green-500" },
    { label: "Files", value: stats.files, bg: "bg-purple-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label} className={`${card.bg} text-white p-4 rounded-lg shadow`}>
          <p className="text-sm opacity-90">{card.label}</p>
          <p className="text-3xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;