type FilterProps = {
  onFilterChange: (term: string) => void;
};

export const FilterOfTableClient = ({ onFilterChange }: FilterProps) => {
  return (
    <div className="w-full p-2">
      <input
        placeholder="Pesquisar"
        type="text"
        className="p-2 cursor-text w-full border rounded-lg"
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};
