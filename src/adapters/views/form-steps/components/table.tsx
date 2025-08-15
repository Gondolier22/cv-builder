import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, type FC } from "react";

type TableProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  onDelete: (index: number) => void;
};

const Table: FC<TableProps> = ({ data, onDelete }) => {
  // Generar columnas dinámicamente basándose en las claves del primer objeto
  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    const firstItem = data[0];
    return Object.keys(firstItem).map((key) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizar primera letra
      cell: (info: { getValue: () => unknown }) => info.getValue(),
    }));
  }, [data]);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!data || data.length === 0) {
    return <div>No hay datos para mostrar</div>;
  }

  return (
    <div className="p-2">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 px-4 py-2 bg-gray-100"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Actions
              </th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  title={String(cell.getValue())}
                  className="border border-gray-300 px-4 py-2 max-w-40 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="text-red-600 hover:underline ml-2 cursor-pointer"
                  onClick={() => onDelete(row.index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
