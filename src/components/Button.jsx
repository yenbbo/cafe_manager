const Button = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        className="w-8 h-8 rounded-xl text-white bg-blue-800 hover:bg-blue-600 cursor-pointer"
        onClick={onDecrease}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        className="w-8 h-8 rounded-xl text-white bg-blue-800 hover:bg-blue-600 cursor-pointer"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};

export default Button;
