import { Api } from "@/services/api";
import { ApiResponse } from "@/types/api";
import { Ticket, TicketListResponse, TicketResponse } from "@/types/ticket";

const createOne = async (eventId: number): Promise<TicketResponse> => {
  return Api.post("/ticket", { eventId });
};

const getOne = async (
  id: number
): Promise<ApiResponse<{ ticket: Ticket; qrcode: string }>> => {
  return Api.get(`/ticket/${id}`);
};

const getAll = async (): Promise<TicketListResponse> => {
  return Api.get("/ticket");
};

const validateOne = async (
  ticketId: number,
  ownerId: number
): Promise<TicketResponse> => {
  return Api.post("/ticket/validate", { ticketId, ownerId });
};

const ticketService = {
  createOne,
  getOne,
  getAll,
  validateOne,
};

export { ticketService };
