interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-white shadow-md rounded-b-lg">
      <h1 className="text-4xl font-bold font-mono text-gray-800 tracking-wide">
        Expense Tracker
      </h1>
      <button
        className="bg-amber-300 hover:bg-amber-400 text-gray-800 font-semibold px-6 py-2 rounded shadow transition duration-200"
        onClick={onLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
