import React, { useState } from "react";
import { Paperclip, Gift, Globe, ArrowUpRight } from "lucide-react";

const RichTextBox: React.FC = () => {
  const [text, setText] = useState("");

  const handleSend = () => {
    alert(`Message sent: ${text}`);
    setText("");
  };

  return (
    <div className="flex flex-col bg-gray-800 text-gray-200 rounded-lg p-4 shadow-md w-full max-w-md">
      {/* Text Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="This should be a text box like this"
        className="bg-transparent border-none resize-none focus:outline-none focus:ring-0 text-sm flex-1"
        rows={3}
      />

      {/* Bottom Controls */}
      <div className="flex items-center justify-between mt-3">
        {/* Left Icons */}
        <div className="flex space-x-3">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-200 transition"
            title="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-200 transition"
            title="Send a gift"
          >
            <Gift className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-200 transition"
            title="Share location"
          >
            <Globe className="h-5 w-5" />
          </button>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-200 transition"
            title="Expand"
          >
            <ArrowUpRight className="h-5 w-5" />
          </button>
          <button
            onClick={handleSend}
            type="button"
            className="bg-white text-gray-800 rounded-full p-2 hover:bg-gray-300 transition"
            title="Send"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RichTextBox;
