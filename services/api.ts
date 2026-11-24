import { demoAccounts, locations, trips, users, vehicles, type Trip, type User, type Vehicle } from '@/data/mock-data'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:5000/api/v1'

// Local prototype adapter. Replace this module's implementation with REST calls when the Express API is available.
export const api = {
  async login(email: string, password: string) { return demoAccounts.find((account) => account.email === email && account.password === password) ?? null },
  async getCurrentUser(id: string) { return users.find((user) => user.id === id) ?? null },
  async getVehicles(): Promise<Vehicle[]> { return vehicles },
  async getVehicleById(id: string) { return vehicles.find((vehicle) => vehicle.id === id) ?? null },
  async getLatestLocation(id: string) { return locations.findLast((location) => location.vehicleId === id) ?? null },
  async getVehicleLocations(id: string) { return locations.filter((location) => location.vehicleId === id) },
  async getTrips(): Promise<Trip[]> { return trips },
  async getTripById(id: string) { return trips.find((trip) => trip.id === id) ?? null },
  async getUsers(): Promise<User[]> { return users },
  async createUser(input: Omit<User, 'id'>) { return { ...input, id: `u${Date.now()}` } },
  async updateUser(id: string, input: Partial<User>) { const current = users.find((user) => user.id === id); return current ? { ...current, ...input } : null },
  async createVehicle(input: Omit<Vehicle, 'id'>) { return { ...input, id: `v${Date.now()}` } },
  async updateVehicle(id: string, input: Partial<Vehicle>) { const current = vehicles.find((vehicle) => vehicle.id === id); return current ? { ...current, ...input } : null },
}
