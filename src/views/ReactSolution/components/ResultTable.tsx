import { FunctionComponent, useEffect, useState } from 'react';
import { User } from '../../../utils';
import styles from './ResultTable.module.css';

type DataItem = User;

export interface Row {
  id: number;
  name: string;
  phone: string;
  company: string;
  city: string;
}

interface Props {
  data: readonly DataItem[];
  searchText?: string;
}

/**
 * Renders "Search Result" table
 * @component ResultTable
 */
const ResultTable: FunctionComponent<Props> = ({ data, searchText }) => {
  const [rows, setRows] = useState<readonly Row[]>([]);

  useEffect(() => {
    // Map API data to local rows
    const dataToRows = data.map((item: DataItem) => ({
      id: item.id,
      name: item.name,
      phone: item.phone,
      company: item.company.name,
      city: item.address.city,
    }));
    setRows(dataToRows);
  }, [data]);

  return (
    <table className={styles.table}>
      <caption className={styles.left}>
        Search results for <b>"{searchText}"</b>
      </caption>
      <thead>
        <tr className={styles.left}>
          <th>ID</th>
          <th>Name</th>
          <th className={styles.right}>Phone</th>
          <th>Company</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td className={styles.right}>{row.phone}</td>
            <td>{row.company}</td>
            <td>{row.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultTable;
