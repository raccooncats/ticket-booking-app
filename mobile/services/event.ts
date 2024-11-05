import { EventResponse, EventListResponse } from "@/types/event";
import { Api } from "@/services/api";

const createOne = async (
  name: string,
  location: string,
  date: string
): Promise<EventResponse> => {
  return Api.post("/event", { name, location, date });
};

const getOne = async (id: number): Promise<EventResponse> => {
  return Api.get(`/event/${id}`);
};

const getAll = async (): Promise<EventListResponse> => {
  return Api.get("/event");
};

const updateOne = async (
  id: number,
  name: string,
  location: string,
  date: string
): Promise<EventResponse> => {
  return Api.put(`/event/${id}`, { name, location, date });
};

const deleteOne = async (id: number): Promise<EventResponse> => {
  return Api.delete(`/event/${id}`);
};

const eventService = {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
};

export { eventService };
