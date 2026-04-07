import { ArrowDownZA, ArrowUpAZ, Rows3, LayoutGrid } from 'lucide-react';

const FilterMenu = ({ onChange, filter }) => {
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
            // Pass an object with asc property to maintain consistency
            onChange('date', { asc: !filter.date.asc });
          }}
        />
      </span>
    </div>
  );
};

export default FilterMenu;