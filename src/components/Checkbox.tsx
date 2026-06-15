type RoundCheckboxType = {
  checked: boolean;
  onChange: () => void;
};

export const RoundCheckbox = ({ checked, onChange }: RoundCheckboxType) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />

      <div
        className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-gray-300 
                       transition-all duration-200
                      peer-checked:bg-blue-500 peer-checked:border-blue-500"
      >
        {checked && (
          <svg
            className="w-3.5 h-3.5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
    </label>
  );
};
