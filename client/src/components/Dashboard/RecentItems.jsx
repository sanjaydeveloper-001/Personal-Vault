import { Link } from "react-router-dom";
import { FiFile, FiLink } from "react-icons/fi";

const RecentItems = ({ items }) => {
  if (items.length === 0) {
    return <p className="text-gray-500">No recent items.</p>;
  }

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {items.map((item) => (
        <Link
          key={item._id}
          to={`/items/${item._id}`}
          className="flex items-center p-4 hover:bg-gray-50"
        >
          {item.type === "file" && <FiFile className="text-blue-500 mr-3" />}
          {item.type === "link" && <FiLink className="text-green-500 mr-3" />}
          {item.type === "note" && <FiFile className="text-yellow-500 mr-3" />}
          <div className="flex-1">
            <p className="font-medium">{item.title || "Untitled"}</p>
            <p className="text-sm text-gray-500">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className="text-xs bg-gray-200 px-2 py-1 rounded capitalize">
            {item.type}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default RecentItems;