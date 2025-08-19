// Centralized selectors for Redux state
export const selectUser = (state) => state.users.users;
export const selectUserType = (state) => state.users.type;
export const selectUserLoading = (state) => state.users.loading;
export const selectUserRegLoading = (state) => state.users.regLoading;
export const selectUserError = (state) => state.users.error;

export const selectClients = (state) => state.clients.clients;
export const selectSelectedClient = (state) => state.clients.selectedClient;

export const selectAppointments = (state) => state.appointments.appointments;

export const selectInventory = (state) => state.inventory.products;

export const selectCalendar = (state) => state.calendar;

// Derived selectors
export const selectIsAuthenticated = (state) => !!state.users.users;
export const selectIsAdmin = (state) => state.users.type === true;
export const selectIsUser = (state) => state.users.type === false;

// Memoized selectors for better performance
export const selectClientById = (state, dni) => {
  const clients = selectClients(state);
  if (!clients?.data) return null;
  return clients.data.find((client) => client.dni === dni);
};

export const selectAppointmentsByDate = (state, date) => {
  const appointments = selectAppointments(state);
  if (!appointments) return [];
  return appointments.filter((appointment) => appointment.fecha === date);
};

export const selectLowStockProducts = (state) => {
  const products = selectInventory(state);
  if (!products) return [];
  return products.filter((product) => product.cantidad <= product.stockMinimo);
};

export const selectExpiringProducts = (state) => {
  const products = selectInventory(state);
  if (!products) return [];

  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  return products.filter((product) => {
    if (!product.vencimiento) return false;

    const [day, month, year] = product.vencimiento.split("/");
    const expiryDate = new Date(year, month - 1, day);

    return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
  });
};
