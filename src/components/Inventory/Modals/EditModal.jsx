import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { putProducts } from '../../../store/features/inventorySlice';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

const EditModal = ({ selectedRow, setShowModal }) => {
  const fechaParts = selectedRow.vencimiento.split('/');
  const vencimientoDate = new Date(
    parseInt(fechaParts[2]),
    parseInt(fechaParts[1] - 1),
    parseInt(fechaParts[0])
  );

  const formattedVencimiento = vencimientoDate.toISOString().substr(0, 10);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const isValid = Object.keys(errors).length === 0;

      if (!isValid) {
        Swal.fire('Recuerda llenar todos los campos!', '', 'warning');
        return;
      }

      // Transformar la fecha de vencimiento
      const fechaParts = data.vencimiento.split('-');
      const year = parseInt(fechaParts[0]);
      const month = parseInt(fechaParts[1]) - 1;
      const day = parseInt(fechaParts[2]);
      const fechaVencimiento = new Date(year, month, day);

      // Formatear la fecha en formato dia mes año
      const fechaFormateada = dayjs(fechaVencimiento).format('DD/MM/YYYY');

      const newData = { ...data, vencimiento: fechaFormateada };
      const result = await Swal.fire({
        title: '¿Quieres modificar este producto? Estos son tus cambios',
        html: `
          <div>Nombre: <strong>${newData.nombre}</strong></div>
          <div>Cantidad: <strong>${newData.cantidad}</strong></div>
          <div>Vencimiento: <strong>${newData.vencimiento}</strong></div>
          <div>Lote: <strong>${newData.lote}</strong></div>
          <div>Stock Mínimo: <strong>${newData.stockMinimo}</strong></div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, modificar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        setShowModal(false);
        const response = await dispatch(putProducts(newData));
      } else {
        Swal.fire('Los cambios no se realizaron', '', 'info');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm z-50">
      <div className="bg-primary h-auto w-auto p-8 rounded-xl flex flex-col items-center">
        <strong className="flex justify-center text-xl text-white mb-6">
          Editando producto:{' '}
          <span className="underline ml-2">{selectedRow.nombre}</span>
        </strong>
        <section>
          <form>
            <section className="flex flex-row justify-center items-start gap-8">
              <article className="flex flex-col gap-2 w-full">
                <label className="text-white" htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre"
                  className="bg-slate-100 p-2 border-solid border rounded-md border-black"
                  defaultValue={selectedRow.nombre}
                  {...register('nombre', {
                    required: 'Campo obligatorio',
                  })}
                />
                {errors.nombre && (
                  <p className="text-red-400 text-sm">{errors.nombre.message}</p>
                )}
                
                <label className="text-white mt-2" htmlFor="cantidad">Cantidad</label>
                <input
                  type="number"
                  min="0"
                  id="cantidad"
                  placeholder="Cantidad"
                  className="bg-slate-100 p-2 border-solid border rounded-md border-black"
                  defaultValue={selectedRow.cantidad}
                  {...register('cantidad', {
                    required: 'Campo obligatorio',
                  })}
                />
                {errors.cantidad && (
                  <p className="text-red-400 text-sm">{errors.cantidad.message}</p>
                )}
                
                <label className="text-white mt-2" htmlFor="stockMin">Stock minimo</label>
                <input
                  type="number"
                  min="0"
                  id="stockMin"
                  className="bg-slate-100 p-2 border-solid border rounded-md border-black"
                  placeholder="Stock mínimo"
                  defaultValue={selectedRow.stockMinimo}
                  {...register('stockMinimo', {
                    required: 'Campo obligatorio',
                  })}
                />
                {errors.stockMinimo && (
                  <p className="text-red-400 text-sm">{errors.stockMinimo.message}</p>
                )}
              </article>
              
              <article className="flex flex-col gap-2 w-full">
                <label className="text-white" htmlFor="lote">Lote</label>
                <input
                  type="text"
                  id="lote"
                  placeholder="Lote"
                  defaultValue={selectedRow.lote}
                  className="bg-slate-100 p-2 border-solid border rounded-md border-black"
                  {...register('lote', {
                    required: 'Campo obligatorio',
                  })}
                />
                {errors.lote && (
                  <p className="text-red-400 text-sm">{errors.lote.message}</p>
                )}
                
                <label className="text-white mt-2" htmlFor="vencimiento">Fecha de vencimiento</label>
                <input
                  type="date"
                  id="vencimiento"
                  defaultValue={formattedVencimiento}
                  className="bg-slate-100 p-2 border-solid border rounded-md border-black"
                  {...register('vencimiento', {
                    required: 'Campo obligatorio',
                  })}
                />
                {errors.vencimiento && (
                  <p className="text-red-400 text-sm">{errors.vencimiento.message}</p>
                )}
              </article>
            </section>
          </form>
        </section>
        <div className="flex w-full mt-8 justify-center gap-4 items-center">
          <button
            className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </button>
          <button
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
            type="submit"
            onClick={handleSubmit((data) =>
              onSubmit({ ...data, id: selectedRow.id })
            )}
          >
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
