import * as funcs from "./resolveFuns";

export default {
  Query: {
    getTask: (_: any, payload: any) => funcs.getTask(payload),
    getTasks: (_: any, payload: any, req: any) => funcs.getTasks(payload, req),
    getTaskEvents: (_: any, payload: any) => funcs.getTaskEvents(payload),
    getTaskItems: (_: any, payload: any) => funcs.getTaskItems(payload),
    //
    getReminders: (_: any, ___: any, req: any) => funcs.getReminders(req),
    getEvents: (_: any, payload: any, req: any) =>
      funcs.getEvents(payload, req),
    getEventsInfo: (_: any, __: any, req: any) => funcs.getEventsInfo(req),
    getReportEvents: (_: any, payload: any, req: any) =>
      funcs.getReportEvents(payload, req),
    getReportDocuments: (_: any, payload: any, req: any) =>
      funcs.getReportDocuments(payload, req),
    getReportServices: (_: any, payload: any, req: any) =>
      funcs.getReportServices(payload, req),
    getChartEvents: (_: any, payload: any, req: any) =>
      funcs.getChartEvents(payload, req),
    // actions
    getActions: (_: any, payload: any, req: any) =>
      funcs.getActions(payload, req),
    getNotifications: (_: any, payload: any, req: any) =>
      funcs.getNotifications(payload, req),
  },
  Mutation: {
    createTask: (_: any, payload: any, req: any) =>
      funcs.createTask(payload, req),
    updateTask: (_: any, payload: any) => funcs.updateTask(payload),
    deleteTask: (_: any, payload: any) => funcs.deleteTask(payload),
    deleteTaskById: (_: any, payload: any) => funcs.deleteTaskById(payload),
    //
    createEvent: (_: any, payload: any, req: any) =>
      funcs.createEvent(payload, req),
    updateEvent: (_: any, payload: any) => funcs.updateEvent(payload),
    deleteEvent: (_: any, payload: any) => funcs.deleteEvent(payload),
    deleteEventById: (_: any, payload: any) => funcs.deleteEventById(payload),
    //
    createAction: (_: any, payload: any, req: any) =>
      funcs.createAction(payload, req),
    updateAction: (_: any, payload: any) => funcs.updateAction(payload),
    deleteAction: (_: any, payload: any) => funcs.deleteAction(payload),
    createNotification: (_: any, payload: any, req: any) =>
      funcs.createNotification(payload, req),
    updateNotification: (_: any, payload: any) =>
      funcs.updateNotification(payload),
    deleteNotification: (_: any, payload: any) =>
      funcs.deleteNotification(payload),
  },
};
