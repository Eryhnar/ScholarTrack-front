interface CTableProps {
    tableClass?: string;
    cellClass?: string;
    headerClass?: string;
    data: any[];
    onClickFunction: (row: any) => void;
}

export const CTable = ({
    tableClass = "default-custom-table",
    cellClass = "default-custom-cell",
    headerClass = "default-custom-header",
    data,
    onClickFunction,
}: CTableProps) => {

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
                {data.map((row, index) => (
                    <tr key={index} onClick={() => onClickFunction(row)}>
                        {columns.map((column, index) => (
                            <td key={index} className={cellClass}>{row[column.accessor]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}