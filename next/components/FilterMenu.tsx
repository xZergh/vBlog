import { ArrowDownZA, ArrowUpAZ, LayoutGrid, Rows3 } from 'lucide-react';

type FilterState = {
  view: { list: boolean };
  date: { asc: boolean };
};

type FilterMenuProps = {
  onChange: (
    option: 'view' | 'date',
    value: { list?: boolean; asc?: boolean }
  ) => void;
  filter: FilterState;
};

const FilterMenu = ({ onChange, filter }: FilterMenuProps) => {
  const CurrentViewIcon = filter.view.list ? Rows3 : LayoutGrid;
  const CurrentSortIcon = filter.date.asc ? ArrowUpAZ : ArrowDownZA;

  return (
    <div className='filter-menu mb-2'>
      <span className='mr-3'>
        <CurrentViewIcon
          size={32}
          className='icon clickable hoverable'
          onClick={() => {
            onChange('view', { list: !filter.view.list });
          }}
        />
      </span>
      <span className='mr-3'>
        <CurrentSortIcon
          size={32}
          className='icon clickable hoverable'
          onClick={() => {
            onChange('date', { asc: !filter.date.asc });
          }}
        />
      </span>
    </div>
  );
};

export default FilterMenu;
