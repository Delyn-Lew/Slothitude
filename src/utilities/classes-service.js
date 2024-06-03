import debug from "debug";
import * as classesAPI from "./classes-api";

const log = debug("slothitude:utilities:classes-service");

export const fetchClasses = async () => {
  try {
    log("Fetching classes");
    const classes = await classesAPI.fetchClasses();
    log("Fetched classes: %o", classes);
    return classes;
  } catch (error) {
    log("Error fetching classes: %o", error);
    throw error;
  }
};

export const fetchClassById = async (classId) => {
  try {
    log("Fetching class with ID: %s", classId);
    const classData = await classesAPI.fetchClassById(classId);
    log("Fetched class data: %o", classData);
    return classData;
  } catch (error) {
    log("Error fetching class by ID: %o", error);
    throw error;
  }
};

export const createClass = async (classData) => {
  try {
    log("Creating class with data: %o", classData);
    const createdClass = await classesAPI.createClass(classData);
    log("Created class: %o", createdClass);
    return createdClass;
  } catch (error) {
    log("Error creating class: %o", error);
    throw error;
  }
};

export const updateClass = async (classId, classData) => {
  try {
    log("Updating class with ID: %s", classId);
    const updatedClass = await classesAPI.updateClass(classId, classData);
    log("Updated class: %o", updatedClass);
    return updatedClass;
  } catch (error) {
    log("Error updating class: %o", error);
    throw error;
  }
};

export const deleteClass = async (classId) => {
  try {
    log("Deleting class with ID: %s", classId);
    const deletedClass = await classesAPI.deleteClass(classId);
    log("Deleted class: %o", deletedClass);
    return deletedClass;
  } catch (error) {
    log("Error deleting class: %o", error);
    throw error;
  }
};
