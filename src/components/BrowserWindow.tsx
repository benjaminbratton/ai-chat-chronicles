
import { Minus, Square, X } from "lucide-react";

export const BrowserWindow = () => {
  return (
    <div className="bg-gray-100 border-b border-gray-300 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Window Controls */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>

        {/* URL Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="bg-white border border-gray-300 rounded px-3 py-1 text-sm text-gray-700">
            🔒 dialogueswithai.io
          </div>
        </div>

        {/* Browser Controls */}
        <div className="flex items-center space-x-1 text-gray-500">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Minus className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Square className="w-3 h-3" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
