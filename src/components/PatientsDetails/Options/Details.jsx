import { useParams } from "react-router-dom";
import { fetchClient, updateClient } from "../../store/features/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clientSelector } from "../../store/features/clientSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
const Details = () => {
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const client = useSelector((state) => state?.clients?.selectedClient?.data);
  const [nroHist, setNroHist] = useState(client?.nroHistoriaClinica);
  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch]);

  const onEdit = () => {
    setEdit(true);
  };

  const onCheck = async () => {
    setEdit(false);
    const nroHistoriaClinica = nroHist;
    const result = { ...client, nroHistoriaClinica };
    const response = await dispatch(updateClient(result));
    console.log("este es result", result);
    console.log(response);
  };

  const onChange = (e) => {
    const event = e.target.value;
    setNroHist(event);
  };

  return (
    <div className="bg-white flex flex-col lg:flex-row md:flex-row items-center h-[600px] text-lg text-white font-bold py-4 overflow-y-auto">
      <div className="h-[100%] lg:w-[50%] w-full flex justify-center pb-2 ">
        <ul className="h-full flex flex-col justify-center pl-4 gap-3 ">
          <li>
            <span className="mr-4 uppercase text-background-100">DNI:</span>
            <span className="text-gray-600">{client?.dni}</span>
          </li>
          <li>
            <span className="mr-4 uppercase text-background-100">
              Date of Birth:
            </span>
            <span className="text-gray-600">{client?.fechaNacimiento}</span>
          </li>
          <li>
            <span className="mr-4 uppercase text-background-100">Age:</span>
            <span className="text-gray-600">{client?.edad}</span>
          </li>
          <li>
            <span className="mr-4 uppercase text-background-100">Apt:</span>
            <span className="text-gray-600">{client?.domicilio}</span>
          </li>
          <li>
            <span className="mr-4 uppercase text-background-100">Address:</span>
            <span className="text-gray-600">{client?.localidad}</span>
          </li>
          <li>
            <span className="mr-4 uppercase text-background-100">
              Phone Number:
            </span>
            <span className="text-gray-600">{client?.telefono1}</span>
          </li>
        </ul>
      </div>
      <div className="h-[100%] lg:w-[50%] w-full flex justify-center">
        <ul className="h-full flex flex-col justify-center pl-4 gap-3">
          <li>
            <span className="mr-4 uppercase text-background-100">
              Profession:
            </span>
            <span className="text-gray-600">{client?.ocupacion}</span>
          </li>
          <li>
            <span className="mr-4 uppercase text-background-100">
              Phone Number 2:
            </span>
            <span className="text-gray-600">{client?.telefono2}</span>
          </li>
          <li>
            <span className="mr-4 uppercase text-background-100">Email:</span>
            <span className="text-gray-600">{client?.email}</span>
          </li>
          <li>
            <span className="mr-4 uppercase text-background-100">
              Social Duty:
            </span>
            <span className="text-gray-600">{client?.obraSocial}</span>
          </li>

          <li>
            <span className="mr-4 uppercase text-background-100">
              Medical Insurance:
            </span>
            <span className="text-gray-600">{client?.plan}</span>
          </li>

          <li>
            <span className="mr-4 uppercase text-background-100">
              Affiliate N°:
            </span>
            <span className="text-gray-600">{client?.afiliado}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Details;
