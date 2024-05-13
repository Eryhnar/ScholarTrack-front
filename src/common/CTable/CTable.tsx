interface CTableProps {
    tableClass?: string;
    cellClass?: string;
    headerClass?: string;
    data: any[];
    onClickFunction: (row: any) => void;
}

export const CTable: React.FC<CTableProps> = ({
    tableClass = "default-custom-table",
    cellClass = "default-custom-cell",
    headerClass = "default-custom-header",
    data,
    onClickFunction,
}: CTableProps): JSX.Element => {

    const allKeys = [...new Set(data.flatMap(Object.keys))]
    const columns = allKeys.map(key => ({
        Header: key,
        accessor: key 
    }))

    return (
        <table className={tableClass}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className={headerClass}>{column.Header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.id} onClick={() => onClickFunction(row)}>
                        {columns.map((column, columnIndex) => (
                            <td key={`${row.id}${columnIndex}`} className={cellClass}>{row[column.accessor]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}