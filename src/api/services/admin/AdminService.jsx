import { api } from "../../axios";

export const createQuiz = async (data) => {
  return await api.post("/admin/quiz", data);
};

export const getAllQuiz = async (search = "") => {
  return await api.get(`/admin/quiz?search=${search}`);
};

export const getQuizById = async (quizId) => {
  return await api.get(`/admin/quiz/${quizId}`);
};

export const updateQuiz = async (quizId, data) => {
  return await api.patch(`/admin/quiz/${quizId}`, data);
};

export const deleteQuiz = async (quizId) => {
  return await api.delete(`/admin/quiz/${quizId}`);
};

export const submitQuiz = (data) => {
  return api.post("/admin/submit", data);
};

export const getAllResults = () => {
  return api.get("/admin/results");
};
export const addQuestion = async (quizId, data) => {
  return await api.post(`/admin/quiz/${quizId}/question`, data);
};

export const updateQuestion = async (quizId, questionId, data) => {
  return await api.put(
    `/admin/quiz/${quizId}/question/${questionId}`,
    data
  );
};

export const deleteQuestion = async (quizId, questionId) => {
  return await api.delete(
    `/admin/quiz/${quizId}/question/${questionId}`
  );
};