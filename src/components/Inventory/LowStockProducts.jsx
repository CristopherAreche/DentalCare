import React from "react";
import { useTable, useSortBy } from "react-table";
import { useMemo } from "react";

const LowStockProducts = ({ productos }) => {
  const productosOrdenados = useMemo(() => {
    if (!productos) {
      return [];
    }
    return [...productos].sort((a, b) => a.cantidad - b.cantidad);
  }, [productos]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "nombre",
      },
      {
        Header: "Quantity",
        accessor: "cantidad",
      },
      {
        Header: "Min Stock",
        accessor: "stockMinimo",
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: productosOrdenados,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="rounded-lg w-[30em] max-h-[17em] overflow-y-scroll scrollbar-hide">
      <table {...getTableProps()} className="border-collapse w-full">
        <thead className="sticky top-0">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="bg-background-100 text-white text-lg uppercase"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="bg-white text-lg py-2 border-gray-500"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LowStockProducts;
