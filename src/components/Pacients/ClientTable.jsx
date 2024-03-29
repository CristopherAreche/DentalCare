import React from "react";
import { useTable } from "react-table";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient, fetchClients } from "../store/features/clientSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
library.add(faCheck, faEdit, faTrash);
import { deleteClient } from "../store/features/clientSlice";

const ClientTable = ({ searchTerm }) => {
  const clients = useSelector((state) => state.clients.clients);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const columns = React.useMemo(
    () => [
      {
        Header: "DNI",
        accessor: "dni",
      },
      {
        Header: "Name",
        accessor: "nombre",
        Cell: ({ row }) => {
          const onPacientInfo = () => {
            const dni = row.original.dni;
            dispatch(fetchClient(dni));
          };
          return (
            <Link to={`/pacientes/${row.original.dni}`}>
              <div
                className="hover:underline cursor-pointer text-black hover:text-blue-400"
                onClick={onPacientInfo}
              >
                {row.original.nombre}
              </div>
            </Link>
          );
        },
      },
      {
        Header: "Phone Number",
        accessor: "telefono1",
      },
      {
        Header: "Remove",
        accessor: "opciones",
        Cell: ({ row }) => {
          const dispatch = useDispatch();
          const onHandleDelete = async () => {
            const result = await Swal.fire({
              title:
                "Are you sure you want to delete this patient? This action cannot be undone.",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "Cancel",
              reverseButtons: true,
            });
            if (result.isConfirmed) {
              const response = await dispatch(deleteClient(row.original.dni));
            }
          };
          return (
            <div className="flex gap-1 justify-evenly">
              <FontAwesomeIcon
                icon="trash"
                onClick={onHandleDelete}
                className="text-gray-600 cursor-pointer text-2xl"
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const filteredRows = React.useMemo(() => {
    if (Array.isArray(clients?.data)) {
      return clients.data.filter((client) =>
        client.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [clients, searchTerm]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredRows });

  return (
    <div className=" rounded-lg calendar-container w-auto md:max-w-[1000px] h-auto max-h-[40em] border-t border-l scrollbar-thumb-primary scrollbar-rounded-full scrollbar-track-slate-300 scrollbar-thin">
      <table {...getTableProps()} className="table-auto">
        <thead className="sticky top-0">
          {headerGroups?.map((headerGroup) => (
            <tr {...headerGroup?.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 font-semibold bg-background-100 uppercase text-xl text-white text-center"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {Array.isArray(rows) && rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row);
              return (
                <tr className="bg-white" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="border px-4 py-2 text-center text-lg"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="text-white" colSpan={columns.length}>
                No clients were found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
