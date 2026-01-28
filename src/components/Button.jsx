const Button = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        className="w-8 h-8 rounded-xl text-white bg-blue-500 hover:bg-blue-600"
        onClick={onDecrease}
      >
        -
      </button>
      <span w-6>{quantity}</span>
      <button
        className="w-8 h-8 rounded-xl text-white bg-blue-500 hover:bg-blue-600"
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
};

export default Button;
